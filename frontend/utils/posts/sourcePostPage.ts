import { POSTTYPES } from '../../types';
import pageDataSource from '../pageDataSource';
import getHeadings from './getHeadings/getHeadings';
import getPost from './getPost';

interface IProps {
  postType: POSTTYPES;
  slug?: string;
}

export default async function sourcePostPage({ postType, slug = '' }: IProps) {
  // Source data for extra sections being displayed on the page
  const { latestBlogs, latestYouTubeVideo } = await pageDataSource({
    latestBlogs: true,
    latestNewsletters: false,
    latestYouTubeVideo: true,
  });

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
