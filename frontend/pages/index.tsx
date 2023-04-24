import type { GetStaticProps, NextPage } from 'next';
import { SEO, HomeHero, Projects, Services, Newsletter } from '../components';
import { Post, Project, Service } from '../types';
import { generateRssFeeds, pageDataSource } from '../utils';
import LatestNewsletterPosts from '../components/LatestNewsletterPosts';
import LatestContent from '../components/LatestContent';

interface IProps {
  services: Service[];
  projects: Project[];
  latestBlogs: Post[];
  latestNewsletters: Post[];
}

const Home: NextPage<IProps> = ({
  services,
  projects,
  latestBlogs,
  latestNewsletters,
}) => (
  <>
    <SEO
      metaTitle="Home"
      metaDescription="Whether it be TypeScript/JavaScript development you need support on or a technical article written, come check out how Coner Murphy can help you."
    />
    <HomeHero />
    <Services services={services} />
    <LatestContent latestBlog={latestBlogs[0]} link="TEST_LINK" />
    <Projects projects={projects} />
    <LatestNewsletterPosts
      posts={latestNewsletters.slice(latestNewsletters.length - 2)}
    />
    <Newsletter />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeeds();

  const { services, latestBlogs, latestNewsletters, projects } =
    await pageDataSource({
      services: true,
      projects: true,
      latestBlogs: true,
      latestNewsletters: true,
    });

  return {
    props: { services, projects, latestBlogs, latestNewsletters },
  };
};

export default Home;
