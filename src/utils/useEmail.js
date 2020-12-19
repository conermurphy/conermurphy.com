import { useState } from 'react';

export default function useEmail({ values }) {
  // Setting state to be returned depending on the outcome of the submission.
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState();

  // destructuring out the values from values passed to this form.
  const { email } = values;

  const serverlessBase = process.env.GATSBY_SERVERLESS_BASE;

  async function submitEmail(e) {
    // Prevent default function of the form submit and set state to defaults for each new submit.
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // gathering data to be submitted to the serverless function
    const body = {
      email,
    };

    // Send the data to the serverless function on submit.
    const res = await fetch(`${serverlessBase}/emailSignup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Waiting for the output of the serverless function and storing into the serverlessBaseoutput var.
    const output = JSON.parse(await res.text());

    // check if successful or if was an error
    if (res.status >= 400 && res.status < 600) {
      // Oh no there was an error! Set to state to show user
      setLoading(false);
      setError(output.message);
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
