import Img from 'next/image';
import Code from './Code/Code';
import BlockQuoteAuthor from './BlockQuoteAuthor/BlockQuoteAuthor';
import ImageCaption from './ImageCaption/ImageCaption';
import Tweet from './Tweet/Tweet';
import { getHeadingLink } from '../../../utils/posts';
import { copyToClipboard, getIcon } from '../../../utils';
import { ICONS } from '../../../constants';

interface IProps {
  children: string;
  href?: string;
}

interface ImageProps {
  src: string;
  alt?: string;
}

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

const components = {
  h2: ({ children }: IProps): JSX.Element => {
    return (
      <h2
        id={getHeadingLink(children)}
        className="group relative font-semibold text-2xl md:text-32 mb-2 mt-6 md:mt-16 scroll-mt-20"
      >
        <Link top="top-3" />
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
        className="group relative font-semibold text-xl md:text-2xl mb-2.5 mt-6 md:mt-16 scroll-mt-20"
      >
        <Link top="top-2" />
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
        className="group relative font-semibold text-lg md:text-xl mb-2 mt-6 md:mt-16 scroll-mt-20"
      >
        <Link top="top-1.5" size="18px" />
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
        className="group relative font-semibold text-base md:text-lg mb-2 mt-6 md:mt-16 scroll-mt-20"
      >
        <Link size="18px" />
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
        className="group relative font-semibold text-sm md:text-base mb-2 mt-6 md:mt-16 scroll-mt-20"
      >
        <Link size="16px" />
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
      <p className="text-sm md:text-base mb-6 opacity-100 text-primaryTextDimmed dark:text-primaryTextDimmedDark">
        {children}
      </p>
    );
  },
  hr: (): JSX.Element => {
    return (
      <hr className="mb-6 text-primaryTextDimmed dark:text-primaryTextDimmedDark" />
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
      <ul className="mb-6 md:mb-8 list-disc pl-4 text-sm md:text-base text-primaryTextDimmed dark:text-primaryTextDimmedDark">
        {children}
      </ul>
    );
  },
  ol: ({ children }: IProps): JSX.Element => {
    return (
      <ol className="mb-6 md:mb-8 list-decimal pl-4 text-sm md:text-base text-primaryTextDimmed dark:text-primaryTextDimmedDark">
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
