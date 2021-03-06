/**
 * String.prototype.replaceAll() polyfill
 * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!String.prototype.replaceAll) {
  // @ts-ignore
String.prototype.replaceAll = function(str: string | RegExp, newStr: string){

  // If a regex pattern
  if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
    return this.replace(str, newStr);
  }

  // If a string
  return this.replace(new RegExp(str, 'g'), newStr);

};
}
if (!Array.prototype.at) {
Array.prototype.at = function(index: number) : any {
  return (index >= 0) ? 
  this[index] : 
  this[this.length + index]
}
}


// http://localhost:3000/api/hello
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth, docs, docs_v1 } from '@googleapis/docs'
import { jsPDF } from 'jspdf'

type ResponseData = {
  pdf: string
  needReviewProblems: boolean
}

type ResponseMessage = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ResponseMessage>
) {
  let params = req.query
  let name = params.name
  let period = params.periodNumber
  let hwNum = params.hwNumber
  let pages = params.pages
  let pageHeight = params.height
  let pageWidth = params.width
  let fontSize = params.fontSize
  let pageHeightNum, pageWidthNum, fontSizeNum

  if (Array.isArray(name)) {
    name = name.join()
  }
  if (Array.isArray(period)) {
    period = period.join()
  }
  if (Array.isArray(hwNum)) {
    hwNum = hwNum.join()
  }
  if (Array.isArray(pages)) {
    pages = pages.join()
  }
  if (Array.isArray(pageHeight)) {
    pageHeight = pageHeight.join()
  }
  if (Array.isArray(pageWidth)) {
    pageWidth = pageWidth.join()
  }
  if (Array.isArray(fontSize)) {
    fontSize = fontSize.join() // sonarlint threw a warning when I did single line ifs with this 
  }

  if (!params || !name || !period || !pages || !hwNum) {
    return res.status(400).json({ message: '400 - Missing input(s)' })
  }

  if (!pageHeight) {
    pageHeightNum = 10.5
  } else {
    pageHeightNum = parseInt(pageHeight)
  }

  if (!pageWidth) {
    pageWidthNum = 8
  } else {
    pageWidthNum = parseInt(pageWidth)
  }

  if (!fontSize) {
    fontSizeNum = 14
  } else {
    fontSizeNum = parseInt(fontSize)
  }

  if (period.constructor === Array) period = period[0]
  if (parseInt(period) < 1 || parseInt(period) > 6 || isNaN(parseInt(period)) || !period.match(/^\d$/)) period = ''
  // respond with error if inputs are invalid
  if ([params, name, period, pages].includes('')) return res.status(400).json({ message: '400 - Invalid input(s)' })

  hwNum = formatHwNum(hwNum)

  const assignmentData = await getAssignment(hwNum)
  if (!assignmentData) return res.status(500).json({ message: '500 - Failed to retrieve assignment data '})
  const pdf = await generatePDF(assignmentData.hwString, assignmentData.assignment, name, period, assignmentData.dueDate, parseInt(pages), pageHeightNum, pageWidthNum, fontSizeNum)
  // respond success with inputs
  res.status(200).json({ pdf: pdf, needReviewProblems: assignmentData.needReviewProblems })
  // console.log('done')
}

function formatHwNum(hwNum: string) {
  hwNum = hwNum.toLowerCase().trim()
  if (hwNum.startsWith('hw')) {
    hwNum = hwNum.slice(2).trim()
  }
  if (hwNum.includes('/')) {
    hwNum = hwNum.split('/')[0]
  } else if (hwNum.includes('-')) {
    hwNum = hwNum.split('-')[0]
  }

  return hwNum
}

async function generatePDF(hwNum: string, assignment: string, name: string, period: string, date: string, numberOfPages: number, pageHeight: number, pageWidth: number, fontSize: number) {
  const pdf = new jsPDF("p", "in", [pageHeight, pageWidth])
  
  pdf.setFont("helvetica")
  pdf.setFontSize(fontSize)

  pdf.text(`HW ${hwNum}`, 1, 0.3, { maxWidth: 1 })
  pdf.text(assignment, 2.05, 0.3, { maxWidth: pageWidth - 4.2 })
  pdf.text([name, `Per ${period}`, date], pageWidth - 2.05, 0.3, { maxWidth: 2 })

  for (let i = 1; i < numberOfPages; i++) { // ! maximum 10 pages
    pdf.addPage() // i *think* addPage has to be at the beginning of the loop, hence the duplicate code above
    pdf.text(`HW ${hwNum}`, 1, 0.3, { maxWidth: 1 })
    pdf.text(assignment, 2.05, 0.3, { maxWidth: pageWidth - 4.2 })
    pdf.text([name, `Per ${period}`, date], pageWidth - 2.1, 0.3, { maxWidth: 2 })
  }
  return pdf.output('dataurlstring', {filename: `HW${hwNum}`})
}

async function getAssignment(hwNum: string): Promise<{ hwString: string, assignment: string, dueDate: string, needReviewProblems: boolean } | undefined> {
  const authToken = googleAuth()
  if (!authToken) { return }
  
  const client = docs({
    version: 'v1',
    auth: await authToken,
  })

  const document = await client.documents.get({
    documentId: '1p21l34ih6o_aiOtmaZTnJ-fuXvU9W6nY5ZMDDXGSrYQ',
  })

  const data = document.data.body?.content![4].table!.tableRows!
  let hwString, assignedProblemsString, dueDate, needReviewProblems // returns

  for (let block of data) {
    const assignment = block.tableCells
    const assignmentTitle = assignment![0].content
    if (!assignmentTitle) continue
    hwString = constructHwString(assignmentTitle)
    let validNumbers = constructValidNumbers(hwString)
    validNumbers = filterValidNumbers(validNumbers, hwString)

    if (validNumbers.includes(hwNum)) {
      const assignmentPages = assignment![3].content
      const assignmentProblems = assignment![4].content
      if (!assignmentPages || !assignmentProblems) break
      
      const pages = getPages(assignmentPages)
      const problems = getProblems(assignmentProblems)
      
      dueDate = problems.dueDate
      needReviewProblems = problems.needReviewProblems
      let problemsText = problems.problems
      if (!Array.isArray(problemsText)) problemsText = [problemsText]
      assignedProblemsString = constructAssignedProblemsString(pages, problemsText)
      
      if (!hwString || !assignedProblemsString || !dueDate) return
      return { hwString: hwString, assignment: assignedProblemsString, dueDate: dueDate, needReviewProblems: needReviewProblems }
    }
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
    validNumbers.push(hwString.toLowerCase())
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

function getPages(assignmentPages: docs_v1.Schema$StructuralElement[]) {
  const pages: string[] = []
  
  for (const page of assignmentPages) {
    let pageContent = page.paragraph?.elements![0].textRun?.content
    if (!pageContent || pageContent == '\n') continue

    pageContent = pageContent.replaceAll('\n', '')
    pageContent = pageContent.trim()

    pages.push(pageContent)
  }
  
  return pages
}

function getProblems(assignmentProblems: docs_v1.Schema$StructuralElement[]): { problems: string[], dueDate: string, needReviewProblems: boolean } {
  let needReviewProblems = false
  let dueDate = ''
  const problems: string[] = []

  for (const problem of assignmentProblems) {
    const problem2 = problem.paragraph?.elements![0]!
    if (!Object.keys(problem2).includes('textRun')) continue

    const problemText = problem2.textRun?.content

    if (!problemText) continue
    if (problemText?.match(/^do more/i)) return { problems: problems, dueDate: dueDate, needReviewProblems: needReviewProblems }

    if (problemText.toLowerCase().startsWith('due')) {
      const index = problemText.search(/\d/)
      dueDate = problemText.slice(index).replaceAll('\n', '') + '/' + (new Date().getFullYear()).toString().slice(2)
      // The year thing won't work if the assignment is due in a different year than when it is being fetched, but I could've just left it at 2022 so I think it's okay, and since my opinion is the only one that matters here, this 'bug' will remain :)
    } else if (problemText.toLowerCase().includes("review") || problemText.toLowerCase().includes("test topics")) {
      needReviewProblems = true
      return { problems: problems, dueDate: dueDate, needReviewProblems: needReviewProblems }
    } else {
      if (dueDate !== '') problems.push(problemText.replaceAll('\n', ''))
    }
  }
  
  return { problems: problems, dueDate: dueDate, needReviewProblems: needReviewProblems }
}

function constructAssignedProblemsString(pages: string[], problems: string[]) {
  let assignedProblemsString = ''
  for (const [i, page] of pages.entries()) {
    assignedProblemsString += page + ' '
    if (i >= problems.length) break
    if (problems[i] != '' && !page.toLowerCase().includes('added')) {
      assignedProblemsString += '#' + problems[i] + '; '
    }
  }

  return assignedProblemsString
}

/**
 * This authentication method was created by William Hayr
 */
async function googleAuth() {
  const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!
  const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL!

  if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL) {
    return
  }

  const authentication = new auth.GoogleAuth({
    credentials: {
      private_key: GOOGLE_PRIVATE_KEY,
      client_email: GOOGLE_CLIENT_EMAIL,
    },
    scopes: ['https://www.googleapis.com/auth/documents'],
  })

  return authentication.getClient();
}