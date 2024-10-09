use crate::guards::caller_is_governance_principal;
use crate::state::{ mutate_state, read_state };
use crate::types::swap_client::SwapClient;
use crate::jobs::swap_tokens::burn_amount_per_interval;
use ic_cdk::{ query, update };
use canister_tracing_macros::trace;

#[query(guard = "caller_is_governance_principal", hidden = true)]
#[trace]
async fn recalculate_burn_amount_validate() -> Result<String, String> {
    Ok("No arguments to validate".to_string())
}

#[update(guard = "caller_is_governance_principal", hidden = true)]
pub async fn recalculate_burn_amount() {
    let swap_clients = read_state(|state| state.data.swap_clients.clone());

    for swap_client in swap_clients.iter() {
        let swap_client = swap_client.clone();
        let args = swap_client.get_config();

        let burn_amount_per_interval = burn_amount_per_interval(args.input_token).await.unwrap();
        mutate_state(|state| {
            state.data.burn_amounts.insert(args.swap_client_id, burn_amount_per_interval);
        });
    }
}
