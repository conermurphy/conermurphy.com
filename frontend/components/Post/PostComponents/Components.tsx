import { ReactElement } from 'react';
import { Code } from './Code/Code';
import { BlockQuoteAuthor } from './BlockQuoteAuthor/BlockQuoteAuthor';
import { ImageCaption } from './ImageCaption/ImageCaption';
import Tweet from './Tweet/Tweet';
import { PostHeading } from '../../../types';
import { H2, H3, H4, H5, H6 } from './BaseComponents/Headings';
import { A, BlockQuote, InlineCode, P } from './BaseComponents/Typography';
import { HR, IMG, OL, UL } from './BaseComponents/Misc';

export interface IProps {
  children: string | ReactElement | (string | ReactElement)[];
  href?: string;
}

export interface ImageProps {
  src: string;
  alt?: string;
}

export const components = (
  headings: (PostHeading & { ref: React.RefObject<HTMLHeadingElement> })[]
) => ({
  h2: ({ children }: IProps): JSX.Element => (
    <H2 headings={headings}>{children}</H2>
  ),
  h3: ({ children }: IProps): JSX.Element => (
    <H3 headings={headings}>{children}</H3>
  ),
  h4: ({ children }: IProps): JSX.Element => (
    <H4 headings={headings}>{children}</H4>
  ),
  h5: ({ children }: IProps): JSX.Element => (
    <H5 headings={headings}>{children}</H5>
  ),
  h6: ({ children }: IProps): JSX.Element => (
    <H6 headings={headings}>{children}</H6>
  ),
  p: ({ children }: IProps): JSX.Element => <P>{children}</P>,
  a: ({ children, href }: IProps): JSX.Element => <A href={href}>{children}</A>,
  code: ({ children }: IProps): JSX.Element => (
    <InlineCode>{children}</InlineCode>
  ),
  blockquote: ({ children }: IProps): JSX.Element => (
    <BlockQuote>{children}</BlockQuote>
  ),
  hr: (): JSX.Element => <HR />,
  ul: ({ children }: IProps): JSX.Element => <UL>{children}</UL>,
  ol: ({ children }: IProps): JSX.Element => <OL>{children}</OL>,
  img: ({ src, alt }: ImageProps): JSX.Element => <IMG src={src} alt={alt} />,
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
