export const idlFactory = ({ IDL }) => {
  const GldtNft = IDL.Rec();
  const NftCanisterConf = IDL.Record({ 'grams' : IDL.Nat16 });
  const Conf = IDL.Record({
    'gldt_nft_canister_ids' : IDL.Vec(
      IDL.Tuple(IDL.Principal, NftCanisterConf)
    ),
    'gldt_ledger_canister_id' : IDL.Principal,
  });
  const StatusRequest = IDL.Record({
    'memory_size' : IDL.Bool,
    'cycles' : IDL.Bool,
    'heap_memory_size' : IDL.Bool,
  });
  const MetricsGranularity = IDL.Variant({
    'hourly' : IDL.Null,
    'daily' : IDL.Null,
  });
  const GetMetricsParameters = IDL.Record({
    'dateToMillis' : IDL.Nat,
    'granularity' : MetricsGranularity,
    'dateFromMillis' : IDL.Nat,
  });
  const MetricsRequest = IDL.Record({ 'parameters' : GetMetricsParameters });
  const GetLogMessagesFilter = IDL.Record({
    'analyzeCount' : IDL.Nat32,
    'messageRegex' : IDL.Opt(IDL.Text),
    'messageContains' : IDL.Opt(IDL.Text),
  });
  const GetLogMessagesParameters = IDL.Record({
    'count' : IDL.Nat32,
    'filter' : IDL.Opt(GetLogMessagesFilter),
    'fromTimeNanos' : IDL.Opt(IDL.Nat64),
  });
  const GetLatestLogMessagesParameters = IDL.Record({
    'upToTimeNanos' : IDL.Opt(IDL.Nat64),
    'count' : IDL.Nat32,
    'filter' : IDL.Opt(GetLogMessagesFilter),
  });
  const CanisterLogRequest = IDL.Variant({
    'getMessagesInfo' : IDL.Null,
    'getMessages' : GetLogMessagesParameters,
    'getLatestMessages' : GetLatestLogMessagesParameters,
  });
  const GetInformationRequest = IDL.Record({
    'status' : IDL.Opt(StatusRequest),
    'metrics' : IDL.Opt(MetricsRequest),
    'logs' : IDL.Opt(CanisterLogRequest),
    'version' : IDL.Bool,
  });
  const StatusResponse = IDL.Record({
    'memory_size' : IDL.Opt(IDL.Nat64),
    'cycles' : IDL.Opt(IDL.Nat64),
    'heap_memory_size' : IDL.Opt(IDL.Nat64),
  });
  const HourlyMetricsData = IDL.Record({
    'updateCalls' : IDL.Vec(IDL.Nat64),
    'canisterHeapMemorySize' : IDL.Vec(IDL.Nat64),
    'canisterCycles' : IDL.Vec(IDL.Nat64),
    'canisterMemorySize' : IDL.Vec(IDL.Nat64),
    'timeMillis' : IDL.Int,
  });
  const NumericEntity = IDL.Record({
    'avg' : IDL.Nat64,
    'max' : IDL.Nat64,
    'min' : IDL.Nat64,
    'first' : IDL.Nat64,
    'last' : IDL.Nat64,
  });
  const DailyMetricsData = IDL.Record({
    'updateCalls' : IDL.Nat64,
    'canisterHeapMemorySize' : NumericEntity,
    'canisterCycles' : NumericEntity,
    'canisterMemorySize' : NumericEntity,
    'timeMillis' : IDL.Int,
  });
  const CanisterMetricsData = IDL.Variant({
    'hourly' : IDL.Vec(HourlyMetricsData),
    'daily' : IDL.Vec(DailyMetricsData),
  });
  const CanisterMetrics = IDL.Record({ 'data' : CanisterMetricsData });
  const MetricsResponse = IDL.Record({ 'metrics' : IDL.Opt(CanisterMetrics) });
  const CanisterLogFeature = IDL.Variant({
    'filterMessageByContains' : IDL.Null,
    'filterMessageByRegex' : IDL.Null,
  });
  const CanisterLogMessagesInfo = IDL.Record({
    'features' : IDL.Vec(IDL.Opt(CanisterLogFeature)),
    'lastTimeNanos' : IDL.Opt(IDL.Nat64),
    'count' : IDL.Nat32,
    'firstTimeNanos' : IDL.Opt(IDL.Nat64),
  });
  const LogMessageData = IDL.Record({
    'timeNanos' : IDL.Nat64,
    'message' : IDL.Text,
  });
  const CanisterLogMessages = IDL.Record({
    'data' : IDL.Vec(LogMessageData),
    'lastAnalyzedMessageTimeNanos' : IDL.Opt(IDL.Nat64),
  });
  const CanisterLogResponse = IDL.Variant({
    'messagesInfo' : CanisterLogMessagesInfo,
    'messages' : CanisterLogMessages,
  });
  const GetInformationResponse = IDL.Record({
    'status' : IDL.Opt(StatusResponse),
    'metrics' : IDL.Opt(MetricsResponse),
    'logs' : IDL.Opt(CanisterLogResponse),
    'version' : IDL.Opt(IDL.Nat),
  });
  const InfoRequest = IDL.Record({
    'nft_id' : IDL.Text,
    'source_canister' : IDL.Principal,
  });
  const GldtNftBurned = IDL.Record({ 'burn_block_height' : IDL.Nat64 });
  const GldtNftMinted = IDL.Record({
    'mint_block_height' : IDL.Nat64,
    'last_audited_timestamp_seconds' : IDL.Nat64,
    'burned' : IDL.Opt(GldtNftBurned),
  });
  GldtNft.fill(
    IDL.Record({
      'requested_memo' : IDL.Nat64,
      'older_record' : IDL.Opt(GldtNft),
      'to_subaccount' : IDL.Vec(IDL.Nat8),
      'minted' : IDL.Opt(GldtNftMinted),
      'grams' : IDL.Nat16,
      'gldt_nft_canister_id' : IDL.Principal,
      'gldt_minting_timestamp_seconds' : IDL.Nat64,
    })
  );
  const NftInfo = IDL.Record({ 'info' : IDL.Opt(GldtNft) });
  const SaleStatusShared = IDL.Record({ 'token_id' : IDL.Text });
  const SubAccoutInfo2 = IDL.Record({ 'sub_account' : IDL.Vec(IDL.Nat8) });
  const SubAccountInfo = IDL.Record({ 'account' : SubAccoutInfo2 });
  const SubscriberNotification = IDL.Record({
    'sale' : SaleStatusShared,
    'escrow_info' : SubAccountInfo,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const OfferRequest = IDL.Record({
    'nft_id' : IDL.Text,
    'requested_memo' : IDL.Nat64,
    'to_subaccount' : IDL.Vec(IDL.Nat8),
  });
  const Tokens = IDL.Record({ 'e8s' : IDL.Nat64 });
  const Offer = IDL.Record({
    'block_height' : IDL.Nat64,
    'tokens_minted' : Tokens,
  });
  const Result_1 = IDL.Variant({ 'Ok' : Offer, 'Err' : IDL.Text });
  const CollectMetricsRequestType = IDL.Variant({
    'force' : IDL.Null,
    'normal' : IDL.Null,
  });
  const UpdateInformationRequest = IDL.Record({
    'metrics' : IDL.Opt(CollectMetricsRequestType),
  });
  return IDL.Service({
    'getCanistergeekInformation' : IDL.Func(
        [GetInformationRequest],
        [GetInformationResponse],
        ['query'],
      ),
    'get_conf' : IDL.Func([], [Conf], []),
    'nft_info' : IDL.Func([InfoRequest], [NftInfo], []),
    'notify_sale_nft_origyn' : IDL.Func([SubscriberNotification], [Result], []),
    'request_offer' : IDL.Func([OfferRequest], [Result_1], []),
    'updateCanistergeekInformation' : IDL.Func(
        [UpdateInformationRequest],
        [],
        [],
      ),
  });
};
export const init = ({ IDL }) => {
  const NftCanisterConf = IDL.Record({ 'grams' : IDL.Nat16 });
  const Conf = IDL.Record({
    'gldt_nft_canister_ids' : IDL.Vec(
      IDL.Tuple(IDL.Principal, NftCanisterConf)
    ),
    'gldt_ledger_canister_id' : IDL.Principal,
  });
  return [IDL.Opt(Conf)];
};
