use candid::{ CandidType, Principal };
use ic_cdk_macros::query;
use sns_governance_canister::types::NeuronId;

use crate::state::{ read_state, NeuronInfo };

#[derive(CandidType)]
pub struct GetNeuronResponse {
    id: NeuronId,
    owner: Principal,
    info: NeuronInfo,
}

#[query]
fn get_neurons_of_principal(principal: Principal) -> Vec<GetNeuronResponse> {
    read_state(|state| {
        state.principal_neurons
            .get(&principal)
            .map(|neuron_ids| {
                neuron_ids
                    .iter()
                    .filter_map(|id| {
                        state.neuron_maturity.get(id).map(|info| GetNeuronResponse {
                            id: id.clone(),
                            owner: principal,
                            info: info.clone(),
                        })
                    })
                    .collect()
            })
            .unwrap_or_default()
    })
}
