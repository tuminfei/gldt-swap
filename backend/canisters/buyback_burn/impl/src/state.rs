use crate::types::token_swaps::TokenSwaps;
use crate::types::{icpswap::ICPSwapConfig, ExchangeConfig, SwapClients, SwapConfig};
use buyback_burn_canister::get_config::Response as GetConfigResponse;
use candid::{CandidType, Principal};
use canister_state_macros::canister_state;
use ic_ledger_types::Tokens;
use serde::{Deserialize, Serialize};
use std::time::Duration;
use types::BuildVersion;
use types::{CanisterId, Cycles, TimestampMillis, TokenInfo};
use utils::env::{CanisterEnv, Environment};
use utils::memory::MemorySize;

canister_state!(RuntimeState);

#[derive(Serialize, Deserialize)]
pub struct RuntimeState {
    pub env: CanisterEnv,
    pub data: Data,
}

impl RuntimeState {
    pub fn new(env: CanisterEnv, data: Data) -> Self {
        RuntimeState { env, data }
    }

    pub fn is_caller_governance_principal(&self) -> bool {
        self.data.authorized_principals.contains(&self.env.caller())
    }

    pub fn get_config(&self) -> GetConfigResponse {
        GetConfigResponse {
            burn_rate: self.data.burn_config.burn_rate,
            min_icp_burn_amount: self.data.burn_config.min_burn_amount,
        }
    }

    pub fn metrics(&self) -> Metrics {
        Metrics {
            canister_info: CanisterInfo {
                test_mode: self.env.is_test_mode(),
                now: self.env.now(),
                version: self.env.version(),
                commit_hash: self.env.commit_hash().to_string(),
                memory_used: MemorySize::used(),
                cycles_balance: self.env.cycles_balance(),
            },
            authorized_principals: self.data.authorized_principals.iter().copied().collect(),
            gldgov_ledger_canister_id: self.data.gldgov_ledger_canister_id,
            burn_config: self.data.burn_config.clone(),
            // TODO: add more metrics
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct Data {
    pub authorized_principals: Vec<Principal>,
    pub gldgov_ledger_canister_id: CanisterId,
    pub swap_interval: Duration,
    pub swap_clients: SwapClients,
    pub burn_config: BurnConfig,
    pub token_swaps: TokenSwaps,
    // pub timer_jobs: TimerJobs<TimerJob, Data>,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub struct BurnConfig {
    pub burn_rate: u8,
    pub min_burn_amount: Tokens,
    pub burn_interval: Duration,
}

impl BurnConfig {
    fn new(burn_rate: u8, min_burn_amount: Tokens, burn_interval: Duration) -> Self {
        BurnConfig {
            // Check if the burn rate is valid. Otherwise set 0
            burn_rate: if burn_rate > 100 || burn_rate == 0 {
                burn_rate
            } else {
                0
            },
            min_burn_amount,
            burn_interval,
        }
    }
}

impl Data {
    pub fn new(
        authorized_principals: Vec<Principal>,
        tokens: Vec<TokenInfo>,
        gldgov_ledger_canister_id: CanisterId,
        swap_interval_in_secs: u64,
        icp_swap_canister_id: Principal,
        burn_rate: u8,
        min_burn_amount: Tokens,
        burn_interval_in_secs: u64,
    ) -> Data {
        let mut swap_clients = SwapClients::init();
        // TODO: add other tokens support
        swap_clients.add_swap_client(SwapConfig {
            swap_client_id: 0,
            input_token: TokenInfo::icp(),
            output_token: TokenInfo::gldgov(),
            exchange_config: ExchangeConfig::ICPSwap(ICPSwapConfig::new(icp_swap_canister_id)),
        });
        // NOTE: here we add all other tokens except of
        for (id, token) in tokens.iter().enumerate() {
            swap_clients.add_swap_client(SwapConfig {
                swap_client_id: (id as u128) + 1,
                input_token: TokenInfo::icp(),
                output_token: *token,
                exchange_config: ExchangeConfig::ICPSwap(ICPSwapConfig::new(icp_swap_canister_id)),
            });
        }

        Data {
            authorized_principals: authorized_principals.into_iter().collect(),
            gldgov_ledger_canister_id,
            swap_interval: Duration::from_secs(swap_interval_in_secs),
            swap_clients,
            burn_config: BurnConfig {
                burn_rate,
                min_burn_amount,
                burn_interval: Duration::from_secs(burn_interval_in_secs),
            },
            token_swaps: TokenSwaps::default(),
        }
    }
}

#[derive(CandidType, Serialize)]
pub struct Metrics {
    pub canister_info: CanisterInfo,
    pub authorized_principals: Vec<Principal>,
    pub gldgov_ledger_canister_id: CanisterId,
    pub burn_config: BurnConfig,
}

#[derive(CandidType, Deserialize, Serialize)]
pub struct CanisterInfo {
    pub now: TimestampMillis,
    pub test_mode: bool,
    pub version: BuildVersion,
    pub commit_hash: String,
    pub memory_used: MemorySize,
    pub cycles_balance: Cycles,
}
