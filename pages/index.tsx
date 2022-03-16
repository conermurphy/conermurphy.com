import type { GetStaticProps, NextPage } from 'next';
import { Services } from '../components';
import { Service } from '../types';
import { pageDataSource } from '../utils';

interface IProps {
  services: Service[];
}

const Home: NextPage<IProps> = ({ services }) => {
  return (
    <div>
      <h1>Coner Murphy</h1>
      <Services services={services} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const [{ services }] = pageDataSource({ services: true });
  return {
    props: { services }, // will be passed to the page component as props
  };
};

export default Home;
