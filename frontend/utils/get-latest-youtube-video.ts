import { LatestVideo } from '../types';

export default async function getLatestYouTubeVideo() {
  // Fetch the RSS feed for my channel
  const rssFeedRes = await fetch(
    'https://www.youtube.com/feeds/videos.xml?channel_id=UCKbxBnz1xuyGAPMCOZQRdVw'
  );

  const rssFeedData = await rssFeedRes.text();

  // Calculate the latest video for the channel
  const latestVideoId = rssFeedData
    .split('<yt:videoId>')[1]
    .split('</yt:videoId>')[0];

  // Fetch details for the video from the YouTube API
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&id=${latestVideoId}&part=snippet,contentDetails,statistics`
  );

  const data = (await res.json()) as LatestVideo;

  return data.items[0];
}
