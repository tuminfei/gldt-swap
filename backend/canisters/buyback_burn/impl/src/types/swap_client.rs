use async_trait::async_trait;
use ic_cdk::api::call::CallResult;
use icrc_ledger_types::icrc1::account::Account;
use crate::types::SwapConfig;
use types::CanisterId;

#[async_trait]
#[typetag::serde(tag = "type")]
pub trait SwapClient {
    fn get_config(&self) -> SwapConfig;
    fn clone_box(&self) -> Box<dyn SwapClient>;
    fn set_swap_canister_id(&mut self, swap_canister_id: CanisterId);
    async fn get_quote(
        &self,
        amount: u128,
        min_amount_out: u128
    ) -> CallResult<Result<u128, String>>;
    async fn deposit_account(&self) -> CallResult<Account>;
    async fn deposit(&self, amount: u128) -> CallResult<()>;
    async fn swap(&self, amount: u128, min_amount_out: u128) -> CallResult<Result<u128, String>>;
    async fn withdraw(&self, successful_swap: bool, amount: u128) -> CallResult<u128>;
}

//  pub async fn quote(&self, arg0: SwapArgs) -> Result<(Result_,)> {
// ic_cdk::call(self.0, "quote", (arg0,)).await
//   }

impl Clone for Box<dyn SwapClient> {
    fn clone(&self) -> Box<dyn SwapClient> {
        self.clone_box()
    }
}
