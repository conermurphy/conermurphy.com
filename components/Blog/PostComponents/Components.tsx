import { ReactNode } from 'react';
import Img from 'next/image';
import Code from './Code/Code';
import BlockQuoteAuthor from './BlockQuoteAuthor/BlockQuoteAuthor';
import ImageCaption from './ImageCaption/ImageCaption';

interface IProps {
  children?: ReactNode;
  href?: string;
}

interface ImageProps {
  src: string;
  alt?: string;
}

function copyToClip() {
  navigator.clipboard.writeText(window?.location?.href);
}

function idLinkCreator(children: ReactNode): string {
  return typeof children === 'string'
    ? children
        // Regex to remove all punctionation from the original string
        .replaceAll(/['!"#$%&\\'()\\*+,\-\\.\\/:;<=>?@\\[\\\]\\^_`{|}~']/g, '')
        // Convert any spaces to '-'
        .replaceAll(' ', '-')
        // Replace any '--' to a '-'
        .replaceAll(/(--)/g, '-')
        // Make it all lower case
        .toLowerCase()
    : '#';
}

const components = {
  h2: ({ children }: IProps): JSX.Element => {
    return (
      <h2
        id={idLinkCreator(children)}
        className="font-semibold text-2xl md:text-32 mb-1.5 mt-6 md:mt-8"
      >
        <a
          href={`#${idLinkCreator(children)}`}
          onClick={() => {
            return copyToClip();
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
        id={idLinkCreator(children)}
        className="font-semibold text-xl md:text-2xl mb-1.5.5 mt-6 md:mt-8"
      >
        <a
          href={`#${idLinkCreator(children)}`}
          onClick={() => {
            return copyToClip();
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
        id={idLinkCreator(children)}
        className="font-semibold text-lg md:text-xl mb-1.5 mt-6 md:mt-8"
      >
        <a
          href={`#${idLinkCreator(children)}`}
          onClick={() => {
            return copyToClip();
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
        id={idLinkCreator(children)}
        className="font-semibold text-base md:text-lg mb-1.5 mt-6 md:mt-8"
      >
        <a
          href={`#${idLinkCreator(children)}`}
          onClick={() => {
            return copyToClip();
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
        id={idLinkCreator(children)}
        className="font-semibold text-sm md:text-base mb-1.5 mt-6 md:mt-8"
      >
        <a
          href={`#${idLinkCreator(children)}`}
          onClick={() => {
            return copyToClip();
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
      <code className="bg-[#1f4662] text-[#f8f8f2] opacity-100 p-1">
        {children}
      </code>
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
        width="800"
        height="450"
        className="rounded-xl drop-shadow-[0px_0px_4px_rgba(0,0,0,0.25)]"
      />
    );
  },
  pre: Code,
  BlockQuoteAuthor,
  ImageCaption,
};

export default components;
