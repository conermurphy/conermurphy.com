import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import {
  BlogNewsletterParams,
  BlogNewsletterProps,
  POSTTYPES,
} from '../../types';
import { getPostPaths, sourcePostPage } from '../../utils/posts';
import { PostPage } from '../../components/Post/Pages';

const postType = POSTTYPES.NEWSLETTER;

// This controls which page to show based off the isPostGridPage prop
const NewsletterPost: NextPage<BlogNewsletterProps> = ({
  isPostGridPage,
  ...params
}) => {
  return <PostPage {...params} postType={postType} />;
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
    slug: Array.isArray(params?.slug) ? params?.slug[0] : params?.slug,
  });

  const { post } = props;

  return {
    props: {
      ...props,
      post: {
        ...post,
        content: post?.rawContent ? await serialize(post?.rawContent) : '',
      },
    },
  };
};

export default NewsletterPost;
