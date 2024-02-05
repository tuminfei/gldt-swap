use ic_cdk_macros::post_upgrade;
use ic_cdk::{ api, storage };

use super::init_canister;

#[post_upgrade]
fn post_upgrade() {
    match storage::stable_restore() {
        Ok((runtime_state,)) => { init_canister(runtime_state) }
        Err(msg) => {
            // Traps in pre_upgrade or post_upgrade will cause the upgrade to be reverted
            // and the state to be restored.
            api::trap(
                &format!("Failed to restore from stable memory. Reverting upgrade. Message: {msg}")
            );
        }
    }
}
