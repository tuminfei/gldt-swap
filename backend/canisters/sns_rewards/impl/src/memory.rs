use ic_stable_structures::{
    memory_manager::{ MemoryId, MemoryManager, VirtualMemory },
    DefaultMemoryImpl,
};

const UPGRADES: MemoryId = MemoryId::new(0);
const MATURITY_HISTORY: MemoryId = MemoryId::new(1);
const USER_REWARD_SUB_ACCOUNT : MemoryId = MemoryId::new(2);

// const EVENT_LOGS_INDEX_MEM_ID: MemoryId = MemoryId::new(1);
// const EVENT_LOGS_DATA_MEM_ID: MemoryId = MemoryId::new(2);

pub type VM = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static MEMORY_MANAGER: MemoryManager<DefaultMemoryImpl> = MemoryManager::init(
        DefaultMemoryImpl::default()
    );
}

pub fn get_upgrades_memory() -> VM {
    get_memory(UPGRADES)
}

pub fn get_maturity_history_memory() -> VM {
    get_memory(MATURITY_HISTORY)
}

pub fn get_user_reward_accounts() -> VM {
    get_memory(USER_REWARD_SUB_ACCOUNT)
}

fn get_memory(id: MemoryId) -> VM {
    MEMORY_MANAGER.with(|m| m.get(id))
}

