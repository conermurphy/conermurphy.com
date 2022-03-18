import type { GetStaticProps, NextPage } from 'next';
import { Services, Spotlight } from '../components';
import { Service, SPOTLIGHTTYPE } from '../types';
import { pageDataSource } from '../utils';

interface IProps {
  services: Service[];
}

const Home: NextPage<IProps> = ({ services }) => {
  return (
    <>
      <Services services={services} />
      <Spotlight type={SPOTLIGHTTYPE.TECH} />
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
