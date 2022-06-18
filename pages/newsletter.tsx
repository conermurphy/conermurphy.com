import { GetServerSideProps, NextPage } from 'next';
import { BlogNewsletterProps, POSTTYPES } from '../types';
import { sourcePostPage } from '../utils/posts';
import { PostGridPage } from '../components/Post/Pages';

const postType = POSTTYPES.NEWSLETTER;

// This controls which page to show based off the isPostGridPage prop
const Newsletter: NextPage<BlogNewsletterProps> = ({
  isPostGridPage,
  ...params
}) => {
  return <PostGridPage {...params} postType={postType} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const { props } = await sourcePostPage({
    postsPerPage,
    postType,
    pageQueries: query,
    slug: 'newsletter',
  });

  const pageHeroData = {
    title: 'My Newsletter',
    body: 'Thoughts, stories, questions, and actionable advise for developers, entrepreneurs, and more...',
  };

  const metaDescription =
    "Thoughts, stories, questions, and actionable advise for developers, entrepreneurs, and more. That's the theme of my newsletter, come give it a read.";

  return {
    props: {
      ...props,
      pageHeroData,
      metaDescription,
    },
  };
};

export default Newsletter;
