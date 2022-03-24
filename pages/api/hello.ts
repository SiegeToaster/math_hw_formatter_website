// http://localhost:3000/api/hello
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  name: string
  period: string
  hwNum: string
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

  

  // respond success with inputs
  res.status(200).json({ name: `${name}`, period: `${period}`, hwNum: `${hwNum}` })
}
