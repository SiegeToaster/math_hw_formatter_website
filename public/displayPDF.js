"use strict";
exports.__esModule = true;
// compile with:
// tsc public/displayPDF.ts
// or if that doesn't work
// npx tsc public/displayPDF.ts
var urlParams = new URLSearchParams(window.location.search);
var pdfString = urlParams.get("pdfString");
if (pdfString) {
    var iframe = document.getElementById("pdfViewer");
    iframe === null || iframe === void 0 ? void 0 : iframe.setAttribute('src', pdfString);
}
