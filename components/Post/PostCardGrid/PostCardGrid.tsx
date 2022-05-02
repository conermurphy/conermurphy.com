import React from 'react';
import { Post, POSTTYPES } from '../../../types';
import PostCard from '../PostCard/PostCard';

interface IProps {
  posts: Post[];
  postType: POSTTYPES;
}

export default function PostCardGrid({ posts, postType }: IProps): JSX.Element {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
      {posts.map(({ data }) => {
        return <PostCard key={data.id} post={data} postType={postType} />;
      })}
    </section>
  );
}
