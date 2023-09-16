import 'isomorphic-fetch';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { NextResponse } from 'next/server';

const ses = new SESClient({
  region: process.env.AWS_API_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_VALUE,
  },
});

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
  const requiredFields = ['email', 'firstName', 'lastName', 'message'];

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

  return NextResponse.json(
    { message: 'Success! Thank you for message!' },
    { status: 200 }
  );
}
