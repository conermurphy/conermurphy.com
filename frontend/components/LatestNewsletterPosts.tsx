import React from 'react';
import Link from 'next/link';
import ComponentWrapper from './ComponentWrapper/ComponentWrapper';
import { POSTTYPES, Post } from '../types';
import { PostCard } from './Post';

interface IProps {
  posts: Post[] | false;
}

export default function LatestNewsletterPosts({ posts }: IProps) {
  if (!posts) {
    return null;
  }

  return (
    <ComponentWrapper
      data={{
        title: 'Newsletter',
        tag: 'Content',
        description:
          'Below is the latest posts from my weekly newsletter, Sunday Solotor.',
        link: (
          <Link
            href="/newsletter"
            className="text-xl text-brand font-heading font-extrabold"
          >
            View Past Editions
          </Link>
        ),
      }}
    >
      <ul className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between w-full gap-12">
        {posts.map((post) => (
          <li key={post.frontmatter.title} className="h-full">
            <PostCard post={post.frontmatter} postType={POSTTYPES.NEWSLETTER} />
          </li>
        ))}
      </ul>
    </ComponentWrapper>
  );
}
