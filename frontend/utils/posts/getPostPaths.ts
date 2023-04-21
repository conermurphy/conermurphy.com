import { dev } from '../../config';
import { POSTTYPES } from '../../types';
import getAllPosts from './getAllPosts';

interface IProps {
  postType: POSTTYPES;
}

type ReturnType = Promise<
  {
    params: {
      slug: string[];
    };
  }[]
>;

export default async function getPostPaths({ postType }: IProps): ReturnType {
  const postData = await getAllPosts({ postType });

  // Get all post slugs
  const postPaths = postData.map((post) => {
    const { slug, published } = post.data;

    if (!dev && !published) {
      return {
        params: {
          slug: [''],
        },
      };
    }

    return {
      params: {
        slug: [slug],
      },
    };
  });

  return postPaths;
}
