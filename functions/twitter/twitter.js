require('isomorphic-fetch');

const bearerToken = process.env.TWITTER_BEARER_TOKEN;
const endPoint = process.env.TWITTER_ENDPOINT;

async function getRequest() {
  const queryEndPoint = `${endPoint}max_results=30`;

  const response = await fetch(queryEndPoint, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${bearerToken}`,
    },
  }).then((res) => res.json());
  if (response) {
    return response;
  }
  throw new Error('Unsuccessful Request!');
}

exports.handler = async () => {
  try {
    const response = await getRequest();
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.detail,
    };
  }
};
