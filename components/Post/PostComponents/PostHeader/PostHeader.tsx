import React from 'react';
import Img from 'next/image';
import { PostFrontMatter } from '../../../../types';

interface IProps {
  frontmatter: PostFrontMatter;
}

export default function PostHeader({ frontmatter }: IProps): JSX.Element {
  const { date, timeToRead, title, description, image } = frontmatter;

  return (
    <header className="flex flex-col items-center pb-0 lg:pb-3 bg-primaryBg dark:bg-primaryBgDark">
      <div className="max-w-full sm:max-w-6xl w-full px-4  lg:px-0 pb-4 md:pb-6 z-[1] pt-16">
        <p className="text-xs md:text-base font-semiBold text-primaryText/75 dark:text-primaryTextDark/75 mb-1">
          {`Published on
              ${new Date(date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              | ${timeToRead} Minute Read`}
        </p>
        <h1 className="text-2xl md:text-40 text-primaryText dark:text-primaryTextDark mb-2 max-w-4xl capitalize">
          {title}
        </h1>
        <p className="text-base md:text-lg text-primaryText dark:text-primaryTextDark opacity-75 max-w-2xl">
          {description}
        </p>
      </div>
      <div className="block max-w-6xl h-full w-full px-4 lg:px-0">
        <Img
          src={image}
          alt={title}
          layout="responsive"
          objectFit="contain"
          width={1100}
          height={619}
          className="rounded-xl z-[1]"
        />
      </div>
    </header>
  );
}
