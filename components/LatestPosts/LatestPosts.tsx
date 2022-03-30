import Link from 'next/link';
import React from 'react';
import { PostWithFrontmatter } from '../../types';
import { PostCard } from '../Blog';

interface IProps {
  posts: PostWithFrontmatter[];
}

export default function LatestPosts({ posts }: IProps): JSX.Element {
  return (
    <div className="flex flex-col items-center py-10 md:py-72 border-t border-primaryBorder">
      <section className="max-w-[272px] md:max-w-[1372px] w-full md:px-20 lg:px-106">
        <h2 className="text-32 md:text-40">Latest Content...</h2>
        <p className="text-lg mb-10 mt-2.5 lg:mt-1 md:text-2xl">
          What I’m up to and more.
        </p>
        <ul className="flex flex-col items-center justify-between flex-wrap gap-12 md:flex-row lg:flex-nowrap xl:gap-[78px]">
          {posts.map(({ data }) => {
            return <PostCard key={data.id} post={data} />;
          })}
        </ul>
        <div className="flex flex-col gap-1 mt-10 text-lg md:flex-row lg:text-2xl">
          <p>Want to read more?</p>
          <span className="font-semibold">
            <Link href="/blog">View all posts here</Link>
          </span>
        </div>
      </section>
    </div>
  );
}
