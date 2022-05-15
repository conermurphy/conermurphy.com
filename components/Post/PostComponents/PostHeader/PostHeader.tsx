import React from 'react';
import Img from 'next/image';
import { PostFrontMatter } from '../../../../types';
import { HeaderBackground } from '../../../Header/components';
import { Tags } from '../..';

interface IProps {
  frontmatter: PostFrontMatter;
}

export default function PostHeader({ frontmatter }: IProps): JSX.Element {
  const { date, timeToRead, title, description, tags, image } = frontmatter;

  return (
    <header className="flex flex-col items-center -mt-16 pb-0 lg:pb-3 bg-primaryBg dark:bg-primaryBgDark">
      <HeaderBackground bg="bg-primaryBg dark:bg-primaryBgDark" />
      <div className="max-w-full sm:max-w-[1100px] w-full px-4 pb-4 md:pb-10 z-[1] pt-10 md:pt-72">
        <p className="text-xs md:text-base font-semiBold text-primaryText dark:text-primaryTextDark opacity-75 mb-1">
          {`Published on
              ${new Date(date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              | ${timeToRead} Minute Read`}
        </p>
        <h1 className="text-2xl md:text-40 text-primaryText dark:text-primaryTextDark mb-2 max-w-4xl">
          {title}
        </h1>
        <p className="text-base md:text-lg text-primaryText dark:text-primaryTextDark opacity-75 mb-3 max-w-2xl">
          {description}
        </p>
        <Tags tags={tags} />
      </div>
      <div className="block max-w-[1100px] h-full w-full px-4">
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
