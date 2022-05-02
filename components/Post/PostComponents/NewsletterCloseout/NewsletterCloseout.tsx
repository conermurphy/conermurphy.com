import React from 'react';

export default function NewsletterCloseout() {
  return (
    <>
      <h2 className="font-semibold text-2xl md:text-32 mb-1.5 mt-6 md:mt-16 scroll-mt-20">
        Enjoyed This Newsletter?
      </h2>
      <p className="text-sm md:text-base mb-6 opacity-100 text-[rgba(17,24,39,0.75)]">
        If you have enjoyed this edition and want to see more of my content
        please consider checking out my various socials below:
      </p>
      <ul className="mb-6 md:mb-8 opacity-75 list-disc pl-4 text-sm md:text-base">
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
      <h2 className="font-semibold text-2xl md:text-32 mb-1.5 mt-6 md:mt-16 scroll-mt-20">
        Questions
      </h2>
      <p className="text-sm md:text-base mb-6 opacity-100 text-[rgba(17,24,39,0.75)]">
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
