use candid::{ self, CandidType, Deserialize, Principal };
use ic_cdk::api::call::CallResult;
use serde::Serialize;
use icrc_ledger_types::icrc1::transfer::{ TransferArg, TransferError, BlockIndex };

type TransferResult = Result<BlockIndex, TransferError>;

pub struct SERVICE(pub Principal);
impl SERVICE {
    pub async fn icrc1_transfer(&self, arg0: TransferArg) -> CallResult<(TransferResult,)> {
        ic_cdk::call(self.0, "icrc1_transfer", (arg0,)).await
    }
}
