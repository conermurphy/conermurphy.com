import { readdirSync, promises as fs } from 'fs';
import threadsInfo from '../data/threads.json';

// --- Get an array of folder names existing within threads content folder.
function getThreadFolderNames() {
  const source = './src/content/threads';
  const getDirectories = readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  return getDirectories;
}

// --- Download Tweets ---
async function tweetsDownloader(bearer, threadsInf) {
  // 0: Get list of folders contained within threads folder already to see if thread exists
  const existingThreads = getThreadFolderNames();
  // 0b: Destructure threads out of threadsInf
  const { threads } = threadsInf;

  // 1: Loop over threads
  threads.map(async (thread) => {
    // 1a: Destructure out thread properties
    const { slug, conversation, tweetIds } = thread;
    // 2: Check if thread has been downloaded or not.
    const threadExists = existingThreads.includes(slug);

    // 2a: If the existing folders contains the current thread slug then return
    if (threadExists) {
      console.log(`The thread with the slug: ${slug} already exists`);
      return;
    }

    // 3: Create a new folder for thread to be downloaded
    console.log(`The thread with the slug: ${slug} does not exist, creating a new folder now.`);
    const folderPath = `./src/content/threads/${slug}`;
    await fs.mkdir(folderPath, { recursive: true });
  });
}

// --- Wrapper Function for downloading threads ---
export default async function downloadThreads(bearerToken) {
  // 0: Loop Over threads.json:
  //    -> Check if already downloaded and skip if exists
  //    -> Create a new folder for missing ones
  //    -> Download and populate info
  await tweetsDownloader(bearerToken, threadsInfo);
}
