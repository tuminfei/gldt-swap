use crate::State;

mod init;
mod post_upgrade;
mod pre_upgrade;

pub fn init_canister(state: State) {
    crate::state::init_state(state);
    crate::jobs::start();
}
