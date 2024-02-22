use crate::ecdsa::CanisterEcdsaRequest;
use crate::{ ecdsa::make_canister_call_via_ecdsa, state::read_state };
use crate::guards::caller_is_governance_principal;
use candid::CandidType;
use canister_tracing_macros::trace;
use ic_cdk::{ query, update };
use nns_governance_canister::types::manage_neuron::Command;
use nns_governance_canister::types::ManageNeuron;
use serde::{ Deserialize, Serialize };

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct ManageNnsNeuronRequest {
    pub neuron_id: u64,
    pub command: Command,
}

#[derive(CandidType, Serialize, Deserialize, Debug)]
pub enum ManageNnsNeuronResponse {
    Success(String),
    InternalError(String),
}

#[query(guard = "caller_is_governance_principal", hidden = true)]
#[trace]
async fn manage_nns_neuron_validate(args: ManageNnsNeuronRequest) -> Result<String, String> {
    serde_json::to_string_pretty(&args).map_err(|_| "invalid payload".to_string())
}

#[update(guard = "caller_is_governance_principal")]
#[trace]
async fn manage_nns_neuron(args: ManageNnsNeuronRequest) -> ManageNnsNeuronResponse {
    manage_nns_neuron_impl(args.neuron_id, args.command).await
}

pub(crate) async fn manage_nns_neuron_impl(
    neuron_id: u64,
    command: Command
) -> ManageNnsNeuronResponse {
    let nonce: Vec<u8>;
    match ic_cdk::api::management_canister::main::raw_rand().await {
        Ok((rand_bytes,)) => {
            nonce = rand_bytes;
        }
        Err(_) => {
            return ManageNnsNeuronResponse::InternalError(
                "Unable to initialise nonce.".to_string()
            );
        }
    }

    let request: CanisterEcdsaRequest;
    match
        read_state(|state| {
            state.prepare_canister_call_via_ecdsa(
                state.data.nns_governance_canister_id,
                "manage_neuron".to_string(),
                ManageNeuron::new(neuron_id, command),
                Some(nonce)
            )
        })
    {
        Ok(val) => {
            request = val;
        }
        Err(err) => {
            return ManageNnsNeuronResponse::InternalError(err);
        }
    }

    match make_canister_call_via_ecdsa(request).await {
        Ok(response) => ManageNnsNeuronResponse::Success(response),
        Err(error) => ManageNnsNeuronResponse::InternalError(error),
    }
}
