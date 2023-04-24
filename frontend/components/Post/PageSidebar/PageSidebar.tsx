import { useRouter } from 'next/router';
import React from 'react';
import { TOPICS } from '../../../constants';
import { NoScrollLink } from '../..';
import { linkBuilder } from '../../../utils/posts';

interface IProps {
  data: string[];
  pageQueries?: { page: string; queries: string[] };
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
    'font-semibold text-sm p-3 w-max rounded-sm ease-in-out transition-all duration-150';

  const linkClasses = !isClearButton
    ? `${genericClasses} ${
        activeItem
          ? 'bg-accent/25'
          : ' hover:bg-accent hover:dark:bg-accent bg-secondaryBg dark:bg-secondaryBgDark'
      }`
    : `${genericClasses} border-2 border-accent hover:bg-accent`;

  return (
    <NoScrollLink href={linkHref} className={linkClasses}>
      {name}
    </NoScrollLink>
  );
}

export default function PageSidebar({
  data,
  pageQueries = {
    page: '',
    queries: [],
  },
}: IProps): JSX.Element {
  const { pathname } = useRouter();

  return (
    <aside className="flex flex-row gap-8 w-full  pt-12 md:pt-0">
      {data?.length ? (
        <div>
          <p className="text-lg font-semibold mb-3">Search posts by topics:</p>
          <div className="flex flex-row flex-wrap gap-3">
            {data.map((topic) => {
              const { name } = TOPICS[topic];

              const { activeItem, linkHref } = linkBuilder({
                pageQueries,
                item: topic,
                pathname,
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
            <CategoryLink
              linkHref={pathname}
              activeItem={false}
              name="Clear filters"
              isClearButton
            />
          </div>
        </div>
      ) : null}
    </aside>
  );
}
