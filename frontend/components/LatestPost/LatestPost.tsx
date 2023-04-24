import React from 'react';
import { Post, POSTTYPES } from '../../types';
import { PostCard } from '../Post';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import NoScrollLink from '../NoScrollLink/NoScrollLink';

interface IProps {
  post: Post;
  postType: POSTTYPES;
}

export default function LatestPost({ post, postType }: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title:
          postType === POSTTYPES.VIDEO ? 'Latest Video' : 'Latest Blog Post',
        tag: 'Content',
        description:
          'Lorem ipsum dolor sit amet consectetur. A arcu amet viverra et ullamcorper eget ac.',
        link:
          postType === POSTTYPES.VIDEO ? (
            <NoScrollLink
              href="/posts"
              className="text-xl text-brand font-heading font-extrabold"
            >
              View All Posts
            </NoScrollLink>
          ) : (
            <a
              href="/posts"
              className="text-xl text-brand font-heading font-extrabold"
            >
              View All Videos
            </a>
          ),
      }}
    >
      <PostCard post={post.data} postType={postType} />
    </ComponentWrapper>
  );
}
