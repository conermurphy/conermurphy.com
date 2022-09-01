import React from 'react';
import Img from 'next/image';
import { PostFrontMatter } from '../../../../types';

interface IProps {
  frontmatter: PostFrontMatter;
}

export default function PostHeader({ frontmatter }: IProps): JSX.Element {
  const { date, timeToRead, title, description, image, imageLink } =
    frontmatter;

  return (
    <header className="flex flex-col items-center pb-0 lg:pb-3 ">
      <div className="max-w-full sm:max-w-6xl w-full pb-4 z-[1] pt-8 md:pt-16">
        <p className="text-xs md:text-base font-semiBold text-primaryText/75 dark:text-primaryTextDark/75 mb-1">
          {`Published on
              ${new Date(date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              | ${timeToRead} Minute Read`}
        </p>
        <h1 className="text-2xl md:text-4xl mb-2 max-w-4xl capitalize">
          {title}
        </h1>
        <p className="text-base md:text-lg opacity-75 max-w-2xl">
          {description}
        </p>
      </div>
      <figure className="block max-w-6xl h-full w-full">
        {imageLink ? (
          <figcaption className="text-sm md:text-base mb-3 pt-2 opacity-75 w-max">
            Photo from{' '}
            <a
              href={imageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-accent"
            >
              Unsplash
            </a>
          </figcaption>
        ) : null}
        <Img
          src={image}
          alt={title}
          layout="responsive"
          objectFit="contain"
          width={1100}
          height={619}
          className="rounded-md z-[1]"
        />
      </figure>
    </header>
  );
}
