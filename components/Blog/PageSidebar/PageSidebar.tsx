import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { CATEGORIES } from '../../../constants';
import { PostTagsCats, POSTTYPES } from '../../../types';
import Tags from '../Tags/Tags';

interface IProps {
  data: PostTagsCats;
}

export default function PageSidebar({ data }: IProps): JSX.Element {
  const { asPath } = useRouter();

  const { tags, categories } = data;

  return (
    <aside className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8 gap-x-20 w-full max-w-[272px] md:max-w-[624px] lg:max-w-[780px] xl:max-w-[272px]">
      <div className="w-full">
        <h2 className="text-lg font-normal mb-3">Categories</h2>
        <div className="flex flex-col gap-3">
          {categories.map((category) => {
            const { name, link } = CATEGORIES[category];
            return (
              <Link href={`/blog/${link}`} key={link} passHref>
                <a
                  className={`font-semibold text-sm p-3 rounded-md ${
                    asPath.includes(category)
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
      </div>
      <div>
        <h2 className="text-lg font-normal mb-3">Tags</h2>
        <Tags postType={POSTTYPES.BLOG} tags={tags} />
      </div>
    </aside>
  );
}
