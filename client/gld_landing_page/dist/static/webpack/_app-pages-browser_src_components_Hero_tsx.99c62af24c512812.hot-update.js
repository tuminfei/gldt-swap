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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ \"(app-pages-browser)/../../node_modules/react-i18next/dist/es/index.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _hooks_useTokenMetrics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/hooks/useTokenMetrics */ \"(app-pages-browser)/./src/hooks/useTokenMetrics.ts\");\n/* eslint-disable @next/next/no-img-element */ /* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst InfoCard = (param)=>{\n    let { iconSrc, iconAlt, text, value, loading } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        className: \"flex h-10 px-4 pl-2 min-w-full md:min-w-0 justify-center items-center rounded-3xl border gap-[8px] mx-2 border-[#D3B872] bg-white\",\n        children: [\n            iconSrc && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                src: iconSrc,\n                alt: iconAlt,\n                width: 24,\n                height: 24,\n                className: \"w-[24px] h-[24px] flex-shrink-0\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 27,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"font-inter font-normal leading-[16px] text-[#262C2E]\",\n                children: text\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 35,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"h-full w-0.5 bg-[#D3B872] rounded-3xl mx-[8px]\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 38,\n                columnNumber: 5\n            }, undefined),\n            loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"loading-skeleton\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 40,\n                columnNumber: 7\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"font-bold\",\n                children: value\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 42,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n        lineNumber: 25,\n        columnNumber: 3\n    }, undefined);\n};\n_c = InfoCard;\nconst Hero = ()=>{\n    _s();\n    const [videoLoaded, setVideoLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);\n    const [canvasVisible, setCanvasVisible] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);\n    const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);\n    const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);\n    const { data, isLoading, error } = (0,_hooks_useTokenMetrics__WEBPACK_IMPORTED_MODULE_4__.useTokenMetrics)();\n    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)(\"hero\");\n    const totalGoldLockedKg = data ? data.total_gold_kg.toFixed(2) : null;\n    const marketCapUSD = data ? \"\".concat(data.tvl.toLocaleString(\"en-US\")) : null;\n    // useEffect(() => {\n    //   const videoElement = videoRef.current;\n    //   const canvasElement = canvasRef.current;\n    //   if (videoElement && canvasElement) {\n    //     const ctx = canvasElement.getContext(\"2d\");\n    //     videoElement.addEventListener(\"loadeddata\", () => {\n    //       if (ctx) {\n    //         canvasElement.width = videoElement.videoWidth;\n    //         canvasElement.height = videoElement.videoHeight;\n    //         ctx.drawImage(\n    //           videoElement,\n    //           0,\n    //           0,\n    //           videoElement.videoWidth,\n    //           videoElement.videoHeight\n    //         );\n    //       }\n    //     });\n    //     videoElement.addEventListener(\"canplaythrough\", () => {\n    //       setVideoLoaded(true);\n    //       setCanvasVisible(false);\n    //     });\n    //   }\n    // }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-full md:h-[75vh] w-full flex flex-col items-center justify-center px-2 md:px-10 \",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"video\", {\n                ref: videoRef,\n                autoPlay: true,\n                loop: true,\n                muted: true,\n                preload: \"auto\",\n                playsInline: true,\n                className: \"absolute inset-0 w-full h-[85vh] md:h-3/4 object-cover transition-opacity duration-500\",\n                src: \"https://daolink-gold-dao-website-medias.sos-ch-gva-2.exo.io/Gold_DAO_bg_video.mp4\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 96,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"relative text-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-[53px] md:text-[82px] font-inter font-bold text-white leading-[90px] text-shadow-lg md:max-w-2xl mx-auto\",\n                        style: {\n                            textShadow: \"0px 10px 15px rgba(0, 0, 0, 0.10), 0px 4px 6px rgba(0, 0, 0, 0.05)\"\n                        },\n                        children: t(\"title\")\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                        lineNumber: 107,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-[40px] md:text-[82px] font-inter font-light leading-[90px] text-[rgba(0,0,0,0.80)]  w-3/4 md:w-full mx-auto  md:max-w-2xl\",\n                        style: {\n                            textShadow: \"0px 10px 15px rgba(0, 0, 0, 0.10), 0px 4px 6px rgba(0, 0, 0, 0.05)\"\n                        },\n                        children: t(\"subtitle\")\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                        lineNumber: 116,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mt-10 sm:mt-[64px] flex-col space-y-6 xl:space-y-0 xl:w-full flex lg:flex-row justify-around items-center\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(InfoCard, {\n                                iconSrc: \"/static/icons/Gold-Light-1g.svg\",\n                                iconAlt: \"Total Gold Icon\",\n                                text: t(\"total_gold_locked\"),\n                                value: \"\".concat(totalGoldLockedKg, \" kg\"),\n                                loading: isLoading\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                                lineNumber: 126,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(InfoCard, {\n                                iconSrc: \"/static/icons/Gold-Marketcap.svg\",\n                                iconAlt: \"Marketcap Icon\",\n                                text: t(\"gldt_marketcap\"),\n                                value: \"$\".concat(marketCapUSD),\n                                loading: isLoading\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                                lineNumber: 133,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                        lineNumber: 125,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 106,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n        lineNumber: 89,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Hero, \"9vH+nMEmMIvzC+ox8Lkm4KJAgR4=\", false, function() {\n    return [\n        _hooks_useTokenMetrics__WEBPACK_IMPORTED_MODULE_4__.useTokenMetrics,\n        react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation\n    ];\n});\n_c1 = Hero;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Hero);\nvar _c, _c1;\n$RefreshReg$(_c, \"InfoCard\");\n$RefreshReg$(_c1, \"Hero\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0hlcm8udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSw0Q0FBNEM7O0FBR0U7QUFDaEI7QUFFcUI7QUFDTTtBQVV6RCxNQUFNSyxXQUFXO1FBQUMsRUFDaEJDLE9BQU8sRUFDUEMsT0FBTyxFQUNQQyxJQUFJLEVBQ0pDLEtBQUssRUFDTEMsT0FBTyxFQUNPO3lCQUNkLDhEQUFDQztRQUFRQyxXQUFVOztZQUNoQk4seUJBQ0MsOERBQUNMLGtEQUFLQTtnQkFDSlksS0FBS1A7Z0JBQ0xRLEtBQUtQO2dCQUNMUSxPQUFPO2dCQUNQQyxRQUFRO2dCQUNSSixXQUFVOzs7Ozs7MEJBR2QsOERBQUNLO2dCQUFLTCxXQUFVOzBCQUNiSjs7Ozs7OzBCQUVILDhEQUFDUztnQkFBS0wsV0FBVTs7Ozs7O1lBQ2ZGLHdCQUNDLDhEQUFDTztnQkFBS0wsV0FBVTs7Ozs7MENBRWhCLDhEQUFDSztnQkFBS0wsV0FBVTswQkFBYUg7Ozs7Ozs7Ozs7Ozs7S0F4QjdCSjtBQTZCTixNQUFNYSxPQUFPOztJQUNYLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHakIsK0NBQVFBLENBQUM7SUFDL0MsTUFBTSxDQUFDa0IsZUFBZUMsaUJBQWlCLEdBQUduQiwrQ0FBUUEsQ0FBQztJQUNuRCxNQUFNb0IsV0FBV3JCLDZDQUFNQSxDQUEwQjtJQUNqRCxNQUFNc0IsWUFBWXRCLDZDQUFNQSxDQUEyQjtJQUVuRCxNQUFNLEVBQUV1QixJQUFJLEVBQUVDLFNBQVMsRUFBRUMsS0FBSyxFQUFFLEdBQUd2Qix1RUFBZUE7SUFFbEQsTUFBTSxFQUFFd0IsQ0FBQyxFQUFFLEdBQUc1Qiw2REFBY0EsQ0FBQztJQUU3QixNQUFNNkIsb0JBQW9CSixPQUFPQSxLQUFLSyxhQUFhLENBQUNDLE9BQU8sQ0FBQyxLQUFLO0lBQ2pFLE1BQU1DLGVBQWVQLE9BQU8sR0FBb0MsT0FBakNBLEtBQUtRLEdBQUcsQ0FBQ0MsY0FBYyxDQUFDLFlBQWE7SUFFcEUsb0JBQW9CO0lBQ3BCLDJDQUEyQztJQUMzQyw2Q0FBNkM7SUFFN0MseUNBQXlDO0lBQ3pDLGtEQUFrRDtJQUVsRCwwREFBMEQ7SUFDMUQsbUJBQW1CO0lBQ25CLHlEQUF5RDtJQUN6RCwyREFBMkQ7SUFDM0QseUJBQXlCO0lBQ3pCLDBCQUEwQjtJQUMxQixlQUFlO0lBQ2YsZUFBZTtJQUNmLHFDQUFxQztJQUNyQyxxQ0FBcUM7SUFDckMsYUFBYTtJQUNiLFVBQVU7SUFDVixVQUFVO0lBRVYsOERBQThEO0lBQzlELDhCQUE4QjtJQUM5QixpQ0FBaUM7SUFDakMsVUFBVTtJQUNWLE1BQU07SUFDTixVQUFVO0lBRVYscUJBQ0UsOERBQUNDO1FBQUl2QixXQUFVOzswQkFPYiw4REFBQ3dCO2dCQUNDQyxLQUFLZDtnQkFDTGUsUUFBUTtnQkFDUkMsSUFBSTtnQkFDSkMsS0FBSztnQkFDTEMsU0FBUTtnQkFDUkMsV0FBVztnQkFDWDlCLFdBQVk7Z0JBQ1pDLEtBQUk7Ozs7OzswQkFFTiw4REFBQ3NCO2dCQUFJdkIsV0FBVTs7a0NBQ2IsOERBQUMrQjt3QkFDQy9CLFdBQVU7d0JBQ1ZnQyxPQUFPOzRCQUNMQyxZQUNFO3dCQUNKO2tDQUVDakIsRUFBRTs7Ozs7O2tDQUVMLDhEQUFDa0I7d0JBQ0NsQyxXQUFVO3dCQUNWZ0MsT0FBTzs0QkFDTEMsWUFDRTt3QkFDSjtrQ0FFQ2pCLEVBQUU7Ozs7OztrQ0FFTCw4REFBQ087d0JBQUl2QixXQUFVOzswQ0FDYiw4REFBQ1A7Z0NBQ0NDLFNBQVE7Z0NBQ1JDLFNBQVE7Z0NBQ1JDLE1BQU1vQixFQUFFO2dDQUNSbkIsT0FBTyxHQUFxQixPQUFsQm9CLG1CQUFrQjtnQ0FDNUJuQixTQUFTZ0I7Ozs7OzswQ0FFWCw4REFBQ3JCO2dDQUNDQyxTQUFRO2dDQUNSQyxTQUFRO2dDQUNSQyxNQUFNb0IsRUFBRTtnQ0FDUm5CLE9BQU8sSUFBaUIsT0FBYnVCO2dDQUNYdEIsU0FBU2dCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNckI7R0FqR01SOztRQU0rQmQsbUVBQWVBO1FBRXBDSix5REFBY0E7OztNQVJ4QmtCO0FBbUdOLCtEQUFlQSxJQUFJQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL0hlcm8udHN4PzY2OTAiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQG5leHQvbmV4dC9uby1pbWctZWxlbWVudCAqL1xyXG4ndXNlIGNsaWVudCdcclxuXHJcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAncmVhY3QtaTE4bmV4dCdcclxuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnXHJcbmltcG9ydCB7IHVzZVF1ZXJ5IH0gZnJvbSAnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5J1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgdXNlVG9rZW5NZXRyaWNzIH0gZnJvbSAnQC9ob29rcy91c2VUb2tlbk1ldHJpY3MnXHJcblxyXG5pbnRlcmZhY2UgSW5mb0NhcmRQcm9wcyB7XHJcbiAgaWNvblNyYzogc3RyaW5nXHJcbiAgaWNvbkFsdDogc3RyaW5nXHJcbiAgdGV4dDogc3RyaW5nXHJcbiAgdmFsdWU6IHN0cmluZ1xyXG4gIGxvYWRpbmc6IGJvb2xlYW5cclxufVxyXG5cclxuY29uc3QgSW5mb0NhcmQgPSAoe1xyXG4gIGljb25TcmMsXHJcbiAgaWNvbkFsdCxcclxuICB0ZXh0LFxyXG4gIHZhbHVlLFxyXG4gIGxvYWRpbmdcclxufTogSW5mb0NhcmRQcm9wcykgPT4gKFxyXG4gIDxzZWN0aW9uIGNsYXNzTmFtZT0nZmxleCBoLTEwIHB4LTQgcGwtMiBtaW4tdy1mdWxsIG1kOm1pbi13LTAganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIHJvdW5kZWQtM3hsIGJvcmRlciBnYXAtWzhweF0gbXgtMiBib3JkZXItWyNEM0I4NzJdIGJnLXdoaXRlJz5cclxuICAgIHtpY29uU3JjICYmIChcclxuICAgICAgPEltYWdlXHJcbiAgICAgICAgc3JjPXtpY29uU3JjfVxyXG4gICAgICAgIGFsdD17aWNvbkFsdH1cclxuICAgICAgICB3aWR0aD17MjR9XHJcbiAgICAgICAgaGVpZ2h0PXsyNH1cclxuICAgICAgICBjbGFzc05hbWU9J3ctWzI0cHhdIGgtWzI0cHhdIGZsZXgtc2hyaW5rLTAnXHJcbiAgICAgIC8+XHJcbiAgICApfVxyXG4gICAgPHNwYW4gY2xhc3NOYW1lPSdmb250LWludGVyIGZvbnQtbm9ybWFsIGxlYWRpbmctWzE2cHhdIHRleHQtWyMyNjJDMkVdJz5cclxuICAgICAge3RleHR9XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8c3BhbiBjbGFzc05hbWU9J2gtZnVsbCB3LTAuNSBiZy1bI0QzQjg3Ml0gcm91bmRlZC0zeGwgbXgtWzhweF0nPjwvc3Bhbj5cclxuICAgIHtsb2FkaW5nID8gKFxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9J2xvYWRpbmctc2tlbGV0b24nPjwvc3Bhbj5cclxuICAgICkgOiAoXHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT0nZm9udC1ib2xkJz57dmFsdWV9PC9zcGFuPlxyXG4gICAgKX1cclxuICA8L3NlY3Rpb24+XHJcbilcclxuXHJcbmNvbnN0IEhlcm8gPSAoKSA9PiB7XHJcbiAgY29uc3QgW3ZpZGVvTG9hZGVkLCBzZXRWaWRlb0xvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICBjb25zdCBbY2FudmFzVmlzaWJsZSwgc2V0Q2FudmFzVmlzaWJsZV0gPSB1c2VTdGF0ZSh0cnVlKVxyXG4gIGNvbnN0IHZpZGVvUmVmID0gdXNlUmVmPEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsPihudWxsKVxyXG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpXHJcblxyXG4gIGNvbnN0IHsgZGF0YSwgaXNMb2FkaW5nLCBlcnJvciB9ID0gdXNlVG9rZW5NZXRyaWNzKClcclxuXHJcbiAgY29uc3QgeyB0IH0gPSB1c2VUcmFuc2xhdGlvbignaGVybycpXHJcblxyXG4gIGNvbnN0IHRvdGFsR29sZExvY2tlZEtnID0gZGF0YSA/IGRhdGEudG90YWxfZ29sZF9rZy50b0ZpeGVkKDIpIDogbnVsbFxyXG4gIGNvbnN0IG1hcmtldENhcFVTRCA9IGRhdGEgPyBgJHtkYXRhLnR2bC50b0xvY2FsZVN0cmluZygnZW4tVVMnKX1gIDogbnVsbFxyXG5cclxuICAvLyB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gIC8vICAgY29uc3QgdmlkZW9FbGVtZW50ID0gdmlkZW9SZWYuY3VycmVudDtcclxuICAvLyAgIGNvbnN0IGNhbnZhc0VsZW1lbnQgPSBjYW52YXNSZWYuY3VycmVudDtcclxuXHJcbiAgLy8gICBpZiAodmlkZW9FbGVtZW50ICYmIGNhbnZhc0VsZW1lbnQpIHtcclxuICAvLyAgICAgY29uc3QgY3R4ID0gY2FudmFzRWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gIC8vICAgICB2aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZGRhdGFcIiwgKCkgPT4ge1xyXG4gIC8vICAgICAgIGlmIChjdHgpIHtcclxuICAvLyAgICAgICAgIGNhbnZhc0VsZW1lbnQud2lkdGggPSB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aDtcclxuICAvLyAgICAgICAgIGNhbnZhc0VsZW1lbnQuaGVpZ2h0ID0gdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0O1xyXG4gIC8vICAgICAgICAgY3R4LmRyYXdJbWFnZShcclxuICAvLyAgICAgICAgICAgdmlkZW9FbGVtZW50LFxyXG4gIC8vICAgICAgICAgICAwLFxyXG4gIC8vICAgICAgICAgICAwLFxyXG4gIC8vICAgICAgICAgICB2aWRlb0VsZW1lbnQudmlkZW9XaWR0aCxcclxuICAvLyAgICAgICAgICAgdmlkZW9FbGVtZW50LnZpZGVvSGVpZ2h0XHJcbiAgLy8gICAgICAgICApO1xyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgfSk7XHJcblxyXG4gIC8vICAgICB2aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsICgpID0+IHtcclxuICAvLyAgICAgICBzZXRWaWRlb0xvYWRlZCh0cnVlKTtcclxuICAvLyAgICAgICBzZXRDYW52YXNWaXNpYmxlKGZhbHNlKTtcclxuICAvLyAgICAgfSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9J21pbi1oLWZ1bGwgbWQ6aC1bNzV2aF0gdy1mdWxsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB4LTIgbWQ6cHgtMTAgJz5cclxuICAgICAgey8qIHtjYW52YXNWaXNpYmxlICYmIChcclxuICAgICAgICA8Y2FudmFzXHJcbiAgICAgICAgICByZWY9e2NhbnZhc1JlZn1cclxuICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgdy1mdWxsIGgtWzg1dmhdIG1kOmgtMy80IG9iamVjdC1jb3ZlclwiXHJcbiAgICAgICAgLz5cclxuICAgICAgKX0gKi99XHJcbiAgICAgIDx2aWRlb1xyXG4gICAgICAgIHJlZj17dmlkZW9SZWZ9XHJcbiAgICAgICAgYXV0b1BsYXlcclxuICAgICAgICBsb29wXHJcbiAgICAgICAgbXV0ZWRcclxuICAgICAgICBwcmVsb2FkPSdhdXRvJ1xyXG4gICAgICAgIHBsYXlzSW5saW5lXHJcbiAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCB3LWZ1bGwgaC1bODV2aF0gbWQ6aC0zLzQgb2JqZWN0LWNvdmVyIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi01MDBgfVxyXG4gICAgICAgIHNyYz0naHR0cHM6Ly9kYW9saW5rLWdvbGQtZGFvLXdlYnNpdGUtbWVkaWFzLnNvcy1jaC1ndmEtMi5leG8uaW8vR29sZF9EQU9fYmdfdmlkZW8ubXA0J1xyXG4gICAgICAvPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncmVsYXRpdmUgdGV4dC1jZW50ZXInPlxyXG4gICAgICAgIDxoMVxyXG4gICAgICAgICAgY2xhc3NOYW1lPSd0ZXh0LVs1M3B4XSBtZDp0ZXh0LVs4MnB4XSBmb250LWludGVyIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGxlYWRpbmctWzkwcHhdIHRleHQtc2hhZG93LWxnIG1kOm1heC13LTJ4bCBteC1hdXRvJ1xyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgdGV4dFNoYWRvdzpcclxuICAgICAgICAgICAgICAnMHB4IDEwcHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMTApLCAwcHggNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMDUpJ1xyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7dCgndGl0bGUnKX1cclxuICAgICAgICA8L2gxPlxyXG4gICAgICAgIDxwXHJcbiAgICAgICAgICBjbGFzc05hbWU9J3RleHQtWzQwcHhdIG1kOnRleHQtWzgycHhdIGZvbnQtaW50ZXIgZm9udC1saWdodCBsZWFkaW5nLVs5MHB4XSB0ZXh0LVtyZ2JhKDAsMCwwLDAuODApXSAgdy0zLzQgbWQ6dy1mdWxsIG14LWF1dG8gIG1kOm1heC13LTJ4bCdcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIHRleHRTaGFkb3c6XHJcbiAgICAgICAgICAgICAgJzBweCAxMHB4IDE1cHggcmdiYSgwLCAwLCAwLCAwLjEwKSwgMHB4IDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjA1KSdcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3QoJ3N1YnRpdGxlJyl9XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtdC0xMCBzbTptdC1bNjRweF0gZmxleC1jb2wgc3BhY2UteS02IHhsOnNwYWNlLXktMCB4bDp3LWZ1bGwgZmxleCBsZzpmbGV4LXJvdyBqdXN0aWZ5LWFyb3VuZCBpdGVtcy1jZW50ZXInPlxyXG4gICAgICAgICAgPEluZm9DYXJkXHJcbiAgICAgICAgICAgIGljb25TcmM9Jy9zdGF0aWMvaWNvbnMvR29sZC1MaWdodC0xZy5zdmcnXHJcbiAgICAgICAgICAgIGljb25BbHQ9J1RvdGFsIEdvbGQgSWNvbidcclxuICAgICAgICAgICAgdGV4dD17dCgndG90YWxfZ29sZF9sb2NrZWQnKX1cclxuICAgICAgICAgICAgdmFsdWU9e2Ake3RvdGFsR29sZExvY2tlZEtnfSBrZ2B9XHJcbiAgICAgICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZ31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8SW5mb0NhcmRcclxuICAgICAgICAgICAgaWNvblNyYz0nL3N0YXRpYy9pY29ucy9Hb2xkLU1hcmtldGNhcC5zdmcnXHJcbiAgICAgICAgICAgIGljb25BbHQ9J01hcmtldGNhcCBJY29uJ1xyXG4gICAgICAgICAgICB0ZXh0PXt0KCdnbGR0X21hcmtldGNhcCcpfVxyXG4gICAgICAgICAgICB2YWx1ZT17YCQke21hcmtldENhcFVTRH1gfVxyXG4gICAgICAgICAgICBsb2FkaW5nPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVyb1xyXG4iXSwibmFtZXMiOlsidXNlVHJhbnNsYXRpb24iLCJJbWFnZSIsInVzZVJlZiIsInVzZVN0YXRlIiwidXNlVG9rZW5NZXRyaWNzIiwiSW5mb0NhcmQiLCJpY29uU3JjIiwiaWNvbkFsdCIsInRleHQiLCJ2YWx1ZSIsImxvYWRpbmciLCJzZWN0aW9uIiwiY2xhc3NOYW1lIiwic3JjIiwiYWx0Iiwid2lkdGgiLCJoZWlnaHQiLCJzcGFuIiwiSGVybyIsInZpZGVvTG9hZGVkIiwic2V0VmlkZW9Mb2FkZWQiLCJjYW52YXNWaXNpYmxlIiwic2V0Q2FudmFzVmlzaWJsZSIsInZpZGVvUmVmIiwiY2FudmFzUmVmIiwiZGF0YSIsImlzTG9hZGluZyIsImVycm9yIiwidCIsInRvdGFsR29sZExvY2tlZEtnIiwidG90YWxfZ29sZF9rZyIsInRvRml4ZWQiLCJtYXJrZXRDYXBVU0QiLCJ0dmwiLCJ0b0xvY2FsZVN0cmluZyIsImRpdiIsInZpZGVvIiwicmVmIiwiYXV0b1BsYXkiLCJsb29wIiwibXV0ZWQiLCJwcmVsb2FkIiwicGxheXNJbmxpbmUiLCJoMSIsInN0eWxlIiwidGV4dFNoYWRvdyIsInAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Hero.tsx\n"));

/***/ })

});