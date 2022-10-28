import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import {
  BlogNewsletterParams,
  BlogNewsletterProps,
  POSTTYPES,
} from '../../types';
import { getPostPaths, sourcePostPage } from '../../utils/posts';
import { PostPage } from '../../components/Post/Pages';
import { fetchEngagementData } from '../../utils';

const postType = POSTTYPES.NEWSLETTER;

// This controls which page to show based off the isPostGridPage prop
const NewsletterPost: NextPage<BlogNewsletterProps> = ({
  isPostGridPage,
  ...params
}) => <PostPage {...params} postType={postType} />;

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

  const { data: engagementData } = await fetchEngagementData({
    UUID: post?.data.UUID || '',
    slug: post?.data.slug || '',
    postType,
  });

  return {
    props: {
      ...props,
      post: {
        ...post,
        content: post?.rawContent ? await serialize(post?.rawContent) : '',
        engagementData: engagementData || 0,
      },
    },
    revalidate: 10,
  };
};

export default NewsletterPost;
