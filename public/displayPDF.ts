// compile with:
// tsc public/displayPDF.ts
// or if that doesn't work
// npx tsc public/displayPDF.ts
const urlParams = new URLSearchParams(window.location.search)
const pdfString = urlParams.get("pdfString")
if (pdfString) {
	const iframe = document.getElementById("pdfViewer");
	iframe?.setAttribute('src', pdfString)
}

export {}