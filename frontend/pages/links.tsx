import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import {
  IoGlobeOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoTiktok,
  IoLogoTwitter,
  IoLogoYoutube,
} from 'react-icons/io5';
import { ComponentWrapper, SEO } from '../components';
import { LatestVideo, Post, Project } from '../types';
import { generateRssFeeds } from '../utils';
import pageDataSource from '../utils/pageDataSource';
import LatestContent from '../components/LatestContent';

interface IProps {
  projects: Project[];
  latestBlogs: Post[];
  latestYouTubeVideo: LatestVideo['items'][0];
}

const Links: NextPage<IProps> = ({ latestBlogs, latestYouTubeVideo }) => {
  const linksToDisplay = [
    {
      title: 'My Website',
      url: 'https://conermurphy.com',
      icon: <IoGlobeOutline />,
      internal: true,
    },
    {
      title: 'My Blog',
      url: 'https://conermurphy.com/blog',
      icon: <IoGlobeOutline />,
      internal: true,
    },
    {
      title: 'YouTube Channel',
      url: 'https://www.youtube.com/@conermurphy',
      icon: <IoLogoYoutube />,
      internal: false,
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com/mrconermurphy',
      icon: <IoLogoTwitter />,
      internal: false,
    },
    {
      title: 'Threads App',
      url: 'https://www.threads.net/@mrconermurphy',
      icon: <IoGlobeOutline />,
      internal: false,
    },
    {
      title: 'TikTok',
      url: 'https://www.tiktok.com/@conermurphy',
      icon: <IoLogoTiktok />,
      internal: false,
    },
    {
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/conermurphy/',
      icon: <IoLogoLinkedin />,
      internal: false,
    },
    {
      title: 'GitHub',
      url: 'https://github.com/conermurphy/',
      icon: <IoLogoGithub />,
      internal: false,
    },
    {
      title: 'Contact Me',
      url: 'https://conermurphy.com/contact',
      icon: <IoGlobeOutline />,
      internal: true,
    },
  ];

  const linkStyles =
    'flex flex-row items-center gap-2 text-base lg:text-xl text-text/90 border-2 border-brand py-3 px-4 rounded-md hover:bg-brand/25 hover:font-bold duration-300 ease-in-out transition-all';

  return (
    <>
      <SEO
        metaTitle="Links"
        metaDescription="Want to find out more about Coner Murphy? Check out all my links and platforms here."
      />
      <ComponentWrapper
        data={{
          title: 'My Platforms',
          tag: 'Links',
          description:
            "Here's everywhere you can find me online and get in touch with me.",
        }}
      >
        <div className="flex flex-row items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-7xl">
            {linksToDisplay.map((link) => (
              <div key={link.title} className="flex flex-col gap-4">
                {link.internal ? (
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={linkStyles}>
                      {link.icon}
                      {link.title}
                    </span>
                  </Link>
                ) : (
                  <a
                    className={linkStyles}
                    target="_blank"
                    href={link.url}
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                    {link.title}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </ComponentWrapper>
      <LatestContent
        latestBlog={latestBlogs[0]}
        latestVideo={latestYouTubeVideo}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeeds();

  const { latestBlogs, latestYouTubeVideo } = await pageDataSource({
    services: false,
    projects: false,
    latestBlogs: true,
    latestNewsletters: false,
    latestYouTubeVideo: true,
  });

  return {
    props: {
      latestBlogs,
      latestYouTubeVideo,
    },
  };
};

export default Links;
