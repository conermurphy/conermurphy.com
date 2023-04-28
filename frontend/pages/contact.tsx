import type { GetStaticProps, NextPage } from 'next';
import { ContactForm, Newsletter, PageHero, SEO, Socials } from '../components';
import { Post } from '../types';
import { generateRssFeeds } from '../utils';
import pageDataSource from '../utils/pageDataSource';
import LatestContent from '../components/LatestContent';
import ContactCard from '../components/ContactCard';

interface IProps {
  latestBlogs: Post[];
}

const Contact: NextPage<IProps> = ({ latestBlogs }) => (
  <>
    <SEO
      metaTitle="Contact Me"
      metaDescription="Got a question you want to ask? Or, want to team up on an upcoming project? Here's how to get in touch with me."
    />
    <div className="flex flex-col gap-24">
      <PageHero
        title="Say Hi 👋"
        description="Lorem ipsum dolor sit amet consectetur. At nisi suscipit metus etiam a euismod odio viverra amet."
        tag="Contact"
      />
      <div className="flex flex-col gap-24 items-center justify-center w-full">
        <section className="flex flex-row items-center justify-between w-full max-w-7xl">
          <ContactCard
            tag="Email Me"
            title="hey@conermurphy.com"
            description="Lorem ipsum dolor sit amet consectetur. A arcu amet viverra et ullamcorper eget ac."
            link={
              <a
                href="mailto:hey@conermurphy.com"
                className="text-brand font-heading font-extrabold text-lg"
              >
                Send an email ✉️
              </a>
            }
          />
          <ContactCard
            tag="Socials"
            title={<Socials />}
            description="Lorem ipsum dolor sit amet consectetur. A arcu amet viverra et ullamcorper eget ac."
            link={
              <p className="text-brand font-heading font-extrabold text-lg">
                Follow Me ✅
              </p>
            }
          />
        </section>
        <ContactForm />
      </div>
    </div>
    <LatestContent latestBlog={latestBlogs[0]} link="REPLACE_THIS_LINK" />
    <Newsletter />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeeds();

  const { latestBlogs } = await pageDataSource({
    latestBlogs: true,
  });

  return {
    props: { latestBlogs },
  };
};

export default Contact;
