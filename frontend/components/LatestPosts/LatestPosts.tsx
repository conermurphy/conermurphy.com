import React from 'react';
import { Post, POSTTYPES } from '../../types';
import { PostCard } from '../Post';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import NoScrollLink from '../NoScrollLink/NoScrollLink';

interface IProps {
  posts: Post[];
  postType: POSTTYPES;
}

export default function LatestPosts({ posts, postType }: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title:
          postType === POSTTYPES.BLOG ? 'Latest Blogs' : 'Latest Newsletters',
      }}
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-start lg:justify-between">
        {posts.map(({ data }) => (
          <li key={data.UUID} className="h-full">
            <PostCard post={data} postType={postType} />
          </li>
        ))}
      </ul>
      <div className="flex gap-1 mt-10 text-lg flex-row lg:text-xl justify-start flex-wrap">
        <p>Want to read more?</p>
        <span className="font-semibold border-b-2 border-transparent hover:border-accent pb-1">
          <NoScrollLink
            href={postType === POSTTYPES.BLOG ? '/blog' : '/newsletter'}
          >
            View all my posts here
          </NoScrollLink>
        </span>
      </div>
    </ComponentWrapper>
  );
}
