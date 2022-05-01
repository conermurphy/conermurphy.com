import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import {
  BlogNewsletterParams,
  BlogNewsletterProps,
  POSTTYPES,
} from '../../types';
import { getPostPaths, sourcePostPage } from '../../utils/posts';
import { PostPage, PostGridPage } from '../../components/Post/Pages';

const postType = POSTTYPES.NEWSLETTER;

// This controls which page to show based off the isPostGridPage prop
const Newsletter: NextPage<BlogNewsletterProps> = ({
  isPostGridPage,
  ...params
}) => {
  return isPostGridPage ? (
    <PostGridPage {...params} />
  ) : (
    <PostPage {...params} />
  );
};

export const getStaticPaths: GetStaticPaths<
  BlogNewsletterParams
> = async () => {
  const paths = await getPostPaths({ postType });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const { props } = await sourcePostPage({
    postsPerPage,
    postType,
    slug: params?.slug,
  });

  const { isPostGridPage, post } = props;

  const pageHeroData = {
    title: 'My Newsletter',
    body: 'Thoughts, stories, questions, and actionable advise for developers, entrepreneurs, and more...',
  };

  const metaDescription =
    "Thoughts, stories, questions, and actionable advise for developers, entrepreneurs, and more. That's the theme of my newsletter, come give it a read.";

  return isPostGridPage
    ? {
        props: {
          ...props,
          pageHeroData,
          metaDescription,
        },
      }
    : {
        props: {
          ...props,
          post: {
            ...post,
            content: post?.rawContent ? await serialize(post?.rawContent) : '',
          },
        },
      };
};

export default Newsletter;
