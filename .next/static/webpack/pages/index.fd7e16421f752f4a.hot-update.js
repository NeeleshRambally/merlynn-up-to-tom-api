"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./lib/api.js":
/*!********************!*\
  !*** ./lib/api.js ***!
  \********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   batchQueryModel: function() { return /* binding */ batchQueryModel; },\n/* harmony export */   fetchAllModels: function() { return /* binding */ fetchAllModels; },\n/* harmony export */   fetchModelMetadata: function() { return /* binding */ fetchModelMetadata; },\n/* harmony export */   queryModel: function() { return /* binding */ queryModel; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\nconst API_KEY = \"9307bfd5fa011428ff198bb37547f979\";\nconst BASE_URL = \"https://api.up2tom.com/v3\";\nconst fetchModelMetadata = async (modelId)=>{\n    const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(\"\".concat(BASE_URL, \"/models/\").concat(modelId), {\n        headers: {\n            \"Authorization\": \"Bearer \".concat(API_KEY)\n        }\n    });\n    return response.data;\n};\nconst queryModel = async (modelId, inputVariables)=>{\n    try {\n        const payload = {\n            data: {\n                type: \"scenario\",\n                attributes: {\n                    input: inputVariables\n                }\n            }\n        };\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().post(\"\".concat(BASE_URL, \"/decision/\").concat(modelId), payload, {\n            headers: {\n                Authorization: \"Bearer \".concat(API_KEY),\n                \"Content-Type\": \"application/vnd.api+json\"\n            }\n        });\n        // Return data if the request is successful\n        return {\n            success: true,\n            data: response.data\n        };\n    } catch (error) {\n        let errorMessage = \"An unknown error occurred\";\n        if (error.response) {\n            switch(error.response.status){\n                case 400:\n                    errorMessage = \"Bad model ID\";\n                    break;\n                case 401:\n                    errorMessage = \"Missing or bad API key\";\n                    break;\n                case 403:\n                    errorMessage = \"API Key is not in use or has been disabled, or no access to model\";\n                    break;\n                case 422:\n                    var _error_response_data_errors_;\n                    errorMessage = \"Invalid input: \".concat(((_error_response_data_errors_ = error.response.data.errors[0]) === null || _error_response_data_errors_ === void 0 ? void 0 : _error_response_data_errors_.detail) || \"See error detail\");\n                    break;\n                case 405:\n                    errorMessage = \"Method not allowed (GET)\";\n                    break;\n                case 503:\n                    errorMessage = \"Service is currently unavailable\";\n                    break;\n                default:\n                    errorMessage = \"Unexpected error: \".concat(error.response.status);\n            }\n        }\n        // Return error if the request fails\n        return {\n            success: false,\n            error: errorMessage\n        };\n    }\n};\nconst fetchAllModels = async ()=>{\n    const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(\"\".concat(BASE_URL, \"/models\"), {\n        headers: {\n            \"Authorization\": \"Bearer \".concat(API_KEY)\n        }\n    });\n    return response.data;\n};\n// Batch query model with an array of input scenarios\nconst batchQueryModel = async (modelId, inputVariablesArray)=>{\n    try {\n        const payload = {\n            data: inputVariablesArray.map((inputVariables)=>({\n                    type: \"scenario\",\n                    attributes: {\n                        input: inputVariables\n                    }\n                }))\n        };\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0___default().post(\"\".concat(BASE_URL, \"/batch/\").concat(modelId), payload, {\n            headers: {\n                Authorization: \"Bearer \".concat(API_KEY),\n                \"Content-Type\": \"application/vnd.api+json\"\n            }\n        });\n        // Return data if the request is successful\n        return {\n            success: true,\n            data: response.data\n        };\n    } catch (error) {\n        let errorMessage = \"An unknown error occurred\";\n        if (error.response) {\n            switch(error.response.status){\n                case 400:\n                    errorMessage = \"Bad model ID\";\n                    break;\n                case 401:\n                    errorMessage = \"Missing or bad API key\";\n                    break;\n                case 403:\n                    errorMessage = \"API Key is not in use or has been disabled, or no access to model\";\n                    break;\n                case 422:\n                    var _error_response_data_errors_;\n                    errorMessage = \"Invalid input: \".concat(((_error_response_data_errors_ = error.response.data.errors[0]) === null || _error_response_data_errors_ === void 0 ? void 0 : _error_response_data_errors_.detail) || \"See error detail\");\n                    break;\n                case 405:\n                    errorMessage = \"Method not allowed (GET)\";\n                    break;\n                case 503:\n                    errorMessage = \"Service is currently unavailable\";\n                    break;\n                default:\n                    errorMessage = \"Unexpected error: \".concat(error.response.status);\n            }\n        }\n        // Return error if the request fails\n        return {\n            success: false,\n            error: errorMessage\n        };\n    }\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S0FBSztvQkFDSEEsZUFBZTtvQkFDZjtnQkFDRixLQUFLO3dCQUM4QkQ7b0JBQWpDQyxlQUFlLGtCQUE4RSxPQUE1REQsRUFBQUEsK0JBQUFBLE1BQU1iLFFBQVEsQ0FBQ0csSUFBSSxDQUFDYSxNQUFNLENBQUMsRUFBRSxjQUE3QkgsbURBQUFBLDZCQUErQkksTUFBTSxLQUFJO29CQUMxRTtnQkFDRixLQUFLO29CQUNISCxlQUFlO29CQUNmO2dCQUNGLEtBQUs7b0JBQ0hBLGVBQWU7b0JBQ2Y7Z0JBQ0Y7b0JBQ0VBLGVBQWUscUJBQTJDLE9BQXRCRCxNQUFNYixRQUFRLENBQUNlLE1BQU07WUFDN0Q7UUFDRjtRQUVBLG9DQUFvQztRQUNwQyxPQUFPO1lBQUVILFNBQVM7WUFBT0MsT0FBT0M7UUFBYTtJQUMvQztBQUNGLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbGliL2FwaS5qcz80NTQyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmNvbnN0IEFQSV9LRVkgPSAnOTMwN2JmZDVmYTAxMTQyOGZmMTk4YmIzNzU0N2Y5NzknO1xuY29uc3QgQkFTRV9VUkwgPSAnaHR0cHM6Ly9hcGkudXAydG9tLmNvbS92Myc7XG5cbmV4cG9ydCBjb25zdCBmZXRjaE1vZGVsTWV0YWRhdGEgPSBhc3luYyAobW9kZWxJZCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChgJHtCQVNFX1VSTH0vbW9kZWxzLyR7bW9kZWxJZH1gLCB7XG4gICAgaGVhZGVyczoge1xuICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7QVBJX0tFWX1gLFxuICAgIH0sXG4gIH0pO1xuICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbn07XG5cbmV4cG9ydCBjb25zdCBxdWVyeU1vZGVsID0gYXN5bmMgKG1vZGVsSWQsIGlucHV0VmFyaWFibGVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdHlwZTogXCJzY2VuYXJpb1wiLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgaW5wdXQ6IGlucHV0VmFyaWFibGVzLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KFxuICAgICAgYCR7QkFTRV9VUkx9L2RlY2lzaW9uLyR7bW9kZWxJZH1gLFxuICAgICAgcGF5bG9hZCxcbiAgICAgIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtBUElfS0VZfWAsXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi92bmQuYXBpK2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gUmV0dXJuIGRhdGEgaWYgdGhlIHJlcXVlc3QgaXMgc3VjY2Vzc2Z1bFxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHJlc3BvbnNlLmRhdGEgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsZXQgZXJyb3JNZXNzYWdlID0gXCJBbiB1bmtub3duIGVycm9yIG9jY3VycmVkXCI7XG4gICAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XG4gICAgICBzd2l0Y2ggKGVycm9yLnJlc3BvbnNlLnN0YXR1cykge1xuICAgICAgICBjYXNlIDQwMDpcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIkJhZCBtb2RlbCBJRFwiO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQwMTpcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIk1pc3Npbmcgb3IgYmFkIEFQSSBrZXlcIjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MDM6XG4gICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJBUEkgS2V5IGlzIG5vdCBpbiB1c2Ugb3IgaGFzIGJlZW4gZGlzYWJsZWQsIG9yIG5vIGFjY2VzcyB0byBtb2RlbFwiO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQyMjpcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBgSW52YWxpZCBpbnB1dDogJHtlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yc1swXT8uZGV0YWlsIHx8IFwiU2VlIGVycm9yIGRldGFpbFwifWA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDA1OlxuICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiTWV0aG9kIG5vdCBhbGxvd2VkIChHRVQpXCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTAzOlxuICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiU2VydmljZSBpcyBjdXJyZW50bHkgdW5hdmFpbGFibGVcIjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBgVW5leHBlY3RlZCBlcnJvcjogJHtlcnJvci5yZXNwb25zZS5zdGF0dXN9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gZXJyb3IgaWYgdGhlIHJlcXVlc3QgZmFpbHNcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yTWVzc2FnZSB9O1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2hBbGxNb2RlbHMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGAke0JBU0VfVVJMfS9tb2RlbHNgLCB7XG4gICAgaGVhZGVyczoge1xuICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7QVBJX0tFWX1gLFxuICAgIH0sXG4gIH0pO1xuICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbn07XG5cbi8vIEJhdGNoIHF1ZXJ5IG1vZGVsIHdpdGggYW4gYXJyYXkgb2YgaW5wdXQgc2NlbmFyaW9zXG5leHBvcnQgY29uc3QgYmF0Y2hRdWVyeU1vZGVsID0gYXN5bmMgKG1vZGVsSWQsIGlucHV0VmFyaWFibGVzQXJyYXkpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgZGF0YTogaW5wdXRWYXJpYWJsZXNBcnJheS5tYXAoKGlucHV0VmFyaWFibGVzKSA9PiAoe1xuICAgICAgICB0eXBlOiBcInNjZW5hcmlvXCIsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBpbnB1dDogaW5wdXRWYXJpYWJsZXMsXG4gICAgICAgIH0sXG4gICAgICB9KSksXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChcbiAgICAgIGAke0JBU0VfVVJMfS9iYXRjaC8ke21vZGVsSWR9YCxcbiAgICAgIHBheWxvYWQsXG4gICAgICB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7QVBJX0tFWX1gLFxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vdm5kLmFwaStqc29uXCIsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIFJldHVybiBkYXRhIGlmIHRoZSByZXF1ZXN0IGlzIHN1Y2Nlc3NmdWxcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBkYXRhOiByZXNwb25zZS5kYXRhIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbGV0IGVycm9yTWVzc2FnZSA9IFwiQW4gdW5rbm93biBlcnJvciBvY2N1cnJlZFwiO1xuICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgc3dpdGNoIChlcnJvci5yZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgY2FzZSA0MDA6XG4gICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJCYWQgbW9kZWwgSURcIjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MDE6XG4gICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJNaXNzaW5nIG9yIGJhZCBBUEkga2V5XCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDAzOlxuICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiQVBJIEtleSBpcyBub3QgaW4gdXNlIG9yIGhhcyBiZWVuIGRpc2FibGVkLCBvciBubyBhY2Nlc3MgdG8gbW9kZWxcIjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MjI6XG4gICAgICAgICAgZXJyb3JNZXNzYWdlID0gYEludmFsaWQgaW5wdXQ6ICR7ZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcnNbMF0/LmRldGFpbCB8fCBcIlNlZSBlcnJvciBkZXRhaWxcIn1gO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQwNTpcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIk1ldGhvZCBub3QgYWxsb3dlZCAoR0VUKVwiO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDUwMzpcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIlNlcnZpY2UgaXMgY3VycmVudGx5IHVuYXZhaWxhYmxlXCI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgZXJyb3JNZXNzYWdlID0gYFVuZXhwZWN0ZWQgZXJyb3I6ICR7ZXJyb3IucmVzcG9uc2Uuc3RhdHVzfWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGVycm9yIGlmIHRoZSByZXF1ZXN0IGZhaWxzXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBlcnJvck1lc3NhZ2UgfTtcbiAgfVxufTsiXSwibmFtZXMiOlsiYXhpb3MiLCJBUElfS0VZIiwiQkFTRV9VUkwiLCJmZXRjaE1vZGVsTWV0YWRhdGEiLCJtb2RlbElkIiwicmVzcG9uc2UiLCJnZXQiLCJoZWFkZXJzIiwiZGF0YSIsInF1ZXJ5TW9kZWwiLCJpbnB1dFZhcmlhYmxlcyIsInBheWxvYWQiLCJ0eXBlIiwiYXR0cmlidXRlcyIsImlucHV0IiwicG9zdCIsIkF1dGhvcml6YXRpb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJzdGF0dXMiLCJlcnJvcnMiLCJkZXRhaWwiLCJmZXRjaEFsbE1vZGVscyIsImJhdGNoUXVlcnlNb2RlbCIsImlucHV0VmFyaWFibGVzQXJyYXkiLCJtYXAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./lib/api.js\n"));

/***/ })

});