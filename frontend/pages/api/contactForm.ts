import 'isomorphic-fetch';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { UseFormValues } from '../../types';

const ses = new SESClient({
  region: process.env.AWS_API_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_VALUE,
  },
});

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

  // Send the email using SES
  await ses.send(
    new SendEmailCommand({
      Destination: {
        ToAddresses: [process.env.SES_DESTINATION_EMAIL],
      },
      Message: {
        Body: {
          Text: {
            Data: `
            New message from conermurphy.com:
            ---
            Name:${body.firstName} ${body.lastName}
            Email: ${body.email}
            Message: ${body.message}
            `,
          },
        },
        Subject: { Data: `conermurphy.com - Contact Form Message` },
      },
      Source: 'hey@conermurphy.com',
    })
  );

  res.status(200).json({ message: 'Success! Thank you for message!' });
}
