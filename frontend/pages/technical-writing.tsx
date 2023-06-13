import { GetStaticProps, NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import useSWR, { SWRConfig } from 'swr';
import {
  BlogNewsletterProps,
  POSTTYPES,
  PostGridDataSourceProps,
} from '../types';
import { PostGridPage } from '../components/Post/Pages';
import { getAllPosts, getAllTopics } from '../utils/posts';
import pageDataSource from '../utils/pageDataSource';
import fetcher from '../config';

const postType = POSTTYPES.TECHNICAL_WRITING;

// This controls which page to show based off the isPostGridPage prop
const TechnicalWriting: NextPage<BlogNewsletterProps> = ({
  isPostGridPage,
  ...params
}) => {
  const searchParams = useSearchParams();

  const { data } = useSWR<PostGridDataSourceProps, Error>(
    `/api/posts?type=${postType}&${searchParams.toString()}`,
    fetcher,
    {
      fallbackData: params.fallback['/api/posts'],
    }
  );

  return (
    <SWRConfig value={{ fallback: params.fallback }}>
      <PostGridPage
        {...params}
        posts={data?.posts || params.posts}
        pageCount={data?.pageCount || params.pageCount}
        pageNumber={data?.pageNumber || params.pageNumber}
        pageQueries={data?.pageQueries || params.pageQueries}
        postType={postType}
      />
    </SWRConfig>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const postData = await getAllPosts({ postType });
  const { latestBlogs, latestYouTubeVideo } = await pageDataSource({
    latestBlogs: true,
    latestNewsletters: false,
    latestYouTubeVideo: true,
  });
  const { topics } = await getAllTopics({
    postType,
  });
  const posts = postData.slice(0, 0 + postsPerPage);
  const pageCount = Math.ceil(postData.length / postsPerPage);

  const pageHeroData = {
    title: 'Technical Writing',
    body: 'Here are all of my commissioned blog posts. Want to work with me on a post for your company? Get in touch today.',
  };

  const metaDescription =
    'Here are all of my commissioned blog posts. Want to work with me on a post for your company? Get in touch today.';

  return {
    props: {
      fallback: {
        '/api/posts': {
          posts,
          pageNumber: 0,
          pageCount,
        },
      },
      posts,
      topics,
      pageNumber: 0,
      pageCount,
      postType,
      latestPosts: latestBlogs,
      latestYouTubeVideo,
      pageHeroData,
      metaDescription,
    },
  };
};

export default TechnicalWriting;
