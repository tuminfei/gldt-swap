#!/usr/bin/env bash

#mkdir -pv canister/gldt_core/target &&
cargo build --target wasm32-unknown-unknown --target-dir canister/$1/target --release --locked -p $1 &&
ic-wasm canister/$1/target/wasm32-unknown-unknown/release/$1.wasm -o canister/$1/target/wasm32-unknown-unknown/release/${1}_canister.wasm shrink --optimize O3
gzip -9 -v -c canister/$1/target/wasm32-unknown-unknown/release/${1}_canister.wasm >canister/$1/target/wasm32-unknown-unknown/release/${1}_canister.wasm.gz &&
gzip -v -t canister/$1/target/wasm32-unknown-unknown/release/${1}_canister.wasm.gz &&
echo "$1 successfully built, optimized and compressed"
