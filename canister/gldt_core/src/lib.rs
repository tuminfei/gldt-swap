//! GLDT is a digital token 100% backed by physical gold in the form
//! of NFTs in a ratio of 1 gram of gold NFTs equals 100 GLDT. The
//! NFTs have their ownership registered to this canister, which is
//! used to convert NFTs to GLDT and back.  The GLDT canister
//! purchases NFTs by minting tokens and sells NFTs against the
//! burning of tokens.
//!
//! The code of this canister is generic in the sense that it is not
//! tied to any particular type of NFT, except for the notion of
//! 'grams' which is tied to tokens in a ratio of one gram equals 100
//! tokens. Thus, in principle, the same code can be used for NFT of
//! any physical commodity measured in grams. The cansiter could
//! generalized further by replacing grams by some generic quantity,
//! but doing so right now (2023) seems to have little benefit and only
//! hamper the readability of the code.
//!
//! The GLDT canister collaborates with the canisters holding gold
//! NFTs as well as the GLDT ledger, which an instance of a standard
//! IC ledger.
//!
//!
//! ```
//! NFT                  GLDT            Ledger
//!  |                    |                |
//!  | offer request (1)  |                |
//!  +------------------->|                |
//!  |                    |   mint (2)     |
//!  |                    +--------------->|
//!  |                    |                |
//!  |                    |<---------------+
//!  |                    |                |
//!  |<-------------------+                +---+
//!  |        offer       |                |   | transact (3b)
//!  |                    |                |<--+
//!  +---+                |                |
//!  |   | accept (3a)    |                |
//!  |<--+                |                |
//!  |                    |                |
//! ```
//!
//! The lifecycle of one NFT is as follows.
//!
//! * Offer request made (1), i.e., an NFT canister requests an offer for
//! a particular NFT.
//!
//! * An offer is made by  minting (2) tokens to an escrow account of NFT
//! canister.
//!
//! * The offer is accepted (3a) on the NFT canister: the NFT now belongs
//! to GLDT canister and the minted tokens are in
//! circulation (3b). Alternatively, the offer is rejected and the tokens
//! are burned.
//!
//! * The view of the ownership of NFT from the NFT canister and from
//! the GLDT canister is periodically audited (to be implemented).
//!
//! * The GLDT canister releases an NFT against proof that the
//! corresponding number of tokens have been burned (to be
//! implemented).
//!
//! The GLDT ledger uses the account ID of the gldt cansiter (an
//! instance of this code) as its 'minting account'.  Computed as
//! `$(dfx ledger account-id --of-canister gldt)`. The GLDT canister
//! also needs to point to the ledger canister as given by `$(dfx
//! canister id ledger)`.

use candid::{ CandidType, Deserialize, Principal, Nat };
use canistergeek_ic_rust::logger::log_message;
use ic_cdk::{ api, storage };
use ic_cdk_macros::{ init, query, update, export_candid };
// use ic_ledger_types::Block;
// use ic_ledger_types::{AccountIdentifier, Memo, Subaccount, Tokens};
// use ic_ledger_types::ic;
use icrc_ledger_types::icrc1::{
    account::{ Account, Subaccount },
    transfer::{ BlockIndex, Memo, NumTokens, TransferArg, TransferError },
};
use serde::Serialize;
use std::cell::RefCell;
use std::collections::btree_map;
use std::collections::BTreeMap;
use std::hash::Hash;

mod declarations;
use declarations::gld_nft::{
    self,
    ManageSaleRequest,
    BidRequest,
    SaleStatusShared,
    Account as OrigynAccount,
    SubAccountInfo,
    EscrowReceipt,
    TokenSpec,
    ICTokenSpec,
    SaleStatusShared_sale_type,
    PricingConfigShared__1,
    AskFeature,
    ManageSaleResult,
    ICTokenSpec_standard,
    ManageSaleResponse,
    BidResponse_txn_type,
};
use declarations::icrc1;

/// Constants
pub const GLDT_SUBDIVIDABLE_BY: u64 = 100_000_000;
pub const GLDT_PRICE_RATIO: u8 = 100;
pub const GLDT_TX_FEE: u64 = 10_000;

/// The configuration points to the canisters that this canister
/// collaborates with, viz., the GLDT ledger canister and the NFT
/// canisters.
#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash, PartialEq)]
pub struct Conf {
    /// The canister ID of the GLDT ledger canister.
    gldt_ledger_canister_id: Principal,
    /// Canister IDs of the Origyn NFT canisters that manages gold NFTs.
    gld_nft_canister_ids: Vec<(Principal, NftCanisterConf)>,
}

/// Configuration information for a single NFT canister.
#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash, PartialEq)]
pub struct NftCanisterConf {
    /// The size in grams of the physical NFTs managed by this
    /// canister.  Note that the max value of u16 in grams is over
    /// 65kg. The largest gold bars are 400oz (~11kg) and the largest
    /// silver bars are 1000oz (~31kg).
    grams: NftWeight,
}

impl Default for Conf {
    fn default() -> Self {
        Conf {
            gldt_ledger_canister_id: Principal::anonymous(),
            gld_nft_canister_ids: Vec::new(),
        }
    }
}

/// An NFT is identified by a string.
type NftId = String;

/// An NFT has a certain weight <65535
type NftWeight = u16;

/// Record of information about an NFT for which GLDT has been burned.
#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash, PartialEq)]
pub struct GldtBurned {
    /// The block height at which the tokens minted for this NFT were
    /// burned.
    burn_block_height: u64,
}

/// Record of information about an NFT for which GLDT has been minted.
#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash, PartialEq)]
pub struct GldtMinted {
    /// Block height when the GLDT was minted. Must be non-zero and
    /// point to a block with a minting transaction with the right
    /// number of tokens and subaccount.
    mint_block_height: BlockIndex,

    /// The last timestamp when this NFT was audited, i.e., when it
    /// was verified that this NFT belongs to this canister, or zero
    /// if no audit has been made.
    last_audited_timestamp_seconds: u64,

    /// The end of an NFT lifecycle in the GLDT canister is the
    /// burning of the minted tokens and the release of the
    /// corresponding NFT.
    burned: Option<GldtBurned>,

    /// The number of tokens that were minted. Added for completeness
    /// but it should alway be 1g : 100 GLDT
    num_tokens: NumTokens,
}

impl Default for GldtMinted {
    fn default() -> Self {
        GldtMinted {
            mint_block_height: Nat::from(0),
            last_audited_timestamp_seconds: 0,
            burned: None,
            num_tokens: Nat::from(0),
        }
    }
}

/// Record of information about an NFT that has been successfully swapped for GLDT.
#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash, PartialEq)]
pub struct GldtSwapped {
    /// Sale ID of the successful sale
    sale_id: String,
    /// Index of the bid
    index: Nat,
}

/// Record of information about an NFT for which an offer has been made.
#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash)]
pub struct GldNft {
    /// The canister ID of the Origyn NFT canister that manages this NFT.
    gld_nft_canister_id: Principal,
    /// The number of grams that this NFT is reported to have.
    grams: NftWeight,
    /// This field is passed verbatim from the offer request.
    requested_memo: Memo,
    /// The subaccount to which tokens are minted. This is always a subaccount of the GLD NFT canister.
    to_subaccount: Subaccount,
    /// The account who owned the NFT and triggered the swap for GLDT.
    receiving_account: Account,
    /// The timestamp when the request to issue GLDT was issued.
    gldt_minting_timestamp_seconds: u64,
    /// The sale if of the NFT sale in the GLD NFT canister.
    nft_sale_id: String,

    /// Filled when tokens are successfully minted.
    minted: Option<GldtMinted>,
    /// Filled when NFT has been successfully swapped.
    swapped: Option<GldtSwapped>,

    /// Optional reference to a previous minting/burning pair for this
    /// NFT as a historial record. If specified, the record must
    /// satisfy 'is_burned'.
    older_record: Option<Box<GldNft>>,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash)]
enum RecordType {
    Mint,
    Burn,
}

/// Record of successful minting or burning of GLDT for GLD NFTs
#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash)]
pub struct GldtRecord {
    /// The type of transaction
    record_type: RecordType,
    /// Timestamp of the record entry
    timestamp: u64,
    /// The account who is swapping the NFT for GLDT or vice versa.
    counterparty: Account,
    /// The canister ID of the Origyn NFT canister that manages this NFT.
    gld_nft_canister_id: Principal,
    /// The id of the NFT that was locked up
    nft_id: NftId,
    /// The escrow account where the GLDT tokens are minted to for the sale.
    /// Only for minting, "None" for burning.
    escrow_subaccount: Option<Subaccount>,
    /// The sale id of the NFT listing in the GLD NFT canister
    nft_sale_id: String,
    /// The number of grams that this NFT is reported to have.
    grams: NftWeight,
    /// The amount of tokens minted.
    num_tokens: NumTokens,
    /// The block index on the GLDT ledger when the GLDT were minted or burned.
    block_height: BlockIndex,
    /// The memo added to the GLDT ledger on minting
    memo: Memo,
}

impl GldNft {
    fn is_burned(&self) -> bool {
        if let Some(minted) = &self.minted {
            if let Some(burned) = &minted.burned { burned.burn_block_height > 0 } else { false }
        } else {
            false
        }
    }
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash, Default)]
pub struct GldtService {
    conf: Conf,
    registry: BTreeMap<(Principal, NftId), GldNft>,
    records: BTreeMap<BlockIndex, GldtRecord>,
}

thread_local! {
    /* stable */
    static SERVICE: RefCell<GldtService> = RefCell::default();
}

#[ic_cdk_macros::pre_upgrade]
fn pre_upgrade() {
    log_message(format!("executing pre_upgrade"));

    // canister geek data
    let monitor_stable_data = canistergeek_ic_rust::monitor::pre_upgrade_stable_data();
    let logger_stable_data = canistergeek_ic_rust::logger::pre_upgrade_stable_data();

    let service = SERVICE.with(|cell| cell.borrow_mut().clone());

    storage::stable_save((service, monitor_stable_data, logger_stable_data)).unwrap();
    // SERVICE.with(|cell| storage::stable_save((cell.take(),)).unwrap());
}

#[ic_cdk_macros::post_upgrade]
fn post_upgrade() {
    let stable_data: Result<
        (
            GldtService,
            canistergeek_ic_rust::monitor::PostUpgradeStableData,
            canistergeek_ic_rust::logger::PostUpgradeStableData,
        ),
        String
    > = storage::stable_restore();
    match stable_data {
        Ok((service, monitor_stable_data, logger_stable_data)) => {
            SERVICE.with(|cell| {
                *cell.borrow_mut() = service;
            });
            canistergeek_ic_rust::monitor::post_upgrade_stable_data(monitor_stable_data);
            canistergeek_ic_rust::logger::post_upgrade_stable_data(logger_stable_data);
        }
        Err(_) => {}
    }

    log_message(format!("executed post_upgrade"));
}

#[init]
fn init(conf: Option<Conf>) {
    if let Some(conf) = conf {
        log_message(
            format!(
                "INFO :: new config: gldt_ledger_canister_id = {}, gld_nft_canister_ids = {:?}",
                conf.gldt_ledger_canister_id,
                conf.gld_nft_canister_ids
            )
        );
        SERVICE.with(|s| {
            s.borrow_mut().conf = conf;
        })
    }
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash)]
pub struct GetRecordsRequest {
    page: Option<u32>,
    limit: Option<u32>,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash)]
pub struct GetRecordsResponse {
    total: u64,
    data: Option<Vec<GldtRecord>>,
}

#[query]
fn get_records(req: GetRecordsRequest) -> GetRecordsResponse {
    let page = req.page.unwrap_or(0);
    let limit = match req.limit {
        Some(val) => if val < 1 { 10 } else if val > 100 { 100 } else { val }
        None => 10,
    };
    let res: GetRecordsResponse = SERVICE.with(|s| {
        let records = &mut s.borrow_mut().records;
        let start = page * limit;
        let paginated_records = records
            .values()
            .skip(start as usize)
            .take(limit as usize)
            .cloned()
            .collect();
        return GetRecordsResponse { total: records.len() as u64, data: Some(paginated_records) };
    });
    return res;
}

#[update]
fn get_conf() -> Conf {
    log_message(format!("INFO :: get_conf"));
    SERVICE.with(|s| s.borrow_mut().conf.clone())
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash)]
pub struct InfoRequest {
    source_canister: Principal,
    nft_id: NftId,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash)]
pub struct NftInfo {
    info: Option<GldNft>,
}

type TransferResult = Result<BlockIndex, TransferError>;

#[update]
async fn nft_info(args: InfoRequest) -> NftInfo {
    log_message(format!("INFO :: nft_info. Arguments: {:?}", args));
    SERVICE.with(|s| NftInfo {
        info: s
            .borrow()
            .registry.get(&(args.source_canister, args.nft_id))
            .map(|x| x.clone()),
    })
}

fn delete_nft_entry_from_list(nft_id: &NftId) -> Result<(), String> {
    let the_caller = api::caller();
    SERVICE.with(|s| {
        let registry = &mut s.borrow_mut().registry;
        match registry.entry((the_caller, nft_id.to_string())) {
            btree_map::Entry::Occupied(o) => {
                o.remove_entry();
                Ok(())
            }
            _ => Err(format!("NFT ID {} not found in list.", nft_id)),
        }
    })
}

async fn accept_offer(
    nft_id: NftId,
    swap_info: GldNft,
    token_spec: TokenSpec
) -> Result<GldtSwapped, String> {
    let num_tokens = (match swap_info.minted {
        Some(t) => {
            let num_tokens_expected =
                (swap_info.grams as u64) * (GLDT_PRICE_RATIO as u64) * GLDT_SUBDIVIDABLE_BY;
            if t.num_tokens != num_tokens_expected {
                Err(
                    format!(
                        "Invalid number of tokens to accept offer. Expected {}, received {}.",
                        num_tokens_expected,
                        t.num_tokens
                    )
                )
            } else {
                Ok(t.num_tokens)
            }
        }
        None => Err("Invalid number of tokens to accept offer.".to_string()),
    })?;
    let bid = BidRequest {
        broker_id: None,
        sale_id: swap_info.nft_sale_id,
        escrow_receipt: EscrowReceipt {
            token: token_spec,
            seller: OrigynAccount::principal(swap_info.receiving_account.owner),
            buyer: OrigynAccount::principal(api::id()),
            token_id: nft_id,
            amount: num_tokens,
        },
    };
    let service = gld_nft::SERVICE(swap_info.gld_nft_canister_id);
    log_message(format!("Placing bid with arguments {:?}", bid));
    match service.sale_nft_origyn(ManageSaleRequest::bid(bid)).await {
        Ok((res,)) => {
            log_message("Received response from sale_nft_origyn. Decifering now.".to_string());
            match res {
                ManageSaleResult::ok(val) => {
                    log_message(format!("Successfuly response: {:?}", *val));
                    let (sale_id, index) = match *val {
                        ManageSaleResponse::bid(bid) => {
                            let sale_id = match bid.txn_type {
                                BidResponse_txn_type::sale_ended { sale_id, .. } =>
                                    sale_id.unwrap_or_else(|| "".to_string()),
                                _ => "".to_string(),
                            };
                            (sale_id, bid.index)
                        }
                        _ => ("invalid_ManageSaleResponse".to_string(), Nat::from(0)),
                    };
                    Ok(GldtSwapped {
                        sale_id,
                        index,
                    })
                }
                ManageSaleResult::err(err) => {
                    log_message(format!("Error response: ManageSaleResult : {}", err.text.clone()));
                    Err(err.text)
                }
            }
        }
        Err((_, msg)) => Err(format!("Severe error while accepting offer. Message: {}", msg)),
    }
}

async fn validate_inputs(
    args: SubscriberNotification
) -> Result<(NftId, GldNft, TokenSpec), String> {
    // verify caller, only accept calls from valid gld nft canisters
    let the_caller = api::caller();
    // Extract configuration and validate caller.
    let (gld_nft_canister_id, gld_nft_conf, gldt_ledger_canister_id) = SERVICE.with(
        |s| -> Result<(Principal, NftCanisterConf, Principal), String> {
            let conf = &s.borrow().conf;
            let (gld_nft_canister_id, gld_nft_conf) = conf.gld_nft_canister_ids
                .iter()
                .find(|(x, _)| *x == the_caller)
                .ok_or_else(|| {
                    format!(
                        "invalid caller: was {}, expected one of {:?}",
                        the_caller,
                        conf.gld_nft_canister_ids
                            .iter()
                            .map(|(x, _)| x)
                            .collect::<Vec<_>>()
                    )
                })?;

            Ok((
                gld_nft_canister_id.clone(),
                gld_nft_conf.clone(),
                conf.gldt_ledger_canister_id.clone(),
            ))
        }
    )?;

    // verify nft_id
    let nft_id = args.sale.token_id.clone();
    if nft_id.clone().is_empty() {
        return Err(String::from("NFT ID cannot be empty"));
    }

    // verify subaccount for escrow deposit
    let subaccount: Subaccount = match args.escrow_info.account.sub_account.as_slice().try_into() {
        Ok(x) => x,
        Err(_) => {
            return Err(
                format!(
                    "ERROR: expected a subaccount of length {} but it was {}",
                    32,
                    args.escrow_info.account.sub_account.len()
                )
            );
        }
    };

    // verify seller acount as ICRC1 account
    let seller_icrc1: Account = (match args.seller.clone() {
        OrigynAccount::principal(p) =>
            Ok(Account {
                owner: p.clone(),
                subaccount: None,
            }),
        _ => { Err(format!("No valid account found for seller.")) }
    })?;

    // extract token information and config and verify if it is valid
    let (token, config) = match args.sale.sale_type {
        SaleStatusShared_sale_type::auction(t) => (t.token, t.config),
    };
    // verify passed token info
    let token_spec: TokenSpec = TokenSpec::ic(ICTokenSpec {
        id: None,
        fee: Some(Nat::from(GLDT_TX_FEE)),
        decimals: Nat::from(8),
        canister: gldt_ledger_canister_id,
        standard: ICTokenSpec_standard::ICRC1,
        symbol: String::from("GLDT"),
    });
    if token != token_spec {
        return Err(
            format!(
                "Token specification are not correct. Expected {:?}, received: {:?}",
                token_spec,
                token
            )
        );
    }

    // 100 tokens per gram.
    let tokens_minted: NumTokens = NumTokens::from(
        GLDT_SUBDIVIDABLE_BY * (gld_nft_conf.grams as u64) * 100
    );
    // validate amount information
    (match config {
        PricingConfigShared__1::ask(Some(features)) => {
            let mut amount: Nat = Nat::from(0);
            for feature in features {
                if let AskFeature::buy_now(val) = feature {
                    amount = val;
                }
            }
            if amount == tokens_minted {
                Ok(amount)
            } else {
                Err(
                    format!(
                        "buy_now price doesn't match the expected value. Expected {}, received {}.",
                        tokens_minted,
                        amount
                    )
                )
            }
        }
        _ => Err(String::from("Couldn't find buy_now price.")),
    })?;

    let swap_info = GldNft {
        gld_nft_canister_id,
        to_subaccount: subaccount,
        nft_sale_id: args.sale.sale_id,
        grams: gld_nft_conf.grams,
        receiving_account: seller_icrc1,
        gldt_minting_timestamp_seconds: api::time(),
        requested_memo: Memo::from(0),
        minted: None,
        swapped: None,
        older_record: None,
    };

    Ok((nft_id, swap_info, token_spec))
}

async fn mint_tokens(nft_id: NftId, swap_info: GldNft) -> Result<GldtMinted, String> {
    let num_tokens = Nat::from(swap_info.grams.clone()) * GLDT_PRICE_RATIO * GLDT_SUBDIVIDABLE_BY;

    let transfer_args = TransferArg {
        memo: Some(swap_info.requested_memo),
        amount: num_tokens.clone(),
        fee: None,
        from_subaccount: None,
        to: Account {
            owner: swap_info.gld_nft_canister_id,
            subaccount: Some(swap_info.to_subaccount),
        },
        created_at_time: None,
    };
    let gldt_ledger_canister_id = SERVICE.with(|s| -> Principal {
        s.borrow().conf.gldt_ledger_canister_id
    });

    let service = icrc1::SERVICE(gldt_ledger_canister_id);

    // let result: TransferResult = match icrc1_transfer(transfer_args.clone()).await {
    let result: TransferResult = match service.icrc1_transfer(transfer_args.clone()).await {
        Ok((v,)) => v,
        Err((code, message)) => {
            let _ = delete_nft_entry_from_list(&nft_id);
            return Err(
                format!("Error while calling icrc1_transfer. Code {:?}, Message: {}", code, message)
            );
        }
    };
    let block_height: BlockIndex = match result {
        Ok(height) => height,
        Err(e) => {
            let _ = delete_nft_entry_from_list(&nft_id);
            return Err(
                format!(
                    "Error while executing icrc1_transfer with args {:?}. Message: {:?}",
                    transfer_args,
                    e
                )
            );
        }
    };
    log_message(
        format!(
            "INFO :: minted {} GLDT at block {} to prinicpal {} with subaccount {:?}",
            num_tokens.clone(),
            block_height,
            transfer_args.to.owner,
            transfer_args.to.subaccount
        )
    );
    Ok(GldtMinted {
        mint_block_height: block_height,
        last_audited_timestamp_seconds: 0,
        burned: None,
        num_tokens,
    })
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash, PartialEq)]
enum RegistryUpdateType {
    Init,
    Mint,
    Swap,
    // Burn,
}

fn update_registry(
    entry_type: RegistryUpdateType,
    nft_id: NftId,
    entry: GldNft
) -> Result<(), String> {
    log_message(
        format!(
            "INFO :: update_registry :: {:?} called for nft-id {} with payload {:?}",
            entry_type,
            nft_id,
            entry
        )
    );
    SERVICE.with(|s| {
        // The code that follows looks rather complicated, but it is
        // almost only error checking due to the fact that we cannot be
        // sure that the canister state before and after the async call
        // match, even for the entry of the NFT being offered.

        let registry = &mut s.borrow_mut().registry;

        match registry.entry((entry.gld_nft_canister_id.clone(), nft_id.clone())) {
            btree_map::Entry::Vacant(v) => {
                if let RegistryUpdateType::Init = entry_type {
                    v.insert(entry.clone());
                } else {
                    // This should never happen as an entry for this NFT
                    // was created before the async call was made, but we
                    // try to handle it gracefully anyway. Perhaps the
                    // canister was upgraded in between and state was lost.
                    log_message(
                        format!(
                            "WARNING: tokens minted, but no entry to update! Attempting to rectify by creating a new entry. Record: {:?}",
                            entry
                        )
                    );
                    v.insert(entry.clone());
                }
                Ok(())
            }
            btree_map::Entry::Occupied(mut o) => {
                if let RegistryUpdateType::Init = entry_type {
                    // If there is already an entry when initialising, the only legit
                    // reason is because the GLDTs have been burned.
                    // If not, then there may be an attempt to double mint and the
                    // procedure is cancelled.
                    if o.get().is_burned() {
                        log_message(
                            format!(
                                "INFO :: replacing inactive entry for NFT: {}: old entry: {:?}",
                                nft_id.clone(),
                                o.get()
                            )
                        );
                        o.insert(GldNft {
                            older_record: Some(Box::new(o.get().clone())),
                            ..entry.clone()
                        });
                    } else {
                        let msg = format!(
                            "There is already an active entry for NFT: {}. Canceling new minting of tokens.",
                            nft_id.clone()
                        );
                        return Err(msg);
                    }
                }

                // These paths continue if a minting, swapping or burning entry is being made.

                // Do sanity checking.
                let mut problems = Vec::new();
                if o.get().gld_nft_canister_id != entry.gld_nft_canister_id {
                    problems.push(
                        format!(
                            "NFT canister ID - recorded: {}, expected: {}",
                            o.get().gld_nft_canister_id,
                            entry.gld_nft_canister_id
                        )
                    );
                }
                if o.get().grams != entry.grams {
                    problems.push(
                        format!(
                            "weight in grams - recorded: {}, expected: {}",
                            o.get().grams,
                            entry.grams
                        )
                    );
                }
                if o.get().requested_memo != entry.requested_memo {
                    problems.push(
                        format!(
                            "memo - recorded: {:?}, expected: {:?}",
                            o.get().requested_memo,
                            entry.requested_memo
                        )
                    );
                }
                if o.get().to_subaccount != entry.to_subaccount {
                    problems.push(
                        format!(
                            "escrow subaccount - recorded: {:?}, expected: {:?}",
                            o.get().to_subaccount,
                            entry.to_subaccount
                        )
                    );
                }
                if o.get().gldt_minting_timestamp_seconds != entry.gldt_minting_timestamp_seconds {
                    problems.push(
                        format!(
                            "timestamp - recorded: {}, expected: {}",
                            o.get().gldt_minting_timestamp_seconds,
                            entry.gldt_minting_timestamp_seconds
                        )
                    );
                }
                if !problems.is_empty() {
                    // If there are problems, it is most likely the
                    // case that the response we are handing is
                    // spurious, i.e., not corresponding to the
                    // request made.
                    let msg = format!(
                        "ERROR: ignoring canister response because request state does not match response state: problems {}, record {:?}",
                        problems.join("; "),
                        entry
                    );
                    log_message(msg.clone());
                    return Err(msg);
                }
                // path for mint registry update
                if let RegistryUpdateType::Mint = entry_type {
                    let block_height = entry.minted.clone().unwrap_or_default().mint_block_height;
                    match &o.get().minted {
                        None => {
                            // This is the happy path when tokens are minted
                            o.get_mut().minted = entry.minted.clone();
                        }
                        Some(minted) => {
                            if minted.burned.is_some() {
                                // this path should never be reached
                                log_message(
                                    format!(
                                        "WARNING: offer for NFT {} with block height {} - inactive entry overwritten {:?}",
                                        nft_id,
                                        block_height,
                                        minted
                                    )
                                );
                                o.get_mut().minted = entry.minted.clone();
                            } else {
                                // If the block heights are equal, there is no issue
                                if minted.mint_block_height != block_height {
                                    // TODO: handle this event properly.
                                    // TODO: Swapping shouldn't be able to happen twice as the GLD NFT canister blocks this internally.
                                    // TODO: also, the GLDTs are minted to a subaccount that is controlled by GLDT, so user has no access.
                                    log_message(
                                        format!(
                                            "ERROR: possible double minting for NFT {}; tokens minted to {:?} at block height {}, previous record indicating minting at block height {}",
                                            nft_id,
                                            entry.to_subaccount,
                                            block_height.clone(),
                                            minted.mint_block_height
                                        )
                                    );
                                } else {
                                    log_message(
                                        format!("WARNING: ignoring double response for NFT {}", nft_id)
                                    );
                                }
                            }
                        }
                    }
                    return Ok(());
                }
                // path for swap registry update
                if let RegistryUpdateType::Swap = entry_type {
                    // This path should occur after tokens have been swapped
                    match &o.get().swapped {
                        None => {
                            // This is the happy path when tokens are swapped
                            o.get_mut().swapped = entry.swapped.clone();
                        }
                        Some(swap) => {
                            // This should not be possible but adding logging to detect in case.
                            log_message(
                                format!(
                                    "WARNING: swap entry already present. Overwriting existing entry. Found {:?}, wanted to set {:?}",
                                    swap,
                                    entry.swapped.clone()
                                )
                            );
                            o.get_mut().swapped = entry.swapped.clone();
                        }
                    }
                }
                Ok(())
            }
        }
    })?;
    Ok(())
}

/// This method adds the entry to the permanent record history.
/// This is only called when minting or burning is finalised and is meant to
/// keep track of all mints and burns for historic analysis.
fn add_record(nft_id: NftId, swap_info: GldNft) -> Result<(), String> {
    SERVICE.with(|s| {
        let records = &mut s.borrow_mut().records;
        let new_index: BlockIndex = match records.last_key_value() {
            Some((last_index, _)) => (*last_index).clone() + Nat::from(1),
            None => Nat::from(0),
        };
        let new_record = GldtRecord {
            record_type: RecordType::Mint,
            timestamp: api::time(),
            counterparty: swap_info.receiving_account,
            gld_nft_canister_id: swap_info.gld_nft_canister_id,
            nft_id,
            escrow_subaccount: Some(swap_info.to_subaccount),
            nft_sale_id: swap_info.nft_sale_id,
            grams: swap_info.grams,
            num_tokens: swap_info.minted.clone().unwrap_or_default().num_tokens,
            block_height: swap_info.minted.clone().unwrap_or_default().mint_block_height,
            memo: swap_info.requested_memo,
        };
        records.insert(new_index, new_record);
    });
    Ok(())
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash)]
pub struct GetStatusRequest {
    nft_id: NftId,
    gld_nft_canister_id: Principal,
    sale_id: String,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash)]
pub struct GetStatusResponse {
    status: Option<SwappingStates>,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash)]
enum SwappingStates {
    Initialised,
    Minted,
    Swapped,
    Burned,
    Finalised,
}

#[query]
fn get_status_of_swap(req: GetStatusRequest) -> Result<GetStatusResponse, String> {
    SERVICE.with(|s| {
        let registry = &s.borrow().registry;

        let conf = &s.borrow().conf;
        conf.gld_nft_canister_ids
            .iter()
            .find(|(x, _)| *x == req.gld_nft_canister_id)
            .ok_or_else(|| {
                format!(
                    "invalid GLD NFT canister ID: was {}, expected one of {:?}",
                    req.gld_nft_canister_id,
                    conf.gld_nft_canister_ids
                        .iter()
                        .map(|(x, _)| x)
                        .collect::<Vec<_>>()
                )
            })?;

        let entry = registry.get(&(req.gld_nft_canister_id.clone(), req.nft_id.clone()));
        let res = match entry {
            None => GetStatusResponse { status: None },
            Some(entry) => {
                if entry.nft_sale_id == req.sale_id {
                    if entry.minted.is_none() {
                        GetStatusResponse { status: Some(SwappingStates::Initialised) }
                    } else if entry.swapped.is_none() {
                        GetStatusResponse { status: Some(SwappingStates::Minted) }
                    } else if entry.minted.clone().unwrap_or_default().burned.is_none() {
                        GetStatusResponse { status: Some(SwappingStates::Swapped) }
                    } else {
                        GetStatusResponse { status: Some(SwappingStates::Burned) }
                    }
                } else {
                    GetStatusResponse { status: None }
                }
            }
        };
        Ok(res)
    })
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct SubscriberNotification {
    escrow_info: SubAccountInfo,
    sale: SaleStatusShared,
    seller: OrigynAccount,
    collection: Principal,
}

#[update]
async fn notify_sale_nft_origyn(args: SubscriberNotification) -> Result<String, String> {
    log_message(format!("Sale notifcation: {:?}", args));
    canistergeek_ic_rust::monitor::collect_metrics();

    // STEP 1 : validate inputs
    let (nft_id, swap_info, token_spec) = (match validate_inputs(args.clone()).await {
        Ok(res) => Ok(res),
        Err(err) => {
            let msg = format!("ERROR :: {}", err);
            log_message(msg.clone());
            Err(msg)
        }
    })?;

    // STEP 2 : add entry in registry to keep track of running listings
    //          and block any attempts of double minting
    update_registry(RegistryUpdateType::Init, nft_id.clone(), swap_info.clone()).map_err(|err| {
        let msg = format!("ERROR :: {}", err);
        log_message(msg.clone());
        msg
    })?;

    // STEP 3 : mint GLDT to escrow address and then swap GLDTs and NFTs
    //          Careful after this point as tokens are being minted and transfers take place.
    //          First step: mint the tokens to the escrow account.
    let res = match mint_tokens(nft_id.clone(), swap_info.clone()).await {
        Ok(gldt_minted) => {
            let updated_swap_info_minted = GldNft {
                minted: Some(gldt_minted),
                ..swap_info
            };
            update_registry(
                RegistryUpdateType::Mint,
                nft_id.clone(),
                updated_swap_info_minted.clone()
            )?;
            // Second step: accept the offer of the listed NFT
            match
                accept_offer(
                    nft_id.clone(),
                    updated_swap_info_minted.clone(),
                    token_spec.clone()
                ).await
            {
                Ok(gldt_swapped) => {
                    // All went well and registry is updated and record is added.
                    let updated_swap_info_swapped = GldNft {
                        swapped: Some(gldt_swapped),
                        ..updated_swap_info_minted
                    };
                    update_registry(
                        RegistryUpdateType::Swap,
                        nft_id.clone(),
                        updated_swap_info_swapped.clone()
                    )?;
                    add_record(nft_id.clone(), updated_swap_info_swapped.clone())?;
                    let msg = format!("INFO :: accept_offer :: {}", "success");
                    log_message(msg.clone());
                    Ok(msg)
                }
                Err(msg) => {
                    log_message(format!("ERROR :: accept_offer :: {}", msg));
                    Err(msg)
                    // TODO: How to handle when accepting fails?
                }
            }
        }
        Err(msg) => {
            log_message(format!("ERROR :: mint_tokens :: {}", msg));
            Err(msg)
            // TODO: handle error case
            // 1. remove entry from temporary list
            // 2. return notification that minting failed and it needs to be retried
            // Case: What happens if the minting fails and the NFT stays listed? Can we let the frontend
            // call directly the GLDT canister with the notify method if the values are correct?
        }
    };
    return res;
}

// for monitoring during development
#[query(name = "getCanistergeekInformation")]
async fn get_canistergeek_information(
    request: canistergeek_ic_rust::api_type::GetInformationRequest
) -> canistergeek_ic_rust::api_type::GetInformationResponse<'static> {
    canistergeek_ic_rust::get_information(request)
}

#[update(name = "updateCanistergeekInformation")]
pub async fn update_canistergeek_information(
    request: canistergeek_ic_rust::api_type::UpdateInformationRequest
) -> () {
    canistergeek_ic_rust::update_information(request);
}

// #[test]
// fn check_candid_interface() {
//     use candid::utils::{ service_compatible, CandidSource };
//     use std::path::Path;

//     candid::export_service!();
//     let new_interface = __export_service();

//     service_compatible(
//         CandidSource::Text(&new_interface),
//         CandidSource::File(Path::new("src/gldt_core.did"))
//     ).unwrap();
// }

export_candid!();
