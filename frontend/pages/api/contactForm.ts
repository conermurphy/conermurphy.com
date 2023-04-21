import 'isomorphic-fetch';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UseFormValues } from '../../types';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: UseFormValues;
}

interface ExtendedNextApiResponse extends NextApiResponse {
  message: string;
}

type TBodyFields = {
  [key: string]: string;
};

export default async function contactForm(
  req: ExtendedNextApiRequest,
  res: ExtendedNextApiResponse
) {
  const { body }: { body: TBodyFields } = req;

  // If the honeypot chilliIsCool has been populated then return error.
  if (body.chilliIsCool) {
    res
      .status(400)
      .json({ message: 'Boop beep bop zssss good bye. Error Code: A9876' });
  }

  // Checking we have data from the email input
  const requiredFields = ['email', 'firstName', 'lastName', 'message'];

  for (const field of requiredFields) {
    if (!body[field]) {
      res.status(400).json({
        message: `Oops! You are missing the ${field} field, please fill it in and retry.`,
      });
    }
  }

  // Setting vars for posting to API
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;

  // posting to the API
  await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      message: body.message,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.CONTACT_FORM_API_KEY,
      charset: 'utf-8',
    },
  });

  res.status(200).json({ message: 'Success! Thank you for message!' });
}
