import fetch from 'isomorphic-fetch';
import { promises as fs } from 'fs';
import getSlug from 'speakingurl';
import threadsInfo from '../data/threads.json';

const tweetsEndpoint = 'https://api.twitter.com/2/users';
const userEndpoint = 'https://api.twitter.com/2/users/by?usernames=';

// --- Get User ID from Twitter ---
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

// --- Download Tweets from Twitter ---
async function fetchTweets(id, bearerToken) {
  let params;
  // Params for fetching data from twitter initially based on if last fetched date is populated.
  if (threadsInfo.meta.lastFetchedData === '') {
    params = {
      exclude: 'retweets',
      'tweet.fields': 'public_metrics, conversation_id, in_reply_to_user_id, author_id, created_at',
      max_results: 100,
      expansions: 'attachments.media_keys',
      'media.fields': 'media_key, type, url',
    };
  } else {
    params = {
      exclude: 'retweets',
      'tweet.fields': 'public_metrics, conversation_id, in_reply_to_user_id, author_id, created_at',
      max_results: 100,
      start_time: threadsInfo.meta.lastFetchedData,
      expansions: 'attachments.media_keys',
      'media.fields': 'media_key, type, url',
    };
  }

  const entireData = [];
  let fetchedAllData = false;
  // While fetchedAllData is false then fetch the next page of data from twitter.
  // do {
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
    // Push the tweets to the array defined above.
    entireData.push({ data, meta, includes });
    // If the returned data from twitter does not have a next token in the meta object then set fetchAllData to true and break the loop.
    if (!meta.next_token) {
      fetchedAllData = true;
    } else {
      // Otherwise continue fetching the next page.
      params.pagination_token = meta.next_token;
    }
  } catch (e) {
    console.error(e);
  }
  // } while (fetchedAllData === false);

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
          tweet.in_reply_to_user_id === tweet.author_id
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
    console.error(e);
  }
}

// --- Populate the extra info stored in the threads object ---
async function populateTweetData(tweets, convoData, includes) {
  // Destructure out media array from includes object created by Twitter.
  const { media } = includes;

  // Loop over each conversation and populate the required info
  const populatedData = convoData.map((convo) => {
    // 0: Create slug for the conversation
    const firstTweetInConvo = tweets.filter((item) => item.id === convo.conversation);
    const threadSlug = getSlug(firstTweetInConvo[0].text.split(/\r?\n/)[0]);

    // 1: Find all tweets in that conversation
    const convoTweets = tweets.filter((item) => item.conversation_id === convo.conversation);

    // 2: Return all tweet IDs, media_keys and position in thread within that conversation and reverse to put them in the correct order as Twitters API does last tweet first.
    const preMediaTweetIds = convoTweets
      .map((item, i) => {
        if (item.attachments !== undefined) {
          return { id: item.id, media: item.attachments.media_keys, position: convoTweets.length + 1 - (i + 1) };
        }
        return { id: item.id, position: convoTweets.length + 1 - (i + 1) };
      })
      .reverse();

    // 2a: Populate media URL links from includes data for downloading in the future
    const finalTweetIds = preMediaTweetIds.map((tweet) => {
      if (tweet.media !== undefined) {
        const mediaObjects = tweet.media.map((tweetMedia) => media.filter(({ media_key }) => media_key === tweetMedia)).flat();
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
    convo.tweetIds = finalTweetIds;
    convo.date = convoTweets[0].created_at;
    convo.meta = {};
    convo.meta.metrics = metricData;
    return convo;
  });

  // 5: Return the populated object
  return populatedData;
}

// --- Add Meta Data to the file ---
async function addingMetaDataAndDataWrapper(tweets) {
  const currentDate = new Date();
  // 1: Create base layout of the final object
  const finalObj = {
    meta: {
      lastFetchedData: `${currentDate.toISOString().split('.')[0]}Z`,
      numberOfThreads: tweets.length,
      numberofTweets: 0,
      totalMetrics: {
        retweet_count: 0,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
    },
    threads: tweets,
  };

  // 2: Populate Meta Data
  tweets.forEach((tweet) => {
    const { retweet_count, reply_count, like_count, quote_count } = tweet.meta.metrics;
    // 2a: Add the number of tweetIDs in each thread to the total
    finalObj.meta.numberofTweets += tweet.tweetIds.length;
    // 2b: Summing the metrics up for each thread into the finalObj
    finalObj.meta.totalMetrics.retweet_count += retweet_count;
    finalObj.meta.totalMetrics.reply_count += reply_count;
    finalObj.meta.totalMetrics.like_count += like_count;
    finalObj.meta.totalMetrics.quote_count += quote_count;
  });

  // 3: Return the final object
  return finalObj;
}

// --- Write threads.json out ---
async function writeFiles(data, filePath) {
  await fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('data written to file');
  });
}

// --- Wrapper Function ---
export default async function fetchThreads(bearerToken) {
  let objToWriteToFile;

  // 0: Fetch User ID to lookup tweets off
  const { id } = await fetchUserId(bearerToken);

  // 1: Fetch Data using ID
  const [entireData] = await fetchTweets(id, bearerToken);
  // 1a: Destructure out individual values for use in functions below
  const { data: tweets, includes } = entireData;

  // If the fetch to twitter in step 1 returns no tweets it will be undefined, if it does return data run the below.
  if (tweets !== undefined) {
    // 2: Order and summarise data
    const summarisedConversationData = await summariseConversationData(tweets);

    // 3: Populate other conversation details such as: TweetIds, date, metrics data and media_info
    const populatedTweetData = await populateTweetData(tweets, summarisedConversationData, includes);

    // 4: Sort the dates of each tweet to ensure they're in the correct order of publication.
    const sortedTweetData = populatedTweetData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 5: Making the final object and adding in meta data.
    const finalObj = await addingMetaDataAndDataWrapper(sortedTweetData);

    // 6: set object to write to file
    objToWriteToFile = finalObj;

    // 6a: Write entire tweets object out for temporary use on downloading tweets and creating files
    await writeFiles(entireData, './src/data/tweets.json');
  } else {
    // If no data is returned and it's undefined, update the last fetch data and re-write the file.
    const existingFile = threadsInfo;
    const currentDate = new Date();
    const updatedDate = `${currentDate.toISOString().split('.')[0]}Z`;
    existingFile.meta.lastFetchedData = updatedDate;
    console.log(`No new tweets found, updating last fetched date/time to ${updatedDate}`);
    objToWriteToFile = existingFile;
  }

  // 7: Write object out to the file
  await writeFiles(objToWriteToFile, './src/data/threads.json');
}
