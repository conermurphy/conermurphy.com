const { TwitterClient } = require('twitter-api-client');

const apiKey = process.env.TWITTER_API_KEY;
const apiSecret = process.env.TWITTER_API_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

const twitterClient = new TwitterClient({
  apiKey,
  apiSecret,
  accessToken,
  accessTokenSecret,
});

const cache = {
  lastFetch: 0,
  tweets: [],
};

async function fetchData() {
  // 0: Check if we can use cached tweets
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000) {
    // less 5 mins, serve up cache
    return cache.tweets;
  }

  // 1: Fetch Tweets
  const data = await twitterClient.tweets.statusesUserTimeline({
    screen_name: 'MrConerMurphy',
    count: 200,
    include_rts: false,
    exclude_replies: true,
    trim_user: true,
    tweet_mode: 'extended',
  });

  // 2: Setting data to cache
  cache.tweets = data.slice(0, 3);
  cache.lastFetch = Date.now();

  return cache.tweets;
}

exports.handler = async function (event, context, callback) {
  // Get tweets and display output to page.
  const tweets = await fetchData();

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tweets),
  });
};
