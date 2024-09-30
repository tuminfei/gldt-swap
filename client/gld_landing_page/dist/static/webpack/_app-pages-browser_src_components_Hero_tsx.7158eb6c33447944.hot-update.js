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

/***/ "(app-pages-browser)/./src/components/Hero.tsx":
/*!*********************************!*\
  !*** ./src/components/Hero.tsx ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ \"(app-pages-browser)/../../node_modules/react-i18next/dist/es/index.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _hooks_useTokenMetrics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/hooks/useTokenMetrics */ \"(app-pages-browser)/./src/hooks/useTokenMetrics.ts\");\n/* eslint-disable @next/next/no-img-element */ /* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst InfoCard = (param)=>{\n    let { iconSrc, iconAlt, text, value, loading } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        className: \"flex h-10 px-4 pl-2 min-w-full md:min-w-0 justify-center items-center rounded-3xl border gap-[8px] mx-2 border-[#D3B872] bg-white\",\n        children: [\n            iconSrc && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: iconSrc,\n                alt: iconAlt,\n                width: 24,\n                height: 24,\n                className: \"w-[24px] h-[24px] flex-shrink-0\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"font-inter font-normal leading-[16px] text-[#262C2E]\",\n                children: text\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 35,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"h-full w-0.5 bg-[#D3B872] rounded-3xl mx-[8px]\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 38,\n                columnNumber: 5\n            }, undefined),\n            loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"loading-skeleton\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 40,\n                columnNumber: 7\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"font-bold\",\n                children: value\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 42,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n        lineNumber: 25,\n        columnNumber: 3\n    }, undefined);\n};\n_c = InfoCard;\nconst Hero = ()=>{\n    _s();\n    const [videoLoaded, setVideoLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);\n    const [canvasVisible, setCanvasVisible] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);\n    const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);\n    const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);\n    const { data, isLoading, error } = (0,_hooks_useTokenMetrics__WEBPACK_IMPORTED_MODULE_4__.useTokenMetrics)();\n    console.log(data);\n    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)(\"hero\");\n    const totalGoldLockedKg = data ? data.total_gold_kg.toFixed(2) : null;\n    const marketCapUSD = data ? \"\".concat(data.tvl.toLocaleString(\"en-US\")) : null;\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        const videoElement = videoRef.current;\n        const canvasElement = canvasRef.current;\n        if (videoElement && canvasElement) {\n            const ctx = canvasElement.getContext(\"2d\");\n            // Lorsque la vidéo a assez de données pour commencer à jouer\n            videoElement.addEventListener(\"loadeddata\", ()=>{\n                // Dessine l'image vidéo sur le canvas\n                if (ctx) {\n                    canvasElement.width = videoElement.videoWidth;\n                    canvasElement.height = videoElement.videoHeight;\n                    ctx.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);\n                }\n            });\n            // Remplace le canvas par la vidéo une fois que la vidéo peut être jouée\n            videoElement.addEventListener(\"canplaythrough\", ()=>{\n                setVideoLoaded(true);\n                setCanvasVisible(false); // Cache le canvas une fois que la vidéo est prête\n            });\n        }\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"h-[85vh] md:h-[75vh] w-full flex flex-col items-center justify-center px-2 md:px-10 \",\n        children: [\n            canvasVisible && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"canvas\", {\n                ref: canvasRef,\n                className: \"absolute inset-0 w-full h-[85vh] md:h-3/4 object-cover\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 96,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"video\", {\n                ref: videoRef,\n                autoPlay: true,\n                loop: true,\n                muted: true,\n                preload: \"auto\",\n                playsInline: true,\n                className: \"absolute inset-0 w-full h-[85vh] md:h-3/4 object-cover transition-opacity duration-500\",\n                src: \"/videos/Gold_DAO_bg.mp4\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 101,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"relative text-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-[53px] md:text-[82px] font-inter font-bold text-white leading-[90px] text-shadow-lg md:max-w-2xl mx-auto\",\n                        style: {\n                            textShadow: \"0px 10px 15px rgba(0, 0, 0, 0.10), 0px 4px 6px rgba(0, 0, 0, 0.05)\"\n                        },\n                        children: t(\"title\")\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                        lineNumber: 112,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-[40px] md:text-[82px] font-inter font-light leading-[90px] text-[rgba(0,0,0,0.80)]  w-3/4 md:w-full mx-auto  md:max-w-2xl\",\n                        style: {\n                            textShadow: \"0px 10px 15px rgba(0, 0, 0, 0.10), 0px 4px 6px rgba(0, 0, 0, 0.05)\"\n                        },\n                        children: t(\"subtitle\")\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                        lineNumber: 120,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mt-10 sm:mt-[64px] flex-col space-y-6 xl:space-y-0 xl:w-full flex lg:flex-row justify-around items-center\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(InfoCard, {\n                                iconSrc: \"/static/icons/Gold-Light-1g.svg\",\n                                iconAlt: \"Total Gold Icon\",\n                                text: t(\"total_gold_locked\"),\n                                value: \"\".concat(totalGoldLockedKg, \" kg\"),\n                                loading: isLoading\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                                lineNumber: 129,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(InfoCard, {\n                                iconSrc: \"/static/icons/Gold-Marketcap.svg\",\n                                iconAlt: \"Marketcap Icon\",\n                                text: t(\"gldt_marketcap\"),\n                                value: \"$\".concat(marketCapUSD),\n                                loading: isLoading\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                                lineNumber: 136,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                        lineNumber: 128,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 111,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n        lineNumber: 94,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Hero, \"veM4SHHyKMhcFm3j8AdZZhwjY+c=\", false, function() {\n    return [\n        _hooks_useTokenMetrics__WEBPACK_IMPORTED_MODULE_4__.useTokenMetrics,\n        react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation\n    ];\n});\n_c1 = Hero;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Hero);\nvar _c, _c1;\n$RefreshReg$(_c, \"InfoCard\");\n$RefreshReg$(_c1, \"Hero\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0hlcm8udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSw0Q0FBNEM7O0FBR0c7QUFDaEI7QUFFcUI7QUFDTTtBQVUxRCxNQUFNTSxXQUFXO1FBQUMsRUFDaEJDLE9BQU8sRUFDUEMsT0FBTyxFQUNQQyxJQUFJLEVBQ0pDLEtBQUssRUFDTEMsT0FBTyxFQUNPO3lCQUNkLDhEQUFDQztRQUFRQyxXQUFVOztZQUNoQk4seUJBQ0MsOERBQUNOLGtEQUFLQTtnQkFDSmEsS0FBS1A7Z0JBQ0xRLEtBQUtQO2dCQUNMUSxPQUFPO2dCQUNQQyxRQUFRO2dCQUNSSixXQUFVOzs7Ozs7MEJBR2QsOERBQUNLO2dCQUFLTCxXQUFVOzBCQUNiSjs7Ozs7OzBCQUVILDhEQUFDUztnQkFBS0wsV0FBVTs7Ozs7O1lBQ2ZGLHdCQUNDLDhEQUFDTztnQkFBS0wsV0FBVTs7Ozs7MENBRWhCLDhEQUFDSztnQkFBS0wsV0FBVTswQkFBYUg7Ozs7Ozs7Ozs7Ozs7S0F4QjdCSjtBQTZCTixNQUFNYSxPQUFPOztJQUNYLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHakIsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDa0IsZUFBZUMsaUJBQWlCLEdBQUduQiwrQ0FBUUEsQ0FBQztJQUNuRCxNQUFNb0IsV0FBV3JCLDZDQUFNQSxDQUEwQjtJQUNqRCxNQUFNc0IsWUFBWXRCLDZDQUFNQSxDQUEyQjtJQUVuRCxNQUFNLEVBQUV1QixJQUFJLEVBQUVDLFNBQVMsRUFBRUMsS0FBSyxFQUFFLEdBQUd2Qix1RUFBZUE7SUFFbER3QixRQUFRQyxHQUFHLENBQUNKO0lBRVosTUFBTSxFQUFFSyxDQUFDLEVBQUUsR0FBRy9CLDZEQUFjQSxDQUFDO0lBRTdCLE1BQU1nQyxvQkFBb0JOLE9BQU9BLEtBQUtPLGFBQWEsQ0FBQ0MsT0FBTyxDQUFDLEtBQUs7SUFDakUsTUFBTUMsZUFBZVQsT0FBTyxHQUFvQyxPQUFqQ0EsS0FBS1UsR0FBRyxDQUFDQyxjQUFjLENBQUMsWUFBYTtJQUVwRW5DLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTW9DLGVBQWVkLFNBQVNlLE9BQU87UUFDckMsTUFBTUMsZ0JBQWdCZixVQUFVYyxPQUFPO1FBRXZDLElBQUlELGdCQUFnQkUsZUFBZTtZQUNqQyxNQUFNQyxNQUFNRCxjQUFjRSxVQUFVLENBQUM7WUFFckMsNkRBQTZEO1lBQzdESixhQUFhSyxnQkFBZ0IsQ0FBQyxjQUFjO2dCQUMxQyxzQ0FBc0M7Z0JBQ3RDLElBQUlGLEtBQUs7b0JBQ1BELGNBQWN4QixLQUFLLEdBQUdzQixhQUFhTSxVQUFVO29CQUM3Q0osY0FBY3ZCLE1BQU0sR0FBR3FCLGFBQWFPLFdBQVc7b0JBQy9DSixJQUFJSyxTQUFTLENBQ1hSLGNBQ0EsR0FDQSxHQUNBQSxhQUFhTSxVQUFVLEVBQ3ZCTixhQUFhTyxXQUFXO2dCQUU1QjtZQUNGO1lBRUEsd0VBQXdFO1lBQ3hFUCxhQUFhSyxnQkFBZ0IsQ0FBQyxrQkFBa0I7Z0JBQzlDdEIsZUFBZTtnQkFDZkUsaUJBQWlCLFFBQVEsa0RBQWtEO1lBQzdFO1FBQ0Y7SUFDRixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ3dCO1FBQUlsQyxXQUFVOztZQUNaUywrQkFDQyw4REFBQzBCO2dCQUNDQyxLQUFLeEI7Z0JBQ0xaLFdBQVU7Ozs7OzswQkFHZCw4REFBQ3FDO2dCQUNDRCxLQUFLekI7Z0JBQ0wyQixRQUFRO2dCQUNSQyxJQUFJO2dCQUNKQyxLQUFLO2dCQUNMQyxTQUFRO2dCQUNSQyxXQUFXO2dCQUNYMUMsV0FBWTtnQkFDWkMsS0FBSTs7Ozs7OzBCQUVOLDhEQUFDaUM7Z0JBQUlsQyxXQUFVOztrQ0FDYiw4REFBQzJDO3dCQUNDM0MsV0FBVTt3QkFDVjRDLE9BQU87NEJBQ0xDLFlBQ0U7d0JBQ0o7a0NBQ0MzQixFQUFFOzs7Ozs7a0NBRUwsOERBQUM0Qjt3QkFDQzlDLFdBQVU7d0JBQ1Y0QyxPQUFPOzRCQUNMQyxZQUNFO3dCQUNKO2tDQUNDM0IsRUFBRTs7Ozs7O2tDQUVMLDhEQUFDZ0I7d0JBQUlsQyxXQUFVOzswQ0FDYiw4REFBQ1A7Z0NBQ0NDLFNBQVE7Z0NBQ1JDLFNBQVE7Z0NBQ1JDLE1BQU1zQixFQUFFO2dDQUNSckIsT0FBTyxHQUFxQixPQUFsQnNCLG1CQUFrQjtnQ0FDNUJyQixTQUFTZ0I7Ozs7OzswQ0FFWCw4REFBQ3JCO2dDQUNDQyxTQUFRO2dDQUNSQyxTQUFRO2dDQUNSQyxNQUFNc0IsRUFBRTtnQ0FDUnJCLE9BQU8sSUFBaUIsT0FBYnlCO2dDQUNYeEIsU0FBU2dCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNckI7R0FwR01SOztRQU0rQmQsbUVBQWVBO1FBSXBDTCx5REFBY0E7OztNQVZ4Qm1CO0FBc0dOLCtEQUFlQSxJQUFJQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0hlcm8udHN4PzY2OTAiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQG5leHQvbmV4dC9uby1pbWctZWxlbWVudCAqL1xyXG5cInVzZSBjbGllbnRcIjtcclxuXHJcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSBcInJlYWN0LWkxOG5leHRcIjtcclxuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XHJcbmltcG9ydCB7IHVzZVF1ZXJ5IH0gZnJvbSBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiO1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlVG9rZW5NZXRyaWNzIH0gZnJvbSBcIkAvaG9va3MvdXNlVG9rZW5NZXRyaWNzXCI7XHJcblxyXG5pbnRlcmZhY2UgSW5mb0NhcmRQcm9wcyB7XHJcbiAgaWNvblNyYzogc3RyaW5nO1xyXG4gIGljb25BbHQ6IHN0cmluZztcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBsb2FkaW5nOiBib29sZWFuO1xyXG59XHJcblxyXG5jb25zdCBJbmZvQ2FyZCA9ICh7XHJcbiAgaWNvblNyYyxcclxuICBpY29uQWx0LFxyXG4gIHRleHQsXHJcbiAgdmFsdWUsXHJcbiAgbG9hZGluZyxcclxufTogSW5mb0NhcmRQcm9wcykgPT4gKFxyXG4gIDxzZWN0aW9uIGNsYXNzTmFtZT1cImZsZXggaC0xMCBweC00IHBsLTIgbWluLXctZnVsbCBtZDptaW4tdy0wIGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciByb3VuZGVkLTN4bCBib3JkZXIgZ2FwLVs4cHhdIG14LTIgYm9yZGVyLVsjRDNCODcyXSBiZy13aGl0ZVwiPlxyXG4gICAge2ljb25TcmMgJiYgKFxyXG4gICAgICA8SW1hZ2VcclxuICAgICAgICBzcmM9e2ljb25TcmN9XHJcbiAgICAgICAgYWx0PXtpY29uQWx0fVxyXG4gICAgICAgIHdpZHRoPXsyNH1cclxuICAgICAgICBoZWlnaHQ9ezI0fVxyXG4gICAgICAgIGNsYXNzTmFtZT1cInctWzI0cHhdIGgtWzI0cHhdIGZsZXgtc2hyaW5rLTBcIlxyXG4gICAgICAvPlxyXG4gICAgKX1cclxuICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtaW50ZXIgZm9udC1ub3JtYWwgbGVhZGluZy1bMTZweF0gdGV4dC1bIzI2MkMyRV1cIj5cclxuICAgICAge3RleHR9XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8c3BhbiBjbGFzc05hbWU9XCJoLWZ1bGwgdy0wLjUgYmctWyNEM0I4NzJdIHJvdW5kZWQtM3hsIG14LVs4cHhdXCI+PC9zcGFuPlxyXG4gICAge2xvYWRpbmcgPyAoXHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxvYWRpbmctc2tlbGV0b25cIj48L3NwYW4+XHJcbiAgICApIDogKFxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGRcIj57dmFsdWV9PC9zcGFuPlxyXG4gICAgKX1cclxuICA8L3NlY3Rpb24+XHJcbik7XHJcblxyXG5jb25zdCBIZXJvID0gKCkgPT4ge1xyXG4gIGNvbnN0IFt2aWRlb0xvYWRlZCwgc2V0VmlkZW9Mb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtjYW52YXNWaXNpYmxlLCBzZXRDYW52YXNWaXNpYmxlXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IHZpZGVvUmVmID0gdXNlUmVmPEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjYW52YXNSZWYgPSB1c2VSZWY8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgeyBkYXRhLCBpc0xvYWRpbmcsIGVycm9yIH0gPSB1c2VUb2tlbk1ldHJpY3MoKTtcclxuXHJcbiAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gIGNvbnN0IHsgdCB9ID0gdXNlVHJhbnNsYXRpb24oXCJoZXJvXCIpO1xyXG5cclxuICBjb25zdCB0b3RhbEdvbGRMb2NrZWRLZyA9IGRhdGEgPyBkYXRhLnRvdGFsX2dvbGRfa2cudG9GaXhlZCgyKSA6IG51bGw7XHJcbiAgY29uc3QgbWFya2V0Q2FwVVNEID0gZGF0YSA/IGAke2RhdGEudHZsLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycpfWAgOiBudWxsO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgdmlkZW9FbGVtZW50ID0gdmlkZW9SZWYuY3VycmVudDtcclxuICAgIGNvbnN0IGNhbnZhc0VsZW1lbnQgPSBjYW52YXNSZWYuY3VycmVudDtcclxuXHJcbiAgICBpZiAodmlkZW9FbGVtZW50ICYmIGNhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgY29uc3QgY3R4ID0gY2FudmFzRWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAvLyBMb3JzcXVlIGxhIHZpZMOpbyBhIGFzc2V6IGRlIGRvbm7DqWVzIHBvdXIgY29tbWVuY2VyIMOgIGpvdWVyXHJcbiAgICAgIHZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkZGF0YVwiLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gRGVzc2luZSBsJ2ltYWdlIHZpZMOpbyBzdXIgbGUgY2FudmFzXHJcbiAgICAgICAgaWYgKGN0eCkge1xyXG4gICAgICAgICAgY2FudmFzRWxlbWVudC53aWR0aCA9IHZpZGVvRWxlbWVudC52aWRlb1dpZHRoO1xyXG4gICAgICAgICAgY2FudmFzRWxlbWVudC5oZWlnaHQgPSB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHQ7XHJcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC52aWRlb1dpZHRoLFxyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQudmlkZW9IZWlnaHRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFJlbXBsYWNlIGxlIGNhbnZhcyBwYXIgbGEgdmlkw6lvIHVuZSBmb2lzIHF1ZSBsYSB2aWTDqW8gcGV1dCDDqnRyZSBqb3XDqWVcclxuICAgICAgdmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLCAoKSA9PiB7XHJcbiAgICAgICAgc2V0VmlkZW9Mb2FkZWQodHJ1ZSk7XHJcbiAgICAgICAgc2V0Q2FudmFzVmlzaWJsZShmYWxzZSk7IC8vIENhY2hlIGxlIGNhbnZhcyB1bmUgZm9pcyBxdWUgbGEgdmlkw6lvIGVzdCBwcsOqdGVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJoLVs4NXZoXSBtZDpoLVs3NXZoXSB3LWZ1bGwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHgtMiBtZDpweC0xMCBcIj5cclxuICAgICAge2NhbnZhc1Zpc2libGUgJiYgKFxyXG4gICAgICAgIDxjYW52YXNcclxuICAgICAgICAgIHJlZj17Y2FudmFzUmVmfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB3LWZ1bGwgaC1bODV2aF0gbWQ6aC0zLzQgb2JqZWN0LWNvdmVyXCJcclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgICA8dmlkZW9cclxuICAgICAgICByZWY9e3ZpZGVvUmVmfVxyXG4gICAgICAgIGF1dG9QbGF5XHJcbiAgICAgICAgbG9vcFxyXG4gICAgICAgIG11dGVkXHJcbiAgICAgICAgcHJlbG9hZD1cImF1dG9cIlxyXG4gICAgICAgIHBsYXlzSW5saW5lXHJcbiAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCB3LWZ1bGwgaC1bODV2aF0gbWQ6aC0zLzQgb2JqZWN0LWNvdmVyIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi01MDBgfVxyXG4gICAgICAgIHNyYz1cIi92aWRlb3MvR29sZF9EQU9fYmcubXA0XCJcclxuICAgICAgLz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgIDxoMVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bNTNweF0gbWQ6dGV4dC1bODJweF0gZm9udC1pbnRlciBmb250LWJvbGQgdGV4dC13aGl0ZSBsZWFkaW5nLVs5MHB4XSB0ZXh0LXNoYWRvdy1sZyBtZDptYXgtdy0yeGwgbXgtYXV0b1wiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICB0ZXh0U2hhZG93OlxyXG4gICAgICAgICAgICAgIFwiMHB4IDEwcHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMTApLCAwcHggNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMDUpXCIsXHJcbiAgICAgICAgICB9fT5cclxuICAgICAgICAgIHt0KFwidGl0bGVcIil9XHJcbiAgICAgICAgPC9oMT5cclxuICAgICAgICA8cFxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bNDBweF0gbWQ6dGV4dC1bODJweF0gZm9udC1pbnRlciBmb250LWxpZ2h0IGxlYWRpbmctWzkwcHhdIHRleHQtW3JnYmEoMCwwLDAsMC44MCldICB3LTMvNCBtZDp3LWZ1bGwgbXgtYXV0byAgbWQ6bWF4LXctMnhsXCJcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIHRleHRTaGFkb3c6XHJcbiAgICAgICAgICAgICAgXCIwcHggMTBweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4xMCksIDBweCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4wNSlcIixcclxuICAgICAgICAgIH19PlxyXG4gICAgICAgICAge3QoXCJzdWJ0aXRsZVwiKX1cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xMCBzbTptdC1bNjRweF0gZmxleC1jb2wgc3BhY2UteS02IHhsOnNwYWNlLXktMCB4bDp3LWZ1bGwgZmxleCBsZzpmbGV4LXJvdyBqdXN0aWZ5LWFyb3VuZCBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgIDxJbmZvQ2FyZFxyXG4gICAgICAgICAgICBpY29uU3JjPVwiL3N0YXRpYy9pY29ucy9Hb2xkLUxpZ2h0LTFnLnN2Z1wiXHJcbiAgICAgICAgICAgIGljb25BbHQ9XCJUb3RhbCBHb2xkIEljb25cIlxyXG4gICAgICAgICAgICB0ZXh0PXt0KFwidG90YWxfZ29sZF9sb2NrZWRcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtgJHt0b3RhbEdvbGRMb2NrZWRLZ30ga2dgfVxyXG4gICAgICAgICAgICBsb2FkaW5nPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPEluZm9DYXJkXHJcbiAgICAgICAgICAgIGljb25TcmM9XCIvc3RhdGljL2ljb25zL0dvbGQtTWFya2V0Y2FwLnN2Z1wiXHJcbiAgICAgICAgICAgIGljb25BbHQ9XCJNYXJrZXRjYXAgSWNvblwiXHJcbiAgICAgICAgICAgIHRleHQ9e3QoXCJnbGR0X21hcmtldGNhcFwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e2AkJHttYXJrZXRDYXBVU0R9YH1cclxuICAgICAgICAgICAgbG9hZGluZz17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVybztcclxuIl0sIm5hbWVzIjpbInVzZVRyYW5zbGF0aW9uIiwiSW1hZ2UiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsInVzZVRva2VuTWV0cmljcyIsIkluZm9DYXJkIiwiaWNvblNyYyIsImljb25BbHQiLCJ0ZXh0IiwidmFsdWUiLCJsb2FkaW5nIiwic2VjdGlvbiIsImNsYXNzTmFtZSIsInNyYyIsImFsdCIsIndpZHRoIiwiaGVpZ2h0Iiwic3BhbiIsIkhlcm8iLCJ2aWRlb0xvYWRlZCIsInNldFZpZGVvTG9hZGVkIiwiY2FudmFzVmlzaWJsZSIsInNldENhbnZhc1Zpc2libGUiLCJ2aWRlb1JlZiIsImNhbnZhc1JlZiIsImRhdGEiLCJpc0xvYWRpbmciLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJ0IiwidG90YWxHb2xkTG9ja2VkS2ciLCJ0b3RhbF9nb2xkX2tnIiwidG9GaXhlZCIsIm1hcmtldENhcFVTRCIsInR2bCIsInRvTG9jYWxlU3RyaW5nIiwidmlkZW9FbGVtZW50IiwiY3VycmVudCIsImNhbnZhc0VsZW1lbnQiLCJjdHgiLCJnZXRDb250ZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInZpZGVvV2lkdGgiLCJ2aWRlb0hlaWdodCIsImRyYXdJbWFnZSIsImRpdiIsImNhbnZhcyIsInJlZiIsInZpZGVvIiwiYXV0b1BsYXkiLCJsb29wIiwibXV0ZWQiLCJwcmVsb2FkIiwicGxheXNJbmxpbmUiLCJoMSIsInN0eWxlIiwidGV4dFNoYWRvdyIsInAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Hero.tsx\n"));

/***/ })

});