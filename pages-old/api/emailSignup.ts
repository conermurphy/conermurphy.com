import 'isomorphic-fetch'
import type { NextApiRequest, NextApiResponse } from 'next'
import { UseFormValues } from '../../types'

interface ExtendedNextApiRequest extends NextApiRequest {
  body: UseFormValues
}

interface ExtendedNextApiResponse extends NextApiResponse {
  message: string
}

type TBodyFields = {
  [key: string]: string
}

export default async function emailSignup(
  req: ExtendedNextApiRequest,
  res: ExtendedNextApiResponse
) {
  const { body }: { body: TBodyFields } = req

  // If the honeypot chilliIsCool has been populated then return error.
  if (body.chilliIsCool) {
    res
      .status(400)
      .json({ message: 'Boop beep bop zssss good bye. Error Code: A1234' })
  }

  // Checking we have data from the email input
  const requiredFields = ['email']

  for (const field of requiredFields) {
    if (!body[field]) {
      res.status(400).json({
        message: `Oops! You are missing the ${field} field, please fill it in and retry.`,
      })
    }
  }

  // Setting vars for posting to API
  const endpoint = process.env.CONVERTKIT_ENDPOINT
  const APIKey = process.env.CONVERTKIT_PUBLIC_KEY
  const formID = process.env.CONVERTKIT_SIGNUP_FORM

  // posting to the Convertkit API
  await fetch(`${endpoint}${formID}/subscribe`, {
    method: 'post',
    body: JSON.stringify({
      email: body.email,
      api_key: APIKey,
      tags: [3235828],
    }),
    headers: {
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  })
  res.status(200).json({
    message: 'Thank you for subscribing! Please check your email to confirm.',
  })
}
