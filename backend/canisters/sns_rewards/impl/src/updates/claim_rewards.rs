use candid::{ CandidType, Nat, Principal };
use ic_cdk::{ caller, update };
use ic_ledger_types::Subaccount;
use icrc_ledger_types::icrc1::account::Account;
use serde::{ Deserialize, Serialize };
use sns_governance_canister::types::{ Neuron, NeuronId };
use tracing::{ debug, error };
use types::{ TokenInfo, TokenSymbol };
use sns_governance_canister::types::get_neuron_response::Result::{
    Neuron as NeuronResponse,
    Error as NeuronErrorResponse,
};
use utils::consts::SNS_GOVERNANCE_CANISTER_ID_STAGING;
use crate::{ state::{ mutate_state, read_state, RuntimeState }, utils::transfer_token };

#[derive(CandidType, Serialize, Deserialize, Debug)]
pub enum UserClaimErrorResponse {
    NeuronHotKeyAbsent, // No hotkeys found for neuron
    NeuronHotKeyInvalid, // Hotkeys exist but they dont match the caller's principal
    NeuronOwnerInvalid(Option<Principal>), // Neuron has a hotkey owned by a different caller
    NeuronNotClaimed, // Nobody has claimed this neuron yet.
    NeuronDoesNotExist,
    InternalError(String),
    TransferFailed(String),
    TokenSymbolInvalid(String),
}

use UserClaimErrorResponse::*;

// TODO - frontend calls to these update calls will have to pass in something like 12505661337902198044. will we have to provide a convenient way for FE to convert to NeuronId?
#[update]
async fn add_neuron(neuron_id: NeuronId) -> Result<NeuronId, UserClaimErrorResponse> {
    add_neuron_impl(neuron_id, caller()).await
}

#[update]
async fn remove_neuron(neuron_id: NeuronId) -> Result<NeuronId, UserClaimErrorResponse> {
    remove_neuron_impl(neuron_id, caller()).await
}

#[update]
async fn claim_reward(neuron_id: NeuronId, token: String) -> Result<bool, UserClaimErrorResponse> {
    claim_reward_impl(neuron_id, token, caller()).await
}

pub async fn add_neuron_impl(
    neuron_id: NeuronId,
    caller: Principal
) -> Result<NeuronId, UserClaimErrorResponse> {
    let neuron = fetch_neuron_data_by_id(&neuron_id).await?;
    // check the neuron contains the hotkey of the callers principal
    authenticate_by_hotkey(&neuron, &caller)?;
    let owner = read_state(|s| s.data.neuron_owners.get_owner_of_neuron_id(&neuron_id));
    match owner {
        Some(owner_principal) => {
            if owner_principal == caller {
                // neuron is owned by caller according to our state and has a valid hotkey - nothing to do
                return Ok(neuron_id);
            } else {
                // hotkey is valid but neuron id is owned already so we return the principal that owns it
                return Err(NeuronOwnerInvalid(Some(owner_principal)));
            }
        }
        None => {
            // we have no record in our state of the neuron_id being owned and they passed hotkey validation
            mutate_state(|s| s.data.neuron_owners.add(&neuron_id, caller));
            Ok(neuron_id)
        }
    }
}

pub async fn remove_neuron_impl(
    neuron_id: NeuronId,
    caller: Principal
) -> Result<NeuronId, UserClaimErrorResponse> {
    let neuron = fetch_neuron_data_by_id(&neuron_id).await?;
    // check the neuron contains the hotkey of the callers principal
    authenticate_by_hotkey(&neuron, &caller)?;
    let owner = read_state(|s| s.data.neuron_owners.get_owner_of_neuron_id(&neuron_id));
    match owner {
        Some(owner_principal) => {
            if owner_principal == caller {
                // neuron is owned by caller according to our state and has a valid hotkey
                mutate_state(|s| s.data.neuron_owners.remove(&neuron_id, caller));
                return Ok(neuron_id);
            } else {
                return Err(NeuronOwnerInvalid(Some(owner_principal)));
            }
        }
        None => { Err(NeuronNotClaimed) }
    }
}

pub async fn claim_reward_impl(
    neuron_id: NeuronId,
    token: String,
    caller: Principal
) -> Result<bool, UserClaimErrorResponse> {
    // verify the token symbol is valid
    let token_symbol = TokenSymbol::parse(&token).map_err(|err|
        TokenSymbolInvalid(
            format!("token of type {:?} is not a valid token symbol. error: {:?}", token, err)
        )
    )?;

    // get the token meta information associated with the valid token
    let token_info = read_state(|s: &RuntimeState|
        s.data.tokens.get(&token_symbol).copied()
    ).ok_or_else(||
        TokenSymbolInvalid(format!("Token info for type {:?} not found in state", token_symbol))
    )?;

    let neuron = fetch_neuron_data_by_id(&neuron_id).await?;

    // check the neuron contains the hotkey of the callers principal
    authenticate_by_hotkey(&neuron, &caller)?;
    let owner = read_state(|s| s.data.neuron_owners.get_owner_of_neuron_id(&neuron_id));
    match owner {
        Some(owner_principal) => {
            if owner_principal == caller {
                // neuron is owned by caller according to our state and has a valid hotkey
                return transfer_rewards(&neuron_id, owner_principal, &token_info).await;
            } else {
                return Err(NeuronOwnerInvalid(Some(owner_principal)));
            }
        }
        None => { Err(NeuronNotClaimed) }
    }
}

pub async fn fetch_neuron_data_by_id(
    neuron_id: &NeuronId
) -> Result<Neuron, UserClaimErrorResponse> {
    let mut canister_id = read_state(|state| state.data.sns_governance_canister);
    let is_test_mode = read_state(|s| s.env.is_test_mode());
    if is_test_mode {
        canister_id = SNS_GOVERNANCE_CANISTER_ID_STAGING;
    }
    let args = sns_governance_canister::get_neuron::Args {
        neuron_id: Some(neuron_id.clone()),
    };
    match sns_governance_canister_c2c_client::get_neuron(canister_id, &args).await {
        Ok(neuron_data) => {
            match neuron_data.result {
                Some(neuron) => {
                    match neuron {
                        NeuronResponse(n) => Ok(n),
                        NeuronErrorResponse(_) => Err(NeuronDoesNotExist),
                    }
                }
                None => Err(NeuronDoesNotExist),
            }
        }
        Err(e) => {
            debug!(
                "Error fetching neuron with id : {:?}, error code : {:?}, message : {:?}",
                neuron_id,
                e.0,
                e.1
            );
            Err(InternalError(e.1))
        }
    }
}

pub fn authenticate_by_hotkey(
    neuron_data: &Neuron,
    caller: &Principal
) -> Result<bool, UserClaimErrorResponse> {
    // first is always the nns owner principal so if less than or equal to 1 then no hotkeys have been added.
    if neuron_data.permissions.len() <= 1 {
        return Err(NeuronHotKeyAbsent);
    }

    // Check if any of the permission principals contain an entry that matches the caller principal
    let matching_caller_hotkey = neuron_data.permissions
        .iter()
        .skip(1)
        .filter(|permission| permission.principal.as_ref() == Some(caller))
        .count();

    if matching_caller_hotkey >= 1 {
        Ok(true)
    } else {
        Err(NeuronHotKeyInvalid)
    }
}

pub async fn transfer_rewards(
    neuron_id: &NeuronId,
    user_id: Principal,
    token_info: &TokenInfo
) -> Result<bool, UserClaimErrorResponse> {
    // get the balance of the sub account ( NeuronId is the sub account id )
    let balance_of_neuron_id = fetch_balance_of_neuron_id(token_info.ledger_id, neuron_id).await?;
    let amount_to_transfer = balance_of_neuron_id - token_info.fee;
    if amount_to_transfer == Nat::from(0u64) {
        return Err(TransferFailed("no rewards to claim".to_string()));
    }
    let neuron_sub_account: [u8; 32] = neuron_id.clone().into();
    let neuron_sub_account = Subaccount(neuron_sub_account);

    let user_account = Account {
        owner: user_id,
        subaccount: None,
    };
    // transfer the tokens to the claimer
    let transfer = transfer_token(
        neuron_sub_account,
        user_account,
        token_info.ledger_id,
        amount_to_transfer
    ).await;

    match transfer {
        Ok(_) => { Ok(true) }
        Err(e) => { Err(TransferFailed(e)) }
    }
}

async fn fetch_balance_of_neuron_id(
    ledger_canister_id: Principal,
    neuron_id: &NeuronId
) -> Result<Nat, UserClaimErrorResponse> {
    match
        icrc_ledger_canister_c2c_client::icrc1_balance_of(
            ledger_canister_id,
            &(Account {
                owner: ic_cdk::api::id(),
                subaccount: Some(neuron_id.into()),
            })
        ).await
    {
        Ok(t) => { Ok(t) }
        Err(e) => {
            error!("Fail - to neuron rewards: {:?}", e.1);
            Err(InternalError(e.1))
        }
    }
}
