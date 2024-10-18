"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("_app-pages-browser_src_components_TokensCards_tsx",{

/***/ "(app-pages-browser)/./src/components/TokensCards.tsx":
/*!****************************************!*\
  !*** ./src/components/TokensCards.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ \"(app-pages-browser)/../../node_modules/react-i18next/dist/es/index.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nconst TokensCards = ()=>{\n    _s();\n    const { t } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)(\"cards\");\n    const cards = t(\"cards\", {\n        returnObjects: true\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        className: \"flex flex-col items-center justify-center gap-[24rem] md:gap-[14rem] px-2 md:w-[calc(100%-45px)] pt-[96px] 3xl:max-w-[90rem] mb-[96px] bg-[#FBF8F1]\",\n        children: cards && cards.map((card, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"card shadow-lg bg-white rounded-[20px] flex flex-col md:flex-row items-center max-h-[780px] md:max-h-[612px] w-full\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col md:w-1/2 p-8 md:py-16 md:px-16 2xl:px-32\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"bg-[#F7EED7] text-[#B89143] rounded-full w-fit px-4 py-1 mb-4\",\n                                children: card.tag\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n                                lineNumber: 30,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"font-semibold text-3xl mb-4 pt-8\",\n                                children: card.title\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n                                lineNumber: 33,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"text-base mb-4\",\n                                children: card.description\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n                                lineNumber: 36,\n                                columnNumber: 15\n                            }, undefined),\n                            card.points.map((point, pointIndex)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"my-1\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        className: \"text-[16px]\",\n                                        children: [\n                                            pointIndex + 1,\n                                            \". \",\n                                            point\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n                                        lineNumber: 39,\n                                        columnNumber: 19\n                                    }, undefined)\n                                }, pointIndex, false, {\n                                    fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n                                    lineNumber: 38,\n                                    columnNumber: 17\n                                }, undefined))\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n                        lineNumber: 29,\n                        columnNumber: 13\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"relative w-full md:w-1/2 h-[780px] md:h-[612px] \",\n                        children: [\n                            card.videoSrc && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"video\", {\n                                    src: card.videoSrc,\n                                    autoPlay: true,\n                                    loop: true,\n                                    muted: true,\n                                    playsInline: true,\n                                    className: \"rounded-b-[20px] md:rounded-r-[20px] md:rounded-b-none object-cover w-full h-full absolute\",\n                                    controlsList: \"nodownload\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n                                    lineNumber: 49,\n                                    columnNumber: 19\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n                                lineNumber: 48,\n                                columnNumber: 17\n                            }, undefined),\n                            card.imageSrc && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                                    src: card.imageSrc,\n                                    alt: card.title,\n                                    fill: true,\n                                    className: \"rounded-b-[20px] md:rounded-r-[20px] md:rounded-b-none object-cover\",\n                                    sizes: \"(max-width: 768px) 100vw, 50vw\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n                                    lineNumber: 63,\n                                    columnNumber: 19\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n                                lineNumber: 62,\n                                columnNumber: 17\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n                        lineNumber: 46,\n                        columnNumber: 13\n                    }, undefined)\n                ]\n            }, index, true, {\n                fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n                lineNumber: 24,\n                columnNumber: 11\n            }, undefined))\n    }, void 0, false, {\n        fileName: \"D:\\\\Bity\\\\gldt-swap\\\\client\\\\gld_landing_page\\\\src\\\\components\\\\TokensCards.tsx\",\n        lineNumber: 21,\n        columnNumber: 5\n    }, undefined);\n};\n_s(TokensCards, \"zlIdU9EjM2llFt74AbE2KsUJXyM=\", false, function() {\n    return [\n        react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation\n    ];\n});\n_c = TokensCards;\n/* harmony default export */ __webpack_exports__[\"default\"] = (TokensCards);\nvar _c;\n$RefreshReg$(_c, \"TokensCards\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1Rva2Vuc0NhcmRzLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFFOEI7QUFDZ0I7QUFXOUMsTUFBTUUsY0FBYzs7SUFDbEIsTUFBTSxFQUFFQyxDQUFDLEVBQUUsR0FBR0YsNkRBQWNBLENBQUM7SUFFN0IsTUFBTUcsUUFBZ0JELEVBQUUsU0FBUztRQUFFRSxlQUFlO0lBQUs7SUFFdkQscUJBQ0UsOERBQUNDO1FBQVFDLFdBQVU7a0JBQ2hCSCxTQUNDQSxNQUFNSSxHQUFHLENBQUMsQ0FBQ0MsTUFBTUMsc0JBQ2YsOERBQUNDO2dCQUVDSixXQUFVOztrQ0FHViw4REFBQ0k7d0JBQUlKLFdBQVU7OzBDQUNiLDhEQUFDSTtnQ0FBSUosV0FBVTswQ0FDWkUsS0FBS0csR0FBRzs7Ozs7OzBDQUVYLDhEQUFDRDtnQ0FBSUosV0FBVTswQ0FDWkUsS0FBS0ksS0FBSzs7Ozs7OzBDQUViLDhEQUFDQztnQ0FBRVAsV0FBVTswQ0FBa0JFLEtBQUtNLFdBQVc7Ozs7Ozs0QkFDOUNOLEtBQUtPLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDLENBQUNTLE9BQU9DLDJCQUN2Qiw4REFBQ1A7b0NBQXFCSixXQUFVOzhDQUM5Qiw0RUFBQ1k7d0NBQUtaLFdBQVU7OzRDQUNiVyxhQUFhOzRDQUFFOzRDQUFHRDs7Ozs7OzttQ0FGYkM7Ozs7Ozs7Ozs7O2tDQVFkLDhEQUFDUDt3QkFBSUosV0FBVTs7NEJBQ1pFLEtBQUtXLFFBQVEsa0JBQ1osOERBQUNUO2dDQUFJSixXQUFVOzBDQUNiLDRFQUFDYztvQ0FDQ0MsS0FBS2IsS0FBS1csUUFBUTtvQ0FDbEJHLFFBQVE7b0NBQ1JDLElBQUk7b0NBQ0pDLEtBQUs7b0NBQ0xDLFdBQVc7b0NBQ1huQixXQUFVO29DQUNWb0IsY0FBYTs7Ozs7Ozs7Ozs7NEJBS2xCbEIsS0FBS21CLFFBQVEsa0JBQ1osOERBQUNqQjtnQ0FBSUosV0FBVTswQ0FDYiw0RUFBQ1Asa0RBQUtBO29DQUNKc0IsS0FBS2IsS0FBS21CLFFBQVE7b0NBQ2xCQyxLQUFLcEIsS0FBS0ksS0FBSztvQ0FDZmlCLElBQUk7b0NBQ0p2QixXQUFVO29DQUNWd0IsT0FBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBM0NUckI7Ozs7Ozs7Ozs7QUFvRGpCO0dBOURNUjs7UUFDVUQseURBQWNBOzs7S0FEeEJDO0FBZ0VOLCtEQUFlQSxXQUFXQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1Rva2Vuc0NhcmRzLnRzeD9hYmZjIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xyXG5cclxuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnXHJcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAncmVhY3QtaTE4bmV4dCdcclxuXHJcbmludGVyZmFjZSBDYXJkIHtcclxuICB0aXRsZTogc3RyaW5nXHJcbiAgdGFnOiBzdHJpbmdcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nXHJcbiAgaW1hZ2VTcmM/OiBzdHJpbmdcclxuICB2aWRlb1NyYz86IHN0cmluZ1xyXG4gIHBvaW50czogc3RyaW5nW11cclxufVxyXG5cclxuY29uc3QgVG9rZW5zQ2FyZHMgPSAoKSA9PiB7XHJcbiAgY29uc3QgeyB0IH0gPSB1c2VUcmFuc2xhdGlvbignY2FyZHMnKVxyXG5cclxuICBjb25zdCBjYXJkczogQ2FyZFtdID0gdCgnY2FyZHMnLCB7IHJldHVybk9iamVjdHM6IHRydWUgfSkgYXMgQ2FyZFtdXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9J2ZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC1bMjRyZW1dIG1kOmdhcC1bMTRyZW1dIHB4LTIgbWQ6dy1bY2FsYygxMDAlLTQ1cHgpXSBwdC1bOTZweF0gM3hsOm1heC13LVs5MHJlbV0gbWItWzk2cHhdIGJnLVsjRkJGOEYxXSc+XHJcbiAgICAgIHtjYXJkcyAmJlxyXG4gICAgICAgIGNhcmRzLm1hcCgoY2FyZCwgaW5kZXgpID0+IChcclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPSdjYXJkIHNoYWRvdy1sZyBiZy13aGl0ZSByb3VuZGVkLVsyMHB4XSBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGl0ZW1zLWNlbnRlciBtYXgtaC1bNzgwcHhdIG1kOm1heC1oLVs2MTJweF0gdy1mdWxsJ1xyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7LyogVGV4dCBTZWN0aW9uKi99XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4IGZsZXgtY29sIG1kOnctMS8yIHAtOCBtZDpweS0xNiBtZDpweC0xNiAyeGw6cHgtMzInPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdiZy1bI0Y3RUVEN10gdGV4dC1bI0I4OTE0M10gcm91bmRlZC1mdWxsIHctZml0IHB4LTQgcHktMSBtYi00Jz5cclxuICAgICAgICAgICAgICAgIHtjYXJkLnRhZ31cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZm9udC1zZW1pYm9sZCB0ZXh0LTN4bCBtYi00IHB0LTgnPlxyXG4gICAgICAgICAgICAgICAge2NhcmQudGl0bGV9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSd0ZXh0LWJhc2UgbWItNCc+e2NhcmQuZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICAgIHtjYXJkLnBvaW50cy5tYXAoKHBvaW50LCBwb2ludEluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17cG9pbnRJbmRleH0gY2xhc3NOYW1lPSdteS0xJz5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0ZXh0LVsxNnB4XSc+XHJcbiAgICAgICAgICAgICAgICAgICAge3BvaW50SW5kZXggKyAxfS4ge3BvaW50fVxyXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHsvKiBJbWFnZSAvIFZpZGVvIFNlY3Rpb24gKi99XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdyZWxhdGl2ZSB3LWZ1bGwgbWQ6dy0xLzIgaC1bNzgwcHhdIG1kOmgtWzYxMnB4XSAnPlxyXG4gICAgICAgICAgICAgIHtjYXJkLnZpZGVvU3JjICYmIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPScnPlxyXG4gICAgICAgICAgICAgICAgICA8dmlkZW9cclxuICAgICAgICAgICAgICAgICAgICBzcmM9e2NhcmQudmlkZW9TcmN9XHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b1BsYXlcclxuICAgICAgICAgICAgICAgICAgICBsb29wXHJcbiAgICAgICAgICAgICAgICAgICAgbXV0ZWRcclxuICAgICAgICAgICAgICAgICAgICBwbGF5c0lubGluZVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ncm91bmRlZC1iLVsyMHB4XSBtZDpyb3VuZGVkLXItWzIwcHhdIG1kOnJvdW5kZWQtYi1ub25lIG9iamVjdC1jb3ZlciB3LWZ1bGwgaC1mdWxsIGFic29sdXRlJ1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzTGlzdD0nbm9kb3dubG9hZCdcclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICAgIHtjYXJkLmltYWdlU3JjICYmIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPScnPlxyXG4gICAgICAgICAgICAgICAgICA8SW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICBzcmM9e2NhcmQuaW1hZ2VTcmN9XHJcbiAgICAgICAgICAgICAgICAgICAgYWx0PXtjYXJkLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9J3JvdW5kZWQtYi1bMjBweF0gbWQ6cm91bmRlZC1yLVsyMHB4XSBtZDpyb3VuZGVkLWItbm9uZSBvYmplY3QtY292ZXInXHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZXM9JyhtYXgtd2lkdGg6IDc2OHB4KSAxMDB2dywgNTB2dydcclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSl9XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb2tlbnNDYXJkc1xyXG4iXSwibmFtZXMiOlsiSW1hZ2UiLCJ1c2VUcmFuc2xhdGlvbiIsIlRva2Vuc0NhcmRzIiwidCIsImNhcmRzIiwicmV0dXJuT2JqZWN0cyIsInNlY3Rpb24iLCJjbGFzc05hbWUiLCJtYXAiLCJjYXJkIiwiaW5kZXgiLCJkaXYiLCJ0YWciLCJ0aXRsZSIsInAiLCJkZXNjcmlwdGlvbiIsInBvaW50cyIsInBvaW50IiwicG9pbnRJbmRleCIsInNwYW4iLCJ2aWRlb1NyYyIsInZpZGVvIiwic3JjIiwiYXV0b1BsYXkiLCJsb29wIiwibXV0ZWQiLCJwbGF5c0lubGluZSIsImNvbnRyb2xzTGlzdCIsImltYWdlU3JjIiwiYWx0IiwiZmlsbCIsInNpemVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/TokensCards.tsx\n"));

/***/ })

});