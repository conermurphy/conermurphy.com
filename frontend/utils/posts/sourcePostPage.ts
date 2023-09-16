import { POSTTYPES } from '../../types';
import pageDataSource from '../pageDataSource';
import getAllPosts from './getAllPosts';
import getAllTopics from './getAllTopics/getAllTopics';
import getHeadings from './getHeadings/getHeadings';
import getPost from './getPost';

interface IProps {
  postType: POSTTYPES;
  postsPerPage: number;
  slug: string | string[] | undefined;
}

export default async function sourcePostPage({
  postType,
  slug = [],
  postsPerPage,
}: IProps) {
  const postData = await getAllPosts({ postType });

  // Source data for extra sections being displayed on the page
  const { latestBlogs, latestYouTubeVideo } = await pageDataSource({
    latestBlogs: true,
    latestNewsletters: false,
    latestYouTubeVideo: true,
  });

  // If slug is an array, take the first value, otherwise return '0' to indidicate page 0
  const slugVal = slug?.length ? slug[0] : '0';
  const slugInt = parseInt(slugVal);

  // Check if slugVal stars with a number not in a word to indicate if its page pagination or not
  const isPostGridPage = slugVal.match(/^[0-9]*$/gm);

  const { topics } = await getAllTopics({
    postType,
  });

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
        postType,
        latestYouTubeVideo,
        latestPosts: latestBlogs,
        topics,
      },
    };
  }

  // If it is a post return props for it
  const post = await getPost({ slug: slugVal, postType });
  let content;
  let headings;

  if (post.content) {
    headings = getHeadings(post.content.toString());
    content = post.content;
  }

  return {
    props: {
      isPostGridPage,
      latestPosts: latestBlogs,
      post: {
        content,
        headings,
        frontmatter: post.frontmatter,
        filePath: post.filePath,
      },
      latestYouTubeVideo,
    },
  };
}
