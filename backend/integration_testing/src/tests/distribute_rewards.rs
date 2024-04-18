use std::{ borrow::BorrowMut, collections::BTreeMap, io::Read, thread, time::Duration };

use candid::{ CandidType, Deserialize, Nat, Principal };
use canister_time::WEEK_IN_MS;
use icrc_ledger_types::icrc1::account::{ Account, Subaccount };
use num_bigint::ToBigUint;
use pocket_ic::{ call_candid, PocketIc };
use serde::Serialize;
use sns_governance_canister::types::{ Neuron, NeuronId };
use types::TokenSymbol;
use serde_bytes::ByteBuf;

use crate::{
    client::{
        icrc1::happy_path::balance_of,
        rewards::{
            get_active_payment_rounds,
            get_all_neurons,
            get_neuron_by_id,
            http_request,
            sync_neurons_manual_trigger,
            sync_user_rewards,
        },
    },
    setup::{
        setup::{ init, setup_reward_pools, TestEnv },
        sns::{ generate_neuron_data_for_week, setup_sns_by_week },
    },
    utils::{ decode_http_bytes, hex_to_subaccount, tick_n_blocks },
};

#[derive(Deserialize, CandidType, Serialize)]
pub struct GetNeuronRequest {
    neuron_id: NeuronId,
}

#[test]
fn test_distribute_rewards_happy_path() {
    let env = init();
    let TestEnv { mut pic, controller, token_ledgers, mut sns, rewards } = env;
    let sns_gov_id = sns.sns_gov_id.clone();

    // . check all reward pools have correct balance
    let reward_pool = Account {
        owner: rewards,
        subaccount: Some([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0,
        ]),
    };

    let icp_reward_pool_balance = balance_of(&pic, token_ledgers.icp_ledger_id, reward_pool);
    assert_eq!(icp_reward_pool_balance, Nat::from(100_000_000_000u64));

    let ogy_reward_pool_balance = balance_of(&pic, token_ledgers.ogy_ledger_id, reward_pool);
    assert_eq!(ogy_reward_pool_balance, Nat::from(100_000_000_000u64));

    let gldgov_reward_pool_balance = balance_of(&pic, token_ledgers.gldgov_ledger_id, reward_pool);
    assert_eq!(gldgov_reward_pool_balance, Nat::from(100_000_000_000u64));

    // simulate neuron maturity change & allow 1 day for synchronise_neurons to process the change
    sns.setup_week(&mut pic, controller, 2, sns_gov_id);
    pic.tick();
    pic.advance_time(Duration::from_secs(60 * 60 * 24)); // 1 day
    tick_n_blocks(&pic, 10);

    // simulate distribute_rewards
    pic.advance_time(Duration::from_secs(60 * 60 * 148)); // 6 days & 1 hour - full week + 1 hour
    tick_n_blocks(&pic, 10);
    pic.advance_time(Duration::from_secs(60 * 3));
    sync_user_rewards(&mut pic, Principal::anonymous(), rewards, &());
    tick_n_blocks(&pic, 100);
    // all neurons have the same accumulated maturity
    let fees = (sns.neuron_test_data.len() as u64) * 10_000 + 10_000;
    let amount_to_distribute = (100_000_000_000u64 - fees) as f64;
    let total_maturity: f64 = ((sns.neuron_test_data.len() as u64) * 100_000u64) as f64;
    let percentage = (100_000 as f64) / total_maturity;
    let expected_reward = (amount_to_distribute * percentage) as u64;
    assert_eq!(expected_reward, 9_999_989_000);

    // get balance of single neuron
    let neuron_sub_account = Account {
        owner: rewards,
        subaccount: Some(
            hex_to_subaccount("146ed81314556807536d74005f4121b8769bba1992fce6b90c2949e855d04208")
        ),
    };
    let neuron_icp_balance = balance_of(&pic, token_ledgers.icp_ledger_id, neuron_sub_account);
    assert_eq!(neuron_icp_balance, expected_reward);

    pic.tick();
    sns.setup_week(&mut pic, controller, 3, sns_gov_id);
    pic.advance_time(Duration::from_secs(60 * 60 * 24)); // 1 day
    tick_n_blocks(&pic, 4);
    // add new rewards
    // top up the reward pools again
    setup_reward_pools(&mut pic, controller, rewards, token_ledgers, 100_000_000_000u64);
    pic.tick();
    pic.tick();
    pic.advance_time(Duration::from_secs(60 * 60 * 148)); // 6 days & 1 hour - full week + 1 hour
    tick_n_blocks(&pic, 10);
    pic.advance_time(Duration::from_secs(60 * 3));
    sync_user_rewards(&mut pic, Principal::anonymous(), rewards, &());
    tick_n_blocks(&pic, 100);

    let neuron_sub_account = Account {
        owner: rewards,
        subaccount: Some(
            hex_to_subaccount("146ed81314556807536d74005f4121b8769bba1992fce6b90c2949e855d04208")
        ),
    };
    let neuron_icp_balance = balance_of(&pic, token_ledgers.icp_ledger_id, neuron_sub_account);
    assert_eq!(neuron_icp_balance, expected_reward * 2);
    // let p = get_active_payment_rounds(&pic, Principal::anonymous(), rewards, &());
    // println!("{:?}", p);
    // let res = http_request(
    //     &pic,
    //     Principal::anonymous(),
    //     rewards,
    //     &(types::HttpRequest {
    //         method: "GET".to_string(),
    //         url: "/trace".to_string(),
    //         headers: vec![],
    //         body: ByteBuf::new(),
    //     })
    // );
    // println!("{}", decode_http_bytes(res.body.into_vec()));
}

// assert_eq!(true, false);
// assert_eq!(expected_reward, neuron_icp_balance);

// let token_info = TokenInfo {
//     ledger_id: token_ledgers.icp_ledger_id,
//     fee: 10_000u64,
//     decimals: 8u64,
// };
// let token = TokenSymbol::parse("ICP").unwrap();
// let neuron_data: BTreeMap<NeuronId, Neuron> = BTreeMap::new();
// for (_, neuron) in sns.neuron_test_data {
//     let n_info =
//     neuron_data.insert(neuron.id.unwrap(), neuron);
// }

// let icp_payment_round = PaymentRound::new(
//     1,
//     Nat::from(100_000_000_000u64),
//     token_info,
//     token,
//     neuron_data
// ).unwrap();

// // week 2
// sns.setup_week(&mut pic, controller, 2, sns_gov_id);
// pic.advance_time(Duration::from_secs(60 * 60 * 25)); // 25 hours
// // sync_neurons_manual_trigger(&mut pic, Principal::anonymous(), rewards, &());
// pic.tick();

// let single_neuron = get_neuron_by_id(
//     &pic,
//     Principal::anonymous(),
//     rewards,
//     &NeuronId::new("146ed81314556807536d74005f4121b8769bba1992fce6b90c2949e855d04208").unwrap()
// ).unwrap();
// assert_eq!(single_neuron.accumulated_maturity, 100_000);

// // week 3
// sns.setup_week(&mut pic, controller, 3, sns_gov_id);
// pic.advance_time(Duration::from_secs(60 * 60 * 24)); // 25 hours
// // sync_neurons_manual_trigger(&mut pic, Principal::anonymous(), rewards, &());
// pic.tick();
// pic.advance_time(Duration::from_secs(20));

// let single_neuron = get_neuron_by_id(
//     &pic,
//     Principal::anonymous(),
//     rewards,
//     &NeuronId::new("146ed81314556807536d74005f4121b8769bba1992fce6b90c2949e855d04208").unwrap()
// ).unwrap();
// assert_eq!(single_neuron.accumulated_maturity, 200_000);
