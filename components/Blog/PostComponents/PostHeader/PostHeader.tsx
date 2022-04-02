import React from 'react';
import Img from 'next/image';
import { Tags } from '../..';
import { PostFrontMatter } from '../../../../types';
import { HeaderBackground } from '../../../Header/components';

interface IProps {
  frontmatter: PostFrontMatter;
}

export default function PostHeader({ frontmatter }: IProps): JSX.Element {
  const { date, timeToRead, title, description, tags, image } = frontmatter;

  return (
    <header className="flex flex-col items-center -mt-16 pb-0 lg:pb-3 mx-4 bg-primaryBg">
      <HeaderBackground bg="bg-primaryBg" />
      <div className="max-w-full sm:max-w-[1100px] w-full mx-4 pb-10 md:pb-12 z-[1] pt-10 md:pt-72">
        <p className="text-xs md:text-base font-semiBold text-primaryText opacity-100 mb-1">
          {`Published on
              ${new Date(date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              | ${timeToRead} Minute Read`}
        </p>
        <h1 className="text-2xl md:text-40 text-primaryText mb-2 max-w-4xl">
          {title}
        </h1>
        <p className="text-base md:text-lg text-primaryText opacity-100 mb-3 max-w-2xl">
          {description}
        </p>
        <Tags tags={tags} />
      </div>
      <Img
        src={image}
        alt={title}
        height="619"
        width="1100"
        className="rounded-2xl z-[1]"
      />
    </header>
  );
}
