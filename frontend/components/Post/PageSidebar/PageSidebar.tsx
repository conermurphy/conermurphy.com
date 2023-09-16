'use client';

import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TOPICS } from '../../../constants';
import { linkBuilder } from '../../../utils/posts';

interface IProps {
  data: string[];
}

interface CategoryLinkProps {
  linkHref: string;
  activeItem: boolean;
  name: string;
  isClearButton?: boolean;
}

function CategoryLink({
  linkHref,
  activeItem,
  name,
  isClearButton = false,
}: CategoryLinkProps): JSX.Element {
  const genericClasses =
    'font-heading font-extrabold py-2 px-3 w-max rounded-md ease-in-out transition-all duration-150 text-text/70';

  const linkClasses = !isClearButton
    ? `${genericClasses} ${
        activeItem ? 'bg-brand' : 'hover:bg-brand bg-transparent'
      }`
    : `${genericClasses} border-2 border-brand hover:bg-brand`;

  return (
    <Link href={linkHref} className={linkClasses}>
      {name}
    </Link>
  );
}

export default function PageSidebar({ data }: IProps) {
  const { pathname } = useRouter();
  const searchParams = useSearchParams();

  if (!data.length) return null;

  return (
    <aside className="flex flex-row items-center justify-center flex-wrap gap-x-6 gap-y-4">
      <CategoryLink
        linkHref={pathname}
        activeItem={false}
        name="View All"
        isClearButton
      />
      {data.map((topic) => {
        const { name } = TOPICS[topic];

        const { activeItem, linkHref } = linkBuilder({
          pageQueries: searchParams,
          item: topic.toLowerCase(),
        });

        return (
          <CategoryLink
            key={linkHref}
            linkHref={linkHref}
            activeItem={activeItem}
            name={name}
          />
        );
      })}
    </aside>
  );
}
