use candid::CandidType;
use serde::{ Deserialize, Serialize };
use types::TokenSymbol;

use crate::{ generate_pocket_query_call, generate_pocket_update_call };

generate_pocket_query_call!(get_all_neurons);
generate_pocket_query_call!(get_neuron_by_id);
generate_pocket_update_call!(sync_neurons_manual_trigger);
generate_pocket_query_call!(get_active_payment_rounds);
generate_pocket_update_call!(sync_user_rewards);
generate_pocket_query_call!(http_request);
generate_pocket_query_call!(get_historic_payment_round);
// Updates
// generate_update_call!(icrc1_transfer);

#[derive(Serialize, Deserialize, CandidType)]
pub struct A(pub String, pub u16);

pub mod get_all_neurons {
    use super::*;

    pub type Args = ();
    pub type Response = u64;
}

pub mod get_neuron_by_id {
    use sns_governance_canister::types::NeuronId;
    use types::NeuronInfo;

    use super::*;

    pub type Args = NeuronId;
    pub type Response = Option<NeuronInfo>;
}

pub mod sync_neurons_manual_trigger {
    use super::*;
    pub type Args = ();
    pub type Response = ();
}

pub mod get_active_payment_rounds {
    use sns_rewards::model::payment_processor::PaymentRound;

    use super::*;
    pub type Args = ();
    pub type Response = Vec<PaymentRound>;
}

pub mod sync_user_rewards {
    use super::*;

    pub type Args = ();
    pub type Response = ();
}

pub mod http_request {
    use types::{ HttpRequest, HttpResponse };

    use super::*;

    pub type Args = HttpRequest;
    pub type Response = HttpResponse;
}

pub mod get_historic_payment_round {
    use candid::CandidType;
    use serde::{ Deserialize, Serialize };
    use sns_rewards::model::payment_processor::PaymentRound;
    use types::TokenSymbol;

    use super::*;

    pub type Args = (String, u16);
    pub type Response = Vec<(u16, PaymentRound)>;
}
