// http://localhost:3000/api/hello
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth, docs, docs_v1 } from '@googleapis/docs'
import { jsPDF } from 'jspdf'

type ResponseData = {
  name: string
  period: string
  hwNum: string
  needReviewProblems: boolean
}

type ResponseMessage = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseMessage>
) {
  // console.log(req)
  // set parameters
  getAssignment("66")

  let params = req.query
  let name = params.name
  let period = params.periodNumber
  
  if (!params || !name || !period) {
    console.log('Missing Input(s).')
    return res.status(400).json({ message: '400 - Missing input(s)' })
  }
  console.log([params, name, period])
  if (period.constructor === Array) period = period[0]
  // @ts-expect-error types are dumb, period, supposedly, could be an array but it is checked above
  if (parseInt(period) < 1 || parseInt(period) > 6 || isNaN(parseInt(period))) period = ''
  let hwNum = params.hwNumber
  // respond with error if inputs are invalid
  if ([params, name, period].includes('')) return res.status(400).json({ message: '400 - Invalid input(s)' })

  if (Array.isArray(hwNum)) hwNum = hwNum.join()
  getAssignment(hwNum)

  // respond success with inputs
  res.status(200).json({ name: `${name}`, period: `${period}`, hwNum: `${hwNum}`, needReviewProblems: false })
}

async function generatePDF(hwNum: string, assignment: string, name: string, period: string, date: string) {
  const pdf = new jsPDF()
  pdf.setFont("Arial")
  pdf.setFontSize(14)
  pdf.text(hwNum, 35, 12, {maxWidth: 24})
  pdf.text(assignment, 63, 12, {maxWidth: 93})
  pdf.text([name, `Per ${period}`, date], 161, 12, {maxWidth: 55})
  pdf.save()
}

async function getAssignment(hwNum: string) {
  const client = docs({
    version: 'v1',
    auth: await googleAuth(),
  })

  const document = await client.documents.get({
    documentId: '1p21l34ih6o_aiOtmaZTnJ-fuXvU9W6nY5ZMDDXGSrYQ',
  })

  const data = document.data.body?.content![4].table!.tableRows!

  for (let block of data) {
    const assignment = block.tableCells
    const assignmentTitle = assignment![0].content
    if (!assignmentTitle) continue
    const hwString = constructHwString(assignmentTitle)
    let validNumbers = constructValidNumbers(hwString)
		validNumbers = filterValidNumbers(validNumbers, hwString)
		console.log(validNumbers)
  }
}

function constructHwString(assignmentTitle: docs_v1.Schema$StructuralElement[]) {
  let hwString = ''
  for (let assignmentNum of assignmentTitle) {
    let assignmentTitleText = assignmentNum.paragraph?.elements![0].textRun?.content

    if (typeof assignmentTitleText != "string") continue

    if (assignmentTitleText.toLowerCase() == 'hw') continue
    if (assignmentTitleText.toLowerCase().includes('hw')) assignmentTitleText = assignmentTitleText.slice(2, -1)
    
    assignmentTitleText = assignmentTitleText.replaceAll('\n', '')
    assignmentTitleText = assignmentTitleText.trim()
    
    hwString += assignmentTitleText + ' '
    // console.log(assignmentTitleText)
  }

  return hwString.trim()
}

function constructValidNumbers(hwString: string) {
  let validNumbers: string[] = []
	const firstChar: any = hwString[0]

  if (!isNaN(firstChar)) {
    if (hwString.includes('/')) {
      validNumbers = hwString.split('/')
    } else if (hwString.includes('-')) {
      validNumbers = hwString.split('-')
      for (let i = (parseInt(validNumbers[0]) + 1); i < parseInt(validNumbers[1]); i++) {
        validNumbers.push(i.toString())
      }
    } else {
			validNumbers.push(hwString)
		}
  } else {
		validNumbers.push(hwString)
	}

  return validNumbers
}

function filterValidNumbers(validNumbers: string[], hwString: string) {
	for (const hw of validNumbers) {

		// @ts-expect-error isNaN only accepts numbers for whatever reason
		if (!isNaN(hw) || hw.toLowerCase().startsWith('test') || hw.toLowerCase().startsWith('chap')) continue

		if (validNumbers.length > 1) {
			validNumbers = [hwString]
			continue
		}

		if (hwString.toLowerCase().includes('test')) {
			const index = validNumbers[0].indexOf(' ')
			validNumbers[0] = validNumbers[0].slice(0, index)
			validNumbers.push(hwString.slice(index).trim())
		}
	}

	return validNumbers
}

async function googleAuth() {
  const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!
	const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL!

  const authentication = new auth.GoogleAuth({
    credentials: {
      private_key: GOOGLE_PRIVATE_KEY,
      client_email: GOOGLE_CLIENT_EMAIL,
    },
    scopes: ['https://www.googleapis.com/auth/documents'],
  })

  return authentication.getClient();
}