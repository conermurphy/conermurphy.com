'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
} from 'react-share';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ICONS } from '../../../constants';
import { PostHeading } from '../../../types';
import { copyToClipboard, getIcon } from '../../../utils';

interface IProps {
  headings: (PostHeading & { ref: React.RefObject<HTMLHeadingElement> })[];
  title: string;
}

function getHeadingClasses(level: number): string {
  switch (level) {
    case 2:
      return '';
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
  const [activeHeader, setActiveHeader] = useState<HTMLHeadingElement | null>(
    null
  );
  const [previousHeader, setPreviousHeader] =
    useState<HTMLHeadingElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(false);

  const pathname = usePathname();

  const url = `https://conermurphy.com${pathname}`;

  const shareIconClasses =
    'flex items-center justify-center p-2 rounded opacity-50 w-10 h-10 hover:opacity-100 transition-all ease-in-out duration-150';

  const headingRefs = headings.map((heading) => heading.ref);

  const handleScroll = useCallback(() => {
    const currentPosition = window.scrollY;

    setScrollingUp(currentPosition < scrollPosition);
    setScrollPosition(currentPosition);
  }, [scrollPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntryIndex = entries.findIndex(
          (entry) => entry.isIntersecting
        );
        const lastEntryIndex = entries.findLastIndex(
          (entry) => entry.isIntersecting
        );

        if (scrollingUp) {
          if (firstEntryIndex >= 0) {
            setActiveHeader(
              entries[firstEntryIndex].target as HTMLHeadingElement
            );
          }
        } else if (lastEntryIndex >= 0) {
          setActiveHeader(entries[lastEntryIndex].target as HTMLHeadingElement);
        }

        const activeEntryIndex = entries.findIndex(
          (entry) => entry.target.id === activeHeader?.id
        );
        const activeEntry = activeEntryIndex ? entries[activeEntryIndex] : null;

        if (activeEntry) {
          const previousEntry = entries[activeEntryIndex - 1];

          setPreviousHeader(previousEntry?.target as HTMLHeadingElement);
        }
      },
      {
        rootMargin: undefined, // adjust this to fit your needs
      }
    );

    headingRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current as Element);
      }
    });

    return () => {
      headingRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current as Element);
        }
      });
    };
  }, [headingRefs]);

  return (
    <aside className="hidden lg:flex flex-col gap-12 sticky h-min top-28 right-0 max-w-md xl:max-w-lg border-l-4 border-text/10 px-6 py-4">
      <div className="flex flex-col gap-8">
        <h2 className="text-lg text-text/50 uppercase">On This Page</h2>
        <ul className="flex flex-col gap-1">
          {headings.map(({ text, link, level }) => {
            const isHighlighted = scrollingUp
              ? previousHeader?.id === link.slice(1)
              : activeHeader?.id === link.slice(1);

            return (
              <li key={link}>
                <a
                  href={link}
                  className={`text-text/50 hover:text-text transition-all ease-in-out font-heading duration-150 ${getHeadingClasses(
                    level
                  )} ${isHighlighted ? 'font-extrabold' : ''}`}
                >
                  {text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="flex flex-row gap-x-4">
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
