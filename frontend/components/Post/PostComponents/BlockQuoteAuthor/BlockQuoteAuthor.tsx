import React from 'react';

interface IProps {
  quote: string;
  caption: string;
  cite?: {
    url: string;
    text: string;
  };
}

export function BlockQuoteAuthor({
  quote,
  caption,
  cite,
}: IProps): JSX.Element {
  return (
    <figure className="pl-7 py-6 my-6 md:my-8 border-l-[3px] border-accent text-sm md:text-base">
      <blockquote cite={cite?.url} className="italic">
        &quot;{quote}&quot;
      </blockquote>
      <figcaption className="opacity-75 mt-4">
        {caption}
        {cite?.text ? <cite>, {cite?.text}</cite> : null}
      </figcaption>
    </figure>
  );
}
