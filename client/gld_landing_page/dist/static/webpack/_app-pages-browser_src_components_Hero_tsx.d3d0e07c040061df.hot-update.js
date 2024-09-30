"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("_app-pages-browser_src_components_Hero_tsx",{

/***/ "(app-pages-browser)/./src/hooks/useTokenMetrics.ts":
/*!**************************************!*\
  !*** ./src/hooks/useTokenMetrics.ts ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchTokenMetrics: function() { return /* binding */ fetchTokenMetrics; },\n/* harmony export */   useTokenMetrics: function() { return /* binding */ useTokenMetrics; }\n/* harmony export */ });\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/../../node_modules/@tanstack/react-query/build/modern/useQuery.js\");\n/* harmony import */ var _dfinity_agent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dfinity/agent */ \"(app-pages-browser)/./node_modules/@dfinity/agent/lib/esm/index.js\");\n/* harmony import */ var _data_canisters_gold_did__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/canisters/gold/did */ \"(app-pages-browser)/./src/data/canisters/gold/did.js\");\n/* harmony import */ var _data_canisters_ledger_did__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/canisters/ledger/did */ \"(app-pages-browser)/./src/data/canisters/ledger/did.js\");\n/* harmony import */ var _dfinity_principal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @dfinity/principal */ \"(app-pages-browser)/./node_modules/@dfinity/principal/lib/esm/index.js\");\n\n\n\n\n\n// Load environment variables\nconst goldTokenCanisters = {\n    \"1g\": {\n        canisterId: \"obapm-2iaaa-aaaak-qcgca-cai\",\n        weightInGrams: BigInt(1)\n    },\n    \"10g\": {\n        canisterId: \"xyo2o-gyaaa-aaaal-qb55a-cai\",\n        weightInGrams: BigInt(10)\n    },\n    \"100g\": {\n        canisterId: \"zhfjc-liaaa-aaaal-acgja-cai\",\n        weightInGrams: BigInt(100)\n    },\n    \"1kg\": {\n        canisterId: \"7i7jl-6qaaa-aaaam-abjma-cai\",\n        weightInGrams: BigInt(1000)\n    }\n};\nconst swapCanisterId = \"m45be-jaaaa-aaaak-qcgnq-cai\";\nconst gldtLedgerCanisterId = \"6uad6-fqaaa-aaaam-abovq-cai\";\nconst fetchTokenMetrics = async ()=>{\n    try {\n        const agent = new _dfinity_agent__WEBPACK_IMPORTED_MODULE_0__.HttpAgent({\n            host: \"https://ic0.app\"\n        });\n        const swapCanisterPrincipal = _dfinity_principal__WEBPACK_IMPORTED_MODULE_3__.Principal.fromText(swapCanisterId);\n        // Fetch gold price\n        const response = await fetch(\"https://teiwz-pqaaa-aaaap-ag7hq-cai.raw.icp0.io/gold_nft_metrics\");\n        if (!response.ok) {\n            throw new Error(\"Failed to fetch gold price\");\n        }\n        const data = await response.json();\n        const gold_price = parseFloat(data.gold_price);\n        console.log(\"Gold price:\", gold_price);\n        let total_gold_grams = BigInt(0);\n        // Calculate total grams of locked gold\n        for (const { canisterId, weightInGrams } of Object.values(goldTokenCanisters)){\n            const actor = _dfinity_agent__WEBPACK_IMPORTED_MODULE_0__.Actor.createActor(_data_canisters_gold_did__WEBPACK_IMPORTED_MODULE_1__.idlFactory, {\n                agent,\n                canisterId\n            });\n            // Use the `Account` object\n            const account = {\n                owner: swapCanisterPrincipal,\n                subaccount: []\n            };\n            const accounts = [\n                account\n            ];\n            // Call `icrc7_balance_of`\n            const balances = await actor.icrc7_balance_of(accounts);\n            console.log(\"Balances :\", balances, goldTokenCanisters);\n            for (const balance of balances){\n                total_gold_grams += balance * weightInGrams;\n            }\n        }\n        const total_gold_kg = Number(total_gold_grams) / 1000;\n        // Create actor for Ledger\n        const ledgerActor = _dfinity_agent__WEBPACK_IMPORTED_MODULE_0__.Actor.createActor(_data_canisters_ledger_did__WEBPACK_IMPORTED_MODULE_2__.idlFactory, {\n            agent,\n            canisterId: gldtLedgerCanisterId\n        });\n        // Call `icrc7_total_supply`\n        const totalSupply = await ledgerActor.icrc7_total_supply();\n        const totalSupplyTokens = Number(totalSupply) / 1e8;\n        const tvl = totalSupplyTokens * gold_price;\n        return {\n            gold_price,\n            total_gold_grams: total_gold_grams.toString(),\n            total_gold_kg,\n            tvl\n        };\n    } catch (error) {\n        console.error(\"Error fetching token metrics:\", error);\n        throw error;\n    }\n};\nconst useTokenMetrics = ()=>{\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.useQuery)({\n        queryKey: [\n            \"tokenMetrics\"\n        ],\n        queryFn: fetchTokenMetrics,\n        staleTime: 5 * 60 * 1000,\n        refetchOnWindowFocus: false\n    });\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VUb2tlbk1ldHJpY3MudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFpRDtBQUNDO0FBQ3lCO0FBQ0U7QUFDOUI7QUFHL0MsNkJBQTZCO0FBQzdCLE1BQU1PLHFCQUFxQjtJQUN6QixNQUFNO1FBQ0pDLFlBQVlDLDZCQUFtQztRQUMvQ0csZUFBZUMsT0FBTztJQUN4QjtJQUNBLE9BQU87UUFDTEwsWUFBWUMsNkJBQW9DO1FBQ2hERyxlQUFlQyxPQUFPO0lBQ3hCO0lBQ0EsUUFBUTtRQUNOTCxZQUFZQyw2QkFBcUM7UUFDakRHLGVBQWVDLE9BQU87SUFDeEI7SUFDQSxPQUFPO1FBQ0xMLFlBQVlDLDZCQUFvQztRQUNoREcsZUFBZUMsT0FBTztJQUN4QjtBQUNGO0FBRUEsTUFBTUksaUJBQWlCUiw2QkFBd0M7QUFDL0QsTUFBTVUsdUJBQXVCViw2QkFBK0M7QUFTckUsTUFBTVksb0JBQW9CO0lBQy9CLElBQUk7UUFDRixNQUFNQyxRQUFRLElBQUlwQixxREFBU0EsQ0FBQztZQUFFcUIsTUFBTTtRQUFrQjtRQUN0RCxNQUFNQyx3QkFBd0JsQix5REFBU0EsQ0FBQ21CLFFBQVEsQ0FBQ1I7UUFFakQsbUJBQW1CO1FBQ25CLE1BQU1TLFdBQVcsTUFBTUMsTUFDckI7UUFFRixJQUFJLENBQUNELFNBQVNFLEVBQUUsRUFBRTtZQUNoQixNQUFNLElBQUlDLE1BQU07UUFDbEI7UUFDQSxNQUFNQyxPQUFPLE1BQU1KLFNBQVNLLElBQUk7UUFDaEMsTUFBTUMsYUFBYUMsV0FBV0gsS0FBS0UsVUFBVTtRQUU3Q0UsUUFBUUMsR0FBRyxDQUFDLGVBQWVIO1FBRTNCLElBQUlJLG1CQUFtQnZCLE9BQU87UUFFOUIsdUNBQXVDO1FBQ3ZDLEtBQUssTUFBTSxFQUFFTCxVQUFVLEVBQUVJLGFBQWEsRUFBRSxJQUFJeUIsT0FBT0MsTUFBTSxDQUN2RC9CLG9CQUNDO1lBQ0QsTUFBTWdDLFFBQVF0QyxpREFBS0EsQ0FBQ3VDLFdBQVcsQ0FBQ3BDLGdFQUFlQSxFQUFFO2dCQUMvQ2tCO2dCQUNBZDtZQUNGO1lBRUEsMkJBQTJCO1lBQzNCLE1BQU1pQyxVQUFtQjtnQkFDdkJDLE9BQU9sQjtnQkFDUG1CLFlBQVksRUFBRTtZQUNoQjtZQUVBLE1BQU1DLFdBQXNCO2dCQUFDSDthQUFRO1lBRXJDLDBCQUEwQjtZQUMxQixNQUFNSSxXQUFZLE1BQU1OLE1BQU1PLGdCQUFnQixDQUFDRjtZQUMvQ1YsUUFBUUMsR0FBRyxDQUFDLGNBQWNVLFVBQVV0QztZQUVwQyxLQUFLLE1BQU13QyxXQUFXRixTQUFVO2dCQUM5QlQsb0JBQW9CVyxVQUFVbkM7WUFDaEM7UUFDRjtRQUVBLE1BQU1vQyxnQkFBZ0JDLE9BQU9iLG9CQUFvQjtRQUVqRCwwQkFBMEI7UUFDMUIsTUFBTWMsY0FBY2pELGlEQUFLQSxDQUFDdUMsV0FBVyxDQUFDbkMsa0VBQWVBLEVBQUU7WUFDckRpQjtZQUNBZCxZQUFZVztRQUNkO1FBRUEsNEJBQTRCO1FBQzVCLE1BQU1nQyxjQUFlLE1BQU1ELFlBQVlFLGtCQUFrQjtRQUN6RCxNQUFNQyxvQkFBb0JKLE9BQU9FLGVBQWU7UUFFaEQsTUFBTUcsTUFBTUQsb0JBQW9CckI7UUFFaEMsT0FBTztZQUNMQTtZQUNBSSxrQkFBa0JBLGlCQUFpQm1CLFFBQVE7WUFDM0NQO1lBQ0FNO1FBQ0Y7SUFDRixFQUFFLE9BQU9FLE9BQU87UUFDZHRCLFFBQVFzQixLQUFLLENBQUMsaUNBQWlDQTtRQUMvQyxNQUFNQTtJQUNSO0FBQ0YsRUFBRTtBQUVLLE1BQU1DLGtCQUFrQjtJQUM3QixPQUFPekQsK0RBQVFBLENBQWU7UUFDNUIwRCxVQUFVO1lBQUM7U0FBZTtRQUMxQkMsU0FBU3RDO1FBQ1R1QyxXQUFXLElBQUksS0FBSztRQUNwQkMsc0JBQXNCO0lBQ3hCO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvaG9va3MvdXNlVG9rZW5NZXRyaWNzLnRzPzBhZTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUXVlcnkgfSBmcm9tIFwiQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5XCI7XHJcbmltcG9ydCB7IEFjdG9yLCBIdHRwQWdlbnQgfSBmcm9tIFwiQGRmaW5pdHkvYWdlbnRcIjtcclxuaW1wb3J0IHsgaWRsRmFjdG9yeSBhcyBpY3JjN0lkbEZhY3RvcnkgfSBmcm9tIFwiLi4vZGF0YS9jYW5pc3RlcnMvZ29sZC9kaWRcIjtcclxuaW1wb3J0IHsgaWRsRmFjdG9yeSBhcyBpY3JjMUlkbEZhY3RvcnkgfSBmcm9tIFwiLi4vZGF0YS9jYW5pc3RlcnMvbGVkZ2VyL2RpZFwiO1xyXG5pbXBvcnQgeyBQcmluY2lwYWwgfSBmcm9tIFwiQGRmaW5pdHkvcHJpbmNpcGFsXCI7XHJcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tIFwiLi4vZGF0YS9jYW5pc3RlcnMvZ29sZC9pbnRlcmZhY2VzL2dsZF9uZnRcIjsgLy8gSW1wb3J0IHRoZSBBY2NvdW50IGludGVyZmFjZVxyXG5cclxuLy8gTG9hZCBlbnZpcm9ubWVudCB2YXJpYWJsZXNcclxuY29uc3QgZ29sZFRva2VuQ2FuaXN0ZXJzID0ge1xyXG4gIFwiMWdcIjoge1xyXG4gICAgY2FuaXN0ZXJJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQ0FOSVNURVJfMUchLFxyXG4gICAgd2VpZ2h0SW5HcmFtczogQmlnSW50KDEpLFxyXG4gIH0sXHJcbiAgXCIxMGdcIjoge1xyXG4gICAgY2FuaXN0ZXJJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQ0FOSVNURVJfMTBHISxcclxuICAgIHdlaWdodEluR3JhbXM6IEJpZ0ludCgxMCksXHJcbiAgfSxcclxuICBcIjEwMGdcIjoge1xyXG4gICAgY2FuaXN0ZXJJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQ0FOSVNURVJfMTAwRyEsXHJcbiAgICB3ZWlnaHRJbkdyYW1zOiBCaWdJbnQoMTAwKSxcclxuICB9LFxyXG4gIFwiMWtnXCI6IHtcclxuICAgIGNhbmlzdGVySWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0NBTklTVEVSXzFLRyEsXHJcbiAgICB3ZWlnaHRJbkdyYW1zOiBCaWdJbnQoMTAwMCksXHJcbiAgfSxcclxufTtcclxuXHJcbmNvbnN0IHN3YXBDYW5pc3RlcklkID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1dBUF9DQU5JU1RFUl9JRCE7XHJcbmNvbnN0IGdsZHRMZWRnZXJDYW5pc3RlcklkID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR0xEVF9MRURHRVJfQ0FOSVNURVJfSUQhO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUb2tlbk1ldHJpY3Mge1xyXG4gIGdvbGRfcHJpY2U6IG51bWJlcjtcclxuICB0b3RhbF9nb2xkX2dyYW1zOiBzdHJpbmc7XHJcbiAgdG90YWxfZ29sZF9rZzogbnVtYmVyO1xyXG4gIHR2bDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZmV0Y2hUb2tlbk1ldHJpY3MgPSBhc3luYyAoKTogUHJvbWlzZTxUb2tlbk1ldHJpY3M+ID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgYWdlbnQgPSBuZXcgSHR0cEFnZW50KHsgaG9zdDogXCJodHRwczovL2ljMC5hcHBcIiB9KTtcclxuICAgIGNvbnN0IHN3YXBDYW5pc3RlclByaW5jaXBhbCA9IFByaW5jaXBhbC5mcm9tVGV4dChzd2FwQ2FuaXN0ZXJJZCk7XHJcblxyXG4gICAgLy8gRmV0Y2ggZ29sZCBwcmljZVxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgICAgXCJodHRwczovL3RlaXd6LXBxYWFhLWFhYWFwLWFnN2hxLWNhaS5yYXcuaWNwMC5pby9nb2xkX25mdF9tZXRyaWNzXCJcclxuICAgICk7XHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCBnb2xkIHByaWNlXCIpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIGNvbnN0IGdvbGRfcHJpY2UgPSBwYXJzZUZsb2F0KGRhdGEuZ29sZF9wcmljZSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJHb2xkIHByaWNlOlwiLCBnb2xkX3ByaWNlKTtcclxuXHJcbiAgICBsZXQgdG90YWxfZ29sZF9ncmFtcyA9IEJpZ0ludCgwKTtcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdG90YWwgZ3JhbXMgb2YgbG9ja2VkIGdvbGRcclxuICAgIGZvciAoY29uc3QgeyBjYW5pc3RlcklkLCB3ZWlnaHRJbkdyYW1zIH0gb2YgT2JqZWN0LnZhbHVlcyhcclxuICAgICAgZ29sZFRva2VuQ2FuaXN0ZXJzXHJcbiAgICApKSB7XHJcbiAgICAgIGNvbnN0IGFjdG9yID0gQWN0b3IuY3JlYXRlQWN0b3IoaWNyYzdJZGxGYWN0b3J5LCB7XHJcbiAgICAgICAgYWdlbnQsXHJcbiAgICAgICAgY2FuaXN0ZXJJZCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBVc2UgdGhlIGBBY2NvdW50YCBvYmplY3RcclxuICAgICAgY29uc3QgYWNjb3VudDogQWNjb3VudCA9IHtcclxuICAgICAgICBvd25lcjogc3dhcENhbmlzdGVyUHJpbmNpcGFsLFxyXG4gICAgICAgIHN1YmFjY291bnQ6IFtdLCAvLyBSZXByZXNlbnRzIE5vbmUgZm9yIHN1YmFjY291bnRcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IGFjY291bnRzOiBBY2NvdW50W10gPSBbYWNjb3VudF07XHJcblxyXG4gICAgICAvLyBDYWxsIGBpY3JjN19iYWxhbmNlX29mYFxyXG4gICAgICBjb25zdCBiYWxhbmNlcyA9IChhd2FpdCBhY3Rvci5pY3JjN19iYWxhbmNlX29mKGFjY291bnRzKSkgYXMgYmlnaW50W107XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQmFsYW5jZXMgOlwiLCBiYWxhbmNlcywgZ29sZFRva2VuQ2FuaXN0ZXJzKTtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgYmFsYW5jZSBvZiBiYWxhbmNlcykge1xyXG4gICAgICAgIHRvdGFsX2dvbGRfZ3JhbXMgKz0gYmFsYW5jZSAqIHdlaWdodEluR3JhbXM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0b3RhbF9nb2xkX2tnID0gTnVtYmVyKHRvdGFsX2dvbGRfZ3JhbXMpIC8gMTAwMDtcclxuXHJcbiAgICAvLyBDcmVhdGUgYWN0b3IgZm9yIExlZGdlclxyXG4gICAgY29uc3QgbGVkZ2VyQWN0b3IgPSBBY3Rvci5jcmVhdGVBY3RvcihpY3JjMUlkbEZhY3RvcnksIHtcclxuICAgICAgYWdlbnQsXHJcbiAgICAgIGNhbmlzdGVySWQ6IGdsZHRMZWRnZXJDYW5pc3RlcklkLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2FsbCBgaWNyYzdfdG90YWxfc3VwcGx5YFxyXG4gICAgY29uc3QgdG90YWxTdXBwbHkgPSAoYXdhaXQgbGVkZ2VyQWN0b3IuaWNyYzdfdG90YWxfc3VwcGx5KCkpIGFzIGJpZ2ludDtcclxuICAgIGNvbnN0IHRvdGFsU3VwcGx5VG9rZW5zID0gTnVtYmVyKHRvdGFsU3VwcGx5KSAvIDFlODtcclxuXHJcbiAgICBjb25zdCB0dmwgPSB0b3RhbFN1cHBseVRva2VucyAqIGdvbGRfcHJpY2U7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZ29sZF9wcmljZSxcclxuICAgICAgdG90YWxfZ29sZF9ncmFtczogdG90YWxfZ29sZF9ncmFtcy50b1N0cmluZygpLFxyXG4gICAgICB0b3RhbF9nb2xkX2tnLFxyXG4gICAgICB0dmwsXHJcbiAgICB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgdG9rZW4gbWV0cmljczpcIiwgZXJyb3IpO1xyXG4gICAgdGhyb3cgZXJyb3I7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZVRva2VuTWV0cmljcyA9ICgpID0+IHtcclxuICByZXR1cm4gdXNlUXVlcnk8VG9rZW5NZXRyaWNzPih7XHJcbiAgICBxdWVyeUtleTogW1widG9rZW5NZXRyaWNzXCJdLFxyXG4gICAgcXVlcnlGbjogZmV0Y2hUb2tlbk1ldHJpY3MsXHJcbiAgICBzdGFsZVRpbWU6IDUgKiA2MCAqIDEwMDAsIC8vIDUgbWludXRlc1xyXG4gICAgcmVmZXRjaE9uV2luZG93Rm9jdXM6IGZhbHNlLFxyXG4gIH0pO1xyXG59O1xyXG4iXSwibmFtZXMiOlsidXNlUXVlcnkiLCJBY3RvciIsIkh0dHBBZ2VudCIsImlkbEZhY3RvcnkiLCJpY3JjN0lkbEZhY3RvcnkiLCJpY3JjMUlkbEZhY3RvcnkiLCJQcmluY2lwYWwiLCJnb2xkVG9rZW5DYW5pc3RlcnMiLCJjYW5pc3RlcklkIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0NBTklTVEVSXzFHIiwid2VpZ2h0SW5HcmFtcyIsIkJpZ0ludCIsIk5FWFRfUFVCTElDX0NBTklTVEVSXzEwRyIsIk5FWFRfUFVCTElDX0NBTklTVEVSXzEwMEciLCJORVhUX1BVQkxJQ19DQU5JU1RFUl8xS0ciLCJzd2FwQ2FuaXN0ZXJJZCIsIk5FWFRfUFVCTElDX1NXQVBfQ0FOSVNURVJfSUQiLCJnbGR0TGVkZ2VyQ2FuaXN0ZXJJZCIsIk5FWFRfUFVCTElDX0dMRFRfTEVER0VSX0NBTklTVEVSX0lEIiwiZmV0Y2hUb2tlbk1ldHJpY3MiLCJhZ2VudCIsImhvc3QiLCJzd2FwQ2FuaXN0ZXJQcmluY2lwYWwiLCJmcm9tVGV4dCIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwiZGF0YSIsImpzb24iLCJnb2xkX3ByaWNlIiwicGFyc2VGbG9hdCIsImNvbnNvbGUiLCJsb2ciLCJ0b3RhbF9nb2xkX2dyYW1zIiwiT2JqZWN0IiwidmFsdWVzIiwiYWN0b3IiLCJjcmVhdGVBY3RvciIsImFjY291bnQiLCJvd25lciIsInN1YmFjY291bnQiLCJhY2NvdW50cyIsImJhbGFuY2VzIiwiaWNyYzdfYmFsYW5jZV9vZiIsImJhbGFuY2UiLCJ0b3RhbF9nb2xkX2tnIiwiTnVtYmVyIiwibGVkZ2VyQWN0b3IiLCJ0b3RhbFN1cHBseSIsImljcmM3X3RvdGFsX3N1cHBseSIsInRvdGFsU3VwcGx5VG9rZW5zIiwidHZsIiwidG9TdHJpbmciLCJlcnJvciIsInVzZVRva2VuTWV0cmljcyIsInF1ZXJ5S2V5IiwicXVlcnlGbiIsInN0YWxlVGltZSIsInJlZmV0Y2hPbldpbmRvd0ZvY3VzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/useTokenMetrics.ts\n"));

/***/ })

});