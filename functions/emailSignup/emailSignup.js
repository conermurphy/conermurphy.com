require('isomorphic-fetch');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  // TODO: Insert honeypot into email signup form

  // Checking we have data from the email input
  const requiredFields = ['email'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field, please fill it in and retry.`,
        }),
      };
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
    }),
    headers: {
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success! Thank you for subscribing! 😃' }),
  };
};
