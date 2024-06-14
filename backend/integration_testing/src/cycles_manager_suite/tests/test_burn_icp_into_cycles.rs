use crate::client::cycles_manager;
use crate::client::icrc1::client::{balance_of, transfer};
use crate::cycles_manager_suite::setup::default_test_setup;
use crate::utils::tick_n_blocks;
use ic_ledger_types::Tokens;
use std::time::Duration;

#[test]
fn icp_is_burned_into_cycles() {
    let mut test_env = default_test_setup();

    let cycles_manager_id = test_env.cycles_manager_id;

    let _ = transfer(
        &mut test_env.pic,
        test_env.controller,
        test_env.icp_ledger_canister_id,
        None,
        cycles_manager_id,
        1_000_000_000_000,
    )
    .unwrap();

    let icp_balance = balance_of(
        &test_env.pic,
        test_env.icp_ledger_canister_id,
        cycles_manager_id,
    );
    let cycles_balance = test_env.pic.cycle_balance(test_env.cycles_manager_id);

    cycles_manager::update_config(
        &mut test_env.pic,
        test_env.controller,
        cycles_manager_id,
        &cycles_manager_api_canister::update_config::Args {
            max_top_up_amount: Some((cycles_balance + 10_000_000_000_000).try_into().unwrap()),
            min_cycles_balance: None,
            icp_burn_amount: Some(Tokens::from_e8s(10_000_000_000)),
        },
    );

    test_env.pic.advance_time(Duration::from_secs(5 * 60 * 60)); // 5 hours
    tick_n_blocks(&test_env.pic, 10);

    let new_icp_balance = balance_of(
        &test_env.pic,
        test_env.icp_ledger_canister_id,
        cycles_manager_id,
    );
    let new_cycles_balance = test_env.pic.cycle_balance(test_env.cycles_manager_id);

    assert!(new_icp_balance < icp_balance);
    assert!(
        new_cycles_balance > cycles_balance,
        "{cycles_balance} {new_cycles_balance} {}",
        cycles_manager_id
    );
}
