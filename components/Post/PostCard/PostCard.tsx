import React from 'react';
import Img from 'next/image';
import { motion } from 'framer-motion';
import { PostFrontMatter, POSTTYPES } from '../../../types';
import NoScrollLink from '../../NoScrollLink/NoScrollLink';
import { postComponent, viewportSettings } from '../../../constants';

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

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={{ ...viewportSettings, amount: 0.2 }}
      className="contents"
    >
      <NoScrollLink href={`/${postType}/${slug}`} passHref>
        <a className="group relative flex flex-col max-w-xs lg:max-w-sm cursor-pointer bg-secondaryBg dark:bg-secondaryBgDark rounded-md overflow-hidden h-full w-full min-w-full sm:min-w-0">
          <article>
            <div className="absolute h-full w-full items-center justify-center flex group-hover:border-2 border-accent transition-all duration-300 ease-in-out z-10 bg-primaryBgDark/50 group-hover:opacity-100 opacity-0 rounded-md">
              <p className="flex flex-row gap-2 items-center bg-accent px-4 py-2 font-bold rounded-sm">
                Read more
              </p>
            </div>
            <div className="relative w-full rounded-md overflow-hidden">
              <Img
                src={image}
                alt={title}
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="cover"
                priority
              />
            </div>
            <div className="flex flex-col gap-y-3 p-8 md:p-10 break-words">
              <p className="font-bold text-sm opacity-100 border-b-2 w-max pb-2 border-accent">
                {new Date(date).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <h3
                className="text-lg md:text-xl lg:text-2xl"
                dangerouslySetInnerHTML={{ __html: wrappedTitle }}
              />
              <p className="text-sm lg:text-base opacity-75">{description}</p>
            </div>
          </article>
        </a>
      </NoScrollLink>
    </motion.div>
  );
}
