import React from 'react';
import Img from 'next/image';
import { Tags } from '../..';
import { PostFrontMatter } from '../../../../types';

interface IProps {
  frontmatter: PostFrontMatter;
}

export default function PostHeader({ frontmatter }: IProps): JSX.Element {
  const { date, timeToRead, title, description, tags, image } = frontmatter;

  return (
    <header className="flex flex-col items-center bg-[linear-gradient(0deg,_#FFF_15%,_#111827_15%)] md:bg-[linear-gradient(0deg,_#FFF_25%,_#111827_25%)] pt-10 pb-8 md:py-72 px-6">
      <div className="max-w-full sm:max-w-[1200px] w-full pb-10 md:pb-12">
        <p className="text-xs md:text-base font-semiBold text-offWhite opacity-100 mb-1">
          {`Published on
              ${new Date(date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              | ${timeToRead} Minute Read`}
        </p>
        <h1 className="text-2xl md:text-40 text-offWhite mb-2 max-w-4xl">
          {title}
        </h1>
        <p className="text-base md:text-lg text-offWhite opacity-100 mb-3 max-w-2xl">
          {description}
        </p>
        <Tags tags={tags} />
      </div>
      <div className="relative max-w-full sm:max-w-[1200px]">
        <Img
          src={image}
          alt={title}
          height="675"
          width="1200"
          className="rounded-2xl"
        />
      </div>
    </header>
  );
}
