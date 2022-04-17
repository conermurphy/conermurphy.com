import React from 'react';
import { Post } from '../../../types';
import PostCard from '../PostCard/PostCard';

interface IProps {
  posts: Post[];
}

export default function PostCardGrid({ posts }: IProps): JSX.Element {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
      {posts.map(({ data }) => {
        return <PostCard key={data.id} post={data} />;
      })}
    </section>
  );
}
