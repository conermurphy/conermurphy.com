import fetch from 'isomorphic-fetch';
import getSlug from 'speakingurl';
import threadsInfo from '../data/threads.json';
import { stringifyParams, writeJSONFiles } from './downloadTweetsHelperFunctions';

const tweetsEndpoint = 'https://api.twitter.com/2/users';
const userEndpoint = 'https://api.twitter.com/2/users/by?usernames=';

const expression = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
const linkRegex = new RegExp(expression);
const hyphonRegex = new RegExp(/(--)/g);

// --- Get User ID from Twitter ---
async function fetchUserId(bearerToken) {
  // 1: Define parameters for username
  const params = {
    usernames: 'MrConerMurphy',
  };

  const fetchURL = `${userEndpoint}${params.usernames}`;

  // 2: Fetch info from Twitter API
  const res = await fetch(fetchURL, {
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

// --- Download Tweets from Twitter ---
async function fetchTweets(id, bearerToken) {
  let params;
  // Params for fetching data from twitter initially based on if last fetched date is populated.
  if (threadsInfo.meta.lastFetchedData === '') {
    params = {
      exclude: 'retweets',
      'tweet.fields': 'public_metrics, conversation_id, in_reply_to_user_id, author_id, created_at, entities',
      max_results: 100,
      expansions: 'attachments.media_keys',
      'media.fields': 'media_key, type, url',
    };
  } else {
    params = {
      exclude: 'retweets',
      'tweet.fields': 'public_metrics, conversation_id, in_reply_to_user_id, author_id, created_at, entities',
      max_results: 100,
      start_time: threadsInfo.meta.lastFetchedData,
      expansions: 'attachments.media_keys',
      'media.fields': 'media_key, type, url',
    };
  }

  let fetchedAllData = false;
  const entireData = {
    data: [],
    includes: [],
  };

  // While fetchedAllData is false then fetch the next page of data from twitter.
  do {
    try {
      // Transforming parameters into one string
      const stringParams = stringifyParams(params);
      // 1: Create endpoint for tweets lookup
      const endpoint = `${tweetsEndpoint}/${id}/tweets?${stringParams}`;
      // Perform intital query to Twitter and convert to JSON.
      const { data, meta, includes } = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'User-Agent': 'v2FullArchiveJS',
          authorization: `Bearer ${bearerToken}`,
        },
      }).then((res) => res.json());

      // Spread the new data into the original array's data, check if data exists first.
      if (data !== undefined) {
        entireData.data = [...entireData.data, ...data];
        entireData.includes = [...entireData.includes, ...includes.media];
      }

      // If the returned data from twitter does not have a next token in the meta object then set fetchAllData to true and break the loop.
      if (meta.next_token === undefined) {
        fetchedAllData = true;
      } else {
        // Otherwise continue fetching the next page.
        params.pagination_token = meta.next_token;
      }
    } catch (e) {
      console.error(e);
    }
  } while (fetchedAllData === false);

  return entireData;
}

// --- Summarise the data recieved from Twitter ---
async function summariseConversationData(tweets) {
  try {
    // Get an array of counted conversation IDs in the dataset
    const convoIds = tweets
      // 1: map over the data and return all of the conversation Ids into one array
      .map((tweet) => {
        // 1a: Check if the tweet was sent by me and is the first tweet in a conversation OR was in reply to myself.
        if (
          (tweet.conversation_id === tweet.id && tweet.author_id === '1249718482436055044') ||
          tweet.in_reply_to_user_id === '1249718482436055044'
        ) {
          return tweet.conversation_id;
        }
      })
      // 2: filter the array to remove undefined values
      .filter((conId) => conId !== undefined)
      // 3: Create a new array containing an object for each conversation ID and how many times it occured in the array.
      .reduce((acc, conversation) => {
        const existingconversation = acc[conversation];
        if (existingconversation) {
          existingconversation.numberOfTweets += 1;
        } else {
          acc[conversation] = {
            conversation,
            numberOfTweets: 1,
          };
        }
        return acc;
      }, {});

    // Fitler on numberOfTweets to remove any conversationIds less than 2 occurences
    const filteredData = Object.values(convoIds).filter((cId) => cId.numberOfTweets > 2);

    return filteredData;
  } catch (e) {
    if (tweets === undefined) {
      return undefined;
    }
    console.error(e);
  }
}

// --- Populate the extra info stored in the threads object ---
async function populateTweetData(tweets, convoData, includes = []) {
  const threadSlugs = [];

  // Loop over each conversation and populate the required info
  const populatedData = convoData.map((convo) => {
    // 0: Create slug for the conversation
    const firstTweetInConvo = tweets.filter((item) => item.id === convo.conversation);
    const threadSlug = getSlug(firstTweetInConvo[0].text.split(/\r?\n/)[0]);
    const threadTitle = firstTweetInConvo[0].text.split(/\n/)[0];

    // Check if the slug has already been included, if so return out to remove it.
    if (threadSlugs.includes(threadSlug)) {
      return;
    }
    threadSlugs.push(threadSlug);

    console.log(`Found new thread to download: ${threadTitle}`);

    // 1: Find all tweets in that conversation
    const convoTweets = tweets.filter((item) => item.conversation_id === convo.conversation);

    // 2: Return all tweet IDs, date, text, media_keys and position in thread within that conversation and reverse to put them in the correct order as Twitters API does last tweet first.
    const preMediaTweets = convoTweets
      .map((item, i) => ({
        id: item.id,
        media: item.attachments && item.attachments.media_keys,
        text: item.text.replace(linkRegex, '').replace(hyphonRegex, ''),
        type: 'tweet',
        date: item.created_at,
        position: convoTweets.length + 1 - (i + 1),
        links:
          item.entities && item.entities.urls && item.entities.urls.map((url) => url.expanded_url).filter((url) => !url.includes(item.id)),
      }))
      .reverse();

    // 2a: Populate media URL links from includes data for downloading in the future
    const finalTweets = preMediaTweets.map((tweet) => {
      if (tweet.media !== undefined) {
        const mediaObjects = tweet.media.map((tweetMedia) => includes.filter(({ media_key }) => media_key === tweetMedia)).flat();
        const newTweetObj = { ...tweet, media: mediaObjects };
        return newTweetObj;
      }
      return tweet;
    });

    // 3: Populate the meta info for the conversation.
    // Reduce of each conversation tweet found above to combine each metric section on each tweet.
    const metricData = convoTweets.reduce((acc, cur) => {
      // Loop through the metrics of each tweet.
      Object.keys(cur.public_metrics).forEach((metric) => {
        // If the metric already exists then add the metric of the current tweet to it.
        if (acc[metric] >= 0) {
          acc[metric] += cur.public_metrics[metric];
        } else {
          // If the metric doesn't exist, create it and set it to 0.
          acc[metric] = 0;
        }
      });
      return acc;
    }, {});

    // 3a: Remove the replies added due to being in a thread.
    metricData.reply_count -= convo.numberOfTweets - 1;

    // 4: Setting the info to the convo object before returning
    convo.slug = threadSlug;
    convo.title = threadTitle;
    convo.tweets = finalTweets;
    convo.date = convoTweets[0].created_at;
    convo.tags = ['Uncategorised'];
    convo.meta = {};
    convo.meta.metrics = metricData;
    convo.type = 'thread';
    return convo;
  });

  const finalTweetData = populatedData.filter((data) => !!data);

  // 5: Return the populated object
  return finalTweetData;
}

// --- Add Meta Data to the file ---
async function addingMetaDataAndDataWrapper(existingFile, tweets) {
  const currentDate = new Date();
  // 1: Create base layout of the final object
  const finalObj = {
    meta: {
      lastFetchedData: `${currentDate.toISOString().split('.')[0]}Z`,
      numberOfThreads: tweets.length,
    },
    threads: tweets,
  };

  // 2: Return the final object
  return finalObj;
}

// --- Wrapper Function ---
export default async function fetchThreads(bearerToken) {
  let objToWriteToFile;
  const existingFile = threadsInfo;
  const currentDate = new Date();
  const updatedDate = `${currentDate.toISOString().split('.')[0]}Z`;

  // 0: Fetch User ID to lookup tweets off
  const { id } = await fetchUserId(bearerToken);

  // 1: Fetch Data using ID
  const entireData = await fetchTweets(id, bearerToken);

  // 1b: Merge all Twiiter API Objects into one object to destructure below.
  if (entireData.data !== undefined) {
    // 1a: Destructure out individual values for use in functions below
    const { data: tweets, includes } = entireData;

    // 2: Order and summarise data
    const summarisedConversationData = await summariseConversationData(tweets);

    // Check if there are conversations in the latest fetched data if so run the below code.
    if (tweets !== undefined && Object.keys(summarisedConversationData).length !== 0) {
      // 3: Populate other conversation details such as: Tweets, date, metrics data and media_info
      const populatedTweetData = await populateTweetData(tweets, summarisedConversationData, includes);

      // 4: Sort the dates of each tweet to ensure they're in the correct order of publication and add a position number to it for numbering.
      const sortedTweetData = populatedTweetData.sort((a, b) => new Date(b.date) - new Date(a.date));

      // 5: Making the final object and adding in meta data.
      const finalObj = await addingMetaDataAndDataWrapper(existingFile, sortedTweetData);

      // 6: set object to write to file
      console.log(
        `${Object.keys(populatedTweetData).length} new threads found, updating last fetched date/time to ${updatedDate} and rewriting file.`
      );
      objToWriteToFile = finalObj;
    } else {
      // If no data is returned and it's undefined, update the last fetch data and re-write the file.
      existingFile.meta.lastFetchedData = updatedDate;
      console.log(`No new threads found, updating last fetched date/time to ${updatedDate}`);
      objToWriteToFile = existingFile;
    }

    // 7: Write object out to the file
    await writeJSONFiles(objToWriteToFile, './src/data/threads.json');
    return objToWriteToFile;
  }
  // If no data is returned and it's undefined, update the last fetch data and re-write the file.
  existingFile.meta.lastFetchedData = updatedDate;
  console.log(`No new data found, updating last fetched date/time to ${updatedDate}`);
  objToWriteToFile = existingFile;
  await writeJSONFiles(objToWriteToFile, './src/data/threads.json');
  return objToWriteToFile;
}
