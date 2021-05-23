import fetch from 'isomorphic-fetch';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import { downloadMedia, stringifyParams, getImageName, getFolderNames, writeMDXFiles } from './downloadTweetsHelperFunctions';

dotenv.config({ path: '.env' });

// Info for Twitter API.
const bearerToken = process.env.TWITTER_BEARER_TOKEN;
const tweetsEndpoint = 'https://api.twitter.com/2/tweets?ids=';

// Folder for tweets storage location.
const folderPath = './src/content/tweets';

// Params used in API Lookup
const params = {
  'tweet.fields': 'created_at, entities',
  expansions: 'attachments.media_keys, author_id',
  'media.fields': 'media_key, type, url',
};
const stringParams = stringifyParams(params);

// Regexes for removing links from tweet text later on.
const expression =
  /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
const linkRegex = new RegExp(expression);
const hyphonRegex = new RegExp(/(--)/g);

// Fetch Data from Twitter
async function fetchTweets(tweets) {
  const endpoint = `${tweetsEndpoint}${tweets.join(',')}&${stringParams}`;

  const { data, includes } = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'User-Agent': 'v2TweetLookupJS',
      authorization: `Bearer ${bearerToken}`,
    },
  }).then((res) => res.json());

  return { data, includes };
}

// Function to associate media and other data to the tweets
function associateData(data, includes) {
  // Destructure out media from the includes object
  const { media = [] } = includes;

  // Create base layout of tweet objects.
  const preMediaTweets = data.map((tweet) => ({
    tweetId: tweet.id,
    media: tweet.attachments && tweet.attachments.media_keys,
    text: tweet.text.replace(linkRegex, '').replace(hyphonRegex, ''),
    date: tweet.created_at,
    author: tweet.author_id,
    type: 'embeddedTweet',
    links:
      tweet.entities && tweet.entities.urls && tweet.entities.urls.map((url) => url.expanded_url).filter((url) => !url.includes(tweet.id)),
  }));

  // Add Media keys to tweet objects
  const populatedTweets = preMediaTweets.map((tweet) => {
    if (tweet.media !== undefined) {
      const mediaObjects = tweet.media.map((tweetMedia) => media.filter(({ media_key }) => media_key === tweetMedia)).flat();
      const newTweetObj = { ...tweet, media: mediaObjects };
      return newTweetObj;
    }
    return tweet;
  });

  return populatedTweets;
}

// Create Folders, MDX Files and Download Media
async function createTweetFiles(tweets) {
  return Promise.all(
    tweets.map(async (tweet) => {
      // 1: Creating a folder for each tweet to download.
      const { tweetId, media = null, date, links, type, text } = tweet;
      const tweetFolderPath = `${folderPath}/${tweetId}`;
      await fs.mkdir(tweetFolderPath, { recursive: true });

      const images = [];
      const videos = [];

      // 2: Create an MDX document for each tweet in their respecitve folder and download any media required to be linked in the document.
      // 2a: Downloading media
      if (media !== null) {
        await Promise.all(
          media.map(async (item) => {
            if (['photo', 'video'].some((el) => item.type.includes(el))) {
              await downloadMedia(item.url, tweetFolderPath);
              if (item.type === 'photo') {
                images.push(getImageName(item.url));
              }
              if (item.type === 'video') {
                videos.push(getImageName(item.url));
              }
            }
          })
        );
      }

      // 2b: Creating Tweet Files
      const tweetFileContent = `---
tweetId: "${tweetId}"
date: ${date}
type: ${type}
images:
  ${images.map((x) => `- ${x}`).join('\n  ')}
videos:
  ${videos.map((x) => `- ${x}`).join('\n  ')}
links:
  ${links !== undefined ? links.map((x) => `- ${x}`).join('\n  ') : []}
---
${text}
`;
      // 3: Write out files
      await writeMDXFiles(tweetFileContent, `${tweetFolderPath}/${tweetId}.mdx`);
    })
  );
}

export async function downloadTweets(tweets) {
  const existingTweets = getFolderNames(folderPath);

  const tweetsToDownload = tweets.filter((tweet) => !existingTweets.includes(tweet));

  if (tweetsToDownload.length !== 0) {
    const { data, includes } = await fetchTweets(tweetsToDownload);
    const processedTweets = associateData(data, includes);
    await createTweetFiles(processedTweets);
  }
}
