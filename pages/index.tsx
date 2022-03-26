import type { GetStaticProps, NextPage } from 'next';
import {
  LatestPosts,
  SEO,
  Services,
  Spotlight,
  Testimonials,
} from '../components';
import { PostWithFrontmatter, Service, SPOTLIGHT, Testimonial } from '../types';
import { pageDataSource } from '../utils';

interface IProps {
  services: Service[];
  testimonials: Testimonial[];
  posts: PostWithFrontmatter[];
}

const Home: NextPage<IProps> = ({ services, testimonials, posts }) => {
  return (
    <>
      <SEO metaTitle="Home" metaDescription="Home page" />
      <Spotlight type={SPOTLIGHT.COMPANIES} />
      <Services services={services} />
      <Spotlight type={SPOTLIGHT.TECH} />
      <LatestPosts posts={posts} />
      <Testimonials testimonials={testimonials} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { services, testimonials, posts } = await pageDataSource({
    services: true,
    testimonials: true,
    latestPosts: true,
  });

  return {
    props: { services, testimonials, posts },
  };
};

export default Home;
