import type { GetStaticProps, NextPage } from 'next';
import {
  SEO,
  ContactSection,
  HomeHero,
  Projects,
  Services,
} from '../components';
import { Post, POSTTYPES, Project, Service } from '../types';
import { generateRssFeeds, pageDataSource } from '../utils';
import LatestPost from '../components/LatestPost/LatestPost';

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
    <LatestPost post={latestBlogs[0]} postType={POSTTYPES.BLOG} />
    <Projects projects={projects} />
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
