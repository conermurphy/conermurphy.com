import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
} from 'react-share';
import { motion } from 'framer-motion';
import { ICONS } from '../../../constants';
import { PostHeading } from '../../../types';
import { copyToClipboard, getIcon } from '../../../utils';
import Newsletter from '../../Newsletter/Newsleter';

interface IProps {
  headings: PostHeading[];
  title: string;
}

function getHeadingClasses(level: number): string {
  switch (level) {
    case 2:
      return 'font-semibold';
    case 3:
      return 'ml-1.5';
    case 4:
      return 'ml-3';
    case 5:
      return 'ml-[18px]';
    case 6:
      return 'ml-6';
    default:
      return '';
  }
}

export default function PostSidebar({ headings, title }: IProps): JSX.Element {
  const [isCopied, setIsCopied] = useState(false);
  const { asPath } = useRouter();

  const url = `https://conermurphy.com${asPath}`;

  const sectionClasses =
    'border-t border-primaryBorder dark:border-primaryBorderDark py-6';
  const shareIconClasses =
    'flex items-center justify-center border border-primaryBorder dark:border-primaryBorderDark p-2 rounded opacity-50 w-10 h-10';

  return (
    <aside className="hidden lg:block sticky h-min top-16 max-w-[272px] lg:max-w-[300px]">
      <div className="pb-6">
        <h2 className="text-lg text-accent mb-1.5">In this article</h2>
        <ul>
          {headings.map(({ text, link, level }) => {
            return (
              <li key={link}>
                <a
                  href={link}
                  className={`opacity-75 text-sm ${getHeadingClasses(level)}`}
                >
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={sectionClasses}>
        <Newsletter forceMobile />
      </div>
      <ul className={`flex flex-row gap-x-4 ${sectionClasses}`}>
        <motion.li whileTap={{ scale: 0.8 }}>
          <button
            type="button"
            className={shareIconClasses}
            onClick={async () => {
              await copyToClipboard(window?.location?.href);

              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 1500);
            }}
          >
            {isCopied
              ? getIcon({ icon: ICONS.TICK.name })
              : getIcon({ icon: ICONS.COPY.name })}
          </button>
        </motion.li>
        <motion.li whileTap={{ scale: 0.8 }} className={shareIconClasses}>
          <TwitterShareButton url={url} title={title} via="MrConerMurphy">
            {getIcon({ icon: ICONS.TWITTER.name, size: '20px' })}
          </TwitterShareButton>
        </motion.li>
        <motion.li whileTap={{ scale: 0.8 }} className={shareIconClasses}>
          <FacebookShareButton url={url}>
            {getIcon({ icon: ICONS.FACEBOOK.name, size: '20px' })}
          </FacebookShareButton>
        </motion.li>
        <motion.li whileTap={{ scale: 0.8 }} className={shareIconClasses}>
          <LinkedinShareButton url={url}>
            {getIcon({ icon: ICONS.LINKEDIN.name, size: '20px' })}
          </LinkedinShareButton>
        </motion.li>
        <motion.li whileTap={{ scale: 0.8 }} className={shareIconClasses}>
          <RedditShareButton url={url}>
            {getIcon({ icon: ICONS.REDDIT.name, size: '20px' })}
          </RedditShareButton>
        </motion.li>
      </ul>
    </aside>
  );
}
