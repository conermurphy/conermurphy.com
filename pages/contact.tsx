import type { GetStaticProps, NextPage } from 'next';
import { ContactHeader, LatestPosts, SEO, Testimonials } from '../components';
import { PostWithFrontmatter, Service, Testimonial } from '../types';
import { pageDataSource } from '../utils';

interface IProps {
  services: Service[];
  testimonials: Testimonial[];
  latestPosts: PostWithFrontmatter[];
}

const Home: NextPage<IProps> = ({ testimonials, latestPosts }) => {
  return (
    <>
      <SEO metaTitle="Contact Me" metaDescription="Contact Me" />
      <ContactHeader />
      <div id="contact-form">
        <p>Form goes here</p>
      </div>
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
