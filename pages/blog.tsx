import { GetServerSideProps, NextPage } from 'next';
import { BlogNewsletterProps, POSTTYPES } from '../types';
import { sourcePostPage } from '../utils/posts';
import { PostGridPage } from '../components/Post/Pages';

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
    body: 'Here are all my latest writings; web development, online business, content creation, and more...',
  };

  const metaDescription =
    "Whether it's JavaScript, TypeScript, ReactJS or something else web development related, there's a post here for you. Come see Coner Murphy's latest posts.";

  return {
    props: {
      ...props,
      pageHeroData,
      metaDescription,
    },
  };
};

export default Blog;
