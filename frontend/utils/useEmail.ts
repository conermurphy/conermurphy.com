'use client';

import { SyntheticEvent, useState } from 'react';
import { server } from '../config';
import { UseFormValues } from '../types';

interface IProps {
  values: UseFormValues;
}

type Output = {
  message: string;
};

export default function useEmail({ values }: IProps) {
  // Setting state to be returned depending on the outcome of the submission.
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>('');
  const [error, setError] = useState<boolean | null>();

  // destructuring out the values from values passed to this form.
  const { email, chilliIsCool } = values;

  async function submitEmail(e: SyntheticEvent) {
    // Prevent default function of the form submit and set state to defaults for each new submit.
    e.preventDefault();

    // Set base state
    setLoading(true);
    setError(null);
    setMessage(null);

    // gathering data to be submitted to the serverless function
    const body = {
      email,
      chilliIsCool,
    };

    // Checking there was an email entered.
    if (!email.length) {
      setLoading(false);
      setError(true);
      setMessage('Oops! There was no email entered');
      return;
    }

    // Send the data to the serverless function on submit.
    const res = await fetch(`${server}/api/emailSignup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const resonseText: string = await res.text();

    // Waiting for the output of the serverless function and storing into the serverlessBaseoutput var.
    const output = (await JSON.parse(resonseText)) as Output;

    // check if successful or if was an error
    if (res.status >= 400 && res.status < 600) {
      // Oh no there was an error! Set to state to show user
      setLoading(false);
      setError(true);
      setMessage(output.message);
    } else {
      // everyting worked successfully.
      setLoading(false);
      setMessage(output.message);
    }
  }

  return {
    error,
    loading,
    message,
    submitEmail,
  };
}
