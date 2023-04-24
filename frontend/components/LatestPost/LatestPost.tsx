import React from 'react';
import { Post, POSTTYPES } from '../../types';
import { PostCard } from '../Post';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import NoScrollLink from '../NoScrollLink/NoScrollLink';

type IProps =
  | {
      post: Post;
      link?: never;
      postType: POSTTYPES.BLOG;
    }
  | {
      link: string;
      post?: never;
      postType: POSTTYPES.VIDEO;
    };

export default function LatestPost({
  post,
  postType,
  link,
}: IProps): JSX.Element {
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
      {postType === POSTTYPES.BLOG ? (
        <PostCard post={post.data} postType={postType} />
      ) : null}
      {postType === POSTTYPES.VIDEO ? <p>{link}</p> : null}
    </ComponentWrapper>
  );
}
