import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { CATEGORIES } from '../../../constants';
import { PostTagsCats } from '../../../types';
import Tags from '../Tags/Tags';

interface IProps {
  data: PostTagsCats;
}

export default function PageSidebar({ data }: IProps): JSX.Element {
  const { asPath } = useRouter();
  const baseRoute = asPath.split('/').slice(0, 2).join('/');

  const { tags, categories } = data;

  return (
    <aside className="sticky grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8 gap-x-20 w-full px-6 md:px-0 md:max-w-[624px] lg:max-w-[780px] xl:max-w-[272px] top-16">
      <div className="w-full">
        {categories?.length ? (
          <>
            <h2 className="text-lg font-normal mb-3">Categories</h2>
            <div className="flex flex-col gap-3">
              {categories.map((category) => {
                const { name, link } = CATEGORIES[category];
                let linkHref = '';

                if (asPath.includes(link)) {
                  linkHref = baseRoute;
                } else {
                  linkHref = `${baseRoute}/${link}`;
                }

                return (
                  <Link href={linkHref} key={link} passHref>
                    <a
                      className={`font-semibold text-sm p-3 rounded-md ${
                        asPath.includes(link)
                          ? 'bg-[rgba(249,115,22,25%)]'
                          : 'bg-[rgba(17,24,39,10%)]'
                      }`}
                    >
                      {name}
                    </a>
                  </Link>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
      {tags?.length ? (
        <div>
          <h2 className="text-lg font-normal mb-3">Tags</h2>
          <Tags tags={tags} />
        </div>
      ) : null}
    </aside>
  );
}
