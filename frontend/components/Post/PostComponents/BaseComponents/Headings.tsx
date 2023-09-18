'use client';

import { motion } from 'framer-motion';
import { postComponent, viewportSettings } from '../../../../constants';
import { getHeadingLink } from '../../../../utils/posts';
import { getHeadingRef } from '../../../../utils/posts/get-heading-ref';
import { copyToClipboard } from '../../../../utils';
import type { IProps as BaseIProps } from '../Components';
import { PostHeading } from '../../../../types';
import { Link } from './Link';

interface IProps extends BaseIProps {
  headings: (PostHeading & { ref: React.RefObject<HTMLHeadingElement> })[];
}

export const H2 = ({ children, headings }: IProps): JSX.Element => (
  <motion.h2
    id={getHeadingLink(children)}
    initial="offscreen"
    whileInView="onscreen"
    variants={postComponent}
    viewport={viewportSettings}
    className="group relative font-extrabold text-heading text-2xl md:text-32 mb-2 mt-6 md:mt-16 scroll-mt-28"
    ref={getHeadingRef(headings, children)}
  >
    <Link top="top-2" />
    <a
      href={`#${getHeadingLink(children)}`}
      onClick={() => copyToClipboard(window?.location?.href)}
    >
      {children}
    </a>
  </motion.h2>
);

export const H3 = ({ children, headings }: IProps): JSX.Element => (
  <motion.h3
    id={getHeadingLink(children)}
    initial="offscreen"
    whileInView="onscreen"
    variants={postComponent}
    viewport={viewportSettings}
    className="group relative font-extrabold text-heading text-xl md:text-2xl mb-2.5 mt-6 md:mt-16 scroll-mt-28"
    ref={getHeadingRef(headings, children)}
  >
    <Link top="top-2" />
    <a
      href={`#${getHeadingLink(children)}`}
      onClick={() => copyToClipboard(window?.location?.href)}
    >
      {children}
    </a>
  </motion.h3>
);

export const H4 = ({ children, headings }: IProps): JSX.Element => (
  <motion.h4
    id={getHeadingLink(children)}
    initial="offscreen"
    whileInView="onscreen"
    variants={postComponent}
    viewport={viewportSettings}
    className="group relative font-extrabold text-heading text-lg md:text-xl mb-2 mt-6 md:mt-16 scroll-mt-28"
    ref={getHeadingRef(headings, children)}
  >
    <Link top="top-1.5" size="18px" />
    <a
      href={`#${getHeadingLink(children)}`}
      onClick={() => copyToClipboard(window?.location?.href)}
    >
      {children}
    </a>
  </motion.h4>
);

export const H5 = ({ children, headings }: IProps): JSX.Element => (
  <motion.h5
    id={getHeadingLink(children)}
    initial="offscreen"
    whileInView="onscreen"
    variants={postComponent}
    viewport={viewportSettings}
    className="group relative font-extrabold text-heading text-base md:text-lg mb-2 mt-6 md:mt-16 scroll-mt-28"
    ref={getHeadingRef(headings, children)}
  >
    <Link size="18px" />
    <a
      href={`#${getHeadingLink(children)}`}
      onClick={() => copyToClipboard(window?.location?.href)}
    >
      {children}
    </a>
  </motion.h5>
);

export const H6 = ({ children, headings }: IProps): JSX.Element => (
  <motion.h6
    id={getHeadingLink(children)}
    initial="offscreen"
    whileInView="onscreen"
    variants={postComponent}
    viewport={viewportSettings}
    className="group relative font-extrabold text-heading text-sm md:text-base mb-2 mt-6 md:mt-16 scroll-mt-28"
    ref={getHeadingRef(headings, children)}
  >
    <Link size="16px" />
    <a
      href={`#${getHeadingLink(children)}`}
      onClick={() => copyToClipboard(window?.location?.href)}
    >
      {children}
    </a>
  </motion.h6>
);
