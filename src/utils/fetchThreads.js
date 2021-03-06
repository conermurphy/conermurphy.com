import fetch from 'isomorphic-fetch';

const tweetsEndpoint = 'https://api.twitter.com/2/users';
const userEndpoint = 'https://api.twitter.com/2/users/by?usernames=';

async function fetchUserId(bearerToken) {
  // 1: Define parameters for username
  const params = {
    usernames: 'MrConerMurphy',
  };

  // 2: Fetch info from Twitter API
  const res = await fetch(`${userEndpoint}${params.usernames}`, {
    method: 'GET',
    headers: {
      'User-Agent': 'v2UserLookupJS',
      authorization: `Bearer ${bearerToken}`,
    },
  });

  // 3: Convert to JSON and destructure values out before returning
  const { data } = await res.json();
  const { id, name, username } = data[0];

  return { id, name, username };
}

async function fetchTweets(id, bearerToken) {
  // Params for fetching data from twitter
  const params = {
    exclude: 'retweets',
    'tweet.fields': 'public_metrics, conversation_id, in_reply_to_user_id, author_id',
    max_results: 10,
  };

  // Transforming parameters into one string
  const stringParams = Object.entries(params)
    .map(([key, vals]) => {
      // Remove all spaces
      const transformedVals = vals.toString().replace(/ /g, '');
      return `${key}=${transformedVals}`;
    })
    .join('&');

  // 1: Create endpoint for tweets lookup
  const endpoint = `${tweetsEndpoint}/${id}/tweets?${stringParams}`;

  // 2: Lookup data from twitter endpoint
  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'User-Agent': 'v2FullArchiveJS',
      authorization: `Bearer ${bearerToken}`,
    },
  });

  const data = await res.json();

  return data;
}

export default async function fetchThreads(bearerToken) {
  // 0: Fetch User ID to lookup tweets off
  const { id } = await fetchUserId(bearerToken);

  // 1: Fetch Tweets using ID
  const { data } = await fetchTweets(id, bearerToken);

  data.forEach((tweet, i) => console.log(`${i}-${tweet.id}`));
}
