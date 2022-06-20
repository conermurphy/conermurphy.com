import React from 'react';
import { Post, POSTTYPES } from '../../../types';
import NoContentFound from '../NoContentFound/NoContentFound';
import PostCard from '../PostCard/PostCard';

interface IProps {
  posts: Post[];
  postType: POSTTYPES;
  pageQueries?: { page: string; queries: string[] };
}

export default function PostCardGrid({
  posts,
  postType,
  pageQueries,
}: IProps): JSX.Element {
  return posts?.length ? (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
      {posts.map(({ data }) => {
        return (
          <PostCard
            key={data.UUID}
            post={data}
            postType={postType}
            pageQueries={pageQueries}
          />
        );
      })}
    </section>
  ) : (
    <NoContentFound />
  );
}
