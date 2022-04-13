import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { PostTags } from '../../../types';

interface IProps {
  tags: string[];
}

// Possible issue with TailwindCSS where styles aren't included in the final bundle if they are kept in an external file so keeping them here for the styles to work. https://github.com/tailwindlabs/tailwindcss/discussions/7956
export const POST_TAGS: PostTags = {
  JAVASCRIPT: {
    name: 'JavaScript',
    link: 'javascript',
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
    name: 'TypeScript',
    link: 'typescript',
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
  GATSBYJS: {
    name: 'GatsbyJS',
    link: 'gatsbyjs',
    colors: {
      nonActive: {
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        border: 'border-purple-700',
      },
      active: {
        bg: 'bg-purple-700',
        text: 'text-purple-100',
      },
    },
  },
  NODEJS: {
    name: 'NodeJS',
    link: 'nodejs',
    colors: {
      nonActive: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        border: 'border-green-700',
      },
      active: {
        bg: 'bg-green-700',
        text: 'text-green-100',
      },
    },
  },
  CSS: {
    name: 'CSS',
    link: 'css',
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
  DESIGN: {
    name: 'Design',
    link: 'design',
    colors: {
      nonActive: {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        border: 'border-gray-700',
      },
      active: {
        bg: 'bg-gray-700',
        text: 'text-gray-100',
      },
    },
  },
  UI: {
    name: 'UI',
    link: 'ui',
    colors: {
      nonActive: {
        bg: 'bg-violet-100',
        text: 'text-violet-700',
        border: 'border-violet-700',
      },
      active: {
        bg: 'bg-violet-700',
        text: 'text-violet-100',
      },
    },
  },
};

function Tag({ tag }: { tag: string }): JSX.Element | null {
  const { asPath } = useRouter();

  if (!tag) return null;
  let linkHref = '';

  const baseRoute = asPath.split('/').slice(0, 2).join('/');

  const {
    name,
    link,
    colors: {
      active: { bg: activeBg, text: activeText },
      nonActive: { bg, text, border },
    },
  } = POST_TAGS[tag.toUpperCase()];

  const tagActive = asPath?.includes(link);

  if (tagActive) {
    linkHref = baseRoute;
  } else {
    linkHref = `${baseRoute}/${link}`;
  }

  return (
    <Link key={tag} href={linkHref}>
      <a
        className={`text-xs px-3 py-1 ${
          tagActive ? `${activeBg} ${activeText}` : `${bg} ${text}`
        } ${border} border font-semibold w-max rounded opacity-100`}
      >
        {name}
      </a>
    </Link>
  );
}

export default function Tags({ tags }: IProps): JSX.Element {
  return (
    <div className="flex flex-row flex-wrap gap-x-3 gap-y-2">
      {tags.map((tag) => {
        return <Tag key={tag} tag={tag} />;
      })}
    </div>
  );
}
