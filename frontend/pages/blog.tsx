import { GetStaticProps, NextPage } from 'next';
import useSWR, { SWRConfig } from 'swr';
import { useSearchParams } from 'next/navigation';
import {
  BlogNewsletterProps,
  POSTTYPES,
  PostGridDataSourceProps,
} from '../types';
import { PostGridPage } from '../components/Post/Pages';
import { getAllPosts, getAllTopics } from '../utils/posts';
import pageDataSource from '../utils/pageDataSource';
import fetcher from '../config';

const postType = POSTTYPES.BLOG;

// This controls which page to show based off the isPostGridPage prop
const Blog: NextPage<BlogNewsletterProps> = ({ isPostGridPage, ...params }) => {
  const searchParams = useSearchParams();

  const { data, isLoading: isDataLoading } = useSWR<
    PostGridDataSourceProps,
    Error
  >(`/api/posts?type=${postType}&${searchParams.toString()}`, fetcher, {
    fallbackData: params.fallback['/api/posts'],
  });

  const isLoading = !data && isDataLoading;

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
    title: 'My Blog',
    body: 'Here are all my latest blog posts; web development, tech, productivity, content creation, and more...',
  };

  const metaDescription =
    'Here are all my latest blog posts; web development, tech, productivity, content creation, and more.';

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

export default Blog;
