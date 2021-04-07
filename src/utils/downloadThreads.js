import { readdirSync, promises as fs } from 'fs';
import fetch from 'isomorphic-fetch';
import FileType from 'file-type';

// --- Get an array of folder names existing within threads content folder.
function getThreadFolderNames() {
  const source = './src/content/threads';
  const getDirectories = readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  return getDirectories;
}

// --- Function to get name to call image, last bit before extension and after last /
function getImageName(path) {
  return path.split('/').pop();
}

// --- Write threads.json out ---
async function writeFiles(data, filePath) {
  await fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) throw err;
  });
}

// --- Function to download media from Twitter ---
async function downloadMedia(remotePath, localPath) {
  // console.log(`Downloading ${remotePath} to ${localPath}`);
  const data = await fetch(remotePath).then((res) => res.buffer());
  const { ext = 'png' } = await FileType.fromBuffer(data);
  const fileName = getImageName(remotePath);
  const [, extension] = fileName.split('.');
  await fs.writeFile(`${localPath}/${fileName}${extension ? '' : `.${ext}`}`, data);
}

// --- Download Tweets ---
async function tweetsDownloader(threadsInf) {
  // 0: Get list of folders contained within threads folder already to see if thread exists
  const existingThreads = getThreadFolderNames();
  // 0b: Destructure threads out of threadsInf
  const { threads, meta } = threadsInf;

  // If threads have been found then proceed to download them.
  if (meta.numberOfThreads !== 0) {
    await Promise.all(
      // 1: Loop over threads
      threads.map(async (thread) => {
        // 1a: Destructure out thread properties
        const {
          slug,
          title,
          type: threadType = 'thread',
          conversation,
          tweets,
          numberOfTweets,
          date: threadDate,
          meta,
          tags = [],
        } = thread;

        // 2: Check if thread has been downloaded or not.
        const threadExists = existingThreads.some((existingThread) => existingThread.includes(slug));

        // 2a: If the existing folders contains the current thread slug then return
        if (threadExists) {
          // console.log(`The thread with the slug: ${slug} already exists, skipping thread.`);
          return;
        }

        // 3: Create a new folder for thread to be downloaded
        console.log(`The thread with the slug: ${slug} does not exist, creating a new folder now.`);
        const threadFolderPath = `./src/content/threads/${slug}`;
        await fs.mkdir(threadFolderPath, { recursive: true });

        // 4: Create a summary MDX document for the entire thread and write it out to the parent folder directory
        const summaryContent = `---
conversationId: "${conversation}"
title: "${title.trim()}"
date: ${threadDate}
tags: 
  ${tags.map((x) => `- ${x}`).join('\n')}
type: ${threadType}
slug: ${slug}
tweets: [${tweets.map((tweet) => `"${tweet.id}"`)}]
numberOfTweets: ${numberOfTweets}
retweetCount: ${meta.metrics.retweet_count}
likeCount: ${meta.metrics.like_count}
replyCount: ${meta.metrics.reply_count}
quoteCount: ${meta.metrics.quote_count}
---
`;

        await fs.writeFile(`${threadFolderPath}/${slug}.mdx`, summaryContent, {
          encoding: 'utf-8',
        });

        // 5: Create a sub-folder for each tweet in the thread
        await Promise.all(
          tweets.map(async (tweet) => {
            const { id, media = null, date: tweetDate, links, type: tweetType = 'tweet', text, position: tweetPosition } = tweet;
            const tweetFolderPath = `${threadFolderPath}/tweet-${tweetPosition}`;
            await fs.mkdir(tweetFolderPath, { recursive: true });

            const images = [];
            const videos = [];

            // 6: Create an MDX document for each tweet in their respecitve folder and download any media required to be linked in the document.
            // 6a: Downloading media
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

            // 6b: Writing individual tweet MDX files
            const tweetContent = `---
tweetId: "${id}"
position: ${tweetPosition}
date: ${tweetDate}
type: ${tweetType}
conversationId: "${conversation}"
images:
  ${images.map((x) => `- ${x}`).join('\n  ')}
videos:
  ${videos.map((x) => `- ${x}`).join('\n  ')}
links:
  ${links !== undefined ? links.map((x) => `- ${x}`).join('\n  ') : []}
---
${text}
`;

            // console.log(`Writing file for tweet ${tweetPosition}`);
            await fs.writeFile(`${tweetFolderPath}/tweet-${tweetPosition}.mdx`, tweetContent, {
              encoding: 'utf-8',
            });
          })
        );
      })
    );
  }

  // Reset file to blank file for next download on next build
  const currentDate = new Date();
  const finalObj = {
    meta: {
      lastFetchedData: `${currentDate.toISOString().split('.')[0]}Z`,
      numberOfThreads: 0,
    },
    threads: [],
  };
  await writeFiles(finalObj, './src/data/threads.json');
}

// --- Wrapper Function for downloading threads ---
export default async function downloadThreads(threadsInfo) {
  // 0: Loop Over threads.json:
  //    -> Check if already downloaded and skip if exists
  //    -> Create a new folder for missing ones
  //    -> Download and populate info
  await tweetsDownloader(threadsInfo);
}