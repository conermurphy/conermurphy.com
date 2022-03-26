import type { GetStaticProps, NextPage } from 'next';
import { Testimonials, PageHero } from '../components';
import { Testimonial } from '../types';
import { pageDataSource } from '../utils';

interface IProps {
  testimonials: Testimonial[];
}

const Blog: NextPage<IProps> = ({ testimonials }) => {
  return (
    <>
      <PageHero
        title="My Content"
        body="Blog posts, tutorials, technical writing and much more. All of my
            content in one place to enjoy..."
      />
      <Testimonials testimonials={testimonials} />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const { testimonials } = pageDataSource({
    services: false,
    testimonials: true,
  });

  return {
    props: { testimonials },
  };
};

export default Blog;
