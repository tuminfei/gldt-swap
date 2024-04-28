use std::collections::HashMap;

use crate::{ guards::caller_is_governance_principal, state::mutate_state };
use candid::Nat;
use canister_tracing_macros::trace;
use ic_cdk::{ query, update };

use sns_rewards_api_canister::set_reserve_transfer_amounts_validate::{ Args, Response };
use types::TokenSymbol;

#[query(guard = "caller_is_governance_principal", hidden = true)]
#[trace]
pub async fn set_reserve_transfer_amounts_validate(args: Args) -> Response {
    match validate_set_reserve_transfer_amounts_payload(&args.transfer_amounts) {
        Ok(_) => {}
        Err(e) => {
            return Response::Error(e);
        }
    }
    match serde_json::to_string_pretty(&args) {
        Ok(json) => Response::Success(json),
        Err(e) => Response::Error(format!("invalid payload : {e:?}")),
    }
}

pub fn validate_set_reserve_transfer_amounts_payload(
    args: &HashMap<TokenSymbol, Nat>
) -> Result<(), String> {
    if args.len() < (1 as usize) {
        return Err("Should contain at least 1 token symbol and amount to update".to_string());
    }

    for (token_symbol, amount) in args {
        // Check the amount is above 0.
        if amount == &Nat::from(0u64) {
            return Err(
                format!("ERROR : The amount for token : {:?} must be more than 0", token_symbol)
            );
        }
    }
    Ok(())
}
