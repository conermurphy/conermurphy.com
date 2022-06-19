import { useRouter } from 'next/router';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CATEGORIES } from '../../../constants';
import { PostTagsCats } from '../../../types';
import Tags from '../Tags/Tags';
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
      <motion.a
        className={`font-semibold text-sm p-3 rounded-md ${
          activeItem
            ? 'bg-[rgba(249,115,22,25%)]'
            : 'bg-primaryBg dark:bg-primaryBgDark'
        }`}
        whileHover={{
          backgroundColor: 'rgba(249,115,22,25%)',
        }}
      >
        {name}
      </motion.a>
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
  return (
    <aside className="sticky grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8 gap-x-20 w-full px-6 md:px-0 md:max-w-[624px] lg:max-w-[780px] xl:max-w-[272px] top-16">
      <div className="w-full">
        {categories?.length ? (
          <>
            <h2 className="text-lg font-semibold mb-3">Categories</h2>
            <div className="flex flex-col gap-3">
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
          </>
        ) : null}
      </div>
      <div className="w-full flex flex-col gap-6">
        {tags?.length ? (
          <div>
            <h2 className="text-lg font-semibold mb-3">Tags</h2>
            <Tags tags={tags} pageQueries={pageQueries} />
          </div>
        ) : null}
        <div className="flex flex-col gap-3">
          <hr />
          <h2 className="text-lg font-normal">Other</h2>
          <CategoryLink
            linkHref={pathname}
            activeItem={false}
            name="Clear all filters"
          />
        </div>
      </div>
    </aside>
  );
}
