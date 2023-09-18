'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { postComponent, viewportSettings } from '../../../../constants';
import type { IProps as BaseIProps, ImageProps } from '../Components';

export const HR = (): JSX.Element => (
  <motion.hr
    className="mb-6"
    initial="offscreen"
    whileInView="onscreen"
    variants={postComponent}
    viewport={viewportSettings}
  />
);

export const UL = ({ children }: BaseIProps): JSX.Element => (
  <motion.ul
    className="mb-8 list-disc pl-4 text-md md:text-base leading-relaxed md:leading-loose"
    initial="offscreen"
    whileInView="onscreen"
    variants={postComponent}
    viewport={viewportSettings}
  >
    {children}
  </motion.ul>
);

export const OL = ({ children }: BaseIProps): JSX.Element => (
  <motion.ol
    className="mb-6 md:mb-8 list-decimal pl-4 text-md md:text-base leading-relaxed md:leading-loose"
    initial="offscreen"
    whileInView="onscreen"
    variants={postComponent}
    viewport={viewportSettings}
  >
    {children}
  </motion.ol>
);

export const IMG = ({ src, alt }: ImageProps): JSX.Element => (
  <p className="relative w-full h-64 sm:h-96">
    <Image src={src} alt={alt || ''} fill className="rounded-lg" />
  </p>
);
