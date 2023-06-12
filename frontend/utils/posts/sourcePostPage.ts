import { POSTTYPES } from '../../types';
import pageDataSource from '../pageDataSource';
import getAllPosts from './getAllPosts';
import getAllTopics from './getAllTopics/getAllTopics';
import getHeadings from './getHeadings/getHeadings';
import getPost from './getPost';

interface IProps {
  postsPerPage: number;
  postType: POSTTYPES;
  pageQueries?: {
    page?: string;
    q?: string;
  };
  slug?: string;
}

export default async function sourcePostPage({
  postsPerPage,
  postType,
  pageQueries = {
    page: '',
    q: '',
  },
  slug = '',
}: IProps) {
  // eslint-disable-next-line no-console
  console.time('sourcePostPage');

  const postData = await getAllPosts({ postType });
  // Source data for extra sections being displayed on the page
  const { latestBlogs, latestYouTubeVideo } = await pageDataSource({
    latestBlogs: true,
    latestNewsletters: false,
    latestYouTubeVideo: true,
  });

  // Get all topics used on the POSTTYPE
  const { topics } = await getAllTopics({
    postType,
  });

  // If the page has no page or queries in the URL query params
  if (
    !pageQueries?.page &&
    !pageQueries?.q &&
    ['blog', 'newsletter', 'technical-writing'].includes(slug)
  ) {
    const pageNumber = pageQueries?.page ? parseInt(pageQueries?.page) : 0;
    // Work out the number of  posts required to skip for the page accessed. E.g. page 2 skip the first 8 posts and return from 9 to 16.
    const skip = pageNumber ? (pageNumber - 1) * postsPerPage : 0;

    const posts = postData.slice(skip, skip + postsPerPage);

    // eslint-disable-next-line no-console
    console.timeEnd('sourcePostPage');

    return {
      props: {
        pageCount: Math.ceil(postData.length / postsPerPage),
        pageNumber,
        posts,
        topics,
        postType,
        latestPosts: latestBlogs,
        latestYouTubeVideo,
      },
    };
  }

  // If the page has no queries but a page URL query param
  if (pageQueries?.page && !pageQueries?.q) {
    const pageNumber = pageQueries?.page ? parseInt(pageQueries?.page) : 0;
    // Work out the number of  posts required to skip for the page accessed. E.g. page 2 skip the first 8 posts and return from 9 to 16.
    const skip = pageNumber ? (pageNumber - 1) * postsPerPage : 0;

    const posts = postData.slice(skip, skip + postsPerPage);

    return {
      props: {
        pageCount: Math.ceil(postData.length / postsPerPage),
        pageNumber,
        posts,
        topics,
        postType,
        pageQueries: {
          page: pageQueries?.page ?? '',
          queries: [],
        },
        latestPosts: latestBlogs,
        latestYouTubeVideo,
      },
    };
  }

  // If the page has query URL query params
  if (pageQueries?.q) {
    const queries = pageQueries?.q.toUpperCase().split(' ');

    // Filter all the posts to the ones for the selected topics.
    const filteredPosts = postData.filter(({ data }) =>
      data.topics.some((topic) => queries.includes(topic))
    );

    const numberOfPosts = filteredPosts.length;

    const pageNumber = pageQueries?.page ? parseInt(pageQueries?.page) : 0;
    // Work out the number of  posts required to skip for the page accessed. E.g. page 2 skip the first 8 posts and return from 9 to 16.
    const skip = pageNumber ? (pageNumber - 1) * postsPerPage : 0;

    const posts = filteredPosts.slice(skip, skip + postsPerPage);

    return {
      props: {
        pageCount: Math.ceil(numberOfPosts / postsPerPage),
        pageNumber,
        posts,
        topics,
        postType,
        pageQueries: {
          page: pageQueries?.page ?? '',
          queries,
        },
        latestPosts: latestBlogs,
        latestYouTubeVideo,
      },
    };
  }

  // If it is a post return props for it
  const post = await getPost({ slug, postType });
  let rawContent;
  let headings;

  if (post.content) {
    headings = getHeadings(post.content);
    rawContent = post.content;
  }

  return {
    props: {
      latestPosts: latestBlogs,
      post: { rawContent, headings, data: post.data, filePath: post.filePath },
      latestYouTubeVideo,
    },
  };
}
