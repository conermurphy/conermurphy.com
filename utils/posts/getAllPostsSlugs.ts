import { POSTTYPES } from '../../types';
import getAllPostsData from './getAllPostsData';
import getAllPostNames from './getAllPostsNames';

interface IProps {
  postType: POSTTYPES;
}

interface ReturnType {
  params: {
    slug: string[];
  };
}

export default async function getAllPostsSlugs({
  postType,
}: IProps): Promise<ReturnType[]> {
  const allPostNames = await getAllPostNames({ postType });
  const allPostData = await getAllPostsData({
    posts: allPostNames,
    getContent: true,
    postType,
  });

  // Return all of the post slugs for static page generation
  const slugs = allPostData.map((post) => {
    // The below ignore comments from TS and ESLint is due to gray-matter using generic typings for frontmatter causing TS to complain about undefined 'slug' property. This issue is being worked on https://github.com/jonschlinkert/gray-matter/issues/135
    // eslint-disable-next-line
    // @ts-ignore
    const { slug }: { slug: string } = post.data;

    return {
      params: {
        slug: [slug],
      },
    };
  });

  return slugs;
}
