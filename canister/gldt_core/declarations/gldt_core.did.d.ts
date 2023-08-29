import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type CanisterLogFeature = { 'filterMessageByContains' : null } |
  { 'filterMessageByRegex' : null };
export interface CanisterLogMessages {
  'data' : Array<LogMessageData>,
  'lastAnalyzedMessageTimeNanos' : [] | [bigint],
}
export interface CanisterLogMessagesInfo {
  'features' : Array<[] | [CanisterLogFeature]>,
  'lastTimeNanos' : [] | [bigint],
  'count' : number,
  'firstTimeNanos' : [] | [bigint],
}
export type CanisterLogRequest = { 'getMessagesInfo' : null } |
  { 'getMessages' : GetLogMessagesParameters } |
  { 'getLatestMessages' : GetLatestLogMessagesParameters };
export type CanisterLogResponse = { 'messagesInfo' : CanisterLogMessagesInfo } |
  { 'messages' : CanisterLogMessages };
export interface CanisterMetrics { 'data' : CanisterMetricsData }
export type CanisterMetricsData = { 'hourly' : Array<HourlyMetricsData> } |
  { 'daily' : Array<DailyMetricsData> };
export type CollectMetricsRequestType = { 'force' : null } |
  { 'normal' : null };
export interface Conf {
  'gldt_nft_canister_ids' : Array<[Principal, NftCanisterConf]>,
  'gldt_ledger_canister_id' : Principal,
}
export interface DailyMetricsData {
  'updateCalls' : bigint,
  'canisterHeapMemorySize' : NumericEntity,
  'canisterCycles' : NumericEntity,
  'canisterMemorySize' : NumericEntity,
  'timeMillis' : bigint,
}
export interface GetInformationRequest {
  'status' : [] | [StatusRequest],
  'metrics' : [] | [MetricsRequest],
  'logs' : [] | [CanisterLogRequest],
  'version' : boolean,
}
export interface GetInformationResponse {
  'status' : [] | [StatusResponse],
  'metrics' : [] | [MetricsResponse],
  'logs' : [] | [CanisterLogResponse],
  'version' : [] | [bigint],
}
export interface GetLatestLogMessagesParameters {
  'upToTimeNanos' : [] | [bigint],
  'count' : number,
  'filter' : [] | [GetLogMessagesFilter],
}
export interface GetLogMessagesFilter {
  'analyzeCount' : number,
  'messageRegex' : [] | [string],
  'messageContains' : [] | [string],
}
export interface GetLogMessagesParameters {
  'count' : number,
  'filter' : [] | [GetLogMessagesFilter],
  'fromTimeNanos' : [] | [bigint],
}
export interface GetMetricsParameters {
  'dateToMillis' : bigint,
  'granularity' : MetricsGranularity,
  'dateFromMillis' : bigint,
}
export interface GldtNft {
  'requested_memo' : bigint,
  'older_record' : [] | [GldtNft],
  'to_subaccount' : Uint8Array | number[],
  'minted' : [] | [GldtNftMinted],
  'grams' : number,
  'gldt_nft_canister_id' : Principal,
  'gldt_minting_timestamp_seconds' : bigint,
}
export interface GldtNftBurned { 'burn_block_height' : bigint }
export interface GldtNftMinted {
  'mint_block_height' : bigint,
  'last_audited_timestamp_seconds' : bigint,
  'burned' : [] | [GldtNftBurned],
}
export interface HourlyMetricsData {
  'updateCalls' : BigUint64Array | bigint[],
  'canisterHeapMemorySize' : BigUint64Array | bigint[],
  'canisterCycles' : BigUint64Array | bigint[],
  'canisterMemorySize' : BigUint64Array | bigint[],
  'timeMillis' : bigint,
}
export interface InfoRequest {
  'nft_id' : string,
  'source_canister' : Principal,
}
export interface LogMessageData { 'timeNanos' : bigint, 'message' : string }
export type MetricsGranularity = { 'hourly' : null } |
  { 'daily' : null };
export interface MetricsRequest { 'parameters' : GetMetricsParameters }
export interface MetricsResponse { 'metrics' : [] | [CanisterMetrics] }
export interface NftCanisterConf { 'grams' : number }
export interface NftInfo { 'info' : [] | [GldtNft] }
export interface NumericEntity {
  'avg' : bigint,
  'max' : bigint,
  'min' : bigint,
  'first' : bigint,
  'last' : bigint,
}
export interface Offer { 'block_height' : bigint, 'tokens_minted' : Tokens }
export interface OfferRequest {
  'nft_id' : string,
  'requested_memo' : bigint,
  'to_subaccount' : Uint8Array | number[],
}
export type Result = { 'Ok' : null } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : Offer } |
  { 'Err' : string };
export interface SaleStatusShared { 'token_id' : string }
export interface StatusRequest {
  'memory_size' : boolean,
  'cycles' : boolean,
  'heap_memory_size' : boolean,
}
export interface StatusResponse {
  'memory_size' : [] | [bigint],
  'cycles' : [] | [bigint],
  'heap_memory_size' : [] | [bigint],
}
export interface SubAccountInfo { 'account' : SubAccoutInfo2 }
export interface SubAccoutInfo2 { 'sub_account' : Uint8Array | number[] }
export interface SubscriberNotification {
  'sale' : SaleStatusShared,
  'escrow_info' : SubAccountInfo,
}
export interface Tokens { 'e8s' : bigint }
export interface UpdateInformationRequest {
  'metrics' : [] | [CollectMetricsRequestType],
}
export interface _SERVICE {
  'getCanistergeekInformation' : ActorMethod<
    [GetInformationRequest],
    GetInformationResponse
  >,
  'get_conf' : ActorMethod<[], Conf>,
  'nft_info' : ActorMethod<[InfoRequest], NftInfo>,
  'notify_sale_nft_origyn' : ActorMethod<[SubscriberNotification], Result>,
  'request_offer' : ActorMethod<[OfferRequest], Result_1>,
  'updateCanistergeekInformation' : ActorMethod<
    [UpdateInformationRequest],
    undefined
  >,
}
