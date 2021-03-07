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
  // While fetchedAllData is false then fetch the next page of data from twitter.
  // do {
  try {
    // Transforming parameters into one string
    const stringParams = stringifyParams(params);
    // 1: Create endpoint for tweets lookup
    const endpoint = `${tweetsEndpoint}/${id}/tweets?${stringParams}`;
    // Perform intital query to Twitter and convert to JSON.
    const { data, meta } = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'User-Agent': 'v2FullArchiveJS',
        authorization: `Bearer ${bearerToken}`,
      },
    }).then((res) => res.json());
    // Push the tweets to the array defined above.
    tweets.push(data);
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

  return tweets;
}

async function summariseConversationData(tweets) {
  return new Promise((res, rej) => {
    try {
      // Get an array of counted conversation IDs in the dataset
      const convoIds = tweets
        // 1: map over the data and return all of the conversation Ids into one array
        .map((tweet) => {
          // 1a: Check if the tweet was sent by me and is the first tweet in a conversation OR was in reply to myself.
          if (
            (tweet.conversation_id !== tweet.id && tweet.author_id !== '1249718482436055044') ||
            tweet.in_reply_to_user_id !== tweet.author_id
          ) {
            return;
          }
          return tweet.conversation_id;
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

      res(filteredData);
    } catch (e) {
      console.error(e);
      rej(e);
    }
  });
}

async function populateTweetData(tweets, convoData) {
  // Loop over each conversation and populate the required info
  const populatedData = convoData.map((convo) => {
    // 1: Find all tweets in that conversation
    const convoTweets = tweets.filter((item) => item.conversation_id === convo.conversation);

    // 2: Return all tweet IDs within that conversation and reverse to put them in the correct order as Twitters API does last tweet first.
    const tweetIds = convoTweets.map((item) => item.id).reverse();

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
    convo.tweetIds = tweetIds;
    convo.date = convoTweets[0].created_at;
    convo.meta = {};
    convo.meta.twitterMetrics = metricData;
    return convo;
  });

  // Return the populated object
  return populatedData;
}

// Function for writing tweets.json file out
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
  const [tweets] = await fetchTweets(id, bearerToken);

  // 2: Order and summarise data
  const summarisedConversationData = await summariseConversationData(tweets);

  // 3: Populate other conversation details such as: TweetIds, date, metrics data
  const populatedTweetData = await populateTweetData(tweets, summarisedConversationData);

  // 4: Sort the dates of each tweet to ensure they're in the correct order of publication.
  const sortedTweetData = populatedTweetData.sort((a, b) => new Date(a.date) - new Date(b.date));

  // 5: Write info to files
  await writeFiles(sortedTweetData);
}
