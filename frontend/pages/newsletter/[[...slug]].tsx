import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import {
  BlogNewsletterParams,
  BlogNewsletterProps,
  POSTTYPES,
} from '../../types';
import { getPostPaths } from '../../utils/posts';

import { PostGridPage, PostPage } from '../../components/Post/Pages';
import sourcePostPage from '../../utils/posts/sourcePostPage';

const postType = POSTTYPES.NEWSLETTER;

// This controls which page to show based off the isPostGridPage prop
const Newsletter: NextPage<BlogNewsletterProps> = ({
  isPostGridPage,
  ...params
}) =>
  isPostGridPage ? (
    <PostGridPage {...params} postType={postType} />
  ) : (
    <PostPage {...params} postType={postType} />
  );

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
    title: 'Sunday Solotor',
    body: 'Thoughts, stories, and actionable advice for creators, builders, entrepreneurs, and more...',
  };

  const metaDescription =
    "Thoughts, stories, and actionable advice for creators, builders, entrepreneurs, and more. That's the theme of my newsletter, come give it a read.";

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
