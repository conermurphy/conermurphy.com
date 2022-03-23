import type { GetStaticProps, NextPage } from 'next';
import { Services, Testimonials } from '../components';
import { Service, Testimonial } from '../types';
import { pageDataSource } from '../utils';

interface IProps {
  services: Service[];
  testimonials: Testimonial[];
}

const Blog: NextPage<IProps> = ({ services, testimonials }) => {
  return (
    <>
      <Services services={services} />
      <Testimonials testimonials={testimonials} />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const { services, testimonials } = pageDataSource({
    services: true,
    testimonials: true,
  });

  return {
    props: { services, testimonials },
  };
};

export default Blog;
