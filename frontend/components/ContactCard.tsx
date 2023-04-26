import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { postComponent, viewportSettings } from '../constants';

interface IProps {
  title?: string | ReactElement;
  tag?: string;
  description?: string;
  link?: ReactElement;
}

export default function ContactCard({
  title,
  tag,
  description,
  link,
}: IProps): JSX.Element {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      variants={postComponent}
      viewport={{ ...viewportSettings, amount: 0.2 }}
      className="contents"
    >
      <div className="flex flex-col gap-y-4 p-8 break-words border-brand border-l-8 max-w-lg h-full justify-center duration-300 ease-in-out transition-all">
        <p className="text-brand font-heading font-extrabold text-lg">{tag}</p>
        <div className="flex flex-col gap-2">
          {typeof title === 'string' ? (
            <h3 className="text-lg md:text-xl lg:text-2xl font-heading text-text/90">
              {title}
            </h3>
          ) : (
            title
          )}
          <p>{description}</p>
        </div>
        {link}
      </div>
    </motion.div>
  );
}
