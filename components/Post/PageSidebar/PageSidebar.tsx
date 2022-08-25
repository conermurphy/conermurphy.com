import { useRouter } from 'next/router';
import React from 'react';
import { CATEGORIES } from '../../../constants';
import { PostTagsCats } from '../../../types';
import Tags, { POST_TAGS } from '../Tags/Tags';
import { NoScrollLink } from '../..';
import { linkBuilder } from '../../../utils/posts';

interface IProps {
  data: PostTagsCats;
  pageQueries?: { page: string; queries: string[] };
}

interface CategoryLinkProps {
  linkHref: string;
  activeItem: boolean;
  name: string;
}

function CategoryLink({
  linkHref,
  activeItem,
  name,
}: CategoryLinkProps): JSX.Element {
  return (
    <NoScrollLink href={linkHref} passHref>
      <a
        className={`font-semibold text-sm p-3 w-max rounded-md ease-in-out transition-all duration-150 ${
          activeItem
            ? 'bg-accent/25'
            : ' hover:bg-accent hover:dark:bg-accent bg-secondaryBg dark:bg-secondaryBgDark'
        }`}
      >
        {name}
      </a>
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
  const { tags, categories } = data;
  const { queries } = pageQueries;

  return (
    <aside className="grid grid-cols-4 gap-8 w-full px-6 pt-12 md:pt-0 md:px-0">
      {categories?.length ? (
        <div>
          <p className="text-lg font-semibold mb-3">Search posts by topics</p>
          <div className="flex flex-row flex-wrap gap-3">
            {categories.map((category) => {
              const { name } = CATEGORIES[category];

              const { activeItem, linkHref } = linkBuilder({
                pageQueries,
                item: category,
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
          </div>
        </div>
      ) : null}

      {tags?.length ? (
        <div className="w-full flex flex-col gap-3">
          <div>
            <h2 className="text-lg font-semibold mb-3 border-b-2 border-accent w-max">
              Tags
            </h2>
            <Tags tags={tags} pageQueries={pageQueries} />
          </div>
        </div>
      ) : null}

      {queries?.length ? (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold border-b-2 border-accent w-max">
            Active Filters
          </h2>
          <div className="flex flex-row flex-wrap gap-3">
            {queries.map((q) => {
              const uppercaseQuery = q.toUpperCase();
              const qData =
                CATEGORIES[uppercaseQuery] ?? POST_TAGS[uppercaseQuery];

              const displayName = qData?.name || q.toLowerCase();

              return (
                <p
                  key={q}
                  className="font-semibold text-xs p-3 rounded-md bg-secondaryBg dark:bg-secondaryBgDark opacity-100"
                >
                  {displayName}
                </p>
              );
            })}
          </div>
        </div>
      ) : null}

      {queries?.length ? (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold border-b-2 border-accent w-max">
            Other
          </h2>
          <CategoryLink
            linkHref={pathname}
            activeItem={false}
            name="Clear all filters"
          />
        </div>
      ) : null}
    </aside>
  );
}
