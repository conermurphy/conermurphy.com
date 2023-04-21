import Img from 'next/image';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import Code from './Code/Code';
import BlockQuoteAuthor from './BlockQuoteAuthor/BlockQuoteAuthor';
import ImageCaption from './ImageCaption/ImageCaption';
import Tweet from './Tweet/Tweet';
import { getHeadingLink } from '../../../utils/posts';
import { copyToClipboard, getIcon } from '../../../utils';
import { ICONS, postComponent, viewportSettings } from '../../../constants';

interface IProps {
  children: string | ReactElement | (string | ReactElement)[];
  href?: string;
}

interface ImageProps {
  src: string;
  alt?: string;
}

function Link({
  top = 'top-1',
  size = '20px',
}: {
  top?: string;
  size?: string;
}): JSX.Element {
  return (
    <span className={`absolute -left-8 ${top} hidden md:group-hover:block`}>
      {getIcon({ icon: ICONS.LINK.name, size })}
    </span>
  );
}

const components = {
  h2: ({ children }: IProps): JSX.Element => (
    <motion.h2
      id={getHeadingLink(children)}
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={viewportSettings}
      className="group relative font-semibold text-2xl md:text-32 mb-2 mt-6 md:mt-16 scroll-mt-28"
    >
      <Link top="top-3" />
      <a
        href={`#${getHeadingLink(children)}`}
        onClick={() => copyToClipboard(window?.location?.href)}
      >
        {children}
      </a>
    </motion.h2>
  ),
  h3: ({ children }: IProps): JSX.Element => (
    <motion.h3
      id={getHeadingLink(children)}
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={viewportSettings}
      className="group relative font-semibold text-xl md:text-2xl mb-2.5 mt-6 md:mt-16 scroll-mt-28"
    >
      <Link top="top-2" />
      <a
        href={`#${getHeadingLink(children)}`}
        onClick={() => copyToClipboard(window?.location?.href)}
      >
        {children}
      </a>
    </motion.h3>
  ),
  h4: ({ children }: IProps): JSX.Element => (
    <motion.h4
      id={getHeadingLink(children)}
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={viewportSettings}
      className="group relative font-semibold text-lg md:text-xl mb-2 mt-6 md:mt-16 scroll-mt-28"
    >
      <Link top="top-1.5" size="18px" />
      <a
        href={`#${getHeadingLink(children)}`}
        onClick={() => copyToClipboard(window?.location?.href)}
      >
        {children}
      </a>
    </motion.h4>
  ),
  h5: ({ children }: IProps): JSX.Element => (
    <motion.h5
      id={getHeadingLink(children)}
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={viewportSettings}
      className="group relative font-semibold text-base md:text-lg mb-2 mt-6 md:mt-16 scroll-mt-28"
    >
      <Link size="18px" />
      <a
        href={`#${getHeadingLink(children)}`}
        onClick={() => copyToClipboard(window?.location?.href)}
      >
        {children}
      </a>
    </motion.h5>
  ),
  h6: ({ children }: IProps): JSX.Element => (
    <motion.h6
      id={getHeadingLink(children)}
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={viewportSettings}
      className="group relative font-semibold text-sm md:text-base mb-2 mt-6 md:mt-16 scroll-mt-28"
    >
      <Link size="16px" />
      <a
        href={`#${getHeadingLink(children)}`}
        onClick={() => copyToClipboard(window?.location?.href)}
      >
        {children}
      </a>
    </motion.h6>
  ),
  p: ({ children }: IProps): JSX.Element => (
    <motion.p
      className="text-md md:text-base mb-8 leading-relaxed"
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={viewportSettings}
    >
      {children}
    </motion.p>
  ),
  hr: (): JSX.Element => (
    <motion.hr
      className="mb-6"
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={viewportSettings}
    />
  ),
  code: ({ children }: IProps): JSX.Element => (
    <motion.code
      className="p-1 font-extrabold"
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={viewportSettings}
    >
      `{children}`
    </motion.code>
  ),
  blockquote: ({ children }: IProps): JSX.Element => (
    <blockquote className="flex flex-col gap-3 italic border-l-[3px] border-accent pl-7 py-6 mb-6 md:mb-8 text-sm md:text-base">
      {children}
    </blockquote>
  ),
  a: ({ children, href }: IProps): JSX.Element => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={viewportSettings}
      className="font-semibold underline"
    >
      {children}
    </motion.a>
  ),
  ul: ({ children }: IProps): JSX.Element => (
    <motion.ul
      className="mb-8 list-disc pl-4 text-md md:text-base leading-relaxed"
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={viewportSettings}
    >
      {children}
    </motion.ul>
  ),
  ol: ({ children }: IProps): JSX.Element => (
    <motion.ol
      className="mb-6 md:mb-8 list-decimal pl-4 text-md md:text-base leading-relaxed"
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={viewportSettings}
    >
      {children}
    </motion.ol>
  ),
  img: ({ src, alt }: ImageProps): JSX.Element => (
    <Img
      src={src}
      alt={alt}
      width={480}
      height={270}
      layout="responsive"
      objectFit="contain"
      className="rounded-lg"
    />
  ),
  pre: Code,
  BlockQuoteAuthor,
  ImageCaption,
  Tweet,
};

export default components;
