import type { GetStaticProps, NextPage } from 'next';
import { Testimonials, PageHero, SEO } from '../components';
import { PageSidebar, PostCardGrid } from '../components/Blog';
import { HeaderBackground } from '../components/Header/components';
import {
  Testimonial,
  PostWithFrontmatter,
  POSTTYPES,
  PostTagsCats,
} from '../types';
import { pageDataSource } from '../utils';
import { getAllPosts, getAllTagsCategories } from '../utils/posts';

interface IProps {
  testimonials: Testimonial[];
  posts: PostWithFrontmatter[];
  tagsCats: PostTagsCats;
}

const Blog: NextPage<IProps> = ({ testimonials, posts, tagsCats }) => {
  return (
    <>
      <SEO metaTitle="Blog" metaDescription="My Blog" url="blog" />
      <PageHero
        title="My Content"
        body="Blog posts, tutorials, technical writing and much more. All of my
            content in one place to enjoy..."
      />
      <HeaderBackground bg="bg-white" />
      <div className="flex flex-row items-center justify-center mb-72">
        <div className="flex flex-col items-center justify-center gap-y-14 gap-x-20 w-full md:px-20 lg:px-106 xl:flex-row-reverse xl:items-start">
          <PostCardGrid posts={posts} postType={POSTTYPES.BLOG} />
          <PageSidebar data={tagsCats} />
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

  const posts = await getAllPosts({ postType: POSTTYPES.BLOG, limit: 8 });
  const tagsCats = await getAllTagsCategories({ postType: POSTTYPES.BLOG });

  return {
    props: { testimonials, posts, tagsCats },
  };
};

export default Blog;
