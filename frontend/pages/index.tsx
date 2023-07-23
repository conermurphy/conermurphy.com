import type { GetStaticProps, NextPage } from 'next';
import { SEO, HomeHero, Projects, Services, Newsletter } from '../components';
import { LatestVideo, Post, Project, Service } from '../types';
import { generateRssFeeds } from '../utils';
import pageDataSource from '../utils/pageDataSource';
import LatestNewsletterPosts from '../components/LatestNewsletterPosts';
import LatestContent from '../components/LatestContent';

interface IProps {
  services: Service[];
  projects: Project[];
  latestBlogs: Post[];
  latestNewsletters: Post[];
  latestYouTubeVideo: LatestVideo['items'][0];
}

const Home: NextPage<IProps> = ({
  services,
  projects,
  latestBlogs,
  latestNewsletters,
  latestYouTubeVideo,
}) => (
  <>
    <SEO
      metaTitle="Home"
      metaDescription="Whether it be TypeScript/JavaScript development you need support on or a technical article written, come check out how Coner Murphy can help you."
      metaImage={{
        title: 'Coner Murphy',
        description:
          'Fullstack Web Developer, Content Creator and Indie Hacker.',
      }}
    />
    <div className="flex flex-col gap-24">
      <HomeHero />
      <Services services={services} />
    </div>
    <LatestContent
      latestBlog={latestBlogs[0]}
      latestVideo={latestYouTubeVideo}
    />
    <Projects projects={projects} />
    <LatestNewsletterPosts
      posts={latestNewsletters.slice(latestNewsletters.length - 2)}
    />
    <Newsletter />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
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

  return {
    props: {
      services,
      projects,
      latestBlogs,
      latestNewsletters,
      latestYouTubeVideo,
    },
  };
};

export default Home;
