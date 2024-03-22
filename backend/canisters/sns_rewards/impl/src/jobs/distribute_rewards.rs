/*!
# SNS reward distribution

This job is responsible for distributing rewards to user's sub accounts.

There are reward pools ( ICP, OGY, GLDGov ) that exist on the 0 sub account
Individual neuron rewards are transferred to a sub account based on the NeuronId

TODO - update this.
*/

use crate::{
    model::payment_processor::{
        MaturityDelta,
        Payment,
        PaymentRound,
        PaymentRoundStatus,
        PaymentStatus,
    },
    state::{ mutate_state, read_state, RuntimeState },
};
use candid::{ Nat, Principal };
use canister_time::{ run_interval, WEEK_IN_MS };
use futures::future::join_all;
use ic_ledger_types::{ Subaccount, DEFAULT_SUBACCOUNT };
use icrc_ledger_types::icrc1::{ account::Account, transfer::TransferArg };
use num_bigint::BigUint;
use sns_governance_canister::types::NeuronId;
use std::collections::{ BTreeMap, HashMap };
use std::time::Duration;
use tracing::{ debug, error, info };
use types::{ Milliseconds, NeuronInfo, TokenSymbol };
use utils::consts::E8S_PER_ICP;

const DISTRIBUTION_INTERVAL: Milliseconds = WEEK_IN_MS;

pub fn start_job() {
    run_interval(Duration::from_millis(DISTRIBUTION_INTERVAL), run);
}

pub fn run() {
    ic_cdk::spawn(distribute_rewards())
}

// called once per day
pub async fn retry_faulty_payment_rounds() {
    // let contains_faulty_payment_rounds = read_state(|state|
    //     state.data.payment_processor.contains_faulty_payment_rounds()
    // );
    // if !contains_faulty_payment_rounds {
    //     info!("All payment rounds are COMPLETED or PENDING");
    //     return;
    // }
    // let successful_neuron_payments = mutate_state(|state| {
    //     state.data.payment_processor.process_faulty_rounds()
    // });

    // mutate_state(|state| {
    //     update_neuron_rewards(state, successful_neuron_payments);
    // });
    // TODO
    // Add the job duration etc
}

pub async fn distribute_rewards() {
    let contains_faulty_payment_rounds = read_state(|state|
        state.data.payment_processor.active_rounds_exist()
    );

    if contains_faulty_payment_rounds {
        info!("There are still active rounds present to process");
        return;
    }

    // create a new payment round
    // let reward_tokens = vec![TokenSymbol::ICP, TokenSymbol::OGY, TokenSymbol::GLDGov];
    let reward_tokens = vec![TokenSymbol::ICP];
    for token in &reward_tokens {
        debug!("Creating new payment round for token : {:?}", token);
        // check reward pool has a balance
        let ledger_id = read_state(|state| get_ledger_id(state, token.clone()));
        // let tokens_to_distribute = fetch_reward_pool_balance(ledger_id).await;
        let tokens_to_distribute = Nat::from(300_000u64);
        if tokens_to_distribute == Nat::from(0u64) {
            return;
        }
        // maturity delta ( change ) per neuron
        let neuron_maturity_for_interval = read_state(|state|
            calculate_neuron_maturity_for_interval(&state.data.neuron_maturity, &token)
        );

        // total neuron_maturity
        let total_neuron_maturity_for_interval = calculate_aggregated_maturity(
            &neuron_maturity_for_interval
        );

        // rewards per neuron
        let neuron_share = calculate_neuron_shares(
            neuron_maturity_for_interval,
            tokens_to_distribute.clone()
        );

        let new_round_key = read_state(|state| state.data.payment_processor.next_key());

        let new_round = PaymentRound::new(
            new_round_key,
            tokens_to_distribute,
            ledger_id,
            token.clone(),
            total_neuron_maturity_for_interval,
            neuron_share
        );
        let res = transfer_funds_to_payment_round_account(&new_round).await;
        match res {
            Ok(()) => {
                mutate_state(|state| {
                    state.data.payment_processor.add_active_payment_round(new_round);
                });
            }
            Err(e) => {
                debug!("ERROR - transferring funds to payment round sub account : {}", e);
            }
        }
    }

    let pending_payment_rounds = read_state(|state|
        state.data.payment_processor.read_active_pending_payment_rounds()
    );

    info!("current round status : {:?}", pending_payment_rounds[0].1.round_status);

    for payment_round in &pending_payment_rounds {
        process_payment_round(payment_round).await;
    }

    let processed_payment_rounds = read_state(|state|
        state.data.payment_processor.read_active_in_progress_rounds()
    );

    info!("current round status : {:?}", processed_payment_rounds);

    for (_, payment_round) in &processed_payment_rounds {
        update_payment_round_status(&payment_round);
        update_neuron_rewards(&payment_round);
        log_payment_round_metrics(&payment_round);
    }
    debug!("END - finished processing distribution of payment rounds");
}

pub fn log_payment_round_metrics(payment_round: &PaymentRound) {
    let payments: Vec<(&NeuronId, &Payment)> = payment_round.payments.iter().collect();
    let successful_neuron_transfers: Vec<(&NeuronId, &MaturityDelta, &TokenSymbol)> = payments
        .iter()
        .filter(|(_, (_, status, _))| status != &PaymentStatus::Completed)
        .map(|(neuron_id, (_, _, maturity))| (*neuron_id, maturity, &payment_round.token))
        .collect();
    let summed_success_maturity: u64 = successful_neuron_transfers
        .iter()
        .map(|(_, maturity_delta, _)| *maturity_delta)
        .sum();

    debug!(
        "METRICS || round : {}, token : {:?}, number success completed : {}, successful maturity distributed : {}, round maturity : {}",
        payment_round.id,
        payment_round.token,
        successful_neuron_transfers.len(),
        summed_success_maturity,
        payment_round.total_neuron_maturity
    );
}

pub async fn transfer_funds_to_payment_round_account(round: &PaymentRound) -> Result<(), String> {
    let next_key = round.id;
    let funds = round.round_funds_total.clone();
    let ledger_id = round.ledger_id.clone();
    let round_pool_subaccount = round.get_payment_round_sub_account_id();

    let from_sub_account = Subaccount([0; 32]);
    let account = Account {
        owner: ic_cdk::api::id(),
        subaccount: Some(round_pool_subaccount.0),
    };

    debug!("Transferring funds to payment round sub account for round id : {}", next_key);
    transfer_token(from_sub_account, account, ledger_id, funds).await
}

pub fn get_ledger_id(state: &RuntimeState, token: TokenSymbol) -> Principal {
    match token {
        TokenSymbol::ICP => state.data.icp_ledger_canister_id,
        TokenSymbol::OGY => state.data.ogy_ledger_canister_id,
        TokenSymbol::GLDGov => state.data.gldgov_ledger_canister_id,
    }
}

pub fn calculate_neuron_maturity_for_interval(
    neurons: &BTreeMap<NeuronId, NeuronInfo>,
    token: &TokenSymbol
) -> Vec<(NeuronId, u64)> {
    neurons
        .into_iter()
        .map(|(neuron_id, neuron_info)| {
            let previous_rewarded = neuron_info.rewarded_maturity
                .get(token)
                .unwrap_or(&0u64)
                .clone();
            let accumulated = neuron_info.accumulated_maturity;
            let delta_maturity = accumulated
                .checked_sub(previous_rewarded)
                .expect("overflow calculating maturity delta");
            (neuron_id.clone(), delta_maturity)
        })
        .collect()
}

pub fn calculate_neuron_shares(
    neuron_deltas: Vec<(NeuronId, u64)>,
    reward_pool: Nat
) -> HashMap<NeuronId, Payment> {
    let total_maturity: u64 = neuron_deltas
        .iter()
        .map(|entry| entry.1)
        .sum();

    let total_maturity_big = BigUint::try_from(total_maturity.clone()).unwrap();
    let reward_pool_big = BigUint::from(reward_pool);
    // Calculate the reward for each neuron
    let map: HashMap<NeuronId, Payment> = neuron_deltas
        .iter()
        .map(|(neuron_id, maturity)| {
            // Convert maturity to BigUint
            let maturity_big = BigUint::try_from(*maturity).unwrap();

            // Calculate percentage as (maturity / total_maturity) * 10000 (expressed in basis points)
            let percentage =
                (maturity_big * BigUint::from(E8S_PER_ICP)) / total_maturity_big.clone();

            let reward = (reward_pool_big.clone() * percentage) / BigUint::from(E8S_PER_ICP);
            let reward: u64 = reward.try_into().expect("failed to convert bigint to u64");
            (neuron_id.clone(), (reward, PaymentStatus::Pending, maturity.clone()))
        })
        .collect();

    map
}

pub fn update_neuron_rewards(payment_round: &PaymentRound) {
    let payments: Vec<(&NeuronId, &Payment)> = payment_round.payments.iter().collect();
    let successful_neuron_transfers: Vec<(&NeuronId, &MaturityDelta, &TokenSymbol)> = payments
        .iter()
        .filter(|(_, (_, status, _))| status != &PaymentStatus::Completed)
        .map(|(neuron_id, (_, _, maturity))| (*neuron_id, maturity, &payment_round.token))
        .collect();

    mutate_state(|state| {
        for (neuron_id, maturity_delta, token) in successful_neuron_transfers {
            let neuron = state.data.neuron_maturity.get_mut(&neuron_id);
            match neuron {
                Some(neuron_info) => {
                    let rewarded_maturity_token = neuron_info.rewarded_maturity.get_mut(&token);
                    match rewarded_maturity_token {
                        Some(value) => {
                            value
                                .checked_add(*maturity_delta)
                                .expect(
                                    "update_neuron_rewards - overflow when adding neuron maturity to existing maturity"
                                );
                        }
                        None => {}
                    }
                }
                None => {}
            }
        }
    });
}

pub fn calculate_aggregated_maturity(data: &Vec<(NeuronId, u64)>) -> u64 {
    data.iter()
        .map(|entry| entry.1)
        .sum()
}

async fn fetch_reward_pool_balance(ledger_canister_id: Principal) -> Nat {
    match
        icrc_ledger_canister_c2c_client::icrc1_balance_of(
            ledger_canister_id,
            &(Account {
                owner: ic_cdk::api::id(),
                subaccount: Some(DEFAULT_SUBACCOUNT.0),
            })
        ).await
    {
        Ok(t) => {
            info!("Success - querying balance of {} - has {}", ledger_canister_id, t);
            t
        }
        Err(e) => {
            error!(
                "Fail - to fetch token balance of ledger canister id {ledger_canister_id} with ERROR_CODE : {} . MESSAGE",
                e.1
            );
            Nat::from(0u64)
        }
    }
}

async fn transfer_token(
    from_sub_account: Subaccount,
    to_account: Account,
    ledger_id: Principal,
    amount: Nat
) -> Result<(), String> {
    match
        icrc_ledger_canister_c2c_client::icrc1_transfer(
            ledger_id,
            &(TransferArg {
                from_subaccount: Some(from_sub_account.0),
                to: to_account,
                fee: Some((10_000u32).into()),
                created_at_time: None,
                amount: amount,
                memo: None,
            })
        ).await
    {
        Ok(Ok(_)) => Ok(()),
        Ok(Err(error)) => Err(format!("Transfer error: {error:?}")),
        Err(error) => Err(format!("Network error: {error:?}")),
    }
}

fn update_payment_round_status(payment_round: &PaymentRound) {
    let payments: Vec<(&NeuronId, &Payment)> = payment_round.payments.iter().collect();

    let mut completed_count = 0;
    let mut failed_count = 0;

    for (_, (_, payment_status, _)) in &payments {
        match payment_status {
            PaymentStatus::Completed => {
                completed_count += 1;
            }
            PaymentStatus::Failed(_) => {
                failed_count += 1;
            }
            _ => {} // Ignore other statuses
        }
    }
    let new_status: PaymentRoundStatus;
    if completed_count > 0 && failed_count > 0 {
        new_status = PaymentRoundStatus::CompletedPartial;
    } else if completed_count == payments.len() {
        new_status = PaymentRoundStatus::CompletedFull;
    } else {
        new_status = PaymentRoundStatus::Failed(
            "All payments for payment round failed".to_string()
        );
    }
    info!("new round status {:?}", new_status);
    mutate_state(|state|
        state.data.payment_processor.set_active_round_status(&payment_round.id, new_status)
    );
}

pub async fn process_payment_round((round_id, payment_round): &(u16, PaymentRound)) {
    debug!("START - payment processing of {:?} for round id : {}", payment_round.token, round_id);
    let batch_limit = 45;
    let round_pool_subaccount = payment_round.get_payment_round_sub_account_id();
    let ledger_id = payment_round.ledger_id;
    mutate_state(|state| {
        state.data.payment_processor.set_active_round_status(
            &round_id,
            PaymentRoundStatus::InProgress
        );
    });

    let payments: Vec<(&NeuronId, &Payment)> = payment_round.payments.iter().collect();
    let mut payment_chunks = payments.chunks(batch_limit);

    while let Some(batch) = payment_chunks.next() {
        let neuron_ids: Vec<&NeuronId> = batch
            .iter()
            .filter(|(_, (_, payment_status, _))| payment_status != &PaymentStatus::Completed)
            .map(|payment| payment.0)
            .collect();
        let transfer_futures = batch
            .iter()
            .filter(|(_, (_, payment_status, _))| payment_status != &PaymentStatus::Completed)
            .map(|(neuron_id, (reward, _, _))| {
                let n_id = *neuron_id;
                let account = Account {
                    owner: ic_cdk::api::id(),
                    subaccount: Some(n_id.into()),
                };
                mutate_state(|state|
                    state.data.payment_processor.set_active_payment_status(
                        &round_id,
                        &neuron_id,
                        PaymentStatus::Triggered
                    )
                );
                transfer_token(round_pool_subaccount, account, ledger_id, Nat::from(*reward))
            });
        let results = join_all(transfer_futures).await;

        for (result, neuron_id) in results.iter().zip(neuron_ids.iter()) {
            match result {
                Ok(_) => {
                    mutate_state(|state|
                        state.data.payment_processor.set_active_payment_status(
                            &round_id,
                            &neuron_id,
                            PaymentStatus::Completed
                        )
                    );
                }
                Err(e) => {
                    mutate_state(|state|
                        state.data.payment_processor.set_active_payment_status(
                            &round_id,
                            &neuron_id,
                            PaymentStatus::Failed(e.clone())
                        )
                    );
                }
            }
        }
    }
}

#[cfg(test)]
mod tests {
    // use num_bigint::BigUint;
    // use sns_governance_canister::types::NeuronId;
    // use types::NeuronInfo;
    // use utils::consts::E8S_PER_ICP;

    // use crate::{
    //     jobs::distribute_rewards::{
    //         calculate_aggregated_maturity,
    //         calculate_neuron_percentages,
    //         calculate_reward,
    //         update_neuron_reward,
    //     },
    //     state::{ init_state, mutate_state, read_state, RuntimeState },
    // };

    // use super::calculate_neuron_maturity_for_interval;

    #[test]
    fn test_calculate_neuron_maturity_for_first_sync() {}
}
