import fetch from 'isomorphic-fetch';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import { downloadMedia, stringifyParams, getImageName, getFolderNames, writeMDXFiles } from './downloadTweetsHelperFunctions';

dotenv.config({ path: '.env' });

// Info for Twitter API.
const bearerToken = process.env.TWITTER_BEARER_TOKEN;
const tweetsEndpoint = 'https://api.twitter.com/2/tweets?ids=';
const authorsEndpoint = 'https://api.twitter.com/2/users/by?usernames=';

// Folder for tweets storage location.
const tweetsFolderPath = './src/content/tweets';
const authorsFolderPath = './src/content/tweets/authors';

// Regexes for removing links from tweet text later on.
const expression =
  /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
const linkRegex = new RegExp(expression);
const hyphonRegex = new RegExp(/(--)/g);
const linkEmojiRegex = new RegExp(/(🔗)/g);

// Function to fetch data from Twitter
async function fetchData(endpoint, userAgent) {
  const { data, includes } = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'User-Agent': userAgent,
      authorization: `Bearer ${bearerToken}`,
    },
  }).then((res) => res.json());

  return { data, includes };
}

// Fetch Data from Twitter
async function fetchTweets(tweets) {
  // Params used in API Lookup
  const tweetParams = {
    'tweet.fields': 'created_at, entities',
    expansions: 'attachments.media_keys, author_id',
    'media.fields': 'media_key, type, url',
  };
  const tweetParamsJoined = stringifyParams(tweetParams);

  const endpoint = `${tweetsEndpoint}${tweets.join(',')}&${tweetParamsJoined}`;

  const { data, includes } = await fetchData(endpoint, 'v2TweetLookupJS');

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
    text: tweet.text.replace(linkRegex, '').replace(hyphonRegex, '').replace(linkEmojiRegex, ''),
    date: tweet.created_at,
    author: tweet.author_id,
    type: 'tweet',
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
      const { tweetId, media = null, date, links, type, text, author } = tweet;
      const tweetFolderPath = `${tweetsFolderPath}/${tweetId}`;
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
authorId: "${author}"
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

// === Authors ===

// Function to download info about authors
async function fetchAuthorFiles(authors) {
  const authorUsernames = authors.map((author) => author.username).join(',');

  const authorParams = {
    'user.fields': 'profile_image_url',
  };
  const authorParamsJoined = stringifyParams(authorParams);

  const authorEndpointToFetch = `${authorsEndpoint}${authorUsernames}&${authorParamsJoined}`;

  const { data, includes } = await fetchData(authorEndpointToFetch, 'v2UserLookupJS');

  return { data, includes };
}

// Function to download and create MDX Files about each author.
async function createAuthorFiles(authors) {
  return Promise.all(
    authors.map(async (author) => {
      const { id, name, username, profile_image_url: profileImage } = author;

      // Create author id subfolder in author folder.
      const authorFolderPath = `${authorsFolderPath}/${id}`;
      await fs.mkdir(authorFolderPath, { recursive: true });

      // Download profile image to folder
      await downloadMedia(profileImage, authorFolderPath);

      // Creating Author file

      const authorFileContent = `---
authorId: "${id}"
name: ${name}
username: ${username}
image: ${getImageName(profileImage)}
type: author
---
`;

      // Writing out author file.
      await writeMDXFiles(authorFileContent, `${authorFolderPath}/${id}.mdx`);
    })
  );
}

// Function to download and create folders / files for authors of tweets
async function downloadAuthors(includes) {
  const existingAuthors = getFolderNames(authorsFolderPath);
  const { users = [] } = includes;

  const authorsToDownload = users.filter((tweet) => !existingAuthors.includes(tweet));

  if (authorsToDownload.length !== 0) {
    const { data } = await fetchAuthorFiles(authorsToDownload);
    await createAuthorFiles(data);
  }
}

// === Authors End ===

export async function downloadTweets(tweets) {
  const existingTweets = getFolderNames(tweetsFolderPath);

  const tweetsToDownload = tweets.filter((tweet) => !existingTweets.includes(tweet));

  if (tweetsToDownload.length !== 0) {
    const { data, includes } = await fetchTweets(tweetsToDownload);

    const processedTweets = associateData(data, includes);
    await createTweetFiles(processedTweets);
    await downloadAuthors(includes);
  }
}
