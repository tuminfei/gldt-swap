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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchTokenMetrics: function() { return /* binding */ fetchTokenMetrics; },\n/* harmony export */   useTokenMetrics: function() { return /* binding */ useTokenMetrics; }\n/* harmony export */ });\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/../../node_modules/@tanstack/react-query/build/modern/useQuery.js\");\n/* harmony import */ var _dfinity_agent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dfinity/agent */ \"(app-pages-browser)/./node_modules/@dfinity/agent/lib/esm/index.js\");\n/* harmony import */ var _data_canisters_gold_did__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/canisters/gold/did */ \"(app-pages-browser)/./src/data/canisters/gold/did.js\");\n/* harmony import */ var _data_canisters_ledger_did__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/canisters/ledger/did */ \"(app-pages-browser)/./src/data/canisters/ledger/did.js\");\n/* harmony import */ var _dfinity_principal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @dfinity/principal */ \"(app-pages-browser)/./node_modules/@dfinity/principal/lib/esm/index.js\");\n\n\n\n\n\n// Load environment variables\nconst goldTokenCanisters = {\n    \"1g\": {\n        canisterId: \"obapm-2iaaa-aaaak-qcgca-cai\",\n        weightInGrams: BigInt(1)\n    },\n    \"10g\": {\n        canisterId: \"xyo2o-gyaaa-aaaal-qb55a-cai\",\n        weightInGrams: BigInt(10)\n    }\n};\nconst swapCanisterId = \"m45be-jaaaa-aaaak-qcgnq-cai\";\nconst gldtLedgerCanisterId = \"6uad6-fqaaa-aaaam-abovq-cai\";\nconst fetchTokenMetrics = async ()=>{\n    try {\n        const agent = new _dfinity_agent__WEBPACK_IMPORTED_MODULE_0__.HttpAgent({\n            host: \"https://ic0.app\"\n        });\n        const swapCanisterPrincipal = _dfinity_principal__WEBPACK_IMPORTED_MODULE_3__.Principal.fromText(swapCanisterId);\n        // Fetch gold price\n        const response = await fetch(\"https://teiwz-pqaaa-aaaap-ag7hq-cai.raw.icp0.io/gold_nft_metrics\");\n        if (!response.ok) {\n            throw new Error(\"Failed to fetch gold price\");\n        }\n        const data = await response.json();\n        const gold_price = parseFloat(data.gold_price);\n        console.log(\"Gold price:\", gold_price);\n        let total_gold_grams = BigInt(0);\n        // Calculate total grams of locked gold\n        for (const { canisterId, weightInGrams } of Object.values(goldTokenCanisters)){\n            const actor = _dfinity_agent__WEBPACK_IMPORTED_MODULE_0__.Actor.createActor(_data_canisters_gold_did__WEBPACK_IMPORTED_MODULE_1__.idlFactory, {\n                agent,\n                canisterId\n            });\n            // Use the `Account` object\n            const account = {\n                owner: swapCanisterPrincipal,\n                subaccount: []\n            };\n            const accounts = [\n                account\n            ];\n            // Call `icrc7_balance_of`\n            const balances = await actor.icrc7_balance_of(accounts);\n            console.log(\"Balances :\", balances, goldTokenCanisters);\n            for (const balance of balances){\n                total_gold_grams += balance * weightInGrams;\n            }\n        }\n        const total_gold_kg = Number(total_gold_grams) / 1000;\n        // Create actor for Ledger\n        const ledgerActor = _dfinity_agent__WEBPACK_IMPORTED_MODULE_0__.Actor.createActor(_data_canisters_ledger_did__WEBPACK_IMPORTED_MODULE_2__.idlFactory, {\n            agent,\n            canisterId: gldtLedgerCanisterId\n        });\n        // Call `icrc7_total_supply`\n        const totalSupply = await ledgerActor.icrc1_total_supply();\n        const totalSupplyTokens = Number(totalSupply) / 1e8;\n        const tvl = totalSupplyTokens * gold_price;\n        return {\n            gold_price,\n            total_gold_grams: total_gold_grams.toString(),\n            total_gold_kg,\n            tvl\n        };\n    } catch (error) {\n        console.error(\"Error fetching token metrics:\", error);\n        throw error;\n    }\n};\nconst useTokenMetrics = ()=>{\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.useQuery)({\n        queryKey: [\n            \"tokenMetrics\"\n        ],\n        queryFn: fetchTokenMetrics,\n        staleTime: 5 * 60 * 1000,\n        refetchOnWindowFocus: false\n    });\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VUb2tlbk1ldHJpY3MudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFpRDtBQUNDO0FBQ3lCO0FBQ0U7QUFDOUI7QUFHL0MsNkJBQTZCO0FBQzdCLE1BQU1PLHFCQUFxQjtJQUN6QixNQUFNO1FBQ0pDLFlBQVlDLDZCQUFtQztRQUMvQ0csZUFBZUMsT0FBTztJQUN4QjtJQUNBLE9BQU87UUFDTEwsWUFBWUMsNkJBQW9DO1FBQ2hERyxlQUFlQyxPQUFPO0lBQ3hCO0FBU0Y7QUFFQSxNQUFNRSxpQkFBaUJOLDZCQUF3QztBQUMvRCxNQUFNUSx1QkFBdUJSLDZCQUErQztBQVNyRSxNQUFNVSxvQkFBb0I7SUFDL0IsSUFBSTtRQUNGLE1BQU1DLFFBQVEsSUFBSWxCLHFEQUFTQSxDQUFDO1lBQUVtQixNQUFNO1FBQWtCO1FBQ3RELE1BQU1DLHdCQUF3QmhCLHlEQUFTQSxDQUFDaUIsUUFBUSxDQUFDUjtRQUVqRCxtQkFBbUI7UUFDbkIsTUFBTVMsV0FBVyxNQUFNQyxNQUNyQjtRQUVGLElBQUksQ0FBQ0QsU0FBU0UsRUFBRSxFQUFFO1lBQ2hCLE1BQU0sSUFBSUMsTUFBTTtRQUNsQjtRQUNBLE1BQU1DLE9BQU8sTUFBTUosU0FBU0ssSUFBSTtRQUNoQyxNQUFNQyxhQUFhQyxXQUFXSCxLQUFLRSxVQUFVO1FBRTdDRSxRQUFRQyxHQUFHLENBQUMsZUFBZUg7UUFFM0IsSUFBSUksbUJBQW1CckIsT0FBTztRQUU5Qix1Q0FBdUM7UUFDdkMsS0FBSyxNQUFNLEVBQUVMLFVBQVUsRUFBRUksYUFBYSxFQUFFLElBQUl1QixPQUFPQyxNQUFNLENBQ3ZEN0Isb0JBQ0M7WUFDRCxNQUFNOEIsUUFBUXBDLGlEQUFLQSxDQUFDcUMsV0FBVyxDQUFDbEMsZ0VBQWVBLEVBQUU7Z0JBQy9DZ0I7Z0JBQ0FaO1lBQ0Y7WUFFQSwyQkFBMkI7WUFDM0IsTUFBTStCLFVBQW1CO2dCQUN2QkMsT0FBT2xCO2dCQUNQbUIsWUFBWSxFQUFFO1lBQ2hCO1lBRUEsTUFBTUMsV0FBc0I7Z0JBQUNIO2FBQVE7WUFFckMsMEJBQTBCO1lBQzFCLE1BQU1JLFdBQVksTUFBTU4sTUFBTU8sZ0JBQWdCLENBQUNGO1lBQy9DVixRQUFRQyxHQUFHLENBQUMsY0FBY1UsVUFBVXBDO1lBRXBDLEtBQUssTUFBTXNDLFdBQVdGLFNBQVU7Z0JBQzlCVCxvQkFBb0JXLFVBQVVqQztZQUNoQztRQUNGO1FBRUEsTUFBTWtDLGdCQUFnQkMsT0FBT2Isb0JBQW9CO1FBRWpELDBCQUEwQjtRQUMxQixNQUFNYyxjQUFjL0MsaURBQUtBLENBQUNxQyxXQUFXLENBQUNqQyxrRUFBZUEsRUFBRTtZQUNyRGU7WUFDQVosWUFBWVM7UUFDZDtRQUVBLDRCQUE0QjtRQUM1QixNQUFNZ0MsY0FBZSxNQUFNRCxZQUFZRSxrQkFBa0I7UUFDekQsTUFBTUMsb0JBQW9CSixPQUFPRSxlQUFlO1FBRWhELE1BQU1HLE1BQU1ELG9CQUFvQnJCO1FBRWhDLE9BQU87WUFDTEE7WUFDQUksa0JBQWtCQSxpQkFBaUJtQixRQUFRO1lBQzNDUDtZQUNBTTtRQUNGO0lBQ0YsRUFBRSxPQUFPRSxPQUFPO1FBQ2R0QixRQUFRc0IsS0FBSyxDQUFDLGlDQUFpQ0E7UUFDL0MsTUFBTUE7SUFDUjtBQUNGLEVBQUU7QUFFSyxNQUFNQyxrQkFBa0I7SUFDN0IsT0FBT3ZELCtEQUFRQSxDQUFlO1FBQzVCd0QsVUFBVTtZQUFDO1NBQWU7UUFDMUJDLFNBQVN0QztRQUNUdUMsV0FBVyxJQUFJLEtBQUs7UUFDcEJDLHNCQUFzQjtJQUN4QjtBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2hvb2tzL3VzZVRva2VuTWV0cmljcy50cz8wYWU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVF1ZXJ5IH0gZnJvbSBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiO1xyXG5pbXBvcnQgeyBBY3RvciwgSHR0cEFnZW50IH0gZnJvbSBcIkBkZmluaXR5L2FnZW50XCI7XHJcbmltcG9ydCB7IGlkbEZhY3RvcnkgYXMgaWNyYzdJZGxGYWN0b3J5IH0gZnJvbSBcIi4uL2RhdGEvY2FuaXN0ZXJzL2dvbGQvZGlkXCI7XHJcbmltcG9ydCB7IGlkbEZhY3RvcnkgYXMgaWNyYzFJZGxGYWN0b3J5IH0gZnJvbSBcIi4uL2RhdGEvY2FuaXN0ZXJzL2xlZGdlci9kaWRcIjtcclxuaW1wb3J0IHsgUHJpbmNpcGFsIH0gZnJvbSBcIkBkZmluaXR5L3ByaW5jaXBhbFwiO1xyXG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSBcIi4uL2RhdGEvY2FuaXN0ZXJzL2dvbGQvaW50ZXJmYWNlcy9nbGRfbmZ0XCI7IC8vIEltcG9ydCB0aGUgQWNjb3VudCBpbnRlcmZhY2VcclxuXHJcbi8vIExvYWQgZW52aXJvbm1lbnQgdmFyaWFibGVzXHJcbmNvbnN0IGdvbGRUb2tlbkNhbmlzdGVycyA9IHtcclxuICBcIjFnXCI6IHtcclxuICAgIGNhbmlzdGVySWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0NBTklTVEVSXzFHISxcclxuICAgIHdlaWdodEluR3JhbXM6IEJpZ0ludCgxKSxcclxuICB9LFxyXG4gIFwiMTBnXCI6IHtcclxuICAgIGNhbmlzdGVySWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0NBTklTVEVSXzEwRyEsXHJcbiAgICB3ZWlnaHRJbkdyYW1zOiBCaWdJbnQoMTApLFxyXG4gIH0sXHJcbiAgLy8gICBcIjEwMGdcIjoge1xyXG4gIC8vICAgICBjYW5pc3RlcklkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19DQU5JU1RFUl8xMDBHISxcclxuICAvLyAgICAgd2VpZ2h0SW5HcmFtczogQmlnSW50KDEwMCksXHJcbiAgLy8gICB9LFxyXG4gIC8vICAgXCIxa2dcIjoge1xyXG4gIC8vICAgICBjYW5pc3RlcklkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19DQU5JU1RFUl8xS0chLFxyXG4gIC8vICAgICB3ZWlnaHRJbkdyYW1zOiBCaWdJbnQoMTAwMCksXHJcbiAgLy8gICB9LFxyXG59O1xyXG5cclxuY29uc3Qgc3dhcENhbmlzdGVySWQgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TV0FQX0NBTklTVEVSX0lEITtcclxuY29uc3QgZ2xkdExlZGdlckNhbmlzdGVySWQgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HTERUX0xFREdFUl9DQU5JU1RFUl9JRCE7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuTWV0cmljcyB7XHJcbiAgZ29sZF9wcmljZTogbnVtYmVyO1xyXG4gIHRvdGFsX2dvbGRfZ3JhbXM6IHN0cmluZztcclxuICB0b3RhbF9nb2xkX2tnOiBudW1iZXI7XHJcbiAgdHZsOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBmZXRjaFRva2VuTWV0cmljcyA9IGFzeW5jICgpOiBQcm9taXNlPFRva2VuTWV0cmljcz4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBhZ2VudCA9IG5ldyBIdHRwQWdlbnQoeyBob3N0OiBcImh0dHBzOi8vaWMwLmFwcFwiIH0pO1xyXG4gICAgY29uc3Qgc3dhcENhbmlzdGVyUHJpbmNpcGFsID0gUHJpbmNpcGFsLmZyb21UZXh0KHN3YXBDYW5pc3RlcklkKTtcclxuXHJcbiAgICAvLyBGZXRjaCBnb2xkIHByaWNlXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICBcImh0dHBzOi8vdGVpd3otcHFhYWEtYWFhYXAtYWc3aHEtY2FpLnJhdy5pY3AwLmlvL2dvbGRfbmZ0X21ldHJpY3NcIlxyXG4gICAgKTtcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIGdvbGQgcHJpY2VcIik7XHJcbiAgICB9XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgY29uc3QgZ29sZF9wcmljZSA9IHBhcnNlRmxvYXQoZGF0YS5nb2xkX3ByaWNlKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIkdvbGQgcHJpY2U6XCIsIGdvbGRfcHJpY2UpO1xyXG5cclxuICAgIGxldCB0b3RhbF9nb2xkX2dyYW1zID0gQmlnSW50KDApO1xyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0b3RhbCBncmFtcyBvZiBsb2NrZWQgZ29sZFxyXG4gICAgZm9yIChjb25zdCB7IGNhbmlzdGVySWQsIHdlaWdodEluR3JhbXMgfSBvZiBPYmplY3QudmFsdWVzKFxyXG4gICAgICBnb2xkVG9rZW5DYW5pc3RlcnNcclxuICAgICkpIHtcclxuICAgICAgY29uc3QgYWN0b3IgPSBBY3Rvci5jcmVhdGVBY3RvcihpY3JjN0lkbEZhY3RvcnksIHtcclxuICAgICAgICBhZ2VudCxcclxuICAgICAgICBjYW5pc3RlcklkLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFVzZSB0aGUgYEFjY291bnRgIG9iamVjdFxyXG4gICAgICBjb25zdCBhY2NvdW50OiBBY2NvdW50ID0ge1xyXG4gICAgICAgIG93bmVyOiBzd2FwQ2FuaXN0ZXJQcmluY2lwYWwsXHJcbiAgICAgICAgc3ViYWNjb3VudDogW10sIC8vIFJlcHJlc2VudHMgTm9uZSBmb3Igc3ViYWNjb3VudFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgYWNjb3VudHM6IEFjY291bnRbXSA9IFthY2NvdW50XTtcclxuXHJcbiAgICAgIC8vIENhbGwgYGljcmM3X2JhbGFuY2Vfb2ZgXHJcbiAgICAgIGNvbnN0IGJhbGFuY2VzID0gKGF3YWl0IGFjdG9yLmljcmM3X2JhbGFuY2Vfb2YoYWNjb3VudHMpKSBhcyBiaWdpbnRbXTtcclxuICAgICAgY29uc29sZS5sb2coXCJCYWxhbmNlcyA6XCIsIGJhbGFuY2VzLCBnb2xkVG9rZW5DYW5pc3RlcnMpO1xyXG5cclxuICAgICAgZm9yIChjb25zdCBiYWxhbmNlIG9mIGJhbGFuY2VzKSB7XHJcbiAgICAgICAgdG90YWxfZ29sZF9ncmFtcyArPSBiYWxhbmNlICogd2VpZ2h0SW5HcmFtcztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRvdGFsX2dvbGRfa2cgPSBOdW1iZXIodG90YWxfZ29sZF9ncmFtcykgLyAxMDAwO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhY3RvciBmb3IgTGVkZ2VyXHJcbiAgICBjb25zdCBsZWRnZXJBY3RvciA9IEFjdG9yLmNyZWF0ZUFjdG9yKGljcmMxSWRsRmFjdG9yeSwge1xyXG4gICAgICBhZ2VudCxcclxuICAgICAgY2FuaXN0ZXJJZDogZ2xkdExlZGdlckNhbmlzdGVySWQsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDYWxsIGBpY3JjN190b3RhbF9zdXBwbHlgXHJcbiAgICBjb25zdCB0b3RhbFN1cHBseSA9IChhd2FpdCBsZWRnZXJBY3Rvci5pY3JjMV90b3RhbF9zdXBwbHkoKSkgYXMgYmlnaW50O1xyXG4gICAgY29uc3QgdG90YWxTdXBwbHlUb2tlbnMgPSBOdW1iZXIodG90YWxTdXBwbHkpIC8gMWU4O1xyXG5cclxuICAgIGNvbnN0IHR2bCA9IHRvdGFsU3VwcGx5VG9rZW5zICogZ29sZF9wcmljZTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBnb2xkX3ByaWNlLFxyXG4gICAgICB0b3RhbF9nb2xkX2dyYW1zOiB0b3RhbF9nb2xkX2dyYW1zLnRvU3RyaW5nKCksXHJcbiAgICAgIHRvdGFsX2dvbGRfa2csXHJcbiAgICAgIHR2bCxcclxuICAgIH07XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyB0b2tlbiBtZXRyaWNzOlwiLCBlcnJvcik7XHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXNlVG9rZW5NZXRyaWNzID0gKCkgPT4ge1xyXG4gIHJldHVybiB1c2VRdWVyeTxUb2tlbk1ldHJpY3M+KHtcclxuICAgIHF1ZXJ5S2V5OiBbXCJ0b2tlbk1ldHJpY3NcIl0sXHJcbiAgICBxdWVyeUZuOiBmZXRjaFRva2VuTWV0cmljcyxcclxuICAgIHN0YWxlVGltZTogNSAqIDYwICogMTAwMCwgLy8gNSBtaW51dGVzXHJcbiAgICByZWZldGNoT25XaW5kb3dGb2N1czogZmFsc2UsXHJcbiAgfSk7XHJcbn07XHJcbiJdLCJuYW1lcyI6WyJ1c2VRdWVyeSIsIkFjdG9yIiwiSHR0cEFnZW50IiwiaWRsRmFjdG9yeSIsImljcmM3SWRsRmFjdG9yeSIsImljcmMxSWRsRmFjdG9yeSIsIlByaW5jaXBhbCIsImdvbGRUb2tlbkNhbmlzdGVycyIsImNhbmlzdGVySWQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQ0FOSVNURVJfMUciLCJ3ZWlnaHRJbkdyYW1zIiwiQmlnSW50IiwiTkVYVF9QVUJMSUNfQ0FOSVNURVJfMTBHIiwic3dhcENhbmlzdGVySWQiLCJORVhUX1BVQkxJQ19TV0FQX0NBTklTVEVSX0lEIiwiZ2xkdExlZGdlckNhbmlzdGVySWQiLCJORVhUX1BVQkxJQ19HTERUX0xFREdFUl9DQU5JU1RFUl9JRCIsImZldGNoVG9rZW5NZXRyaWNzIiwiYWdlbnQiLCJob3N0Iiwic3dhcENhbmlzdGVyUHJpbmNpcGFsIiwiZnJvbVRleHQiLCJyZXNwb25zZSIsImZldGNoIiwib2siLCJFcnJvciIsImRhdGEiLCJqc29uIiwiZ29sZF9wcmljZSIsInBhcnNlRmxvYXQiLCJjb25zb2xlIiwibG9nIiwidG90YWxfZ29sZF9ncmFtcyIsIk9iamVjdCIsInZhbHVlcyIsImFjdG9yIiwiY3JlYXRlQWN0b3IiLCJhY2NvdW50Iiwib3duZXIiLCJzdWJhY2NvdW50IiwiYWNjb3VudHMiLCJiYWxhbmNlcyIsImljcmM3X2JhbGFuY2Vfb2YiLCJiYWxhbmNlIiwidG90YWxfZ29sZF9rZyIsIk51bWJlciIsImxlZGdlckFjdG9yIiwidG90YWxTdXBwbHkiLCJpY3JjMV90b3RhbF9zdXBwbHkiLCJ0b3RhbFN1cHBseVRva2VucyIsInR2bCIsInRvU3RyaW5nIiwiZXJyb3IiLCJ1c2VUb2tlbk1ldHJpY3MiLCJxdWVyeUtleSIsInF1ZXJ5Rm4iLCJzdGFsZVRpbWUiLCJyZWZldGNoT25XaW5kb3dGb2N1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/useTokenMetrics.ts\n"));

/***/ })

});