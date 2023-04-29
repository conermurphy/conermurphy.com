import { GetServerSideProps, NextPage } from 'next';
import { BlogNewsletterProps, POSTTYPES } from '../types';
import sourcePostPage from '../utils/posts/sourcePostPage';
import { PostGridPage } from '../components/Post/Pages';

const postType = POSTTYPES.TECHNICAL_WRITING;

// This controls which page to show based off the isPostGridPage prop
const TechnicalWriting: NextPage<BlogNewsletterProps> = ({
  isPostGridPage,
  ...params
}) => <PostGridPage {...params} postType={postType} />;

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const { props } = await sourcePostPage({
    postsPerPage,
    postType,
    pageQueries: query,
    slug: 'technical-writing',
  });

  const pageHeroData = {
    title: 'Technical Writing',
    body: 'Here are all of my commissioned blog posts. Want to work with me on a post for your company? Get in touch today.',
  };

  const metaDescription =
    'Here are all of my commissioned blog posts. Want to work with me on a post for your company? Get in touch today.';

  return {
    props: {
      ...props,
      pageHeroData,
      metaDescription,
    },
  };
};

export default TechnicalWriting;
