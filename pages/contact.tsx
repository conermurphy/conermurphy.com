import type { GetStaticProps, NextPage } from 'next';
import {
  ContactForm,
  ContactHeader,
  LatestPosts,
  SEO,
  Testimonials,
} from '../components';
import { Post, Service, Testimonial } from '../types';
import { pageDataSource } from '../utils';

interface IProps {
  services: Service[];
  testimonials: Testimonial[];
  latestPosts: Post[];
}

const Home: NextPage<IProps> = ({ testimonials, latestPosts }) => {
  return (
    <>
      <SEO
        metaTitle="Contact Me"
        metaDescription="Got a burning question you want to ask Coner Murphy? Come ask me via the methods here."
      />
      <ContactHeader />
      <ContactForm />
      <LatestPosts posts={latestPosts} />
      <Testimonials testimonials={testimonials} />
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
