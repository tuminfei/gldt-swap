#![allow(dead_code)]
use crate::T;
use candid::{ utils::ArgumentDecoder, CandidType, Principal };
use pocket_ic::{ PocketIc, UserError, WasmResult };
use serde::de::DeserializeOwned;
use types::CanisterId;

const INIT_CYCLES_BALANCE: u128 = 1_000 * (T as u128);

pub fn create_canister(pic: &mut PocketIc, controller: Principal) -> CanisterId {
    let canister_id = pic.create_canister_with_settings(Some(controller), None);
    pic.add_cycles(canister_id, INIT_CYCLES_BALANCE);
    canister_id
}

pub fn create_canister_with_id(
    pic: &mut PocketIc,
    controller: Principal,
    canister_id: &str
) -> CanisterId {
    let canister_id = canister_id.try_into().expect("Invalid canister ID");
    pic.create_canister_with_id(Some(controller), None, canister_id).expect(
        "Create canister with ID failed"
    );
    pic.add_cycles(canister_id, INIT_CYCLES_BALANCE);
    canister_id
}

pub fn start_canister(pic: &mut PocketIc, sender: Principal, canister_id: CanisterId) {
    pic.start_canister(canister_id, Some(sender)).unwrap();
}

pub fn stop_canister(pic: &mut PocketIc, sender: Principal, canister_id: CanisterId) {
    pic.stop_canister(canister_id, Some(sender)).unwrap();
}

pub fn install_canister<P: CandidType>(
    pic: &mut PocketIc,
    sender: Principal,
    canister_id: CanisterId,
    wasm: Vec<u8>,
    payload: P
) {
    pic.install_canister(canister_id, wasm, candid::encode_one(&payload).unwrap(), Some(sender))
}

pub fn execute_query<P: CandidType, R: CandidType + DeserializeOwned>(
    pic: &PocketIc,
    sender: Principal,
    canister_id: CanisterId,
    method_name: &str,
    payload: &P
) -> R {
    unwrap_response(
        pic.query_call(canister_id, sender, method_name, candid::encode_one(payload).unwrap())
    )
}

pub fn execute_update<P: CandidType, R: CandidType + DeserializeOwned>(
    pic: &PocketIc,
    sender: Principal,
    canister_id: CanisterId,
    method_name: &str,
    payload: &P
) -> R {
    unwrap_response(
        pic.update_call(canister_id, sender, method_name, candid::encode_one(payload).unwrap())
    )
}

pub fn execute_update_multi_args<
    P: CandidType + candid::utils::ArgumentEncoder,
    R: CandidType + DeserializeOwned
>(pic: &PocketIc, sender: Principal, canister_id: CanisterId, method_name: &str, payload: P) -> R {
    unwrap_response(
        pic.update_call(canister_id, sender, method_name, candid::encode_args(payload).unwrap())
    )
}

pub fn execute_update_no_response<P: CandidType>(
    pic: &mut PocketIc,
    sender: Principal,
    canister_id: CanisterId,
    method_name: &str,
    payload: &P
) {
    pic.update_call(
        canister_id,
        sender,
        method_name,
        candid::encode_one(payload).unwrap()
    ).unwrap();
}

fn unwrap_response<R: CandidType + DeserializeOwned>(response: Result<WasmResult, UserError>) -> R {
    match response.unwrap() {
        WasmResult::Reply(bytes) => candid::decode_one(&bytes).unwrap(),
        WasmResult::Reject(error) => panic!("FATAL ERROR: {error}"),
    }
}
