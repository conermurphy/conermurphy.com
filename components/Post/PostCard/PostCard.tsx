import React from 'react';
import Img from 'next/image';
import { motion } from 'framer-motion';
import { PostFrontMatter, POSTTYPES } from '../../../types';
import Tags from '../Tags/Tags';
import NoScrollLink from '../../NoScrollLink/NoScrollLink';
import { postComponent, viewportSettings } from '../../../constants';

interface IProps {
  post: PostFrontMatter;
  postType: POSTTYPES;
  pageQueries?: { page: string; queries: string[] };
}

export default function PostCard({
  post,
  postType,
  pageQueries,
}: IProps): JSX.Element {
  const { title, date, tags, slug, image, description } = post;

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={{ ...viewportSettings, amount: 0.2 }}
    >
      <NoScrollLink href={`/${postType}/${slug}`} passHref>
        <article className="flex flex-col gap-y-6 max-w-[272px] lg:max-w-[350px] cursor-pointer">
          <div className="relative w-full max-w-[350px] rounded-2xl overflow-hidden">
            <Img
              src={image}
              alt={title}
              width={350}
              height={197}
              layout="responsive"
              objectFit="contain"
              priority
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-1">
              <p className="font-semibold text-sm opacity-100">
                {new Date(date).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <h2 className="text-xl lg:text-2xl">{title}</h2>
              <p className="text-sm lg:text-base">{description}</p>
            </div>
            <Tags tags={tags} pageQueries={pageQueries} />
          </div>
        </article>
      </NoScrollLink>
    </motion.div>
  );
}
