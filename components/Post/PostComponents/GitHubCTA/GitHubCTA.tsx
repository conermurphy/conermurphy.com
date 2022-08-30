import React from 'react';
import { motion } from 'framer-motion';
import { ICONS, postComponent, viewportSettings } from '../../../../constants';
import { getIcon } from '../../../../utils';

interface IProps {
  postPath: string;
}

export default function GitHubCTA({ postPath }: IProps): JSX.Element {
  const basePath =
    'https://github.com/conermurphy/conermurphy.com/tree/main/content';
  return (
    <aside className="my-6 text-md md:text-base leading-relaxed">
      <motion.p
        initial="offscreen"
        whileInView="onscreen"
        variants={postComponent}
        viewport={viewportSettings}
        className="my-2 opacity-100"
      >
        Found an issue with this post? Think you could add, clarify or improve
        it?
      </motion.p>
      <motion.p
        initial="offscreen"
        whileInView="onscreen"
        variants={postComponent}
        viewport={viewportSettings}
        className="my-2 opacity-100"
      >
        All my posts are available on GitHub and any fixes are greatly
        appreciated! 🙏
      </motion.p>
      <motion.a
        initial="offscreen"
        whileInView="onscreen"
        variants={postComponent}
        viewport={viewportSettings}
        className="flex flex-row gap-x-2 mt-5 pb-2 font-semibold w-max border-b border-accent opacity-100"
        href={`${basePath}${postPath}`}
        aria-label="Edit post on GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        {getIcon({ icon: ICONS.GITHUB.name })}
        <p>Edit on Github...</p>
      </motion.a>
    </aside>
  );
}
