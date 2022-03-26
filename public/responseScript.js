"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// compile with:
// tsc public/responseScript.ts
// or if that doesn't work
// npx tsc public/responseScript.ts
var urlParams = new URLSearchParams(window.location.search);
/**
 * Parameters from URL to be passed on to API call
 *
 * params[0] = name
 *
 * params[1] = periodNumber
 *
 * params[2] = hwNumber
 *
 * params[3] = pages
 */
var params = [];
params[0] = urlParams.get("name");
params[1] = urlParams.get("periodNumber");
params[2] = urlParams.get("hwNumber");
params[3] = urlParams.get("pages");
response();
function response() {
    return __awaiter(this, void 0, void 0, function () {
        var APIResponse, pdf, para_1, button;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("./api/hello?name=".concat(params[0], "&periodNumber=").concat(params[1], "&hwNumber=").concat(params[2], "&pages=").concat(params[3])).then(function (res) {
                        return res.json();
                    })];
                case 1:
                    APIResponse = _a.sent();
                    console.log(response);
                    if (APIResponse.message) {
                        console.log(APIResponse.message);
                        updateText("Error: ".concat(APIResponse.message));
                    }
                    else {
                        pdf = APIResponse.pdf;
                        para_1 = new URLSearchParams();
                        para_1.append("pdfString", pdf);
                        if (APIResponse.needReviewProblems) {
                            updateText('Review problems needed.<br></br>I would tell you what topics you need here, but that would take more effort than I am currently willing to put in.');
                            button = document.getElementById("okayButton");
                            if (button) {
                                button.style.display = "block";
                                button.onclick = function () {
                                    window.location.href = "./displayPDF?" + para_1.toString();
                                };
                            }
                        }
                        else {
                            window.location.href = "./displayPDF?" + para_1.toString();
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function updateText(updatedText) {
    return __awaiter(this, void 0, void 0, function () {
        var testThing;
        return __generator(this, function (_a) {
            testThing = document.getElementById("testThing");
            if (testThing)
                testThing.innerHTML = updatedText;
            return [2 /*return*/];
        });
    });
}
