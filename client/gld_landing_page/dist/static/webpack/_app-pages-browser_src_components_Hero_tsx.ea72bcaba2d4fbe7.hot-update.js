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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ \"(app-pages-browser)/../../node_modules/react-i18next/dist/es/index.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/../../node_modules/@tanstack/react-query/build/modern/useQuery.js\");\n/* harmony import */ var _lib_fetchTokenMetrics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/fetchTokenMetrics */ \"(app-pages-browser)/./src/lib/fetchTokenMetrics.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nconst InfoCard = (param)=>{\n    let { iconSrc, iconAlt, text, value, loading } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        className: \"flex h-10 px-4 pl-2 min-w-full md:min-w-0 justify-center items-center rounded-3xl border gap-[8px] mx-2 border-[#D3B872] bg-white\",\n        children: [\n            iconSrc && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                src: iconSrc,\n                alt: iconAlt,\n                width: 24,\n                height: 24,\n                className: \"w-[24px] h-[24px] flex-shrink-0\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 24,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"font-inter font-normal leading-[16px] text-[#262C2E]\",\n                children: text\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 32,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"h-full w-0.5 bg-[#D3B872] rounded-3xl mx-[8px]\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 35,\n                columnNumber: 5\n            }, undefined),\n            loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"loading-skeleton\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 37,\n                columnNumber: 7\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"font-bold\",\n                children: value\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 39,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n        lineNumber: 22,\n        columnNumber: 3\n    }, undefined);\n};\n_c = InfoCard;\nconst Hero = ()=>{\n    _s();\n    const { data, isLoading } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.useQuery)({\n        queryKey: [\n            \"tokenMetrics\"\n        ],\n        queryFn: _lib_fetchTokenMetrics__WEBPACK_IMPORTED_MODULE_4__.fetchTokenMetrics\n    });\n    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)(\"hero\");\n    const [videoLoaded, setVideoLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const videoElement = document.getElementById(\"hero-video\");\n        if (videoElement) {\n            videoElement.addEventListener(\"canplaythrough\", ()=>{\n                setVideoLoaded(true);\n            });\n        }\n        return ()=>{\n            if (videoElement) {\n                videoElement.removeEventListener(\"canplaythrough\", ()=>{\n                    setVideoLoaded(true);\n                });\n            }\n        };\n    }, []);\n    const totalGoldLockedKg = data ? (parseFloat(data.total_gold_grams) / 1000).toFixed(2) : null; // Convert grams to kg\n    const marketCapUSD = data ? Math.ceil(parseFloat(data.tvl)).toLocaleString(\"en-US\") : null;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"h-[85vh] md:h-[75vh] w-full flex flex-col items-center justify-center px-2 md:px-10 relative\",\n        children: [\n            !videoLoaded && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                src: \"/static/backgrounds/bg_video.svg\",\n                alt: \"Poster\",\n                className: \"absolute inset-0 w-full h-full object-cover\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 80,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"video\", {\n                id: \"hero-video\",\n                autoPlay: true,\n                loop: true,\n                muted: true,\n                preload: \"auto\",\n                playsInline: true,\n                className: \"absolute inset-0 w-full h-[85vh] md:h-3/4 object-cover transition-opacity duration-500 \".concat(videoLoaded ? \"opacity-100\" : \"opacity-0\"),\n                src: \"/videos/Gold_DAO_bg.mp4\",\n                poster: \"/backgrounds/bg_video.svg\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 86,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"relative text-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-[53px] md:text-[82px] font-inter font-bold text-white leading-[90px] text-shadow-lg md:max-w-2xl mx-auto\",\n                        style: {\n                            textShadow: \"0px 10px 15px rgba(0, 0, 0, 0.10), 0px 4px 6px rgba(0, 0, 0, 0.05)\"\n                        },\n                        children: t(\"title\")\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                        lineNumber: 100,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-[40px] md:text-[82px] font-inter font-light leading-[90px] text-[rgba(0,0,0,0.80)]  w-3/4 md:w-full mx-auto  md:max-w-2xl\",\n                        style: {\n                            textShadow: \"0px 10px 15px rgba(0, 0, 0, 0.10), 0px 4px 6px rgba(0, 0, 0, 0.05)\"\n                        },\n                        children: t(\"subtitle\")\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                        lineNumber: 108,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mt-10 sm:mt-[64px] flex-col space-y-6 xl:space-y-0 xl:w-full flex lg:flex-row justify-around items-center\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(InfoCard, {\n                                iconSrc: \"/static/icons/Gold-Light-1g.svg\",\n                                iconAlt: \"Total Gold Icon\",\n                                text: t(\"total_gold_locked\"),\n                                value: \"\".concat(totalGoldLockedKg, \" kg\"),\n                                loading: isLoading\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                                lineNumber: 117,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(InfoCard, {\n                                iconSrc: \"/static/icons/Gold-Marketcap.svg\",\n                                iconAlt: \"Marketcap Icon\",\n                                text: t(\"gldt_marketcap\"),\n                                value: \"$\".concat(marketCapUSD),\n                                loading: isLoading\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                                lineNumber: 124,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                        lineNumber: 116,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n                lineNumber: 99,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\Hero.tsx\",\n        lineNumber: 78,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Hero, \"/nt0XW6mavswbD5oZI3yzw/BeOA=\", false, function() {\n    return [\n        _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.useQuery,\n        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation\n    ];\n});\n_c1 = Hero;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Hero);\nvar _c, _c1;\n$RefreshReg$(_c, \"InfoCard\");\n$RefreshReg$(_c1, \"Hero\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0hlcm8udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBNEM7QUFDRztBQUNoQjtBQUNrQjtBQUMwQjtBQVUzRSxNQUFNTSxXQUFXO1FBQUMsRUFDaEJDLE9BQU8sRUFDUEMsT0FBTyxFQUNQQyxJQUFJLEVBQ0pDLEtBQUssRUFDTEMsT0FBTyxFQUNPO3lCQUNkLDhEQUFDQztRQUFRQyxXQUFVOztZQUNoQk4seUJBQ0MsOERBQUNKLGtEQUFLQTtnQkFDSlcsS0FBS1A7Z0JBQ0xRLEtBQUtQO2dCQUNMUSxPQUFPO2dCQUNQQyxRQUFRO2dCQUNSSixXQUFVOzs7Ozs7MEJBR2QsOERBQUNLO2dCQUFLTCxXQUFVOzBCQUNiSjs7Ozs7OzBCQUVILDhEQUFDUztnQkFBS0wsV0FBVTs7Ozs7O1lBQ2ZGLHdCQUNDLDhEQUFDTztnQkFBS0wsV0FBVTs7Ozs7MENBRWhCLDhEQUFDSztnQkFBS0wsV0FBVTswQkFBYUg7Ozs7Ozs7Ozs7Ozs7S0F4QjdCSjtBQTZCTixNQUFNYSxPQUFPOztJQUNYLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxTQUFTLEVBQUUsR0FBR2pCLCtEQUFRQSxDQUFlO1FBQ2pEa0IsVUFBVTtZQUFDO1NBQWU7UUFDMUJDLFNBQVNsQixxRUFBaUJBO0lBQzVCO0lBRUEsTUFBTSxFQUFFbUIsQ0FBQyxFQUFFLEdBQUd0Qiw2REFBY0EsQ0FBQztJQUM3QixNQUFNLENBQUN1QixhQUFhQyxlQUFlLEdBQUcxQiwrQ0FBUUEsQ0FBQztJQUUvQ0MsZ0RBQVNBLENBQUM7UUFDUixNQUFNMEIsZUFBZUMsU0FBU0MsY0FBYyxDQUFDO1FBQzdDLElBQUlGLGNBQWM7WUFDaEJBLGFBQWFHLGdCQUFnQixDQUFDLGtCQUFrQjtnQkFDOUNKLGVBQWU7WUFDakI7UUFDRjtRQUVBLE9BQU87WUFDTCxJQUFJQyxjQUFjO2dCQUNoQkEsYUFBYUksbUJBQW1CLENBQUMsa0JBQWtCO29CQUNqREwsZUFBZTtnQkFDakI7WUFDRjtRQUNGO0lBQ0YsR0FBRyxFQUFFO0lBRUwsTUFBTU0sb0JBQW9CWixPQUN0QixDQUFDYSxXQUFXYixLQUFNYyxnQkFBZ0IsSUFBSSxJQUFHLEVBQUdDLE9BQU8sQ0FBQyxLQUNwRCxNQUFNLHNCQUFzQjtJQUNoQyxNQUFNQyxlQUFlaEIsT0FDakJpQixLQUFLQyxJQUFJLENBQUNMLFdBQVdiLEtBQU1tQixHQUFHLEdBQUdDLGNBQWMsQ0FBQyxXQUNoRDtJQUVKLHFCQUNFLDhEQUFDQztRQUFJNUIsV0FBVTs7WUFDWixDQUFDWSw2QkFDQSw4REFBQ2lCO2dCQUNDNUIsS0FBSTtnQkFDSkMsS0FBSTtnQkFDSkYsV0FBVTs7Ozs7OzBCQUdkLDhEQUFDOEI7Z0JBQ0NDLElBQUc7Z0JBQ0hDLFFBQVE7Z0JBQ1JDLElBQUk7Z0JBQ0pDLEtBQUs7Z0JBQ0xDLFNBQVE7Z0JBQ1JDLFdBQVc7Z0JBQ1hwQyxXQUFXLDBGQUVWLE9BRENZLGNBQWMsZ0JBQWdCO2dCQUVoQ1gsS0FBSTtnQkFDSm9DLFFBQU87Ozs7OzswQkFFVCw4REFBQ1Q7Z0JBQUk1QixXQUFVOztrQ0FDYiw4REFBQ3NDO3dCQUNDdEMsV0FBVTt3QkFDVnVDLE9BQU87NEJBQ0xDLFlBQ0U7d0JBQ0o7a0NBQ0M3QixFQUFFOzs7Ozs7a0NBRUwsOERBQUM4Qjt3QkFDQ3pDLFdBQVU7d0JBQ1Z1QyxPQUFPOzRCQUNMQyxZQUNFO3dCQUNKO2tDQUNDN0IsRUFBRTs7Ozs7O2tDQUVMLDhEQUFDaUI7d0JBQUk1QixXQUFVOzswQ0FDYiw4REFBQ1A7Z0NBQ0NDLFNBQVE7Z0NBQ1JDLFNBQVE7Z0NBQ1JDLE1BQU1lLEVBQUU7Z0NBQ1JkLE9BQU8sR0FBcUIsT0FBbEJzQixtQkFBa0I7Z0NBQzVCckIsU0FBU1U7Ozs7OzswQ0FFWCw4REFBQ2Y7Z0NBQ0NDLFNBQVE7Z0NBQ1JDLFNBQVE7Z0NBQ1JDLE1BQU1lLEVBQUU7Z0NBQ1JkLE9BQU8sSUFBaUIsT0FBYjBCO2dDQUNYekIsU0FBU1U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1yQjtHQTNGTUY7O1FBQ3dCZiwyREFBUUE7UUFLdEJGLHlEQUFjQTs7O01BTnhCaUI7QUE2Rk4sK0RBQWVBLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvSGVyby50c3g/NjY5MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSBcInJlYWN0LWkxOG5leHRcIjtcclxuaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XHJcbmltcG9ydCB7IHVzZVF1ZXJ5IH0gZnJvbSBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiO1xyXG5pbXBvcnQgeyBmZXRjaFRva2VuTWV0cmljcywgVG9rZW5NZXRyaWNzIH0gZnJvbSBcIi4uL2xpYi9mZXRjaFRva2VuTWV0cmljc1wiO1xyXG5cclxuaW50ZXJmYWNlIEluZm9DYXJkUHJvcHMge1xyXG4gIGljb25TcmM6IHN0cmluZztcclxuICBpY29uQWx0OiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgbG9hZGluZzogYm9vbGVhbjtcclxufVxyXG5cclxuY29uc3QgSW5mb0NhcmQgPSAoe1xyXG4gIGljb25TcmMsXHJcbiAgaWNvbkFsdCxcclxuICB0ZXh0LFxyXG4gIHZhbHVlLFxyXG4gIGxvYWRpbmcsXHJcbn06IEluZm9DYXJkUHJvcHMpID0+IChcclxuICA8c2VjdGlvbiBjbGFzc05hbWU9XCJmbGV4IGgtMTAgcHgtNCBwbC0yIG1pbi13LWZ1bGwgbWQ6bWluLXctMCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgcm91bmRlZC0zeGwgYm9yZGVyIGdhcC1bOHB4XSBteC0yIGJvcmRlci1bI0QzQjg3Ml0gYmctd2hpdGVcIj5cclxuICAgIHtpY29uU3JjICYmIChcclxuICAgICAgPEltYWdlXHJcbiAgICAgICAgc3JjPXtpY29uU3JjfVxyXG4gICAgICAgIGFsdD17aWNvbkFsdH1cclxuICAgICAgICB3aWR0aD17MjR9XHJcbiAgICAgICAgaGVpZ2h0PXsyNH1cclxuICAgICAgICBjbGFzc05hbWU9XCJ3LVsyNHB4XSBoLVsyNHB4XSBmbGV4LXNocmluay0wXCJcclxuICAgICAgLz5cclxuICAgICl9XHJcbiAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWludGVyIGZvbnQtbm9ybWFsIGxlYWRpbmctWzE2cHhdIHRleHQtWyMyNjJDMkVdXCI+XHJcbiAgICAgIHt0ZXh0fVxyXG4gICAgPC9zcGFuPlxyXG4gICAgPHNwYW4gY2xhc3NOYW1lPVwiaC1mdWxsIHctMC41IGJnLVsjRDNCODcyXSByb3VuZGVkLTN4bCBteC1bOHB4XVwiPjwvc3Bhbj5cclxuICAgIHtsb2FkaW5nID8gKFxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJsb2FkaW5nLXNrZWxldG9uXCI+PC9zcGFuPlxyXG4gICAgKSA6IChcclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkXCI+e3ZhbHVlfTwvc3Bhbj5cclxuICAgICl9XHJcbiAgPC9zZWN0aW9uPlxyXG4pO1xyXG5cclxuY29uc3QgSGVybyA9ICgpID0+IHtcclxuICBjb25zdCB7IGRhdGEsIGlzTG9hZGluZyB9ID0gdXNlUXVlcnk8VG9rZW5NZXRyaWNzPih7XHJcbiAgICBxdWVyeUtleTogW1widG9rZW5NZXRyaWNzXCJdLFxyXG4gICAgcXVlcnlGbjogZmV0Y2hUb2tlbk1ldHJpY3MsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHsgdCB9ID0gdXNlVHJhbnNsYXRpb24oXCJoZXJvXCIpO1xyXG4gIGNvbnN0IFt2aWRlb0xvYWRlZCwgc2V0VmlkZW9Mb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgdmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvLXZpZGVvXCIpIGFzIEhUTUxWaWRlb0VsZW1lbnQ7XHJcbiAgICBpZiAodmlkZW9FbGVtZW50KSB7XHJcbiAgICAgIHZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIiwgKCkgPT4ge1xyXG4gICAgICAgIHNldFZpZGVvTG9hZGVkKHRydWUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpZiAodmlkZW9FbGVtZW50KSB7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICBzZXRWaWRlb0xvYWRlZCh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHRvdGFsR29sZExvY2tlZEtnID0gZGF0YVxyXG4gICAgPyAocGFyc2VGbG9hdChkYXRhIS50b3RhbF9nb2xkX2dyYW1zKSAvIDEwMDApLnRvRml4ZWQoMilcclxuICAgIDogbnVsbDsgLy8gQ29udmVydCBncmFtcyB0byBrZ1xyXG4gIGNvbnN0IG1hcmtldENhcFVTRCA9IGRhdGFcclxuICAgID8gTWF0aC5jZWlsKHBhcnNlRmxvYXQoZGF0YSEudHZsKSkudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiKVxyXG4gICAgOiBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJoLVs4NXZoXSBtZDpoLVs3NXZoXSB3LWZ1bGwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHgtMiBtZDpweC0xMCByZWxhdGl2ZVwiPlxyXG4gICAgICB7IXZpZGVvTG9hZGVkICYmIChcclxuICAgICAgICA8aW1nXHJcbiAgICAgICAgICBzcmM9XCIvc3RhdGljL2JhY2tncm91bmRzL2JnX3ZpZGVvLnN2Z1wiXHJcbiAgICAgICAgICBhbHQ9XCJQb3N0ZXJcIlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlclwiXHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgICAgPHZpZGVvXHJcbiAgICAgICAgaWQ9XCJoZXJvLXZpZGVvXCJcclxuICAgICAgICBhdXRvUGxheVxyXG4gICAgICAgIGxvb3BcclxuICAgICAgICBtdXRlZFxyXG4gICAgICAgIHByZWxvYWQ9XCJhdXRvXCJcclxuICAgICAgICBwbGF5c0lubGluZVxyXG4gICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgdy1mdWxsIGgtWzg1dmhdIG1kOmgtMy80IG9iamVjdC1jb3ZlciB0cmFuc2l0aW9uLW9wYWNpdHkgZHVyYXRpb24tNTAwICR7XHJcbiAgICAgICAgICB2aWRlb0xvYWRlZCA/IFwib3BhY2l0eS0xMDBcIiA6IFwib3BhY2l0eS0wXCJcclxuICAgICAgICB9YH1cclxuICAgICAgICBzcmM9XCIvdmlkZW9zL0dvbGRfREFPX2JnLm1wNFwiXHJcbiAgICAgICAgcG9zdGVyPVwiL2JhY2tncm91bmRzL2JnX3ZpZGVvLnN2Z1wiXHJcbiAgICAgIC8+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICA8aDFcclxuICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzUzcHhdIG1kOnRleHQtWzgycHhdIGZvbnQtaW50ZXIgZm9udC1ib2xkIHRleHQtd2hpdGUgbGVhZGluZy1bOTBweF0gdGV4dC1zaGFkb3ctbGcgbWQ6bWF4LXctMnhsIG14LWF1dG9cIlxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgdGV4dFNoYWRvdzpcclxuICAgICAgICAgICAgICBcIjBweCAxMHB4IDE1cHggcmdiYSgwLCAwLCAwLCAwLjEwKSwgMHB4IDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjA1KVwiLFxyXG4gICAgICAgICAgfX0+XHJcbiAgICAgICAgICB7dChcInRpdGxlXCIpfVxyXG4gICAgICAgIDwvaDE+XHJcbiAgICAgICAgPHBcclxuICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzQwcHhdIG1kOnRleHQtWzgycHhdIGZvbnQtaW50ZXIgZm9udC1saWdodCBsZWFkaW5nLVs5MHB4XSB0ZXh0LVtyZ2JhKDAsMCwwLDAuODApXSAgdy0zLzQgbWQ6dy1mdWxsIG14LWF1dG8gIG1kOm1heC13LTJ4bFwiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICB0ZXh0U2hhZG93OlxyXG4gICAgICAgICAgICAgIFwiMHB4IDEwcHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMTApLCAwcHggNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMDUpXCIsXHJcbiAgICAgICAgICB9fT5cclxuICAgICAgICAgIHt0KFwic3VidGl0bGVcIil9XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMTAgc206bXQtWzY0cHhdIGZsZXgtY29sIHNwYWNlLXktNiB4bDpzcGFjZS15LTAgeGw6dy1mdWxsIGZsZXggbGc6ZmxleC1yb3cganVzdGlmeS1hcm91bmQgaXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICA8SW5mb0NhcmRcclxuICAgICAgICAgICAgaWNvblNyYz1cIi9zdGF0aWMvaWNvbnMvR29sZC1MaWdodC0xZy5zdmdcIlxyXG4gICAgICAgICAgICBpY29uQWx0PVwiVG90YWwgR29sZCBJY29uXCJcclxuICAgICAgICAgICAgdGV4dD17dChcInRvdGFsX2dvbGRfbG9ja2VkXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17YCR7dG90YWxHb2xkTG9ja2VkS2d9IGtnYH1cclxuICAgICAgICAgICAgbG9hZGluZz17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxJbmZvQ2FyZFxyXG4gICAgICAgICAgICBpY29uU3JjPVwiL3N0YXRpYy9pY29ucy9Hb2xkLU1hcmtldGNhcC5zdmdcIlxyXG4gICAgICAgICAgICBpY29uQWx0PVwiTWFya2V0Y2FwIEljb25cIlxyXG4gICAgICAgICAgICB0ZXh0PXt0KFwiZ2xkdF9tYXJrZXRjYXBcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtgJCR7bWFya2V0Q2FwVVNEfWB9XHJcbiAgICAgICAgICAgIGxvYWRpbmc9e2lzTG9hZGluZ31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlcm87XHJcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVRyYW5zbGF0aW9uIiwiSW1hZ2UiLCJ1c2VRdWVyeSIsImZldGNoVG9rZW5NZXRyaWNzIiwiSW5mb0NhcmQiLCJpY29uU3JjIiwiaWNvbkFsdCIsInRleHQiLCJ2YWx1ZSIsImxvYWRpbmciLCJzZWN0aW9uIiwiY2xhc3NOYW1lIiwic3JjIiwiYWx0Iiwid2lkdGgiLCJoZWlnaHQiLCJzcGFuIiwiSGVybyIsImRhdGEiLCJpc0xvYWRpbmciLCJxdWVyeUtleSIsInF1ZXJ5Rm4iLCJ0IiwidmlkZW9Mb2FkZWQiLCJzZXRWaWRlb0xvYWRlZCIsInZpZGVvRWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInRvdGFsR29sZExvY2tlZEtnIiwicGFyc2VGbG9hdCIsInRvdGFsX2dvbGRfZ3JhbXMiLCJ0b0ZpeGVkIiwibWFya2V0Q2FwVVNEIiwiTWF0aCIsImNlaWwiLCJ0dmwiLCJ0b0xvY2FsZVN0cmluZyIsImRpdiIsImltZyIsInZpZGVvIiwiaWQiLCJhdXRvUGxheSIsImxvb3AiLCJtdXRlZCIsInByZWxvYWQiLCJwbGF5c0lubGluZSIsInBvc3RlciIsImgxIiwic3R5bGUiLCJ0ZXh0U2hhZG93IiwicCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Hero.tsx\n"));

/***/ })

});