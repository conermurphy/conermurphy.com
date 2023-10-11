import React from 'react';
import Link from 'next/link';
import { PostFrontMatter, POSTTYPES } from '../../../types';

interface IProps {
  post: PostFrontMatter;
  postType: POSTTYPES;
}

export default function PostCard({ post, postType }: IProps): JSX.Element {
  const { title, date, slug, description, topics } = post;

  const wrappedTitle = title.replace(
    /`(.*?)`/g,
    '<code class="p-1 font-extrabold lowercase">$&</code>'
  );

  const isTechnicalWriting = postType === POSTTYPES.TECHNICAL_WRITING;

  const postsDateUI = new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4">
        <time dateTime={date} className="text-text/90 text-sm">
          {postsDateUI}
        </time>
        <div className="flex flex-row gap-2">
          {topics.map((topic) => (
            // <Link
            //   key={topic}
            //   href={`/${postType}/${topic.toLowerCase()}`}
            //   className="relative z-10 rounded-full bg-text/10 px-3 py-1.5 font-medium text-text/90 hover:bg-brand/50 text-xs"
            // >
            <p
              key={topic}
              className="relative z-10 rounded-full bg-text/10 px-3 py-1.5 font-medium text-text/90 text-xs"
            >
              {topic}
            </p>
            // </Link>
          ))}
        </div>
      </div>
      <div className="group flex flex-col gap-4">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-text group-hover:opacity-75">
          <Link
            href={
              !isTechnicalWriting ? `/${postType}/${slug}` : post.canonical_url
            }
            dangerouslySetInnerHTML={{ __html: wrappedTitle }}
          />
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>
        <Link
          href={
            !isTechnicalWriting ? `/${postType}/${slug}` : post.canonical_url
          }
        >
          <p className="text-brand font-body font-normal hover:font-bold text-base ease-in-out transition-all">
            Read More
          </p>
        </Link>
      </div>
    </article>
  );
}
