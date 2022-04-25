import { dev } from '../../config';
import { Post, POSTTYPES } from '../../types';
import getAllPosts from './getAllPosts';
import getAllTagsCategories from './getAllTagsCategories/getAllTagsCategories';

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

interface PostFilterProps {
  data: string[];
  allPosts: Post[];
  postsPerPage: number;
  filter: 'tags' | 'categories';
}

function postFilter({ data, allPosts, postsPerPage, filter }: PostFilterProps) {
  // Loop over each tag/category page and work out the required paths for it
  return data.flatMap((item) => {
    // Calculate the total posts that exist with that tag / category
    const totalPosts = allPosts.filter(({ data: frontmatter }) => {
      return frontmatter[filter].includes(item);
    }).length;

    // Calculate how many pages are required to show all the posts
    const pagesRequired = Math.ceil(totalPosts / postsPerPage);

    // Create the paths for the pages
    return Array.from({ length: pagesRequired }).map((_, i) => {
      return {
        params: {
          slug: [item.toLowerCase(), `${i !== 0 ? i + 1 : ''}`],
        },
      };
    });
  });
}

export default async function getPostPaths({ postType }: IProps): ReturnType {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
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

  // Get all Tags and Categories for postType
  const { categories, tags } = await getAllTagsCategories({
    postType,
  });

  // Create and return the paths for all tags
  const tagPaths = postFilter({
    data: tags,
    allPosts: postData,
    postsPerPage,
    filter: 'tags',
  });

  // Create and return the paths for all categories
  const catPaths = postFilter({
    data: categories,
    allPosts: postData,
    postsPerPage,
    filter: 'categories',
  });

  // Find the total number of posts and calculate the number of pages required to show them.
  const postsLength = postData.length;
  const pages = Math.ceil(postsLength / postsPerPage);

  // Create the routes for each  page and then add the post paths onto the array
  const paths = Array.from({ length: pages }).map((_, i) => {
    return {
      params: {
        slug: [`${i !== 0 ? i + 1 : ''}`],
      },
    };
  });

  return [...paths, ...postPaths, ...catPaths, ...tagPaths];
}
