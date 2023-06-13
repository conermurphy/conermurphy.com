import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PostFrontMatter, POSTTYPES } from '../../../types';
import { postComponent, viewportSettings } from '../../../constants';

interface IProps {
  post: PostFrontMatter;
  postType: POSTTYPES;
  isLoading?: boolean;
}

function PostCardSekelton(): JSX.Element {
  return (
    <div className="flex flex-col gap-y-4 p-8 max-w-lg w-full animate-pulse border-l-8 border-gray-200">
      <div className="w-full bg-gray-200 h-5" />
      <div className="flex flex-col gap-2">
        <div className="w-full h-10 bg-gray-200" />
        <div className="w-full h-16 bg-gray-200" />
      </div>
      <div className="w-full h-5 bg-gray-200" />
    </div>
  );
}

export default function PostCard({
  post,
  postType,
  isLoading = false,
}: IProps): JSX.Element {
  const { title, date, slug, description } = post;

  const wrappedTitle = title.replace(
    /`(.*?)`/g,
    '<code class="p-1 font-extrabold lowercase">$&</code>'
  );

  if (isLoading) return <PostCardSekelton />;

  const isTechnicalWriting = postType === POSTTYPES.TECHNICAL_WRITING;

  return (
    <motion.article
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={{ ...viewportSettings, amount: 0.2 }}
      className="contents"
    >
      <Link
        href={!isTechnicalWriting ? `/${postType}/${slug}` : post.canonical_url}
      >
        <div className="flex flex-col gap-y-4 p-8 break-words border-text/10 hover:border-brand border-l-8 max-w-lg h-full justify-center duration-300 ease-in-out transition-all">
          <p className="text-brand font-heading font-extrabold text-lg">
            {new Date(date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
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
    </motion.article>
  );
}
