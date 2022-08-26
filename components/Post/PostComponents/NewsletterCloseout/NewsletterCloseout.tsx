import React from 'react';
import { motion } from 'framer-motion';
import { ICONS, postComponent, viewportSettings } from '../../../../constants';
import { getHeadingLink } from '../../../../utils/posts';
import { copyToClipboard, getIcon } from '../../../../utils';

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

export default function NewsletterCloseout() {
  return (
    <>
      <motion.h2
        initial="offscreen"
        whileInView="onscreen"
        variants={postComponent}
        viewport={viewportSettings}
        className="group relative font-semibold text-2xl md:text-32 mb-2 mt-6 md:mt-16 scroll-mt-28 capitalize"
        id={getHeadingLink('Enjoyed This Newsletter')}
      >
        <Link top="top-3" />
        <a
          href={`#${getHeadingLink('Enjoyed This Newsletter')}`}
          onClick={() => copyToClipboard(window?.location?.href)}
        >
          Enjoyed This Newsletter?
        </a>
      </motion.h2>
      <motion.p
        initial="offscreen"
        whileInView="onscreen"
        variants={postComponent}
        viewport={viewportSettings}
        className="text-sm md:text-base mb-6 opacity-100"
      >
        If you have enjoyed this edition and want to see more of my content
        please consider checking out my various socials below:
      </motion.p>
      <ul className="mb-6 md:mb-8 list-disc pl-4 text-sm md:text-base opacity-100">
        <motion.li
          initial="offscreen"
          whileInView="onscreen"
          variants={postComponent}
          viewport={viewportSettings}
        >
          <a
            href="https://twitter.com/MrConerMurphy/"
            className="font-semibold underline"
          >
            Twitter
          </a>
        </motion.li>
        <motion.li
          initial="offscreen"
          whileInView="onscreen"
          variants={postComponent}
          viewport={viewportSettings}
        >
          <a
            href="https://www.youtube.com/channel/UCKbxBnz1xuyGAPMCOZQRdVw"
            className="font-semibold underline"
          >
            YouTube
          </a>
        </motion.li>
        <motion.li
          initial="offscreen"
          whileInView="onscreen"
          variants={postComponent}
          viewport={viewportSettings}
        >
          <a
            href="https://www.twitch.tv/conermurphy"
            className="font-semibold underline"
          >
            Twitch
          </a>
        </motion.li>
        <motion.li
          initial="offscreen"
          whileInView="onscreen"
          variants={postComponent}
          viewport={viewportSettings}
        >
          <a
            href="https://www.linkedin.com/in/coner-murphy/"
            className="font-semibold underline"
          >
            LinkedIn
          </a>
        </motion.li>
      </ul>
      <motion.h2
        initial="offscreen"
        whileInView="onscreen"
        variants={postComponent}
        viewport={viewportSettings}
        className="group relative font-semibold text-2xl md:text-32 mb-2 mt-6 md:mt-16 scroll-mt-28 capitalize"
        id={getHeadingLink('Questions')}
      >
        <Link top="top-3" />
        <a
          href={`#${getHeadingLink('Questions')}`}
          onClick={() => copyToClipboard(window?.location?.href)}
        >
          Questions
        </a>
      </motion.h2>
      <motion.p
        initial="offscreen"
        whileInView="onscreen"
        variants={postComponent}
        viewport={viewportSettings}
        className="text-sm md:text-base mb-6 opacity-100"
      >
        If you have a question you&apos;d like me to ask me then I&apos;d ask
        you to consider publically tweeting me it so others may be able to learn
        from it. However, I understand not all questions are suitable for the
        public domain in which case you can email me at{' '}
        <a
          href="mailto:hey@conermurphy.com"
          className="font-semibold underline"
        >
          hey@conermurphy.com
        </a>
      </motion.p>
    </>
  );
}
