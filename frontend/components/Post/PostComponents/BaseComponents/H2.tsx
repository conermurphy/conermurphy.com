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
