'use client';

import { SyntheticEvent, useState } from 'react';
import { server } from '../config';
import { UseFormValues } from '../types';

interface IProps {
  values: UseFormValues;
  resetValues: () => void;
}

type Output = {
  message: string;
};

export default function useContactForm({ values, resetValues }: IProps) {
  // Setting state to be returned depending on the outcome of the submission.
  const [loading, setLoading] = useState<boolean>(false);
  const [outputMessage, setOutputMessage] = useState<string | null>('');
  const [error, setError] = useState<boolean | null>();

  // destructuring out the values from values passed to this form.
  const { firstName, lastName, email, message, chilliIsCool } = values;

  async function submitContactForm(e: SyntheticEvent) {
    // Prevent default function of the form submit and set state to defaults for each new submit.
    e.preventDefault();

    // Set base state
    setLoading(true);
    setError(null);
    setOutputMessage(null);

    // gathering data to be submitted to the serverless function
    const body = {
      firstName,
      lastName,
      email,
      message,
      chilliIsCool,
    };

    const requiredFields = ['email', 'firstName', 'lastName', 'message'];

    // Checking required fields aren't empty.
    for (const field of requiredFields) {
      if (!field?.length) {
        setLoading(false);
        setError(true);
        setOutputMessage(
          `Oops! The field: ${field} is empty, please fill it in and retry.`
        );
        return;
      }
    }

    // Send the data to the serverless function on submit.
    const res = await fetch(`${server}/api/contactForm`, {
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
      setOutputMessage(output.message);
    } else {
      // everyting worked successfully.
      setLoading(false);
      setOutputMessage(output.message);
      resetValues();
    }
  }

  return {
    error,
    loading,
    outputMessage,
    submitContactForm,
  };
}
