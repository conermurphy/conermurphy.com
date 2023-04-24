import type { GetStaticProps, NextPage } from 'next';
import { SEO, Services } from '../components';
import { Service, Testimonial } from '../types';
import { generateRssFeeds, pageDataSource } from '../utils';

interface IProps {
  services: Service[];
  testimonials: Testimonial[];
}

const Contact: NextPage<IProps> = ({ testimonials, services }) => (
  <>
    <SEO
      metaTitle="Contact Me"
      metaDescription="Got a question you want to ask? Or, want to team up on an upcoming project? Here's how to get in touch with me."
    />
    <Services services={services} />
    <Testimonials testimonials={testimonials} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeeds();

  const { services } = await pageDataSource({
    services: true,
  });

  return {
    props: { services },
  };
};

export default Contact;
