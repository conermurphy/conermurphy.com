const fetch = require('isomorphic-fetch');

const bearerToken = process.env.TWITTER_BEARER_TOKEN;
const endPoint = process.env.TWITTER_ENDPOINT;

// Defining cache incase of quick re-requests to avoid spamming twitter API.
const cache = {
  lastFetch: 0,
  tweets: [],
};

// Definfing settings for API request
const settings = {
  include_rts: false,
  count: 100, // Maximum amount allowed in one request is 100, beyond requires pagination.
};

async function getRequest() {
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000) {
    // less 5 mins, serve up cache
    return cache.tweets;
  }

  // Setting query endpoint for API call.
  const queryEndPoint = `${endPoint}tweet.fields=referenced_tweets,public_metrics,entities&expansions=attachments.media_keys&media.fields=preview_image_url&max_results=${settings.count}`;

  // Fetching the data from twitter and converting to JSON.
  const { data, includes } = await fetch(queryEndPoint, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  // Mapping over the returned array of tweets and defining the source of the tweet.
  const tweets = data.map((tweet) => {
    const source = tweet.referenced_tweets === undefined ? 'original' : tweet.referenced_tweets[0].type;
    const mediaKey = tweet.attachments?.media_keys[0];
    const [media] = includes.media.filter((obj) => obj.media_key === mediaKey);
    return { ...tweet, ...media, source };
  });

  // Filtering to remove any rts depending on the above setting.
  const filteredTweets = !settings.include_rts ? tweets.filter(({ source }) => source !== 'retweeted') : null;

  // Slicing to return only 5 tweets to display on page.
  const slicedTweets = filteredTweets.slice(0, 4);

  // Updating the cache.
  cache.tweets = slicedTweets;
  cache.lastFetch = Date.now();
  return cache.tweets;
}

exports.handler = async (event, context, callback) => {
  try {
    // Get tweets and display output to page.
    const tweets = await getRequest();

    return callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweets),
    });
  } catch (e) {
    return callback(null, {
      statusCode: 500,
      body: e,
    });
  }
};
