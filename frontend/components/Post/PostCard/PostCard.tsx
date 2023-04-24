import React from 'react';
import Img from 'next/image';
import { motion } from 'framer-motion';
import { PostFrontMatter, POSTTYPES } from '../../../types';
import NoScrollLink from '../../NoScrollLink/NoScrollLink';
import { postComponent, TOPICS, viewportSettings } from '../../../constants';

interface IProps {
  post: PostFrontMatter;
  postType: POSTTYPES;
}

export default function PostCard({ post, postType }: IProps): JSX.Element {
  const { title, date, slug, image, description } = post;

  const wrappedTitle = title.replace(
    /`(.*?)`/g,
    '<code class="p-1 font-extrabold lowercase">$&</code>'
  );

  const isTechnicalWriting = postType === POSTTYPES.TECHNICAL_WRITING;

  return (
    <motion.article
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={{ ...viewportSettings, amount: 0.2 }}
      className="contents"
    >
      <div className="flex flex-col gap-y-4 p-8 break-words border-brand border-l-8">
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
        <NoScrollLink
          href={
            !isTechnicalWriting ? `/${postType}/${slug}` : post.canonical_url
          }
          className="text-brand font-heading font-extrabold text-lg"
        >
          Read More ➡️
        </NoScrollLink>
      </div>
    </motion.article>
  );
}