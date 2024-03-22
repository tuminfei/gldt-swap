use crate::types::outstanding_payments::{ PaymentsList, PaymentStatus };
use crate::updates::manage_nns_neuron::manage_nns_neuron_impl;
use crate::state::{ mutate_state, read_state, Neurons };
use canister_time::{ run_now_then_interval, DAY_IN_MS, MINUTE_IN_MS };
use ledger_utils::icrc_account_to_legacy_account_id;
use nns_governance_canister::types::{
    manage_neuron::{ disburse::Amount, Command, Disburse, Spawn },
    Neuron,
};
use nns_governance_canister::types::ListNeurons;
use utils::{ consts::E8S_PER_ICP, env::Environment };
use std::time::Duration;
use tracing::{ error, info, warn };
use types::Milliseconds;

// We add a minute because spawning takes 7 days, and if we wait exactly 7 days, there may still be a few seconds left
// before the neuron can be spawned
const REFRESH_NEURONS_INTERVAL: Milliseconds = DAY_IN_MS + MINUTE_IN_MS;

const SPAWN_LIMIT_ICP: u64 = 1000;

pub fn start_job() {
    run_now_then_interval(Duration::from_millis(REFRESH_NEURONS_INTERVAL), run);
}

pub fn run() {
    ic_cdk::spawn(run_async());
}

async fn run_async() {
    let nns_governance_canister_id = read_state(|state| state.data.nns_governance_canister_id);

    match
        nns_governance_canister_c2c_client::list_neurons(
            nns_governance_canister_id,
            &(ListNeurons {
                neuron_ids: Vec::new(),
                include_neurons_readable_by_caller: true,
            })
        ).await
    {
        Ok(response) => {
            let now = read_state(|state| state.env.now());

            let neurons_to_spawn: Vec<_> = response.full_neurons
                .iter()
                .filter(
                    |n|
                        n.spawn_at_timestamp_seconds.is_none() &&
                        n.maturity_e8s_equivalent > SPAWN_LIMIT_ICP * E8S_PER_ICP
                )
                .filter_map(|n| n.id.as_ref().map(|id| id.id))
                .collect();

            let neurons_to_disburse: Vec<Neuron> = response.full_neurons
                .iter()
                .filter(|n| n.is_dissolved(now) && n.cached_neuron_stake_e8s > 0)
                .cloned()
                .collect();

            mutate_state(|state| {
                let mut active_neurons = Vec::new();
                let mut spawning_neurons = Vec::new();
                let mut disbursed_neurons = Vec::new();
                for neuron in response.full_neurons.into_iter() {
                    if neuron.maturity_e8s_equivalent == 0 && neuron.cached_neuron_stake_e8s == 0 {
                        if let Some(neuron_id) = neuron.id {
                            disbursed_neurons.push(neuron_id.id);
                        }
                    } else if neuron.spawn_at_timestamp_seconds.is_some() {
                        spawning_neurons.push(neuron);
                    } else {
                        active_neurons.push(neuron);
                    }
                }

                state.data.neurons = Neurons {
                    timestamp: now,
                    active_neurons,
                    spawning_neurons,
                    disbursed_neurons,
                };
            });

            let mut neurons_updated = false;

            if !neurons_to_spawn.is_empty() {
                spawn_neurons(neurons_to_spawn).await;
                neurons_updated = true;
            }

            if !neurons_to_disburse.is_empty() {
                disburse_neurons(neurons_to_disburse).await;
                neurons_updated = true;
            }

            if neurons_updated {
                // Refresh the neurons again given that they've been updated
                // Add a delay of 2 minutes to give enough time for transactions to pass
                ic_cdk_timers::set_timer(Duration::from_millis(2 * MINUTE_IN_MS), ||
                    ic_cdk::spawn(run_async())
                );
            }
        }
        Err(err) => { error!("Error fetching neuron list: {err:?}") }
    }
}

async fn spawn_neurons(neuron_ids: Vec<u64>) {
    for neuron_id in neuron_ids {
        info!(neuron_id, "Spawning neuron from maturity");
        match manage_nns_neuron_impl(neuron_id, Command::Spawn(Spawn::default())).await {
            Ok(_) => info!("Successfully spawned neuron {neuron_id}."),
            Err(err) => warn!("Error spawning neuron {neuron_id}: {err}"),
        }
    }
}

async fn disburse_neurons(neurons: Vec<Neuron>) {
    let rewards_recipients = read_state(|state| state.data.rewards_recipients.clone());

    if rewards_recipients.is_empty() {
        warn!("Skipping disbursement of neurons because no reward recipients are defined.");
        return;
    }

    for neuron in neurons {
        let neuron_id: u64;
        if let Some(id) = neuron.id {
            neuron_id = id.id;
            info!(id.id, "Disbursing neuron.");
        } else {
            warn!("Empty neuron id. Cannot disburse and continuing to next one.");
            continue;
        }

        let total_amount = neuron.cached_neuron_stake_e8s;

        let mut payments_list: PaymentsList;
        // If there are previous pending payments, take those, otherwise prepare the new list
        // This may happen if the payment cycle is interrupted because of an upgrade and then the disburse_neurons()
        // call would rerun on the same neuron. If a payment has already been made, some addresses could receive
        // double payments and others receive less than they should.
        if
            let Some(previous_list) = read_state(|s|
                s.data.outstanding_payments.get_outstanding_payments(neuron_id)
            )
        {
            payments_list = previous_list;
        } else {
            payments_list = match rewards_recipients.split_amount_to_each_recipient(total_amount) {
                Ok(list) => { PaymentsList::new(list) }
                Err(err) => {
                    error!(
                        "Error splitting amount to each recipient for neuron {neuron_id}. Error: {err}"
                    );
                    continue;
                }
            };
            // write to state to make sure its stored
            mutate_state(|s| (
                if
                    let Err(previous_list) = s.data.outstanding_payments.insert(
                        neuron_id,
                        payments_list.clone()
                    )
                {
                    // This means that there was already an entry in the list for this neuron.
                    // This should not be possible as we previously checked if outstanding payments are left.
                    // However, to handle this gracefully, we continue with the previous list and log a warning.
                    warn!(
                        "Previous payment found for {neuron_id} although it was previously checked. Continuing but this should not happen."
                    );
                    payments_list = previous_list;
                }
            ));
        }

        // would occur if no rewards_recipients are defined
        if payments_list.has_none() {
            continue;
        }

        for (&account, payment) in payments_list.list.iter() {
            if payment.is_complete() {
                continue;
            }
            let icp_ledger_account = nns_governance_canister::types::AccountIdentifier {
                hash: icrc_account_to_legacy_account_id(account).as_ref().to_vec(),
            };
            match
                manage_nns_neuron_impl(
                    neuron_id,
                    Command::Disburse(Disburse {
                        to_account: Some(icp_ledger_account),
                        amount: Some(Amount { e8s: payment.get_amount() }),
                    })
                ).await
            {
                Ok(_) => {
                    mutate_state(|s|
                        s.data.outstanding_payments.update_status_of_entry_in_list(
                            neuron_id,
                            account,
                            PaymentStatus::Complete
                        )
                    );
                }
                Err(err) => {
                    error!(
                        "Error processing disburse payment for neuron {neuron_id}. Error: {err}"
                    );
                }
            }
        }

        mutate_state(|s| {
            if payments_list.all_complete() {
                s.data.outstanding_payments.remove_from_list(neuron_id);
            }
        });
    }
}
