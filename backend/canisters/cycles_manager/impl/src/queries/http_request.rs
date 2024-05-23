use crate::guards::caller_is_governance_principal;
use crate::state::{read_state, State};
use canister_logger::LogEntry;
use ic_cdk_macros::query;
use serde::Serialize;
use serde_bytes::ByteBuf;
use std::io::Write;
use types::{HeaderField, HttpRequest, HttpResponse};

#[query(guard = "caller_is_governance_principal", hidden = true)]
fn http_request(request: HttpRequest) -> HttpResponse {
    let path = request.url.trim_matches('/').to_lowercase();

    match path.as_str() {
        "logs" => encode_logs(canister_logger::export_logs()),
        "metrics" => read_state(|state| to_json_response(&state.metrics())),
        "trace" => encode_logs(canister_logger::export_traces()),
        "latest_top_ups" => read_state(get_latest_top_ups_impl),
        _ => HttpResponse::not_found(),
    }
}

fn encode_logs(logs: Vec<LogEntry>) -> HttpResponse {
    let mut body = Vec::new();

    for log in logs {
        writeln!(&mut body, "{}", log.message).unwrap();
    }

    HttpResponse {
        status_code: 200,
        headers: vec![
            HeaderField("Content-Type".to_string(), "text/plain".to_string()),
            HeaderField("Content-Length".to_string(), body.len().to_string()),
        ],
        body: ByteBuf::from(body),
        streaming_strategy: None,
    }
}

fn to_json_response<T: Serialize>(data: &T) -> HttpResponse {
    let body = serde_json::to_string(data).unwrap().into_bytes();

    HttpResponse {
        status_code: 200,
        headers: vec![
            HeaderField("Content-Type".to_string(), "application/json".to_string()),
            HeaderField("Content-Length".to_string(), body.len().to_string()),
        ],
        body: ByteBuf::from(body),
        streaming_strategy: None,
    }
}

fn get_latest_top_ups_impl(state: &State) -> HttpResponse {
    let top_ups = state.data.canisters.latest_top_ups(200);

    to_json_response(&top_ups)
}
