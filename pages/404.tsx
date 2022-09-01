import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { SEO, PageHero, LatestPosts, ContactSection } from '../components';
import { Post, POSTTYPES } from '../types';
import { pageDataSource } from '../utils';

interface IProps {
  latestBlogs: Post[];
  latestNewsletters: Post[];
}

function Custom404({ latestBlogs, latestNewsletters }: IProps): JSX.Element {
  const { asPath } = useRouter();
  const path = asPath.split('/')[1];

  return (
    <>
      <SEO metaTitle="404 - Page Not Found" metaDescription="" url={path} />
      <PageHero title="404 - Page Not Found" showNewsletter={false} is404Page />
      <ContactSection />
      <LatestPosts posts={latestBlogs} postType={POSTTYPES.BLOG} />
      <LatestPosts posts={latestNewsletters} postType={POSTTYPES.NEWSLETTER} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { latestBlogs, latestNewsletters } = await pageDataSource({
    latestBlogs: true,
    latestNewsletters: true,
  });

  return {
    props: { latestBlogs, latestNewsletters },
  };
};

export default Custom404;
