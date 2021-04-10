import dotenv from 'dotenv';
import fetchThreads from './src/utils/fetchThreads';
import downloadThreads from './src/utils/downloadThreads';

dotenv.config({ path: '.env' });

const bearerToken = process.env.TWITTER_BEARER_TOKEN;

// Function to fetch Twitter Threads and create MDX files for them.
async function fetchTwitterThreads(token) {
  const threadInfo = await fetchThreads(token);
  await downloadThreads(threadInfo);
}

fetchTwitterThreads(bearerToken);
