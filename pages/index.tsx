import type { GetStaticProps, NextPage } from 'next';
import {
  HomeHero,
  LatestPosts,
  SEO,
  Services,
  Companies,
  Testimonials,
} from '../components';
import { Post, Service, Testimonial } from '../types';
import { generateRssFeeds, pageDataSource, useScrollToTop } from '../utils';

interface IProps {
  services: Service[];
  testimonials: Testimonial[];
  latestPosts: Post[];
}

const Home: NextPage<IProps> = ({ services, testimonials, latestPosts }) => {
  useScrollToTop();

  return (
    <>
      <SEO
        metaTitle="Home"
        metaDescription="Whether it be TypeScript/JavaScript development you need support on or a technical article written, come check out how Coner Murphy can help you."
      />
      <HomeHero />
      <Services services={services} />
      <Companies />
      <LatestPosts posts={latestPosts} />
      <Testimonials testimonials={testimonials} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeeds();

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
