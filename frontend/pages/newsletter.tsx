import { GetServerSideProps, NextPage } from 'next';
import { BlogNewsletterProps, POSTTYPES } from '../types';
import sourcePostPage from '../utils/posts/sourcePostPage';
import { PostGridPage } from '../components/Post/Pages';

const postType = POSTTYPES.NEWSLETTER;

// This controls which page to show based off the isPostGridPage prop
const Newsletter: NextPage<BlogNewsletterProps> = ({
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
    slug: 'newsletter',
  });

  const pageHeroData = {
    title: 'Sunday Solotor',
    body: 'Thoughts, stories, and actionable advice for creators, builders, entrepreneurs, and more...',
  };

  const metaDescription =
    "Thoughts, stories, and actionable advice for creators, builders, entrepreneurs, and more. That's the theme of my newsletter, come give it a read.";

  return {
    props: {
      ...props,
      pageHeroData,
      metaDescription,
    },
  };
};

export default Newsletter;
