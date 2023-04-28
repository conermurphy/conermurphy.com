import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { SEO, PageHero } from '../components';
import { Post } from '../types';
import { pageDataSource } from '../utils';
import LatestContent from '../components/LatestContent';

interface IProps {
  latestBlogs: Post[];
}

function Custom404({ latestBlogs }: IProps): JSX.Element {
  const { asPath } = useRouter();
  const path = asPath.split('/')[1];

  return (
    <>
      <SEO metaTitle="404 - Page Not Found" metaDescription="" url={path} />
      <PageHero title="404 - Page Not Found" />
      <LatestContent latestBlog={latestBlogs[0]} link="TO_BE_REPLACED" />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { latestBlogs } = await pageDataSource({
    latestBlogs: true,
    latestNewsletters: false,
  });

  return {
    props: { latestBlogs },
  };
};

export default Custom404;
