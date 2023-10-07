import React from 'react';
import { ICONS } from '../../../../constants';
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
      <h2
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
      </h2>
      <p className="text-md md:text-base mb-6 leading-relaxed">
        If you have enjoyed this edition and want to see more of my content
        please consider checking out my various socials below:
      </p>
      <ul className="mb-6 md:mb-8 list-disc pl-4 text-md md:text-base leading-relaxed">
        <li>
          <a
            href="https://twitter.com/MrConerMurphy/"
            className="font-semibold underline"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UCKbxBnz1xuyGAPMCOZQRdVw"
            className="font-semibold underline"
          >
            YouTube
          </a>
        </li>
        <li>
          <a
            href="https://www.twitch.tv/conermurphy"
            className="font-semibold underline"
          >
            Twitch
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/coner-murphy/"
            className="font-semibold underline"
          >
            LinkedIn
          </a>
        </li>
      </ul>
      <h2
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
      </h2>
      <p className="text-md md:text-base mb-6 leading-relaxed">
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
      </p>
    </>
  );
}
