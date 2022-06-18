import type { GetStaticProps, NextPage } from 'next';
import {
  ContactForm,
  ContactHeader,
  LatestPosts,
  SEO,
  Testimonials,
} from '../components';
import { Post, Service, Testimonial } from '../types';
import { pageDataSource, useScrollToTop } from '../utils';

interface IProps {
  services: Service[];
  testimonials: Testimonial[];
  latestPosts: Post[];
}

const Home: NextPage<IProps> = ({ testimonials, latestPosts }) => {
  useScrollToTop();

  return (
    <>
      <SEO
        metaTitle="Contact Me"
        metaDescription="Got a burning question you want to ask Coner Murphy? Come ask me via the methods here."
      />
      <ContactHeader />
      <ContactForm />
      <Testimonials testimonials={testimonials} />
      <LatestPosts posts={latestPosts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { services, testimonials, latestPosts } = await pageDataSource({
    services: false,
    testimonials: true,
    latestPosts: true,
  });

  return {
    props: { services, testimonials, latestPosts },
  };
};

export default Home;
