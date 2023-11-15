import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { SEO, PageHero } from '../components';
import { LatestVideo, Post } from '../types';
import pageDataSource from '../utils/pageDataSource';
import LatestContent from '../components/LatestContent';

interface IProps {
  latestBlogs: Post[];
  latestYouTubeVideo: LatestVideo['items'][0];
}

function Custom404({ latestBlogs, latestYouTubeVideo }: IProps): JSX.Element {
  const { asPath } = useRouter();
  const path = asPath.split('/')[1];

  return (
    <>
      <SEO
        metaTitle="404 - Page Not Found"
        metaDescription=""
        url={path}
        metaImage={{
          title: '404 - Page Not Found',
          description: 'Sorry, this page does not exist.',
        }}
      />
      <PageHero title="Page Not Found" tag="404" />
      <LatestContent
        latestBlogs={latestBlogs}
        latestVideo={latestYouTubeVideo}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { latestBlogs, latestYouTubeVideo } = await pageDataSource({
    latestBlogs: true,
    latestNewsletters: false,
    latestYouTubeVideo: true,
  });

  return {
    props: { latestBlogs, latestYouTubeVideo },
  };
};

export default Custom404;
