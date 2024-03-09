use serde::{ Deserialize, Serialize };
use sns_governance_canister::types::NeuronId;
use types::{ NeuronInfo, TimestampMillis };
use ic_stable_structures::StableBTreeMap;

use crate::memory::{ get_maturity_history_memory, VM };

/// The history of each neuron's maturity.
// NOTE: Stable structures don't need to be serialized, hence the #[serde(skip)].
#[derive(Serialize, Deserialize)]
pub struct MaturityHistory {
    #[serde(skip, default = "init_map")]
    history: StableBTreeMap<(NeuronId, TimestampMillis), NeuronInfo, VM>,
}

fn init_map() -> StableBTreeMap<(NeuronId, TimestampMillis), NeuronInfo, VM> {
    let memory = get_maturity_history_memory();

    StableBTreeMap::init(memory)
}

impl Default for MaturityHistory {
    fn default() -> Self {
        Self { history: init_map() }
    }
}

impl MaturityHistory {
    pub fn insert(&mut self, key: (NeuronId, TimestampMillis), val: NeuronInfo) {
        self.history.insert(key, val);
    }

    pub fn _insert_multiple(&mut self, events: Vec<(NeuronId, TimestampMillis, NeuronInfo)>) {
        for (neuron_id, ts, event) in events {
            self.insert((neuron_id, ts), event);
        }
    }

    pub fn get_maturity_history(
        &self,
        neuron_id: NeuronId,
        len: usize
    ) -> Vec<(TimestampMillis, NeuronInfo)> {
        history_range(&self.history, neuron_id, len).collect()
    }

    pub fn get(&self, size: usize) -> Vec<((NeuronId, TimestampMillis), NeuronInfo)> {
        self.history.iter().take(size).collect()
    }

    pub fn get_keys(&self) -> Vec<NeuronId> {
        self.history.iter().map(|(key, _)| key.0.clone()).collect()
    }

    pub fn get_latest_entry(&self, neuron_id: &NeuronId) -> Option<(TimestampMillis, NeuronInfo)> {
        // Filter the history entries for the specified neuron ID
        let filtered_entries = self.history.iter()
            .filter(|((id, _), _)| id == neuron_id)
            .map(|((_, ts), info)| (ts, info));

        // Find the entry with the maximum timestamp (latest)
        filtered_entries.max_by_key(|&(ts, _)| ts.clone())
    }

    pub fn set_rewarded_on_latest_entry(&mut self, neuron_id: &NeuronId, amount_rewarded: u64) {
        let entry = self.get_latest_entry(neuron_id);
       
        match entry {
            Some((ts, mut neuron_info)) => {
                neuron_info.rewarded_maturity = amount_rewarded;
                self.insert((neuron_id.clone(), ts + 1), neuron_info)
                
            },
            None => {}
        }

    }
}

fn history_range(
    hist: &StableBTreeMap<(NeuronId, TimestampMillis), NeuronInfo, VM>,
    neuron_id: NeuronId,
    len: usize
) -> impl Iterator<Item = (TimestampMillis, NeuronInfo)> + '_ {
    hist.range((neuron_id.clone(), 0)..(neuron_id, u64::MAX))
        .take(len)
        .map(|((_, ts), event)| (ts, event.clone()))
}
