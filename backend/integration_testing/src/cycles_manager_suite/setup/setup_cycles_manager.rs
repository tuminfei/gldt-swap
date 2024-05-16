use crate::wasms::CYCLES_MANAGER;
use candid::encode_one;
use candid::{CandidType, Principal};
use pocket_ic::PocketIc;
use serde::Deserialize;

#[derive(Deserialize, CandidType)]
pub struct Args {
    test_mode: bool,
    icp_ledger_canister_id: Principal,
    sns_ledger_canister_id: Principal,
    ogy_ledger_canister_id: Principal,
    sns_gov_canister_id: Principal,
}

pub fn setup_cycle_manager_canister(
    pic: &mut PocketIc,
    controller: &Principal,
    init_args: cycles_manager_canister::init::Args,
) -> Principal {
    let sns_subnet = pic.topology().get_sns().unwrap();
    let cycles_manager_canister =
        pic.create_canister_on_subnet(Some(controller.clone()), None, sns_subnet);

    let rewards_wasm = CYCLES_MANAGER.clone();
    pic.add_cycles(cycles_manager_canister, 100_000_000_000_000_000);
    pic.set_controllers(
        cycles_manager_canister,
        Some(controller.clone()),
        vec![controller.clone()],
    )
    .unwrap();
    pic.tick();

    pic.install_canister(
        cycles_manager_canister,
        rewards_wasm,
        encode_one(init_args).unwrap(),
        Some(controller.clone()),
    );

    cycles_manager_canister
}
