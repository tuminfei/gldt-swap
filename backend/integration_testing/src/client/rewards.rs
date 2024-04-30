use crate::{ generate_pocket_query_call, generate_pocket_update_call };

use sns_rewards_api_canister::*;

generate_pocket_update_call!(add_neuron_ownership);
generate_pocket_update_call!(remove_neuron_ownership);
generate_pocket_update_call!(claim_reward);
generate_pocket_query_call!(get_all_neurons);
generate_pocket_query_call!(get_neuron_by_id);
generate_pocket_query_call!(get_active_payment_rounds);
generate_pocket_update_call!(set_reserve_transfer_amounts);
generate_pocket_query_call!(set_reserve_transfer_amounts_validate);
generate_pocket_query_call!(set_reward_token_types_validate);
generate_pocket_query_call!(get_reward_token_types);
generate_pocket_update_call!(set_reward_token_types);
generate_pocket_query_call!(get_historic_payment_round);
generate_pocket_query_call!(get_reserve_transfer_amounts);
generate_pocket_update_call!(set_daily_gldgov_burn_rate);
generate_pocket_query_call!(set_daily_gldgov_burn_rate_validate);
