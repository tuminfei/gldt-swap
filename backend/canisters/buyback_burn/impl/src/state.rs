use crate::types::token_swaps::TokenSwaps;
use crate::types::token_swaps::TokenSwapsMetrics;
use crate::types::SwapClients;
use buyback_burn_api::get_config::Response as GetConfigResponse;
use buyback_burn_api::init::TokenAndPool;
use candid::{CandidType, Principal};
use canister_state_macros::canister_state;
use ic_ledger_types::Tokens;
use serde::{Deserialize, Serialize};
use std::time::Duration;
use tracing::error;
use types::BuildVersion;
use types::{Cycles, TimestampMillis, TokenInfo};
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
            min_burn_amount: self.data.burn_config.min_burn_amount,
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
            authorized_principals: self.data.authorized_principals.to_vec(),
            gldgov_token_info: self.data.gldgov_token_info,
            burn_config: self.data.burn_config.clone(),
            token_swaps_metrics: self.data.token_swaps.get_metrics(),
            buyback_interval_in_secs: self.data.buyback_interval.as_secs(),
            icp_swap_canister_id: self.data.icp_swap_canister_id,
            swap_clients: self.data.swap_clients.clone(),
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct Data {
    pub authorized_principals: Vec<Principal>,
    pub gldgov_token_info: TokenInfo,
    pub icp_swap_canister_id: Principal,
    pub buyback_interval: Duration,
    pub swap_clients: SwapClients,
    pub burn_config: BurnConfig,
    pub token_swaps: TokenSwaps,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub struct BurnConfig {
    pub burn_rate: u8,
    pub min_burn_amount: Tokens,
}

impl BurnConfig {
    pub fn new(burn_rate: u8, min_burn_amount: Tokens) -> Self {
        BurnConfig {
            // Check if the burn rate is valid. Otherwise set 0
            burn_rate: if burn_rate > 100 {
                error!("Burn rate must be between 0 and 100");
                0
            } else {
                burn_rate
            },
            min_burn_amount,
        }
    }

    pub fn validate_burn_rate(&self) -> bool {
        self.burn_rate > 0 && self.burn_rate <= 100
    }
}

impl Data {
    #[allow(clippy::too_many_arguments)]
    pub fn new(
        authorized_principals: Vec<Principal>,
        tokens: Vec<TokenAndPool>,
        gldgov_token_info: TokenInfo,
        buyback_interval_in_secs: u64,
        icp_swap_canister_id: Principal,
        burn_rate: u8,
        min_burn_amount: Tokens,
    ) -> Self {
        let mut swap_clients = SwapClients::init();

        for token in tokens.iter() {
            swap_clients.add_swap_client(token.token, gldgov_token_info, token.swap_pool_id);
        }

        Self {
            authorized_principals: authorized_principals.into_iter().collect(),
            gldgov_token_info,
            buyback_interval: Duration::from_secs(buyback_interval_in_secs),
            swap_clients,
            icp_swap_canister_id,
            burn_config: BurnConfig::new(burn_rate, min_burn_amount),
            token_swaps: TokenSwaps::default(),
        }
    }
}

#[derive(CandidType, Serialize)]
pub struct Metrics {
    pub canister_info: CanisterInfo,
    pub authorized_principals: Vec<Principal>,
    pub gldgov_token_info: TokenInfo,
    pub buyback_interval_in_secs: u64,
    pub icp_swap_canister_id: Principal,
    pub burn_config: BurnConfig,
    pub token_swaps_metrics: TokenSwapsMetrics,
    pub swap_clients: SwapClients,
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

#[cfg(test)]
mod tests {
    use super::*;

    // Get the 100% of the min_burn_amount to know what the balance should be after swap (to have enough funds)
    fn get_min_after_swap_amount(burn_config: BurnConfig) -> u128 {
        let min_burn_amount = burn_config.min_burn_amount.e8s() as u128;
        (min_burn_amount * 100) / (burn_config.burn_rate as u128)
    }

    #[test]
    fn test_validate_burn_rate() {
        let valid_burn_config = BurnConfig::new(50, Tokens::from_e8s(100));
        let invalid_burn_config_zero = BurnConfig::new(0, Tokens::from_e8s(100));
        let invalid_burn_config_above_100 = BurnConfig::new(150, Tokens::from_e8s(100));

        assert!(valid_burn_config.validate_burn_rate());
        assert!(!invalid_burn_config_zero.validate_burn_rate());
        assert!(!invalid_burn_config_above_100.validate_burn_rate());
    }

    #[test]
    fn test_get_after_swap_amount() {
        let burn_config = BurnConfig::new(50, Tokens::from_e8s(100));
        assert_eq!(get_min_after_swap_amount(burn_config), 200);

        let burn_config = BurnConfig::new(90, Tokens::from_e8s(900));
        assert_eq!(get_min_after_swap_amount(burn_config), 1000);

        let burn_config = BurnConfig::new(1, Tokens::from_e8s(1));
        assert_eq!(get_min_after_swap_amount(burn_config), 100);

        let burn_config = BurnConfig::new(33, Tokens::from_e8s(100));
        assert_eq!(get_min_after_swap_amount(burn_config), 303);
    }
}
