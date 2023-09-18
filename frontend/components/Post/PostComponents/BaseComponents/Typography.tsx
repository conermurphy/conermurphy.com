'use client';

import { motion } from 'framer-motion';
import { postComponent, viewportSettings } from '../../../../constants';
import type { IProps as BaseIProps } from '../Components';

export const P = ({ children }: BaseIProps): JSX.Element => (
  <motion.p
    className="text-md md:text-base mb-8 leading-relaxed md:leading-loose"
    initial="offscreen"
    whileInView="onscreen"
    variants={postComponent}
    viewport={viewportSettings}
  >
    {children}
  </motion.p>
);

export const A = ({ children, href }: BaseIProps): JSX.Element => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial="offscreen"
    whileInView="onscreen"
    variants={postComponent}
    viewport={viewportSettings}
    className="font-extrabold text-heading underline"
  >
    {children}
  </motion.a>
);

export const InlineCode = ({ children }: BaseIProps): JSX.Element => (
  <motion.code
    className="p-1 font-extrabold text-heading"
    initial="offscreen"
    whileInView="onscreen"
    variants={postComponent}
    viewport={viewportSettings}
  >
    `{children}`
  </motion.code>
);

export const BlockQuote = ({ children }: BaseIProps): JSX.Element => (
  <blockquote className="flex flex-col gap-3 italic border-l-[3px] border-accent pl-7 py-6 mb-6 md:mb-8 text-sm md:text-base">
    {children}
  </blockquote>
);
