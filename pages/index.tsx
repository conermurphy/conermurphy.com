import type { GetStaticProps, NextPage } from 'next';
import { Services, Spotlight, Testimonials } from '../components';
import { Service, SPOTLIGHT, Testimonial } from '../types';
import { pageDataSource } from '../utils';

interface IProps {
  services: Service[];
  testimonials: Testimonial[];
}

const Home: NextPage<IProps> = ({ services, testimonials }) => {
  return (
    <>
      <Spotlight type={SPOTLIGHT.COMPANIES} />
      <Services services={services} />
      <Spotlight type={SPOTLIGHT.TECH} />
      <Testimonials testimonials={testimonials} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { services, testimonials } = await pageDataSource({
    services: true,
    testimonials: true,
  });

  return {
    props: { services, testimonials },
  };
};

export default Home;
