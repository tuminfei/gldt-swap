use candid::{ CandidType, Principal };
use serde::{ Deserialize, Serialize };

mod message_id;
mod proposals;

pub use message_id::*;
pub use proposals::*;

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Default)]
pub struct Empty {}

pub type CanisterId = Principal;
pub type Hash = [u8; 32];
pub type Milliseconds = u64;
pub type NnsNeuronId = u64;
pub type ProposalId = u64;
pub type SnsNeuronId = [u8; 32];
pub type TimestampMillis = u64;
pub type TimestampNanos = u64;
