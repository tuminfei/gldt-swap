use std::collections::HashMap;

use candid::{ encode_one, Nat, Principal };
use icrc_ledger_canister::init::{ ArchiveOptions as ArchiveOptionsIcrc, InitArgs, LedgerArgument };
use icrc_ledger_types::icrc1::account::Account;
use pocket_ic::PocketIc;

use crate::wasms;

pub fn setup_ledgers(
    pic: &PocketIc,
    controller: Principal,
    token_symbols: Vec<String>,
    initial_ledger_accounts: Vec<(Account, Nat)>
) -> HashMap<String, Principal> {
    let app_subnet_id = pic.topology().get_app_subnets()[0];
    let mut token_ledgers: HashMap<String, Principal> = HashMap::new();
    let icrc1_ledger_wasm = wasms::IC_ICRC1_LEDGER.clone();

    for symbol in token_symbols {
        let canister_id = pic.create_canister_on_subnet(None, None, app_subnet_id);
        pic.add_cycles(canister_id, 10_000_000_000_000);
        pic.install_canister(
            canister_id,
            icrc1_ledger_wasm.clone(),
            encode_one(
                generate_ledger_canister_init_args(
                    &symbol,
                    controller,
                    initial_ledger_accounts.clone()
                )
            ).unwrap(),
            None
        );
        let lower_case_symbol = symbol.to_lowercase();
        token_ledgers.insert(format!("{lower_case_symbol}_ledger_canister_id"), canister_id);
    }

    token_ledgers
}

pub fn generate_ledger_canister_init_args(
    token: &str,
    controller: Principal,
    initial_ledger_accounts: Vec<(Account, Nat)>
) -> LedgerArgument {
    LedgerArgument::Init(InitArgs {
        minting_account: Account::from(controller),
        initial_balances: initial_ledger_accounts,
        transfer_fee: Nat::from(10000u64),
        token_name: token.into(),
        token_symbol: token.into(),
        metadata: Vec::new(),
        archive_options: ArchiveOptionsIcrc {
            trigger_threshold: 1000,
            num_blocks_to_archive: 1000,
            controller_id: controller,
        },
    })
}
