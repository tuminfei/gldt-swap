#!/usr/bin/env bash


###############
### FOR STAGING
###############

./scripts/build_canister.sh gldt_swap &&
./scripts/generate_did.sh gldt_swap &&
./scripts/build_canister.sh gldt_swap &&
# dfx deploy --network staging sns_rewards --argument '(record {test_mode = true})' --mode reinstall
dfx deploy --network staging gldt_swap --argument "(variant { Init = record {
    test_mode = true;
    version = record {
     major = 0:nat32;
     minor = 0:nat32;
     patch = 0:nat32;
    };
    commit_hash = \"stagingcommit\";
    gldt_ledger_id = principal \"6uad6-fqaaa-aaaam-abovq-cai\";
    gldnft_canisters = vec {
      record {
        0 = principal \"obapm-2iaaa-aaaak-qcgca-cai\";
        1 = record {
          grams = 1;
        };
      };
      record {
        0 = principal \"xyo2o-gyaaa-aaaal-qb55a-cai\";
        1 = record {
          grams = 10;
        };
      };
      record {
       0 = principal \"hvanv-3iaaa-aaaap-qkfwq-cai\";
       1 = record {
         grams = 100;
       };
      };
      record {
       0 = principal \"vnpd6-iqaaa-aaaao-qbelq-cai\";
       1 = record {
         grams = 1000;
       };
      };
    };
    ogy_ledger_id = principal \"j5naj-nqaaa-aaaal-ajc7q-cai\";
    authorized_principals = vec { principal \"465sx-szz6o-idcax-nrjhv-hprrp-qqx5e-7mqwr-wadib-uo7ap-lofbe-dae\" };
}})" --mode reinstall

