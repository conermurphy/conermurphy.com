import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LatestVideo, Post, POSTTYPES } from '../../types';
import { PostCard } from '../Post';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';

type IProps =
  | {
      post: Post;
      video?: never;
      postType: POSTTYPES.BLOG;
    }
  | {
      video: LatestVideo['items'][0];
      post?: never;
      postType: POSTTYPES.VIDEO;
    };

export default function LatestPost({
  post,
  postType,
  video,
}: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title:
          postType === POSTTYPES.VIDEO ? 'Latest Video' : 'Latest Blog Post',
        tag: 'Content',
        description:
          postType === POSTTYPES.VIDEO
            ? 'Here is my YouTube Channel and latest video for your enjoyment.'
            : 'Below is my latest blog post and a link to all of my posts.',
        link:
          postType === POSTTYPES.BLOG ? (
            <Link
              href="/posts"
              className="text-lg md:text-xl text-brand font-heading font-extrabold"
            >
              View All Posts
            </Link>
          ) : (
            <a
              href="https://www.youtube.com/@conermurphy/videos"
              className="text-lg md:text-xl text-brand font-heading font-extrabold"
            >
              View All Videos
            </a>
          ),
      }}
    >
      {postType === POSTTYPES.BLOG ? (
        <PostCard post={post.frontmatter} postType={postType} />
      ) : null}
      {postType === POSTTYPES.VIDEO && video ? (
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          className="flex flex-col gap-6 max-w-md border-l-8 border-text/10 hover:border-brand p-8 duration-300 ease-in-out transition-all"
        >
          <Image
            width={video.snippet.thumbnails.medium.width}
            height={video.snippet.thumbnails.medium.height}
            src={video.snippet.thumbnails.medium.url}
            alt=""
          />
          <p className="text-text text-lg">{video.snippet.title}</p>
        </a>
      ) : null}
    </ComponentWrapper>
  );
}
