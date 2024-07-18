use crate::{
    guards::caller_is_governance_principal,
    state::{read_state, RuntimeState},
};
use candid::{CandidType, Principal};
use canister_tracing_macros::trace;
use ic_cdk::{query, update};
use icrc_ledger_types::icrc1::{account::Account, transfer::TransferArg};
use ledger_utils::compute_neuron_staking_subaccount_bytes;
use serde::{Deserialize, Serialize};
use sns_governance_canister::types::{
    manage_neuron::{
        claim_or_refresh::{By, MemoAndController},
        ClaimOrRefresh, Command,
    },
    manage_neuron_response, ManageNeuron,
};
use tracing::error;
use types::CanisterId;
use utils::{env::Environment, rand::generate_rand_nonce};

#[derive(CandidType, Serialize, Deserialize, Debug)]
pub enum StakeSnsNeuronResponse {
    Success(Vec<u8>),
    InternalError(String),
}

#[query(guard = "caller_is_governance_principal", hidden = true)]
#[trace]
async fn stake_sns_neuron_validate() -> Result<String, String> {
    Ok("No arguments to validate".to_string())
}

#[update(guard = "caller_is_governance_principal")]
#[trace]
async fn stake_sns_neuron() -> StakeSnsNeuronResponse {
    match stake_sns_neuron_impl().await {
        Ok(neuron_id) => {
            // info!(neuron_id, "Created new neuron.");
            StakeSnsNeuronResponse::Success(neuron_id)
        }
        Err(error) => {
            error!(error);
            StakeSnsNeuronResponse::InternalError(error)
        }
    }
}

async fn stake_sns_neuron_impl() -> Result<Vec<u8>, String> {
    let nonce = generate_rand_nonce().await?;

    let PrepareResult {
        sns_governance_canister_id,
        sns_ledger_canister_id,
        principal,
    } = read_state(prepare)?;

    let subaccount = compute_neuron_staking_subaccount_bytes(principal, nonce);

    match icrc_ledger_canister_c2c_client::icrc1_transfer(
        sns_ledger_canister_id,
        &(TransferArg {
            from_subaccount: None,
            to: Account {
                owner: sns_governance_canister_id,
                subaccount: Some(subaccount),
            },
            fee: Some((10_000u32).into()),
            created_at_time: None,
            memo: Some(nonce.into()),
            amount: (100_000_000u32).into(), // initialised with 1 ICP, further can be added afterwards
        }),
    )
    .await
    {
        Ok(Ok(_)) => {}
        Ok(Err(error)) => {
            return Err(format!("Transfer error: {error:?}"));
        }
        Err(error) => {
            return Err(format!("Network error: {error:?}"));
        }
    }

    match sns_governance_canister_c2c_client::manage_neuron(
        sns_governance_canister_id,
        &(ManageNeuron {
            // TODO: fix
            subaccount: vec![],
            command: Some(Command::ClaimOrRefresh(ClaimOrRefresh {
                by: Some(By::MemoAndController(MemoAndController {
                    controller: Some(principal),
                    memo: nonce,
                })),
            })),
        }),
    )
    .await
    {
        Ok(response) => match response.command {
            Some(manage_neuron_response::Command::ClaimOrRefresh(c)) => {
                let neuron_id = c.refreshed_neuron_id.unwrap().id;
                Ok(neuron_id)
            }
            // FIXME: add here debug
            _response => {
                // return Err(format!("Governance error: {:?}", response.unwrap()));
                Err("manage_neuron error".to_string())
            }
        },
        Err(error) => Err(format!("Network error: {error:?}")),
    }
}

struct PrepareResult {
    sns_governance_canister_id: CanisterId,
    sns_ledger_canister_id: CanisterId,
    principal: Principal,
}

fn prepare(state: &RuntimeState) -> Result<PrepareResult, String> {
    Ok(PrepareResult {
        sns_governance_canister_id: state
            .data
            .neuron_managers
            .ogy
            .ogy_sns_governance_canister_id,
        sns_ledger_canister_id: state.data.neuron_managers.ogy.ogy_sns_ledger_canister_id,
        principal: state.env.canister_id(),
    })
}
