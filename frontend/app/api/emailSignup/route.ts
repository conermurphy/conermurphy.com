import 'isomorphic-fetch';

import { NextResponse } from 'next/server';

type TBodyFields = {
  [key: string]: string;
};

export default async function POST(req: Request) {
  const { body } = req as unknown as {
    body: TBodyFields;
  };

  // If the honeypot chilliIsCool has been populated then return error.
  if (body.chilliIsCool) {
    return NextResponse.json(
      { message: 'Boop beep bop zssss good bye. Error Code: A9876' },
      { status: 400 }
    );
  }

  // Checking we have data from the email input
  const requiredFields = ['email'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json(
        {
          message: `Oops! You are missing the ${field} field, please fill it in and retry.`,
        },
        { status: 400 }
      );
    }
  }

  // Setting vars for posting to API
  const endpoint = process.env.CONVERTKIT_ENDPOINT;
  const APIKey = process.env.CONVERTKIT_PUBLIC_KEY;
  const formID = process.env.CONVERTKIT_SIGNUP_FORM;

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
  });

  return NextResponse.json(
    {
      message: 'Thank you for subscribing! Please check your email to confirm.',
    },
    { status: 200 }
  );
}
