import type { GetStaticProps, NextPage } from 'next';
import { Testimonials, PageHero, SEO } from '../components';
import { PageSidebar, PostCardGrid } from '../components/Blog';
import { HeaderBackground } from '../components/Header/components';
import { Testimonial, PostWithFrontmatter, POSTTYPES } from '../types';
import { pageDataSource } from '../utils';
import { getAllPosts } from '../utils/posts';

interface IProps {
  testimonials: Testimonial[];
  posts: PostWithFrontmatter[];
}

const Blog: NextPage<IProps> = ({ testimonials, posts }) => {
  return (
    <>
      <SEO metaTitle="Blog" metaDescription="My Blog" url="blog" />
      <PageHero
        title="My Content"
        body="Blog posts, tutorials, technical writing and much more. All of my
            content in one place to enjoy..."
      />
      <HeaderBackground bg="bg-white" />
      <div className="flex flex-row items-center justify-center mb-10 xl:mt-72 md:mb-12">
        <div className="flex flex-col items-center gap-y-10 justify-between w-full max-w-[272px] md:max-w-[1372px] md:px-20 lg:px-106 xl:flex-row xl:items-start">
          <PageSidebar posts={posts} />
          <PostCardGrid posts={posts} postType={POSTTYPES.BLOG} />
        </div>
      </div>
      <Testimonials testimonials={testimonials} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { testimonials } = await pageDataSource({
    services: false,
    testimonials: true,
    latestPosts: false,
  });

  const posts = await getAllPosts({ postType: POSTTYPES.BLOG });

  return {
    props: { testimonials, posts },
  };
};

export default Blog;
