import type { GetStaticProps, NextPage } from 'next';
import {
  LatestPosts,
  SEO,
  Testimonials,
  ContactSection,
  HomeHero,
} from '../components';
import { Post, POSTTYPES, Service, Testimonial } from '../types';
import { generateRssFeeds, pageDataSource, useScrollToTop } from '../utils';

interface IProps {
  services: Service[];
  testimonials: Testimonial[];
  latestBlogs: Post[];
  latestNewsletters: Post[];
}

const Home: NextPage<IProps> = ({
  testimonials,
  latestBlogs,
  latestNewsletters,
}) => {
  useScrollToTop();

  return (
    <>
      <SEO
        metaTitle="Home"
        metaDescription="Whether it be TypeScript/JavaScript development you need support on or a technical article written, come check out how Coner Murphy can help you."
      />
      <HomeHero />
      <Testimonials testimonials={testimonials} />
      <LatestPosts posts={latestBlogs} postType={POSTTYPES.BLOG} />
      <LatestPosts posts={latestNewsletters} postType={POSTTYPES.NEWSLETTER} />
      <ContactSection />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeeds();

  const { services, testimonials, latestBlogs, latestNewsletters } =
    await pageDataSource({
      services: true,
      testimonials: true,
      latestBlogs: true,
      latestNewsletters: true,
    });

  return {
    props: { services, testimonials, latestBlogs, latestNewsletters },
  };
};

export default Home;
