import { POSTTYPES } from '../../types';
import { pageDataSource } from '..';
import createFilterPostPage from './createFilterPostPage';
import getAllPosts from './getAllPosts';
import getAllTagsCategories from './getAllTagsCategories/getAllTagsCategories';
import getHeadings from './getHeadings/getHeadings';
import getPost from './getPost';

interface IProps {
  postsPerPage: number;
  postType: POSTTYPES;
  slug: string | string[] | undefined;
}

export default async function sourcePostPage({
  postsPerPage,
  postType,
  slug = [],
}: IProps) {
  const postData = await getAllPosts({ postType });

  // Source data for extra sections being displayed on the page
  const { latestPosts, testimonials } = await pageDataSource({
    latestPosts: true,
    testimonials: true,
  });

  // Get all tags and categories used on the POSTTYPE
  const { categories, tags } = await getAllTagsCategories({
    postType,
  });

  // If slug is an array, take the first value, otherwise return '0' to indidicate page 0
  const slugVal = slug?.length ? slug[0] : '0';
  // If slug is an array and has a length of 2, take the second item otherwise '0'
  const slugFilterPage = slug?.length === 2 ? slug[1] : '0';

  const slugInt = parseInt(slugVal);
  const slugFilterPageInt = parseInt(slugFilterPage);

  // Check if slugVal stars with a number not in a word to indicate if its page pagination or not
  const isPostGridPage = slugVal.match(/^[0-9]*$/gm);

  const isCategoryPage = categories.includes(slugVal.toUpperCase());
  const isTagPage = tags.includes(slugVal.toUpperCase());

  if (isCategoryPage || isTagPage) {
    let filterType: 'tags' | 'categories' = 'tags';

    if (isCategoryPage) {
      filterType = 'categories';
    }

    const { postsLength, posts, filterItem } = createFilterPostPage({
      slug: slugVal,
      posts: postData,
      postsPerPage,
      slugPage: slugFilterPageInt,
      filterType,
    });

    return {
      props: {
        isPostGridPage: true,
        pageCount: Math.ceil(postsLength / postsPerPage),
        pageNumber: slugFilterPageInt,
        posts,
        tagsCats: { categories, tags },
        testimonials,
        filterItem,
        postType,
      },
    };
  }

  // If it is overall page pagination return props for it
  if (isPostGridPage) {
    // Work out the number of  posts required to skip for the page accessed. E.g. page 2 skip the first 8 posts and return from 9 to 16.
    const skip = slugInt ? (slugInt - 1) * postsPerPage : 0;

    const posts = postData.slice(skip, skip + postsPerPage);

    return {
      props: {
        isPostGridPage,
        pageCount: Math.ceil(postData.length / postsPerPage),
        pageNumber: slugInt,
        posts,
        tagsCats: { categories, tags },
        testimonials,
        postType,
      },
    };
  }

  //   If it is a post return props for it
  const post = await getPost({ slug: slugVal, postType });
  let rawContent;
  let headings;

  if (post.content) {
    headings = getHeadings(post.content);
    rawContent = post.content;
  }

  return {
    props: {
      isPostGridPage,
      latestPosts,
      post: { rawContent, headings, data: post.data, filePath: post.filePath },
    },
  };
}
