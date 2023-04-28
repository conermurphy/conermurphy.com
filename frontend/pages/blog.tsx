import { GetServerSideProps, NextPage } from 'next';
import { BlogNewsletterProps, POSTTYPES } from '../types';
import { PostGridPage } from '../components/Post/Pages';
import sourcePostPage from '../utils/posts/sourcePostPage';

const postType = POSTTYPES.BLOG;

// This controls which page to show based off the isPostGridPage prop
const Blog: NextPage<BlogNewsletterProps> = ({ isPostGridPage, ...params }) => (
  <PostGridPage {...params} postType={postType} />
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const { props } = await sourcePostPage({
    postsPerPage,
    postType,
    pageQueries: query,
    slug: 'blog',
  });

  const pageHeroData = {
    title: 'My Blog',
    body: 'Here are all my latest blog posts; web development, tech, productivity, content creation, and more...',
  };

  const metaDescription =
    'Here are all my latest blog posts; web development, tech, productivity, content creation, and more.';

  return {
    props: {
      ...props,
      pageHeroData,
      metaDescription,
    },
  };
};

export default Blog;
