import { POSTTYPES } from '../../../types';
import { PostGridPage } from '../../../components/Post/Pages';
import sourcePostPage from '../../../utils/posts/sourcePostPage';
import { getPostPaths } from '../../../utils/posts';
import metadataGenerator from '../../../utils/metadataGenerator';
import { toUpper } from '../../../utils';

const postType = POSTTYPES.TECHNICAL_WRITING;
const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
const pageHeroData = {
  title: 'Technical Writing',
  body: 'Here are all of my commissioned blog posts. Want to work with me on a post for your company? Get in touch today.',
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

const TechnicalWriting = async ({ params }: IProps) => {
  const { props } = await sourcePostPage({
    postsPerPage,
    postType,
    slug: params?.slug,
  });

  return (
    <PostGridPage {...props} postType={postType} pageHeroData={pageHeroData} />
  );
};

export async function generateStaticParams() {
  return getPostPaths({ postType });
}

export default TechnicalWriting;
