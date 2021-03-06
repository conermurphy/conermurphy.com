import fetch from 'isomorphic-fetch';
import { promises as fs } from 'fs';

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

// Function used to combine parameters into one string ready to be sent to API.
function stringifyParams(params) {
  return Object.entries(params)
    .map(([key, vals]) => {
      // Remove all spaces
      const transformedVals = vals.toString().replace(/ /g, '');
      return `${key}=${transformedVals}`;
    })
    .join('&');
}

async function fetchTweets(id, bearerToken) {
  // Params for fetching data from twitter initially
  const params = {
    exclude: 'retweets',
    'tweet.fields': 'public_metrics, conversation_id, in_reply_to_user_id, author_id, created_at',
    max_results: 100,
  };

  const tweets = [];
  let fetchedAllData = false;

  do {
    try {
      // Transforming parameters into one string
      const stringParams = stringifyParams(params);

      // 1: Create endpoint for tweets lookup
      const endpoint = `${tweetsEndpoint}/${id}/tweets?${stringParams}`;

      const { data, meta } = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'User-Agent': 'v2FullArchiveJS',
          authorization: `Bearer ${bearerToken}`,
        },
      }).then((res) => res.json());

      tweets.push(data);
      if (!meta.next_token) {
        fetchedAllData = true;
      } else {
        params.pagination_token = meta.next_token;
      }
    } catch (e) {
      console.error(e);
    }
  } while (fetchedAllData === false);

  return tweets;
}

async function writeFiles(data) {
  await fs.writeFile('./src/data/tweets.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('data written to file');
  });
}

export default async function fetchThreads(bearerToken) {
  // 0: Fetch User ID to lookup tweets off
  const { id } = await fetchUserId(bearerToken);

  // 1: Fetch Tweets using ID
  const tweets = await fetchTweets(id, bearerToken);

  // 2: Write info to files
  await writeFiles(tweets);
}
