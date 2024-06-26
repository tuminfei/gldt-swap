use crate::model::canisters::Canisters;
use candid::{CandidType, Principal};
use canister_state_macros::canister_state;
use cycles_manager_api_canister::get_canisters_summary::CanisterMetrics;
use cycles_manager_api_canister::get_config::Response as GetConfigResponse;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use types::{CanisterId, Cycles, TimestampMillis};
use utils::env::CanisterEnv;
use utils::env::Environment;
use utils::memory::MemorySize;

canister_state!(State);

#[derive(Serialize, Deserialize)]
pub struct State {
    pub env: CanisterEnv,
    pub data: Data,
}

impl State {
    pub fn new(env: CanisterEnv, data: Data) -> State {
        State { env, data }
    }

    pub fn is_caller_governance_principal(&self) -> bool {
        self.data.authorized_principals.contains(&self.env.caller())
    }

    pub fn get_top_up_config(&self) -> GetConfigResponse {
        GetConfigResponse {
            max_top_up_amount: self.data.max_top_up_amount,
            min_cycles_balance: self.data.min_cycles_balance,
        }
    }

    pub fn metrics(&self) -> Metrics {
        Metrics {
            canister_info: CanisterInfo {
                now: self.env.now(),
                test_mode: self.env.is_test_mode(),
                memory_used: MemorySize::used(),
                cycles_balance: self.env.cycles_balance(),
            },
            authorized_principals: self.data.authorized_principals.iter().copied().collect(),
            canisters: self.data.canisters.metrics(),
            sns_root_canister: self.data.sns_root_canister,
            max_top_up_amount: self.data.max_top_up_amount,
            min_cycles_balance: self.data.min_cycles_balance,
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct Data {
    pub authorized_principals: HashSet<Principal>,
    pub canisters: Canisters,
    pub sns_root_canister: CanisterId,
    pub max_top_up_amount: Cycles,
    pub min_cycles_balance: Cycles,
}

impl Data {
    #[allow(clippy::too_many_arguments)]
    pub fn new(
        authorized_principals: Vec<Principal>,
        canisters: Vec<CanisterId>,
        sns_root_canister: CanisterId,
        max_top_up_amount: Cycles,
        min_cycles_balance: Cycles,
        now: TimestampMillis,
    ) -> Data {
        Data {
            authorized_principals: authorized_principals.into_iter().collect(),
            canisters: Canisters::new(canisters, now),
            sns_root_canister,
            max_top_up_amount,
            min_cycles_balance,
        }
    }
}

#[derive(CandidType, Serialize)]
pub struct Metrics {
    pub canister_info: CanisterInfo,
    pub authorized_principals: Vec<Principal>,
    pub canisters: Vec<CanisterMetrics>,
    pub sns_root_canister: CanisterId,
    pub max_top_up_amount: Cycles,
    pub min_cycles_balance: Cycles,
}

#[derive(CandidType, Deserialize, Serialize)]
pub struct CanisterInfo {
    pub now: TimestampMillis,
    pub test_mode: bool,
    pub memory_used: MemorySize,
    pub cycles_balance: Cycles,
}
