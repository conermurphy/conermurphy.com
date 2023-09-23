import Img from 'next/image';
import { ReactElement } from 'react';
import Code from './Code/Code';
import BlockQuoteAuthor from './BlockQuoteAuthor/BlockQuoteAuthor';
import ImageCaption from './ImageCaption/ImageCaption';
import Tweet from './Tweet/Tweet';
import { getHeadingLink } from '../../../utils/posts';
import { copyToClipboard, getIcon } from '../../../utils';
import { PostHeading } from '../../../types';
import { ICONS } from '../../../constants';

interface IProps {
  children: string | ReactElement | (string | ReactElement)[];
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

function getHeadingContent(children: IProps['children']) {
  if (typeof children === 'string') {
    return children;
  }

  if (Array.isArray(children)) {
    return children[0];
  }

  const childProps = children?.props as { children: string };

  return getHeadingLink(childProps?.children);
}

function getHeadingRef(headings: PostHeading[], children: IProps['children']) {
  return headings.find((heading) => {
    if (typeof children === 'string') {
      return heading.text === getHeadingContent(children);
    }

    return getHeadingLink(heading.text) === getHeadingContent(children);
  })?.ref;
}

const components = (
  headings: (PostHeading & { ref: React.RefObject<HTMLHeadingElement> })[]
) => ({
  h2: ({ children }: IProps): JSX.Element => (
    <h2
      id={getHeadingLink(children)}
      className="group relative font-extrabold text-heading text-2xl md:text-32 mb-2 mt-6 md:mt-16 scroll-mt-28"
      ref={getHeadingRef(headings, children)}
    >
      <Link top="top-2" />
      <a
        href={`#${getHeadingLink(children)}`}
        onClick={() => copyToClipboard(window?.location?.href)}
      >
        {children}
      </a>
    </h2>
  ),
  h3: ({ children }: IProps): JSX.Element => (
    <h3
      id={getHeadingLink(children)}
      className="group relative font-extrabold text-heading text-xl md:text-2xl mb-2.5 mt-6 md:mt-16 scroll-mt-28"
      ref={getHeadingRef(headings, children)}
    >
      <Link top="top-2" />
      <a
        href={`#${getHeadingLink(children)}`}
        onClick={() => copyToClipboard(window?.location?.href)}
      >
        {children}
      </a>
    </h3>
  ),
  h4: ({ children }: IProps): JSX.Element => (
    <h4
      id={getHeadingLink(children)}
      className="group relative font-extrabold text-heading text-lg md:text-xl mb-2 mt-6 md:mt-16 scroll-mt-28"
      ref={getHeadingRef(headings, children)}
    >
      <Link top="top-1.5" size="18px" />
      <a
        href={`#${getHeadingLink(children)}`}
        onClick={() => copyToClipboard(window?.location?.href)}
      >
        {children}
      </a>
    </h4>
  ),
  h5: ({ children }: IProps): JSX.Element => (
    <h5
      id={getHeadingLink(children)}
      className="group relative font-extrabold text-heading text-base md:text-lg mb-2 mt-6 md:mt-16 scroll-mt-28"
      ref={getHeadingRef(headings, children)}
    >
      <Link size="18px" />
      <a
        href={`#${getHeadingLink(children)}`}
        onClick={() => copyToClipboard(window?.location?.href)}
      >
        {children}
      </a>
    </h5>
  ),
  h6: ({ children }: IProps): JSX.Element => (
    <h6
      id={getHeadingLink(children)}
      className="group relative font-extrabold text-heading text-sm md:text-base mb-2 mt-6 md:mt-16 scroll-mt-28"
      ref={getHeadingRef(headings, children)}
    >
      <Link size="16px" />
      <a
        href={`#${getHeadingLink(children)}`}
        onClick={() => copyToClipboard(window?.location?.href)}
      >
        {children}
      </a>
    </h6>
  ),
  p: ({ children }: IProps): JSX.Element => (
    <p className="text-md md:text-base mb-8 leading-relaxed md:leading-loose">
      {children}
    </p>
  ),
  hr: (): JSX.Element => <hr className="mb-6" />,
  code: ({ children }: IProps): JSX.Element => (
    <code className="p-1 font-extrabold text-heading">`{children}`</code>
  ),
  blockquote: ({ children }: IProps): JSX.Element => (
    <blockquote className="flex flex-col gap-3 italic border-l-[3px] border-accent pl-7 py-6 mb-6 md:mb-8 text-sm md:text-base">
      {children}
    </blockquote>
  ),
  a: ({ children, href }: IProps): JSX.Element => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-extrabold text-heading underline"
    >
      {children}
    </a>
  ),
  ul: ({ children }: IProps): JSX.Element => (
    <ul className="mb-8 list-disc pl-4 text-md md:text-base leading-relaxed md:leading-loose">
      {children}
    </ul>
  ),
  ol: ({ children }: IProps): JSX.Element => (
    <ol className="mb-6 md:mb-8 list-decimal pl-4 text-md md:text-base leading-relaxed md:leading-loose">
      {children}
    </ol>
  ),
  img: ({ src, alt }: ImageProps): JSX.Element => (
    <p className="relative w-full h-64 sm:h-96">
      <Img src={src} alt={alt || ''} fill className="rounded-lg" />
    </p>
  ),
  table: ({ children }: IProps): JSX.Element => (
    <table className="table-auto my-6 md:my-8 w-full">{children}</table>
  ),
  thead: ({ children }: IProps): JSX.Element => (
    <thead className="border-b-2">{children}</thead>
  ),
  tr: ({ children }: IProps): JSX.Element => <tr className="">{children}</tr>,
  th: ({ children }: IProps): JSX.Element => (
    <th className="pb-3 pl-2 text-left">{children}</th>
  ),
  td: ({ children }: IProps): JSX.Element => (
    <td className="py-3 pl-2 text-left border-b border-r last:border-r-0">
      {children}
    </td>
  ),
  pre: Code,
  BlockQuoteAuthor,
  ImageCaption,
  Tweet,
});

export default components;
