import React from 'react';
import Link from 'next/link';
import { PostFrontMatter, POSTTYPES } from '../../../types';

interface IProps {
  post: PostFrontMatter;
  postType: POSTTYPES;
}

export default function PostCard({ post, postType }: IProps): JSX.Element {
  const { title, date, slug, description } = post;

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
    <article className="contents">
      <Link
        href={!isTechnicalWriting ? `/${postType}/${slug}` : post.canonical_url}
      >
        <div className="flex flex-col gap-y-4 p-8 break-words border-text/10 hover:border-brand border-l-8 max-w-lg h-full justify-center duration-300 ease-in-out transition-all">
          <time
            className="text-brand font-heading font-extrabold text-lg"
            dateTime={date}
          >
            {postsDateUI}
          </time>

          <div className="flex flex-col gap-2">
            <h3
              className="text-lg md:text-xl lg:text-2xl font-heading text-text/90"
              dangerouslySetInnerHTML={{ __html: wrappedTitle }}
            />
            <p>{description}</p>
          </div>
          <p className="text-brand font-heading font-extrabold text-lg">
            Read More ➡️
          </p>
        </div>
      </Link>
    </article>
  );
}
