use std::collections::HashSet;

use candid::Principal;
use canister_time::timestamp_millis;
use futures::future::join_all;
use gldt_swap_common::{ nft::NftID, swap::{ ServiceStatus, SwapId, SwapInfo } };
use gldt_swap_api_canister::swap_nft_for_tokens::{ NftInvalidError, SwapNftForTokensErrors };

use ic_cdk::update;
use tracing::debug;
use utils::env::Environment;
use crate::{
    service_status::check_service_status,
    state::read_state,
    swap::swap_builder::SwapBuilder,
    utils::trace,
};
pub use gldt_swap_api_canister::swap_nft_for_tokens::{
    Args as SwapNftForTokensArgs,
    Response as SwapNftForTokensResponse,
};
use crate::swap::swap_info::SwapInfoTrait;

#[update]
async fn swap_nft_for_tokens(args: SwapNftForTokensArgs) -> SwapNftForTokensResponse {
    swap_nft_for_tokens_impl(args).await
}

pub async fn swap_nft_for_tokens_impl(args: SwapNftForTokensArgs) -> SwapNftForTokensResponse {
    // check we have capacity to add new swaps
    if let ServiceStatus::Down(reason) = check_service_status().await {
        debug!("SERVICE Status :: down :: {reason:?}");
        return Err(SwapNftForTokensErrors::ServiceDown(reason));
    }

    if args.len() > 100 {
        return Err(
            SwapNftForTokensErrors::Limit(
                format!(
                    "You may only swap 100 in any given request. batch your calls in batches of 100"
                )
            )
        );
    }

    // let new_swap = create_forward_swap(&args);
    let user_principal = read_state(|s| s.env.caller());
    let mut swaps_to_insert: Vec<SwapInfo> = vec![];
    let mut swap_ids_to_return: Vec<SwapId> = vec![];
    let mut valid_nft_ids: Vec<NftID> = vec![];
    let mut invalid_nft_ids: Vec<(NftID, Vec<NftInvalidError>)> = vec![];
    let caller = read_state(|s| s.env.caller());

    //  check there are no duplicates
    if args.is_empty() {
        return Ok(vec![]);
    }

    if contains_duplicates(&args) {
        return Err(
            SwapNftForTokensErrors::ContainsDuplicates(
                format!("You can't supply the same NFT ID to be swapped twice!")
            )
        );
    }

    if caller == Principal::anonymous() {
        return Err(
            SwapNftForTokensErrors::CantBeAnoymous(
                format!("You can't use an annoymous principal to swap")
            )
        );
    }

    if !contains_valid_nft_canisters(&args) {
        let nft_canisters: Vec<Principal> = read_state(|s|
            s.data.gldnft_canisters
                .iter()
                .map(|(prin, ..)| prin.clone())
                .collect()
        );
        return Err(
            SwapNftForTokensErrors::ContainsInvalidNftCanister(
                format!(
                    "You may not specify an unknown GLD NFT canister. Check that all your intended swaps contain a valid NFT canister principal that match one of these: \n {nft_canisters:?}"
                )
            )
        );
    }

    let mut swap_chunks = args.chunks(10);
    let now_time = timestamp_millis();

    while let Some(batch) = swap_chunks.next() {
        let init_futures = batch
            .iter()
            .map(|(nft_id, nft_canister_id)| {
                SwapBuilder::forward().init(
                    nft_id.clone(),
                    nft_canister_id.clone(),
                    now_time,
                    user_principal
                )
            });

        let results = join_all(init_futures).await;
        for res in results {
            match res {
                Ok(new_swap) => {
                    swaps_to_insert.push(new_swap.clone());
                    valid_nft_ids.push(new_swap.get_nft_id());
                }
                Err((swap_info, errors)) => {
                    invalid_nft_ids.push((swap_info.get_nft_id(), errors));
                }
            }
        }
    }

    if invalid_nft_ids.len() > 0 {
        trace("///// returning here 1");
        return Err(SwapNftForTokensErrors::NftValidationErrors((valid_nft_ids, invalid_nft_ids)));
    } else {
        let mut insert_errors: Vec<(NftID, Vec<NftInvalidError>)> = vec![];
        let mut valid_nfts: Vec<NftID> = vec![];
        for swap in &swaps_to_insert {
            if let SwapInfo::Forward(details) = swap {
                match swap.insert_swap().await {
                    Ok(swap_id) => {
                        swap_ids_to_return.push(swap_id.clone());
                        valid_nfts.push(swap_id.0);
                    }
                    Err(_) => {
                        // we shouldn't get here because we already check for locked nfts in the forward().init()
                        debug!(
                            "FAILED to insert a swap with NFT id {:?}. This NFT is already locked. this should've already been checked in the validation",
                            details.nft_id.clone()
                        );
                        insert_errors.push((
                            swap.get_nft_id(),
                            vec![NftInvalidError::AlreadyLocked],
                        ));
                    }
                }
            }
        }
        if insert_errors.len() > 0 {
            trace("///// returning here 2");
            return Err(SwapNftForTokensErrors::NftValidationErrors((valid_nfts, insert_errors)));
        } else {
            return Ok(swap_ids_to_return);
        }
    }
}

fn contains_duplicates(args: &SwapNftForTokensArgs) -> bool {
    let mut seen_nft_ids = HashSet::new();

    for (nft_id, _) in args {
        if !seen_nft_ids.insert(nft_id) {
            return true; // Duplicate found
        }
    }

    false
}

fn contains_valid_nft_canisters(args: &SwapNftForTokensArgs) -> bool {
    let nft_canisters: Vec<Principal> = read_state(|s|
        s.data.gldnft_canisters
            .iter()
            .map(|(prin, ..)| prin.clone())
            .collect()
    );
    // if any of the intended swaps don't match one of the weights return false
    args.iter().all(|(_, nft_canister)| nft_canisters.contains(&nft_canister))
}
