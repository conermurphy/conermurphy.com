import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import {
  BlogNewsletterParams,
  BlogNewsletterProps,
  POSTTYPES,
} from '../../types';
import { getPostPaths, sourcePostPage } from '../../utils/posts';
import { PostPage, PostGridPage } from '../../components/Post/Pages';

const postType = POSTTYPES.BLOG;

// This controls which page to show based off the isPostGridPage prop
const Blog: NextPage<BlogNewsletterProps> = ({ isPostGridPage, ...params }) => {
  return isPostGridPage ? (
    <PostGridPage {...params} postType={postType} />
  ) : (
    <PostPage {...params} postType={postType} />
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
    title: 'My Blog',
    body: 'Here are all my latest writings; web development, online business, content creation, and more...',
  };

  const metaDescription =
    "Whether it's JavaScript, TypeScript, ReactJS or something else web development related, there's a post here for you. Come see Coner Murphy's latest posts.";

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

export default Blog;
