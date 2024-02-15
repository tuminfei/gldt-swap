use candid::{ CandidType, Principal };
use ic_cdk_macros::init;
use serde::Deserialize;
use tracing::info;

use crate::state::RuntimeState;

use super::init_canister;

#[derive(Deserialize, CandidType)]
pub struct Args {
    sns_governance_canister: Principal,
}

#[init]
fn init(args: Args) {
    let runtime_state = RuntimeState::new(args.sns_governance_canister);

    init_canister(runtime_state);

    info!("Init complete.")
}
