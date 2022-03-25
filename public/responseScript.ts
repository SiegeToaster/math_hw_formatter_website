// compile with:
// tsc public/responseScript.ts
// or if that doesn't work
// npx tsc public/responseScript.ts
const urlParams = new URLSearchParams(window.location.search)

/**
 * Parameters from URL to be passed on to API call
 *
 * params[0] = name
 * 
 * params[1] = periodNumber
 * 
 * params[2] = hwNumber
 */
const params: string[] | null[] = []

params[0] = urlParams.get("name")
params[1] = urlParams.get("periodNumber")
params[2] = urlParams.get("hwNumber")

console.log(params)

response()

export {}

async function response() {
  const response = await fetch(`./api/hello?name=${params[0]}&periodNumber=${params[1]}&hwNumber=${params[2]}`).then(res => {
    return res.json()
  })
  console.log(response)

  if (response.message) {
    console.log(response.message)
    updateText(`Error: ${response.message}`)
  } else {
    const pdf: string = response.pdf
    const para = new URLSearchParams()
    para.append("pdfString", pdf)

    if (response.needReviewProblems) {
      updateText('Review problems needed.<br></br>I would tell you what topics you need here, but that would take more effort than I am currently willing to put in.')
      const button = document.getElementById("okayButton");
      if (button) {
        button.style.display = "block";
        button.onclick = () => {
          window.location.href = "./displayPDF?" + para.toString()
        }
      }
    } else {
      window.location.href = "./displayPDF?" + para.toString()
    }
  }
  // updateText(response);
}

async function updateText(updatedText: string) {
  const testThing = document.getElementById("testThing")
  if (testThing) testThing.innerHTML = updatedText
}