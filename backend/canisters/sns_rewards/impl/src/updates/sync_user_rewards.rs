// use sns_governance_canister::types::ListNeuronsResponse;
use crate::jobs::distribute_rewards::run_distribution;
use ic_cdk::update;

// Only for development, remove after
#[update(hidden = true)]
async fn sync_user_rewards() {
    run_distribution()
}
