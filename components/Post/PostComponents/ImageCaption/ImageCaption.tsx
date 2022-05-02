import React from 'react';
import Img from 'next/image';

interface IProps {
  src: string;
  alt?: string;
  caption?: string;
}

export default function ImageCaption({
  src,
  alt,
  caption,
}: IProps): JSX.Element {
  return (
    <figure className="my-6 md:my-8">
      <Img
        src={src}
        alt={alt}
        width={650}
        height={366}
        layout="responsive"
        objectFit="contain"
        className="rounded-xl drop-shadow-[0px_0px_4px_rgba(0,0,0,0.25)]"
      />
      {caption ? (
        <figcaption className="opacity-75 text-xs md:text-sm">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
