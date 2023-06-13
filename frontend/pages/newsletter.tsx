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

const postType = POSTTYPES.NEWSLETTER;

// This controls which page to show based off the isPostGridPage prop
const Newsletter: NextPage<BlogNewsletterProps> = ({
  isPostGridPage,
  ...params
}) => {
  const searchParams = useSearchParams();

  const { data, isLoading: isDataLoading } = useSWR<
    PostGridDataSourceProps,
    Error
  >(
    `/api/posts?type=${postType}${
      searchParams.toString() ? `&${searchParams.toString()}` : ''
    }`,
    fetcher,
    {
      fallbackData: params.fallback['/api/posts'],
    }
  );

  const isLoading = isDataLoading || !data;

  return (
    <SWRConfig value={{ fallback: params.fallback }}>
      <PostGridPage
        {...params}
        posts={data?.posts || params.posts}
        pageCount={data?.pageCount || params.pageCount}
        pageNumber={data?.pageNumber || params.pageNumber}
        pageQueries={data?.pageQueries || params.pageQueries}
        postType={postType}
        isLoading={isLoading || false}
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
    title: 'Sunday Solotor',
    body: 'Thoughts, stories, and actionable advice for creators, builders, entrepreneurs, and more...',
  };

  const metaDescription =
    "Thoughts, stories, and actionable advice for creators, builders, entrepreneurs, and more. That's the theme of my newsletter, come give it a read.";

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

export default Newsletter;
