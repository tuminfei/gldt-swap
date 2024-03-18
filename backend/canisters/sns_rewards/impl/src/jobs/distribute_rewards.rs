/*!
# SNS reward distribution

This job is responsible for distributing rewards to user's sub accounts.

There are reward pools ( ICP, OGY, GLDGov ) that exist on the 0 sub account
Individual neuron rewards are transferred to a sub account based on the NeuronId
*/

use crate::state::{mutate_state, read_state, RuntimeState};
use candid::{Nat, Principal};
use canister_time::{now_millis, run_interval, WEEK_IN_MS};
use futures::future::join_all;
use ic_ledger_types::{
    Subaccount, DEFAULT_SUBACCOUNT,
};
use icrc_ledger_types::icrc1::{account::Account, transfer::TransferArg};
use num_bigint::BigUint;
use sns_governance_canister::types::NeuronId;
use std::collections::BTreeMap;
use std::time::Duration;
use tracing::{debug, error, info};
use types::{Milliseconds, NeuronInfo};
use utils::consts::E8S_PER_ICP;

const DISTRIBUTION_INTERVAL: Milliseconds = WEEK_IN_MS;

pub fn start_job() {
    run_interval(Duration::from_millis(DISTRIBUTION_INTERVAL), run);
}

pub fn run() {
    ic_cdk::spawn(distribute_rewards())
}

pub async fn distribute_rewards() {
    // Metrics
    info!("|||| DISTRIBUTION START |||||");
    let time_start = now_millis();
    mutate_state(|state| {
        state.data.sync_info.last_distribution_start = time_start;
    });

    // 1 ) Cacluating neuron reward percentage
    let neuron_maturity_for_interval =
        read_state(|state| calculate_neuron_maturity_for_interval(&state.data.neuron_maturity));
    let total_maturity_for_all_neurons =
        calculate_aggregated_maturity(&neuron_maturity_for_interval);
    let neuron_reward_percentage = calculate_neuron_percentages(
        &neuron_maturity_for_interval,
        &total_maturity_for_all_neurons,
    );

    // 2 ) Get balances of all reward pools
    let icp_ledger_id = read_state(|state| state.data.icp_ledger_canister_id);
    let ogy_ledger_id = read_state(|state| state.data.ogy_ledger_canister_id);
    let gldgov_ledger_id = read_state(|state| state.data.gldgov_ledger_canister_id);

    let icp_reward_pool_balance = fetch_reward_pool_balance(icp_ledger_id).await;
    let ogy_reward_pool_balance = fetch_reward_pool_balance(ogy_ledger_id).await;
    let gldgov_reward_pool_balance = fetch_reward_pool_balance(gldgov_ledger_id).await;

    // 4 ) Pay all sub accounts
    let sucessful_neuron_transfers = transfer_rewards(
        neuron_reward_percentage,
        icp_reward_pool_balance.0,
        ogy_reward_pool_balance.0,
        gldgov_reward_pool_balance.0,
        icp_ledger_id,//
        ogy_ledger_id,
        gldgov_ledger_id
    )
    .await;

    // update the neuron info with the amount of maturity paid
    mutate_state(|state| {
        update_neuron_reward(
            &sucessful_neuron_transfers,
            state,
            &neuron_maturity_for_interval,
        );
    });

    let time_finish = now_millis();
    mutate_state(|state| state.data.sync_info.last_distribution_end = time_finish);
    info!(
        "|||| DISTRIBUTION COMPLETE ||||| time_taken : {} || number of neurons distributed to : {} || total maturity distributed : {}",
        (time_finish - time_start),
        &sucessful_neuron_transfers.len(),
        total_maturity_for_all_neurons
    );
}

pub fn calculate_reward(percentage: BigUint, reward_pool: BigUint) -> u64 {
    let reward = (reward_pool * percentage.clone()) / BigUint::from(E8S_PER_ICP);
    reward.try_into().expect("faild to convert bigint to u64")
}

pub fn update_neuron_reward(
    neuron_ids_to_update: &Vec<NeuronId>,
    state: &mut RuntimeState,
    neuron_interval_maturity: &Vec<(NeuronId, u64)>,
) {
    for neuron_id in neuron_ids_to_update {
        let neuron = state.data.neuron_maturity.get_mut(&neuron_id);
        match neuron {
            Some(neuron_info) => {
                debug!(
                    "current reward maturity : {}",
                    neuron_info.rewarded_maturity
                );

                let neuron_maturity = neuron_interval_maturity
                    .iter()
                    .find(|(n_id, _)| n_id.clone() == neuron_id.clone());
                match neuron_maturity {
                    Some((_, n_mat)) => {
                        let new_rewarded_maturity = neuron_info.rewarded_maturity + n_mat.clone();
                        debug!(
                            "updating neuron maturity : {} with maturity reward of {}",
                            neuron_id, new_rewarded_maturity
                        );
                        neuron_info.rewarded_maturity = new_rewarded_maturity;
                    }
                    None => {}
                }
            }
            None => {}
        }
    }
}

pub fn calculate_neuron_maturity_for_interval(
    neuron_maturity: &BTreeMap<NeuronId, NeuronInfo>,
) -> Vec<(NeuronId, u64)> {
    let mut latest_maturity_per_neuron: Vec<(NeuronId, u64)> = Vec::new();

    for (neuron_id, neuron_info) in neuron_maturity.iter() {
        let accumilated_maturity = neuron_info.accumulated_maturity; // total accumilated
        let previous_paid_maturity = neuron_info.rewarded_maturity; // last payout reward

        let change_since_last_interval = accumilated_maturity
            .checked_sub(previous_paid_maturity)
            .expect("overflow when subtracting");
        latest_maturity_per_neuron.push((neuron_id.clone(), change_since_last_interval));
    }

    latest_maturity_per_neuron
}

pub fn calculate_aggregated_maturity(data: &Vec<(NeuronId, u64)>) -> u64 {
    data.iter().map(|entry| entry.1).sum()
}

pub fn calculate_neuron_percentages(
    data: &[(NeuronId, u64)],
    total_maturity: &u64,
) -> Vec<(NeuronId, BigUint)> {
    // Convert total_maturity to BigUint
    let total_maturity_big = BigUint::try_from(total_maturity.clone()).unwrap();

    // Calculate percentage for each neuron
    data.iter()
        .map(|(neuron_id, maturity)| {
            // Convert maturity to BigUint
            let maturity_big = BigUint::try_from(*maturity).unwrap();

            // Calculate percentage as (maturity / total_maturity) * 10000 (expressed in basis points)
            let percentage =
                (maturity_big * BigUint::from(E8S_PER_ICP)) / total_maturity_big.clone();

            (neuron_id.clone(), percentage)
        })
        .collect()
}

async fn fetch_reward_pool_balance(ledger_canister_id: Principal) -> Nat {
    match icrc_ledger_canister_c2c_client::icrc1_balance_of(
        ledger_canister_id,
        &Account {
            owner: ic_cdk::api::id(),
            subaccount: Some(DEFAULT_SUBACCOUNT.0),
        },
    )
    .await
    {
        Ok(t) => {
            info!("Success - querying balance of {} - has {}", ledger_canister_id, t);
            t
        },
        Err(e) => {
            error!("Fail - to fetch token balance of ledger canister id {ledger_canister_id} with ERROR_CODE : {} . MESSAGE", e.1);
            Nat::from(0u64)
        }
    }
}

async fn transfer_token(
    ledger_id: Principal,
    sub_account: Subaccount,
    amount: u64,
) -> Result<u64, String> {
    match icrc_ledger_canister_c2c_client::icrc1_transfer(
        ledger_id,
        &(TransferArg {
            from_subaccount: Some(DEFAULT_SUBACCOUNT.0),
            to: Account {
                owner: ic_cdk::api::id(),
                subaccount: Some(sub_account.0),
            },
            fee: Some((10_000u32).into()),
            created_at_time: None,
            amount: (amount).into(),
            memo: None,
        }),
    )
    .await
    {
        Ok(Ok(_)) => {
            debug!("!!! TRANSFER SUCCESS !!!");
            Ok(1)
        }
        Ok(Err(error)) => {
            debug!("!!! TRANSFER ERROR!!! error : {}", error);
            return Err(format!("Transfer error: {error:?}"));
        }
        Err(error) => {
            debug!("!!! TRANSFER ERROR!!! error : {}", error.1);
            return Err(format!("Network error: {error:?}"));
        }
    }
}

async fn transfer_rewards(
    neurons: Vec<(NeuronId, BigUint)>,
    icp_balance: BigUint,
    ogy_balance: BigUint,
    gldgov_balance: BigUint,
    icp_ledger_id: Principal,
    ogy_ledger_id: Principal,
    gldgov_ledger_id: Principal,
) -> Vec<NeuronId> {
    let mut successful_reward_transfers: Vec<NeuronId> = vec![];
    let batch_limit = 15; // 50 is the max but we do 3 transactions per neuron leaving 5 left ( 15 transactions x 3 token types + 5 retrys)

    let mut batched_neurons = neurons.chunks(batch_limit);
    while let Some(batch) = batched_neurons.next() {
        let mut transfer_futures = Vec::new();

        for (neuron_id, percentage_to_reward) in batch {
            if *percentage_to_reward <= BigUint::from(0u64) {
                continue; // skip payment since this neuron 0 percentage
            }
            let sub_account = Subaccount(neuron_id.into());
            // icp
            if icp_balance > BigUint::from(0u64) {
                let icp_reward = calculate_reward(percentage_to_reward.clone(), icp_balance.clone());
                transfer_futures.push((
                    neuron_id.clone(),
                    transfer_token(icp_ledger_id, sub_account, icp_reward),
                ));
            }

            // ogy
            if ogy_balance.clone() > BigUint::from(0u64) {
                let ogy_reward = calculate_reward(percentage_to_reward.clone(), ogy_balance.clone());
                transfer_futures.push((
                    neuron_id.clone(),
                    transfer_token(ogy_ledger_id, sub_account, ogy_reward),
                ));
            }

            // TODO goldgov
            if gldgov_balance.clone() > BigUint::from(0u64) {
                let gldgov_reward = calculate_reward(percentage_to_reward.clone(), gldgov_balance.clone());
                transfer_futures.push((
                    neuron_id.clone(),
                    transfer_token(gldgov_ledger_id, sub_account, gldgov_reward),
                ));
            }
        }

        let results = join_all(transfer_futures.into_iter().map(
            |(neuron_id, future)| async move {
                match future.await {
                    Ok(_) => Ok(neuron_id),
                    Err(_) => Err(()), // Handle error if needed
                }
            },
        ))
        .await;

        // only add successful transfers to the return
        successful_reward_transfers.extend(results.into_iter().filter_map(Result::ok));
    }
    successful_reward_transfers
}

#[cfg(test)]
mod tests {
    use num_bigint::BigUint;
    use sns_governance_canister::types::NeuronId;
    use types::NeuronInfo;
    use utils::consts::E8S_PER_ICP;

    use crate::{
        jobs::distribute_rewards::{
            calculate_aggregated_maturity, calculate_neuron_percentages, calculate_reward,
            update_neuron_reward,
        },
        state::{init_state, mutate_state, read_state, RuntimeState},
    };

    use super::calculate_neuron_maturity_for_interval;

    #[test]
    fn test_calculate_neuron_maturity_for_first_sync() {
        let neuron_id =
            NeuronId::new("2a9ab729b173e14cc88c6c4d7f7e9f3e7468e72fc2b49f76a6d4f5af37397f98")
                .unwrap();

        let mut state = RuntimeState::default();
        state.data.neuron_maturity.insert(
            neuron_id,
            NeuronInfo {
                last_synced_maturity: 100,
                accumulated_maturity: 100,
                rewarded_maturity: 0,
            },
        );
        init_state(state);
        // calculate_neuron_maturity_for_interval
        read_state(|state| {
            let d = calculate_neuron_maturity_for_interval(&state.data.neuron_maturity);
            let maturity_for_interval = d.get(0).unwrap().1;
            assert_eq!(maturity_for_interval, 100);
        })
    }

    #[test]
    fn test_calculate_neuron_maturity_for_nth_sync() {
        let neuron_id =
            NeuronId::new("2a9ab729b173e14cc88c6c4d7f7e9f3e7468e72fc2b49f76a6d4f5af37397f98")
                .unwrap();

        let mut state = RuntimeState::default();
        state.data.neuron_maturity.insert(
            neuron_id,
            NeuronInfo {
                last_synced_maturity: 200,
                accumulated_maturity: 200,
                rewarded_maturity: 123,
            },
        );
        init_state(state);
        
        // calculate_neuron_maturity_for_interval
        read_state(|state| {
            let d = calculate_neuron_maturity_for_interval(&state.data.neuron_maturity);
            let maturity_for_interval = d.get(0).unwrap().1;
            assert_eq!(maturity_for_interval, 77);
        })
    }

    #[test]
    fn test_neuron_percentages() {
        // Generate 200 neurons with unique IDs and a single maturity value
        let mut neuron_data: Vec<(NeuronId, u64)> = Vec::new();
        for _ in 0..20000 {
            let neuron_id =
                NeuronId::new("2a9ab729b173e14cc88c6c4d7f7e9f3e7468e72fc2b49f76a6d4f5af37397f98")
                    .unwrap();
            neuron_data.push((neuron_id, 1));
        }

        let total_maturity: u64 = neuron_data.iter().map(|(_, m)| *m).sum();

        // Calculate neuron percentages
        let neuron_percentages = calculate_neuron_percentages(&neuron_data, &total_maturity);

        // Ensure the sum of percentages equals the precision of e8s
        let sum_percentages: BigUint = neuron_percentages.iter().map(|(_, b)| b.clone()).sum();
        let expected_sum = BigUint::from(E8S_PER_ICP);

        assert_eq!(expected_sum, sum_percentages);
    }

    #[test]
    fn test_rewards_calculation() {
        // Example data with 200 neurons, each with a unique ID and maturity of 100
        let mut neuron_data: Vec<(NeuronId, u64)> = Vec::new();
        for _ in 0..200 {
            let neuron_id =
                NeuronId::new("2a9ab729b173e14cc88c6c4d7f7e9f3e7468e72fc2b49f76a6d4f5af37397f98")
                    .unwrap();
            neuron_data.push((neuron_id, 100));
        }

        // Example total_maturity
        let total_maturity: u64 = neuron_data.iter().map(|(_, m)| *m).sum();
        let reward_pool = BigUint::from(927_235_512u64.checked_mul(E8S_PER_ICP).unwrap());

        let neuron_percentages = calculate_neuron_percentages(&neuron_data, &total_maturity);

        // Calculate rewards based on percentages
        let rewards: Vec<(NeuronId, u64)> = neuron_percentages
            .iter()
            .map(|(neuron_id, percentage)| {
                let reward = calculate_reward(percentage.clone(), reward_pool.clone());
                (neuron_id.clone(), reward)
            })
            .collect();
        
        let sum_rewards : u64 = rewards.iter().map(|(_, reward)| *reward).sum();
        let sum_rewards = BigUint::from(sum_rewards);

        assert_eq!(
            sum_rewards, reward_pool,
            "Sum of the distributed rewards should equal the initial reward pool size"
        );
    }

    #[test]
    fn test_calculate_aggregated_maturity() {
        let neuron_id_1 =
            NeuronId::new("2a9ab729b173e14cc88c6c4d7f7e9f3e7468e72fc2b49f76a6d4f5af37397f98")
                .unwrap();
        let neuron_id_2 =
            NeuronId::new("3a9ab729b173e14cc88c6c4d7f7e9f3e7468e72fc2b49f76a6d4f5af37397f97")
                .unwrap();
        let neuron_id_3 =
            NeuronId::new("4a9ab729b173e14cc88c6c4d7f7e9f3e7468e72fc2b49f76a6d4f5af37397f96")
                .unwrap();

        let neuron_list = vec![(neuron_id_1, 100), (neuron_id_2, 200), (neuron_id_3, 300)];

        assert_eq!(calculate_aggregated_maturity(&neuron_list), 600);
    }

    #[test]
    fn test_calculate_neuron_reward_percentages() {
        let neuron_id_1 =
            NeuronId::new("2a9ab729b173e14cc88c6c4d7f7e9f3e7468e72fc2b49f76a6d4f5af37397f98")
                .unwrap();
        let neuron_id_2 =
            NeuronId::new("3a9ab729b173e14cc88c6c4d7f7e9f3e7468e72fc2b49f76a6d4f5af37397f97")
                .unwrap();
        let neuron_id_3 =
            NeuronId::new("4a9ab729b173e14cc88c6c4d7f7e9f3e7468e72fc2b49f76a6d4f5af37397f96")
                .unwrap();

        let neuron_list = vec![(neuron_id_1, 100), (neuron_id_2, 200), (neuron_id_3, 300)];

        let total_maturity = calculate_aggregated_maturity(&neuron_list);

        let maturity_percentage_per_neuron =
            calculate_neuron_percentages(&neuron_list, &total_maturity);
        let expected_vals: Vec<BigUint> = vec![
            BigUint::from(16666666u64),
            BigUint::from(33333333u64),
            BigUint::from(50000000u64),
        ];

        let test_run: Vec<((NeuronId, BigUint), BigUint)> = maturity_percentage_per_neuron
            .iter()
            .zip(expected_vals.iter())
            .map(|((neuron_id, percentage), expected_val)| {
                (
                    (neuron_id.clone(), percentage.clone()),
                    expected_val.clone(),
                )
            })
            .collect();

        for ((_, percentage), expected_val) in test_run {
            assert_eq!(percentage, expected_val);
        }
    }

    #[test]
    fn test_update_neuron_maturity() {
        let neuron_id =
            NeuronId::new("2a9ab729b173e14cc88c6c4d7f7e9f3e7468e72fc2b49f76a6d4f5af37397f98")
                .unwrap();

        let mut state = RuntimeState::default();
        state.data.neuron_maturity.insert(
            neuron_id.clone(),
            NeuronInfo {
                last_synced_maturity: 200,
                accumulated_maturity: 200,
                rewarded_maturity: 0,
            },
        );
        init_state(state);
        // reward the neuron

        let rewarded_neurons = vec![neuron_id.clone()];
        let neuron_interval_maturity = vec![(neuron_id.clone(), 200)];

        mutate_state(|state| {
            update_neuron_reward(&rewarded_neurons, state, &neuron_interval_maturity);
        });

        read_state(|state| {
            let updated_neuron = state.data.neuron_maturity.get(&neuron_id).unwrap();
            assert_eq!(updated_neuron.rewarded_maturity, 200);
        })
    }
}
