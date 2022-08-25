import React from 'react';
import { Post, POSTTYPES } from '../../types';
import { PostCard } from '../Post';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import NoScrollLink from '../NoScrollLink/NoScrollLink';

interface IProps {
  posts: Post[];
}

export default function LatestPosts({ posts }: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title: 'Latest Posts',
      }}
    >
      <ul className="grid lg:grid-cols-3 gap-6 w-full items-start justify-between">
        {posts.map(({ data }) => (
          <li key={data.UUID} className="h-full">
            <PostCard post={data} postType={POSTTYPES.BLOG} />
          </li>
        ))}
      </ul>
      <div className="flex gap-1 mt-10 text-lg flex-row lg:text-xl justify-center xl:justify-start flex-wrap">
        <p>Want to read more?</p>
        <span className="font-semibold border-b-2 border-transparent hover:border-accent pb-1">
          <NoScrollLink href="/blog">View all posts here</NoScrollLink>
        </span>
      </div>
    </ComponentWrapper>
  );
}
