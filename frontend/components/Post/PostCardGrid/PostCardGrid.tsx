import React from 'react';
import { Post, POSTTYPES } from '../../../types';
import NoContentFound from '../NoContentFound/NoContentFound';
import PostCard from '../PostCard/PostCard';

interface IProps {
  posts: Post[];
  postType: POSTTYPES;
  isLoading: boolean;
}

export default function PostCardGrid({
  posts,
  postType,
  isLoading,
}: IProps): JSX.Element {
  return posts?.length ? (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full justify-items-center">
      {posts.map(({ data }) => (
        <PostCard
          key={data.UUID}
          post={data}
          postType={postType}
          isLoading={isLoading}
        />
      ))}
    </section>
  ) : (
    <NoContentFound />
  );
}
