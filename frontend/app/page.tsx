import { HomeHero, Projects, Services, Newsletter } from '../components';
import { generateRssFeeds } from '../utils';
import pageDataSource from '../utils/pageDataSource';
import LatestNewsletterPosts from '../components/LatestNewsletterPosts';
import LatestContent from '../components/LatestContent';
import metadataGenerator from '../utils/metadataGenerator';

const metadata = metadataGenerator({
  metaTitle: 'Home',
  metaDescription:
    'Whether it be TypeScript/JavaScript development you need support on or a technical article written, come check out how Coner Murphy can help you.',
  metaImage: {
    title: 'Coner Murphy',
    description: 'Fullstack Web Developer, Content Creator and Indie Hacker.',
  },
});

export default async function Home() {
  await generateRssFeeds();

  const {
    services,
    latestBlogs,
    latestNewsletters,
    projects,
    latestYouTubeVideo,
  } = await pageDataSource({
    services: true,
    projects: true,
    latestBlogs: true,
    latestNewsletters: true,
    latestYouTubeVideo: true,
  });

  return (
    <>
      <div className="flex flex-col gap-24">
        <HomeHero />
        {services ? <Services services={services} /> : null}
      </div>
      <LatestContent
        latestBlog={latestBlogs && latestBlogs[0]}
        latestVideo={latestYouTubeVideo}
      />
      <Projects projects={projects} />
      <LatestNewsletterPosts
        posts={
          latestNewsletters &&
          latestNewsletters.slice(latestNewsletters.length - 2)
        }
      />
      <Newsletter />
    </>
  );
}

export { metadata };
