use std::{ borrow::{ BorrowMut, Cow }, collections::HashMap };

use candid::{ CandidType, Decode, Encode, Nat, Principal };
use canister_time::now_millis;
use ic_ledger_types::Subaccount;
use icrc_ledger_types::icrc1::{ account::Account, transfer::TransferArg };
use serde::{ Deserialize, Serialize };
use sns_governance_canister::types::NeuronId;
use tracing::{ debug, info };
use types::{ TimestampMillis, TokenSymbol };
use ic_stable_structures::{ storable::Bound, StableBTreeMap, Storable };

use crate::memory::{ get_payment_round_history_memory, VM };
const MAX_VALUE_SIZE: u32 = 100000;

/// The history of each neuron's maturity.
// NOTE: Stable structures don't need to be serialized, hence the #[serde(skip)].
#[derive(Serialize, Deserialize)]
pub struct PaymentProcessor {
    #[serde(skip, default = "init_map")]
    rounds: StableBTreeMap<u16, PaymentRound, VM>,
}

fn init_map() -> StableBTreeMap<u16, PaymentRound, VM> {
    let memory = get_payment_round_history_memory();
    StableBTreeMap::init(memory)
}

impl Default for PaymentProcessor {
    fn default() -> Self {
        Self { rounds: init_map() }
    }
}

fn create_payment_round_sub_account_id(count: u16) -> Subaccount {
    let u16_bytes: [u8; 2] = count.to_le_bytes();
    let mut array: [u8; 32] = [0; 32];
    array[30..32].copy_from_slice(&u16_bytes);
    Subaccount(array)
}

impl PaymentProcessor {
    pub fn next_key(&self) -> u16 {
        let mut next_key = match self.rounds.last_key_value() {
            Some((last_key, _)) => {
                if last_key == 0 { 1 } else { last_key + 1 }
            } // Add 1 to the last key
            None => 1, // If the map is empty, start from 0
        };

        if next_key > u16::MAX {
            next_key = 1; // Wrap around to 0 if the key exceeds u16::MAX
        }
        next_key
    }

    pub fn add_payment_round(&mut self, round: PaymentRound) {
        self.rounds.insert(round.id, round);
        debug!("New payment round created");
    }

    pub fn read_pending_payment_rounds(&self) -> Vec<(u16, PaymentRound)> {
        let rounds = self.rounds
            .iter()
            .filter(|round| round.1.round_status == PaymentRoundStatus::Pending)
            .map(|(round_id, payment_round)| (round_id, payment_round))
            .collect();

        rounds
    }

    pub fn get_faulty_payment_rounds(&mut self) -> Vec<(u16, PaymentRound)> {
        let rounds = self.rounds
            .iter()
            .filter(|round| {
                match round.1.round_status {
                    PaymentRoundStatus::CompletedFull => false,
                    PaymentRoundStatus::Pending => false,
                    _ => true,
                }
            })
            .map(|(round_id, payment_round)| (round_id, payment_round))
            .collect();

        rounds
    }

    pub fn set_round_status(&mut self, id: &u16, status: PaymentRoundStatus) {
        let round = self.rounds.get(id);
        match round {
            Some(mut round) => {
                round.round_status = status;
            }
            None => {}
        }
    }

    pub fn set_payment_status(
        &mut self,
        round_id: &u16,
        neuron_id: &NeuronId,
        new_status: PaymentStatus
    ) {
        // let round = self.rounds.get(round_id);
        let rounds = self.rounds.borrow_mut();

        if let Some(mut round) = rounds.get(round_id) {
            if let Some(payment) = round.payments.get_mut(&neuron_id) {
                payment.1 = new_status;
            }
        }
    }

    pub fn contains_faulty_payment_rounds(&self) -> bool {
        let rounds: Vec<(u16, PaymentRound)> = self.rounds
            .iter()
            .filter(|round| {
                match round.1.round_status {
                    PaymentRoundStatus::CompletedFull => false,
                    PaymentRoundStatus::Pending => false,
                    _ => true,
                }
            })
            .collect();

        return rounds.len() > 0;
    }

    pub fn get_payment_rounds(&self) -> Vec<(u16, PaymentRound)> {
        let rounds = self.rounds
            .iter()
            .map(|(round_id, payment_round)| (round_id, payment_round))
            .collect();
        let first_round = self.rounds.get(&1);

        match first_round {
            Some(round) => {
                debug!("aaaa : {:?}", round);
            }
            None => {}
        }

        rounds
    }

    pub fn get_payment_round_by_id(&self, id: &u16) -> Option<PaymentRound> {
        self.rounds.get(id)
    }
}

#[derive(Serialize, Deserialize, CandidType, Debug, Clone)]
pub struct PaymentRound {
    pub id: u16,
    pub round_funds_subaccount: Option<Subaccount>, // holds the rewards for this round of payments
    pub round_funds_total: Nat, // total amount to be distributed from the funds sub account
    pub ledger_id: Principal, // the ledger associated with transferring funds for this round of specific token payments
    pub token: TokenSymbol, // the token associated with a specific payment round
    pub date_initialized: TimestampMillis, //
    pub total_neuron_maturity: u64, // total maturity of all neurons for this specific period
    pub payments: HashMap<NeuronId, Payment>, // map of payments to process
    pub round_status: PaymentRoundStatus, // status of weather all payments passed, failed etc
}

pub type RewardShare = u64;
pub type MaturityDelta = u64;
pub type Payment = (RewardShare, PaymentStatus, MaturityDelta);

impl PaymentRound {
    pub fn new(
        id: u16,
        round_funds_total: Nat,
        ledger_id: Principal,
        token: TokenSymbol,
        total_neuron_maturity: u64,
        payments: HashMap<NeuronId, Payment>
    ) -> Self {
        Self {
            id: id,
            round_funds_subaccount: None,
            round_funds_total,
            ledger_id,
            token,
            date_initialized: now_millis(),
            total_neuron_maturity,
            payments,
            round_status: PaymentRoundStatus::Pending,
        }
    }

    /// converts a u16 to a valid sub account
    /// payment round sub accounts should always have their ids at the END of a 32 byte array of 0's
    pub fn get_payment_round_sub_account_id(&self) -> Subaccount {
        let mut subaccount: [u8; 32] = [0; 32];
        // u16 -> bytes
        let num_bytes: [u8; 2] = self.id.to_be_bytes();
        // add u16 bytes to end of 32 byte array
        subaccount[32 - 2..].copy_from_slice(&num_bytes);

        Subaccount(subaccount)
    }
}

#[derive(Serialize, Deserialize, CandidType, PartialEq, Eq, Debug, Clone)]
pub enum PaymentRoundStatus {
    Pending,
    InProgress,
    CompletedFull, // all payments completed successfully
    CompletedPartial, // some payments completed and some failed
    Failed(String),
}

#[derive(Serialize, Deserialize, CandidType, PartialEq, Eq, Debug, Clone)]
pub enum PaymentStatus {
    Pending,
    Triggered,
    Completed,
    Failed(String),
}

impl Storable for PaymentRound {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }
    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(&bytes, Self).unwrap()
    }
    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE,
        is_fixed_size: false,
    };
}
