import Img from 'next/image';
import Code from './Code/Code';
import BlockQuoteAuthor from './BlockQuoteAuthor/BlockQuoteAuthor';
import ImageCaption from './ImageCaption/ImageCaption';
import Tweet from './Tweet/Tweet';
import { getHeadingLink } from '../../../utils/posts';
import { copyToClipboard } from '../../../utils';

interface IProps {
  children: string;
  href?: string;
}

interface ImageProps {
  src: string;
  alt?: string;
}

const components = {
  h2: ({ children }: IProps): JSX.Element => {
    return (
      <h2
        id={getHeadingLink(children)}
        className="font-semibold text-2xl md:text-32 mb-1.5 mt-6 md:mt-16 scroll-mt-20"
      >
        <a
          href={`#${getHeadingLink(children)}`}
          onClick={() => {
            return copyToClipboard(window?.location?.href);
          }}
        >
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ children }: IProps): JSX.Element => {
    return (
      <h3
        id={getHeadingLink(children)}
        className="font-semibold text-xl md:text-2xl mb-1.5.5 mt-6 md:mt-16 scroll-mt-20"
      >
        <a
          href={`#${getHeadingLink(children)}`}
          onClick={() => {
            return copyToClipboard(window?.location?.href);
          }}
        >
          {children}
        </a>
      </h3>
    );
  },
  h4: ({ children }: IProps): JSX.Element => {
    return (
      <h4
        id={getHeadingLink(children)}
        className="font-semibold text-lg md:text-xl mb-1.5 mt-6 md:mt-16 scroll-mt-20"
      >
        <a
          href={`#${getHeadingLink(children)}`}
          onClick={() => {
            return copyToClipboard(window?.location?.href);
          }}
        >
          {children}
        </a>
      </h4>
    );
  },
  h5: ({ children }: IProps): JSX.Element => {
    return (
      <h5
        id={getHeadingLink(children)}
        className="font-semibold text-base md:text-lg mb-1.5 mt-6 md:mt-16 scroll-mt-20"
      >
        <a
          href={`#${getHeadingLink(children)}`}
          onClick={() => {
            return copyToClipboard(window?.location?.href);
          }}
        >
          {children}
        </a>
      </h5>
    );
  },
  h6: ({ children }: IProps): JSX.Element => {
    return (
      <h6
        id={getHeadingLink(children)}
        className="font-semibold text-sm md:text-base mb-1.5 mt-6 md:mt-16 scroll-mt-20"
      >
        <a
          href={`#${getHeadingLink(children)}`}
          onClick={() => {
            return copyToClipboard(window?.location?.href);
          }}
        >
          {children}
        </a>
      </h6>
    );
  },
  p: ({ children }: IProps): JSX.Element => {
    return (
      <p className="text-sm md:text-base mb-6 opacity-100 text-[rgba(17,24,39,0.75)]">
        {children}
      </p>
    );
  },
  code: ({ children }: IProps): JSX.Element => {
    return (
      <code className=" opacity-100 p-1 font-extrabold">`{children}`</code>
    );
  },
  blockquote: ({ children }: IProps): JSX.Element => {
    return (
      <blockquote className="flex flex-col gap-3 italic border-l-[3px] border-accent pl-7 py-6 mb-6 md:mb-8 text-sm md:text-base">
        {children}
      </blockquote>
    );
  },
  a: ({ children, href }: IProps): JSX.Element => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold underline"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }: IProps): JSX.Element => {
    return (
      <ul className="mb-6 md:mb-8 opacity-75 list-disc pl-4 text-sm md:text-base">
        {children}
      </ul>
    );
  },
  ol: ({ children }: IProps): JSX.Element => {
    return (
      <ol className="mb-6 md:mb-8 opacity-75 list-decimal pl-4 text-sm md:text-base">
        {children}
      </ol>
    );
  },
  img: ({ src, alt }: ImageProps): JSX.Element => {
    return (
      <Img
        src={src}
        alt={alt}
        width={650}
        height={366}
        layout="responsive"
        objectFit="contain"
        className="rounded-xl"
      />
    );
  },
  pre: Code,
  BlockQuoteAuthor,
  ImageCaption,
  Tweet,
};

export default components;
