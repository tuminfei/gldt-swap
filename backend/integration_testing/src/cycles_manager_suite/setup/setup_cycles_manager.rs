use crate::client::icrc1::client::transfer;
use crate::wasms::CYCLES_MANAGER;
use candid::encode_one;
use candid::Principal;
use pocket_ic::PocketIc;

pub fn setup_cycle_manager_canister(
    pic: &mut PocketIc,
    controller: Principal,
    icp_ledger_canister_id: Principal,
    init_args: cycles_manager_api_canister::init::InitArgs,
) -> Principal {
    let sns_subnet = pic.topology().get_sns().unwrap();
    let cycles_manager_canister =
        pic.create_canister_on_subnet(Some(controller.clone()), None, sns_subnet);

    let cycles_manager_wasm = CYCLES_MANAGER.clone();
    pic.add_cycles(cycles_manager_canister, 1_000_000_000_000_000);

    let _ = transfer(
        pic,
        controller,
        icp_ledger_canister_id,
        None,
        cycles_manager_canister,
        1_000_000_000_000, // 10,000 ICP
    );

    pic.set_controllers(
        cycles_manager_canister,
        Some(controller.clone()),
        vec![controller.clone()],
    )
    .unwrap();
    pic.tick();

    pic.install_canister(
        cycles_manager_canister,
        cycles_manager_wasm,
        encode_one(init_args).unwrap(),
        Some(controller.clone()),
    );

    cycles_manager_canister
}
