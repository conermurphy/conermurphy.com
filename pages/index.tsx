import type { GetStaticProps, NextPage } from 'next';
import { Services, Spotlight } from '../components';
import { Service, SPOTLIGHT } from '../types';
import { pageDataSource } from '../utils';

interface IProps {
  services: Service[];
}

const Home: NextPage<IProps> = ({ services }) => {
  return (
    <>
      <Services services={services} />
      <Spotlight type={SPOTLIGHT.TECH} />
      <Spotlight type={SPOTLIGHT.COMPANIES} />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const [{ services }] = pageDataSource({ services: true });
  return {
    props: { services },
  };
};

export default Home;
