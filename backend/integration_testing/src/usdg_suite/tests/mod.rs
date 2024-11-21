use crate::client::icrc1_icrc2_token::icrc2_approve;
use crate::client::usdg::{get_vaults_by_account, open_vault};
use crate::usdg_suite::init;
use assert_matches::assert_matches;
use candid::Nat;
use icrc_ledger_types::icrc1::account::Account;
use icrc_ledger_types_ic_main_repo::icrc1::account::Account as ICAccount;
use usdg_minter_api::updates::open_vault::{OpenVaultArg, OpenVaultSuccess};
use usdg_minter_api::{ApiFeeBucket, ApiVault};

const E8S: u64 = 100_000_000;

#[test]
fn should_open_vault() {
    let mut env = init::default_setup();

    let arg: Option<ICAccount> = None;
    let vault = get_vaults_by_account(
        &env.pic,
        env.principal_ids.user,
        env.canister_ids.usdg_minter,
        &arg,
    );
    assert!(vault.is_empty());

    icrc2_approve(
        &mut env.pic,
        env.principal_ids.user,
        env.canister_ids.gldt_ledger,
        &(icrc2_approve::Args {
            from_subaccount: None,
            spender: Account {
                owner: env.canister_ids.usdg_minter,
                subaccount: None,
            },
            amount: Nat::from(2_000 * E8S),
            expected_allowance: Some(Nat::from(0u64)),
            expires_at: None,
            fee: None,
            memo: None,
            created_at_time: None,
        }),
    );

    let open_vault_arg = OpenVaultArg {
        margin_amount: 1_000 * E8S,
        borrowed_amount: 0,
        fee_bucket: ApiFeeBucket::Low,
        maybe_subaccount: None,
    };
    let open_result = open_vault(
        &mut env.pic,
        env.principal_ids.user,
        env.canister_ids.usdg_minter,
        &open_vault_arg,
    );
    assert_matches!(
        open_result,
        Ok(OpenVaultSuccess {
            block_index: 2,
            vault_id: 0,
        })
    );

    let arg: Option<ICAccount> = None;
    let vault = get_vaults_by_account(
        &env.pic,
        env.principal_ids.user,
        env.canister_ids.usdg_minter,
        &arg,
    );
    assert_eq!(vault.len(), 1);
    assert_eq!(
        vault[0],
        ApiVault {
            vault_id: 0,
            owner: ICAccount {
                owner: env.principal_ids.user,
                subaccount: None
            },
            borrowed_amount: 0,
            margin_amount: 1_000 * E8S,
            fee_bucket: ApiFeeBucket::Low,
        }
    );
}
