import type { GetStaticProps, NextPage } from 'next';
import {
  LatestPosts,
  SEO,
  Services,
  Spotlight,
  Testimonials,
} from '../components';
import { Post, Service, SPOTLIGHT, Testimonial } from '../types';
import { pageDataSource } from '../utils';

interface IProps {
  services: Service[];
  testimonials: Testimonial[];
  latestPosts: Post[];
}

const Home: NextPage<IProps> = ({ services, testimonials, latestPosts }) => {
  return (
    <>
      <SEO
        metaTitle="Home"
        metaDescription="Whether it be TypeScript/JavaScript development you need support on or a technical article written, come check out how Coner Murphy can help you."
      />
      <Spotlight type={SPOTLIGHT.COMPANIES} />
      <Services services={services} />
      <Spotlight type={SPOTLIGHT.TECH} />
      <LatestPosts posts={latestPosts} />
      <Testimonials testimonials={testimonials} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { services, testimonials, latestPosts } = await pageDataSource({
    services: true,
    testimonials: true,
    latestPosts: true,
  });

  return {
    props: { services, testimonials, latestPosts },
  };
};

export default Home;
