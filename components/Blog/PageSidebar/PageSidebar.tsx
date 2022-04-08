import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { CATEGORIES } from '../../../constants';
import {
  PostFrontMatter,
  PostWithFrontmatter,
  POSTTYPES,
} from '../../../types';
import Tags from '../Tags/Tags';

interface IProps {
  posts: PostWithFrontmatter[];
}

interface GetFrontmatterInfoProps {
  posts: PostWithFrontmatter[];
  type: string;
}

function getFrontmatterTagsCategories({
  posts,
  type,
}: GetFrontmatterInfoProps): string[] {
  const uniqueValues = [
    ...new Set(
      posts.flatMap(({ data }) => {
        return data[type as keyof PostFrontMatter];
      })
    ),
  ];

  return uniqueValues
    .map((value) => {
      return value.toString();
    })
    .filter((value) => {
      return value;
    });
}

export default function PageSidebar({ posts }: IProps): JSX.Element {
  const { asPath } = useRouter();
  const tags = getFrontmatterTagsCategories({ posts, type: 'tags' });
  const categories = getFrontmatterTagsCategories({
    posts,
    type: 'categories',
  });

  return (
    <aside className="flex flex-col gap-8 max-w-[272px] lg:max-w-[316px]">
      <div>
        <h2 className="text-lg font-normal mb-3">Categories</h2>
        <div className="flex flex-col gap-3">
          {categories.map((category) => {
            const { name } = CATEGORIES[category];
            return (
              <Link href={`/blog/${name.toLowerCase()}`} key={name} passHref>
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
