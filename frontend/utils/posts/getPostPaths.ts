import { dev } from '../../config';
import { POSTTYPES } from '../../types';
import getAllPosts from './getAllPosts';

interface IProps {
  postType: POSTTYPES;
}

type ReturnType = Promise<
  {
    slug: string[];
  }[]
>;

export default async function getPostPaths({ postType }: IProps): ReturnType {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const postData = await getAllPosts({ postType });

  // Get all post slugs
  const postPaths =
    postType !== POSTTYPES.TECHNICAL_WRITING
      ? postData.map((post) => {
          const { slug, published } = post.frontmatter;

          if (!dev && !published) {
            return {
              slug: [''],
            };
          }

          return {
            slug: [slug],
          };
        })
      : [];

  const postsLength = postData.length;
  const pages = Math.ceil(postsLength / postsPerPage);

  // Create the routes for each  page and then add the post paths onto the array
  const paths = Array.from({ length: pages }).map((_, i) => ({
    slug: [`${i !== 0 ? i + 1 : ''}`],
  }));

  return [...paths, ...postPaths];
}
