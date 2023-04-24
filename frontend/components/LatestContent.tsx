import { POSTTYPES, Post } from '../types';
import LatestPost from './LatestPost/LatestPost';

interface IProps {
  latestBlog: Post;
  link: string;
}

export default function LatestContent({ latestBlog, link }: IProps) {
  return (
    <div className="flex flex-row items-start justify-center gap-12 w-full">
      <div className="flex flex-row items-start justify-between w-full max-w-7xl">
        <LatestPost post={latestBlog} postType={POSTTYPES.BLOG} />
        <LatestPost link={link} postType={POSTTYPES.VIDEO} />
      </div>
    </div>
  );
}
