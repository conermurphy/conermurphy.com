import fetch from 'isomorphic-fetch';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import { getFolderNames } from './getFolderNames';
import { stringifyParams } from './stringifyParams';

dotenv.config({ path: '.env' });

// Info for Twitter API.
const bearerToken = process.env.TWITTER_BEARER_TOKEN;
const tweetsEndpoint = 'https://api.twitter.com/2/tweets?ids=';

// Folder for tweets storage location.
const folderPath = './src/content/tweets';

// Params used in API Lookup
const params = {
  'tweet.fields': 'created_at',
  expansions: 'attachments.media_keys, author_id',
  'media.fields': 'media_key, type, url',
};

const stringParams = stringifyParams(params);

async function fetchTweets(tweets) {
  const endpoint = `${tweetsEndpoint}${tweets.join(',')}&${stringParams}`;

  const { data, includes } = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'User-Agent': 'v2TweetLookupJS',
      authorization: `Bearer ${bearerToken}`,
    },
  }).then((res) => res.json());

  console.log(data);
  console.log(includes);
}

export async function downloadTweet(tweets) {
  const existingTweets = getFolderNames(folderPath);

  const tweetsToDownload = tweets.filter((tweet) => !existingTweets.includes(tweet));

  await fetchTweets(tweetsToDownload);
}
