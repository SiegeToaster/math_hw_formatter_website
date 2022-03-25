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
 * 
 * params[3] = pages
 */
const params: string[] | null[] = []

params[0] = urlParams.get("name")
params[1] = urlParams.get("periodNumber")
params[2] = urlParams.get("hwNumber")
params[3] = urlParams.get("pages")

response()

export {}

async function response() {
  const APIResponse = await fetch(`./api/hello?name=${params[0]}&periodNumber=${params[1]}&hwNumber=${params[2]}&pages=${params[3]}`).then(res => {
    return res.json()
  })
  console.log(response)

  if (APIResponse.message) {
    console.log(APIResponse.message)
    updateText(`Error: ${APIResponse.message}`)
  } else {
    const pdf: string = APIResponse.pdf
    const para = new URLSearchParams()
    para.append("pdfString", pdf)

    if (APIResponse.needReviewProblems) {
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