import React from 'react';
import { Post, POSTTYPES } from '../../../types';
import NoContentFound from '../NoContentFound/NoContentFound';
import PostCard from '../PostCard/PostCard';

interface IProps {
  posts: Post[];
  postType: POSTTYPES;
}

export default function PostCardGrid({ posts, postType }: IProps): JSX.Element {
  return posts?.length ? (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full justify-items-center">
      {posts.map(({ frontmatter }) => (
        <PostCard
          key={frontmatter.UUID}
          post={frontmatter}
          postType={postType}
        />
      ))}
    </section>
  ) : (
    <NoContentFound />
  );
}
