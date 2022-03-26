import React from 'react';
import { PostTags } from '../../../types';

interface IProps {
  tags: string[];
}

// Possible issue with TailwindCSS where styles aren't included in the final bundle if they are kept in an external file so keeping them here for the styles to work. https://github.com/tailwindlabs/tailwindcss/discussions/7956
const POST_TAGS: PostTags = {
  JAVASCRIPT: {
    tagName: 'JavaScript',
    colors: {
      nonActive: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        border: 'border-yellow-700',
      },
      active: {
        bg: 'bg-yellow-700',
        text: 'text-yellow-100',
      },
    },
  },
  TYPESCRIPT: {
    tagName: 'TypeScript',
    colors: {
      nonActive: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-700',
      },
      active: {
        bg: 'bg-blue-700',
        text: 'text-blue-100',
      },
    },
  },
};

function Tag({ tag }: { tag: string }): JSX.Element {
  const {
    tagName,
    colors: {
      nonActive: { bg, text, border },
    },
  } = POST_TAGS[tag];

  return (
    <p
      key={tag}
      className={`text-xs px-3 py-1 ${bg} ${text} ${border} border font-semibold w-max rounded`}
    >
      {tagName}
    </p>
  );
}

export default function Tags({ tags }: IProps): JSX.Element {
  return (
    <div className="flex flex-row gap-x-3 gap-y-2">
      {tags.map((tag) => {
        return <Tag key={tag} tag={tag} />;
      })}
    </div>
  );
}
