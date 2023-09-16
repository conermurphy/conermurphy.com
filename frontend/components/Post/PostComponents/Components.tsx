import { ReactElement } from 'react';
import { Code } from './Code/Code';
import { BlockQuoteAuthor } from './BlockQuoteAuthor/BlockQuoteAuthor';
import { ImageCaption } from './ImageCaption/ImageCaption';
import Tweet from './Tweet/Tweet';
import { PostHeading } from '../../../types';
import { H2 } from './BaseComponents/H2';

export interface IProps {
  children: string | ReactElement | (string | ReactElement)[];
  href?: string;
}

interface ImageProps {
  src: string;
  alt?: string;
}

export const components = (
  headings: (PostHeading & { ref: React.RefObject<HTMLHeadingElement> })[]
) => ({
  h2: ({ children }: IProps): JSX.Element => (
    <H2 headings={headings}>{children}</H2>
  ),
  // h3: ({ children }: IProps): JSX.Element => (
  //   <motion.h3
  //     id={getHeadingLink(children)}
  //     initial="offscreen"
  //     whileInView="onscreen"
  //     variants={postComponent}
  //     viewport={viewportSettings}
  //     className="group relative font-extrabold text-heading text-xl md:text-2xl mb-2.5 mt-6 md:mt-16 scroll-mt-28"
  //     ref={getHeadingRef(headings, children)}
  //   >
  //     <Link top="top-2" />
  //     <a
  //       href={`#${getHeadingLink(children)}`}
  //       onClick={() => copyToClipboard(window?.location?.href)}
  //     >
  //       {children}
  //     </a>
  //   </motion.h3>
  // ),
  // h4: ({ children }: IProps): JSX.Element => (
  //   <motion.h4
  //     id={getHeadingLink(children)}
  //     initial="offscreen"
  //     whileInView="onscreen"
  //     variants={postComponent}
  //     viewport={viewportSettings}
  //     className="group relative font-extrabold text-heading text-lg md:text-xl mb-2 mt-6 md:mt-16 scroll-mt-28"
  //     ref={getHeadingRef(headings, children)}
  //   >
  //     <Link top="top-1.5" size="18px" />
  //     <a
  //       href={`#${getHeadingLink(children)}`}
  //       onClick={() => copyToClipboard(window?.location?.href)}
  //     >
  //       {children}
  //     </a>
  //   </motion.h4>
  // ),
  // h5: ({ children }: IProps): JSX.Element => (
  //   <motion.h5
  //     id={getHeadingLink(children)}
  //     initial="offscreen"
  //     whileInView="onscreen"
  //     variants={postComponent}
  //     viewport={viewportSettings}
  //     className="group relative font-extrabold text-heading text-base md:text-lg mb-2 mt-6 md:mt-16 scroll-mt-28"
  //     ref={getHeadingRef(headings, children)}
  //   >
  //     <Link size="18px" />
  //     <a
  //       href={`#${getHeadingLink(children)}`}
  //       onClick={() => copyToClipboard(window?.location?.href)}
  //     >
  //       {children}
  //     </a>
  //   </motion.h5>
  // ),
  // h6: ({ children }: IProps): JSX.Element => (
  //   <motion.h6
  //     id={getHeadingLink(children)}
  //     initial="offscreen"
  //     whileInView="onscreen"
  //     variants={postComponent}
  //     viewport={viewportSettings}
  //     className="group relative font-extrabold text-heading text-sm md:text-base mb-2 mt-6 md:mt-16 scroll-mt-28"
  //     ref={getHeadingRef(headings, children)}
  //   >
  //     <Link size="16px" />
  //     <a
  //       href={`#${getHeadingLink(children)}`}
  //       onClick={() => copyToClipboard(window?.location?.href)}
  //     >
  //       {children}
  //     </a>
  //   </motion.h6>
  // ),
  // p: ({ children }: IProps): JSX.Element => (
  //   <motion.p
  //     className="text-md md:text-base mb-8 leading-relaxed md:leading-loose"
  //     initial="offscreen"
  //     whileInView="onscreen"
  //     variants={postComponent}
  //     viewport={viewportSettings}
  //   >
  //     {children}
  //   </motion.p>
  // ),
  // hr: (): JSX.Element => (
  //   <motion.hr
  //     className="mb-6"
  //     initial="offscreen"
  //     whileInView="onscreen"
  //     variants={postComponent}
  //     viewport={viewportSettings}
  //   />
  // ),
  // code: ({ children }: IProps): JSX.Element => (
  //   <motion.code
  //     className="p-1 font-extrabold text-heading"
  //     initial="offscreen"
  //     whileInView="onscreen"
  //     variants={postComponent}
  //     viewport={viewportSettings}
  //   >
  //     `{children}`
  //   </motion.code>
  // ),
  // blockquote: ({ children }: IProps): JSX.Element => (
  //   <blockquote className="flex flex-col gap-3 italic border-l-[3px] border-accent pl-7 py-6 mb-6 md:mb-8 text-sm md:text-base">
  //     {children}
  //   </blockquote>
  // ),
  // a: ({ children, href }: IProps): JSX.Element => (
  //   <motion.a
  //     href={href}
  //     target="_blank"
  //     rel="noopener noreferrer"
  //     initial="offscreen"
  //     whileInView="onscreen"
  //     variants={postComponent}
  //     viewport={viewportSettings}
  //     className="font-extrabold text-heading underline"
  //   >
  //     {children}
  //   </motion.a>
  // ),
  // ul: ({ children }: IProps): JSX.Element => (
  //   <motion.ul
  //     className="mb-8 list-disc pl-4 text-md md:text-base leading-relaxed md:leading-loose"
  //     initial="offscreen"
  //     whileInView="onscreen"
  //     variants={postComponent}
  //     viewport={viewportSettings}
  //   >
  //     {children}
  //   </motion.ul>
  // ),
  // ol: ({ children }: IProps): JSX.Element => (
  //   <motion.ol
  //     className="mb-6 md:mb-8 list-decimal pl-4 text-md md:text-base leading-relaxed md:leading-loose"
  //     initial="offscreen"
  //     whileInView="onscreen"
  //     variants={postComponent}
  //     viewport={viewportSettings}
  //   >
  //     {children}
  //   </motion.ol>
  // ),
  // img: ({ src, alt }: ImageProps): JSX.Element => (
  //   <p className="relative w-full h-64 sm:h-96">
  //     <Img src={src} alt={alt || ''} fill className="rounded-lg" />
  //   </p>
  // ),
  // table: ({ children }: IProps): JSX.Element => (
  //   <motion.table
  //     className="table-auto my-6 md:my-8 w-full"
  //     initial="offscreen"
  //     whileInView="onscreen"
  //     variants={postComponent}
  //     viewport={viewportSettings}
  //   >
  //     {children}
  //   </motion.table>
  // ),
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
