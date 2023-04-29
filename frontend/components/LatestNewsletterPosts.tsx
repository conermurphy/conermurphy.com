import React from 'react';
import ComponentWrapper from './ComponentWrapper/ComponentWrapper';
import { POSTTYPES, Post } from '../types';
import NoScrollLink from './NoScrollLink/NoScrollLink';
import { PostCard } from './Post';

interface IProps {
  posts: Post[];
}

export default function LatestNewsletterPosts({ posts }: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title: 'Newsletter',
        tag: 'Content',
        description:
          'Lorem ipsum dolor sit amet consectetur. A arcu amet viverra et ullamcorper eget ac.',
        link: (
          <NoScrollLink
            href="/newsletter"
            className="text-xl text-brand font-heading font-extrabold"
          >
            View Past Editions
          </NoScrollLink>
        ),
      }}
    >
      <ul className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between w-full gap-12">
        {posts.map((post) => (
          <li key={post.data.title} className="h-full">
            <PostCard post={post.data} postType={POSTTYPES.NEWSLETTER} />
          </li>
        ))}
      </ul>
    </ComponentWrapper>
  );
}
