// use sns_governance_canister::types::ListNeuronsResponse;
use crate::jobs::process_neurons::fetch_neuron_data;
use ic_cdk::update;

#[update]
async fn sync_neurons() -> u64 {
    match fetch_neuron_data().await {
        Ok(res) => res,
        Err(_) => 0,
    }
}
