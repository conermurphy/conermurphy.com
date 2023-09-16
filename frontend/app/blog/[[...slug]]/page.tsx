import { POSTTYPES } from '../../../types';
import { getPostPaths } from '../../../utils/posts';
import sourcePostPage from '../../../utils/posts/sourcePostPage';
import { PostGridPage, PostPage } from '../../../components/Post/Pages';
import metadataGenerator from '../../../utils/metadataGenerator';
import { toUpper } from '../../../utils';

const postType = POSTTYPES.BLOG;
const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
const pageHeroData = {
  title: 'My Blog',
  body: 'Here are all my latest blog posts; web development, tech, productivity, content creation, and more...',
};
const pageName = toUpper(postType.replaceAll('-', ' '));

interface IProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: IProps) {
  const { props } = await sourcePostPage({
    postsPerPage,
    postType,
    slug: params?.slug,
  });

  const { pageNumber } = props;

  const metadata = metadataGenerator({
    metaTitle: `${pageName} ${pageNumber ? `- Page ${pageNumber}` : ''}`,
    metaDescription: pageHeroData.body,
    metaImage: {
      title: `${pageHeroData.title} ${
        pageNumber ? `| Page ${pageNumber}` : ''
      }`,
      description: pageHeroData.body,
    },
    url: postType,
    addNoIndex: !!(pageNumber && pageNumber > 1),
  });

  return metadata;
}

const Blog = async ({ params }: IProps) => {
  const { props } = await sourcePostPage({
    postsPerPage,
    postType,
    slug: params?.slug,
  });

  const { post, isPostGridPage } = props;

  const updatedProps = isPostGridPage
    ? {
        props: {
          ...props,
        },
      }
    : {
        props: {
          ...props,
          post,
        },
      };

  return isPostGridPage ? (
    <PostGridPage
      {...updatedProps.props}
      postType={postType}
      pageHeroData={pageHeroData}
    />
  ) : (
    <PostPage {...updatedProps.props} postType={postType} />
  );
};

export async function generateStaticParams() {
  return getPostPaths({ postType });
}

export default Blog;
