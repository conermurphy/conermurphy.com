import React from 'react';
import pageDataSource from '../utils/pageDataSource';
import { PageHero } from '../components';
import LatestContent from '../components/LatestContent';
import metadataGenerator from '../utils/metadataGenerator';

const metadata = metadataGenerator({
  metaTitle: '404 - Page Not Found',
  metaDescription: 'Sorry, this page does not exist.',
  metaImage: {
    title: '404 - Page Not Found',
    description: 'Sorry, this page does not exist.',
  },
});

async function Custom404() {
  const { latestBlogs, latestYouTubeVideo } = await pageDataSource({
    latestBlogs: true,
    latestNewsletters: false,
    latestYouTubeVideo: true,
  });

  return (
    <>
      <PageHero title="Page Not Found" tag="404" />
      <LatestContent
        latestBlog={latestBlogs && latestBlogs[0]}
        latestVideo={latestYouTubeVideo}
      />
    </>
  );
}

export default Custom404;
export { metadata };
