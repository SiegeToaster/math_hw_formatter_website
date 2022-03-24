// compile with:
// tsc public/test.ts
// or if that doesn't work
// npx tsc public/test.ts

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

let newText = "NEW test thing :)"
async function testFunc() {
	const test = await fetch(`./api/hello?name=${params[0]}&periodNumber=${params[1]}&hwNumber=${params[2]}`).then(res => {
		return res.json()
	})
	console.log(test)
}
testFunc()

const testThing = document.getElementById("testThing")
if (testThing) testThing.innerHTML = newText

export {}