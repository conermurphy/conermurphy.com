import type { GetStaticProps, NextPage } from 'next';
import {
  LatestPosts,
  SEO,
  Testimonials,
  ContactSection,
  HomeHero,
  Projects,
  AboutMe,
  Services,
} from '../components';
import { Post, POSTTYPES, Project, Service, Testimonial } from '../types';
import { generateRssFeeds, pageDataSource } from '../utils';

interface IProps {
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  latestBlogs: Post[];
  latestNewsletters: Post[];
}

const Home: NextPage<IProps> = ({
  testimonials,
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
    <AboutMe />
    <Services services={services} />
    <Projects projects={projects} />
    <Testimonials testimonials={testimonials} />
    <LatestPosts posts={latestBlogs} postType={POSTTYPES.BLOG} />
    <LatestPosts posts={latestNewsletters} postType={POSTTYPES.NEWSLETTER} />
    <ContactSection />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeeds();

  const { services, testimonials, latestBlogs, latestNewsletters, projects } =
    await pageDataSource({
      services: true,
      projects: true,
      testimonials: true,
      latestBlogs: true,
      latestNewsletters: true,
    });

  return {
    props: { services, projects, testimonials, latestBlogs, latestNewsletters },
  };
};

export default Home;
