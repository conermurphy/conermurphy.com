import React from 'react';
import { motion } from 'framer-motion';
import { postComponent, viewportSettings } from '../../../../constants';

export default function NewsletterCloseout() {
  return (
    <>
      <motion.h2
        initial="offscreen"
        whileInView="onscreen"
        variants={postComponent}
        viewport={viewportSettings}
        className="font-semibold text-2xl md:text-32 mb-1.5 mt-6 md:mt-16 scroll-mt-20"
      >
        Enjoyed This Newsletter?
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
        className="font-semibold text-2xl md:text-32 mb-1.5 mt-6 md:mt-16 scroll-mt-20"
      >
        Questions
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
