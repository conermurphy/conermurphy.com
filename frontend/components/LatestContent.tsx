import { LatestVideo, POSTTYPES, Post } from '../types';
import LatestPost from './LatestPost/LatestPost';

interface IProps {
  latestBlogs: Post[];
  latestVideo: LatestVideo['items'][0];
}

export default function LatestContent({ latestBlogs, latestVideo }: IProps) {
  return (
    <div className="flex flex-row items-start justify-center gap-12 w-full">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full max-w-7xl gap-24 md:gap-12">
        <LatestPost posts={latestBlogs} postType={POSTTYPES.BLOG} />
        <LatestPost video={latestVideo} postType={POSTTYPES.VIDEO} />
      </div>
    </div>
  );
}
