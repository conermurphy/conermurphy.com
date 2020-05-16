import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Layout from '../components/layout';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import CornerArt from '../components/templates/cornerArt';
import ContentCard from '../components/templates/contentCard';
import LanguageIcons from '../components/templates/languageIcons';
import device from '../components/device';
import SEO from '../components/seo';

const MainContainer = styled.div`
  display: grid;
  grid-template-areas: 'home' 'about' 'portfolio' 'blog' 'contact';
  grid-template-columns: repeat(1, 1fr);
`;

const HomeContainer = styled.section`
  grid-area: home;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  padding-top: 0;
  margin-bottom: 0;
  background-color: var(--secondary-color);
  position: relative;
  height 90vh;
  box-shadow: 0px 2px 2px var(--drop-shadows);
  z-index: 2;
`;

const HomeContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 5rem 1rem;

  @media ${device.laptopL} {
    margin: 5rem;
  }

  @media ${device.desktop} {
    margin: 10rem;
  }
`;

const HomeTitle = styled(motion.h1)`
  font-size: 2rem;
  margin-bottom: 1rem;

  @media ${device.tablet} {
    font-size: 2.5rem;
  }

  @media ${device.desktop} {
    font-size: 3.5rem;
  }
`;

const HomeJobRoles = styled(motion.h2)`
  margin: 1rem 0;
  font-size: 1.5rem;
  font-weight: 400;

  @media ${device.tablet} {
    font-size: 2rem;
  }

  @media ${device.desktop} {
    font-size: 2.25rem;
  }
`;

const HomeButtonContainer = styled(motion.div)`
  display: flex;
  border: 2px solid var(--header-font-color);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 1rem 0;
  width: max-content;
`;

const HomeButton = styled(Link)`
  font-size: 1rem;
  z-index: 2;

  @media ${device.desktop} {
    font-size: 1.25rem;
  }
`;

const AboutContainer = styled.section`
  grid-area: about;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1.5rem;

  & > h3 {
    margin-top: 0;
  }

  @media ${device.tablet} {
    align-items: flex-start;
    width: 75vw;
    background-color: var(--background-color);
    margin: auto;
  }

  @media ${device.desktop} {
    width: 50vw;
  }
`;

const PortfolioContent = styled.section`
  grid-area: portfolio;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);

  @media ${device.laptopL} {
    padding: 1.5rem;
    width: 75vw;
    margin: auto;
    align-items: flex-start;
  }

  @media ${device.desktop} {
    width: 50%;
  }
`;

const BlogContent = styled(PortfolioContent)`
  grid-area: blog;
`;

const PortfolioPosts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;

  @media ${device.laptopL} {
    grid-template-columns: repeat(2, 1fr);

    a:first-child {
      margin-left: 0;
    }
  }
`;

const BlogPosts = styled(PortfolioPosts)``;

const ContactContainer = styled.section`
  display: flex;
  flex-direction: row;
  background-color: var(--secondary-color);
  flex-wrap: wrap;
  position: relative;
  grid-area: contact;
  box-shadow: 0px -2px 2px var(--drop-shadows);

  @media ${device.laptopL} {
    flex-wrap: wrap;
  }

  @media ${device.desktop} {
    flex-wrap: nowrap;
  }
`;

const ContactContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;

  & > h3 {
    margin-top: 0;
  }

  @media ${device.tablet} {
    justify-content: center;
    height: 20vh;
    padding-bottom: 0;
  }

  @media ${device.laptopL} {
    justify-content: center;
    height: 25vh;
    margin: auto;
    width: 75vw;
  }

  @media ${device.desktop} {
    margin: none;
    width: auto;
    flex: 1;
    justify-content: flex-start;
    height: 25vh;
  }
`;

const ContactIconContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > a {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > p {
      margin: 0 1rem;
    }
  }

  @media ${device.tablet} {
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 20vh;
    width: 100%;
  }

  @media ${device.laptopL} {
    justify-content: space-between;
    margin: auto;
    width: 75vw;
  }

  @media ${device.desktop} {
    flex: 1;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: 25vh;
  }
`;

const IconContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0.5rem 0;

  & > svg {
    height: 1rem;
    width: 1rem;
    border: 2px solid var(--header-font-color);
    border-radius: 0.5rem;
    padding: 1rem;
  }
`;

const Index = ({ data }) => {
  const [onDekstop, setOnDesktop] = useState();
  const { title, description } = useSiteMetadata();
  const listDescription = description.split(',');
  const portfolioContent = data.dataJson.content;

  const blogPosts = data.allMdx.edges;
  const portfolioItems = portfolioContent.slice(portfolioContent.length - 2);

  const languagesUsed = ['GatsbyJS', 'HTML', 'CSS', 'JavaScript', 'NodeJS', 'ReactJS', 'GraphQL'];

  let screenViewportQuery = null;

  if (typeof window !== 'undefined') {
    screenViewportQuery = window.matchMedia(device.laptopL);
    const handleViewportResize = evt => setOnDesktop(evt.matches);

    screenViewportQuery.addListener(handleViewportResize);
  }

  const cornerArtAdjustments = onDekstop ? ['75vh', 0, 0, 0] : ['50vh', 0, 0, 0];

  const itemHover = {
    scale: 1.05,
  };

  const itemTap = {
    scale: 0.9,
  };

  const homeContainer = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  const homeJobRoles = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 100 },
  };

  return (
    <Layout>
      <SEO
        title="Home"
        description="The personal portfolio and blog of Coner Murphy. Start your jounrey to becoming a better developer today."
      />
      <MainContainer>
        <HomeContainer>
          <HomeContentContainer initial="hidden" animate="visible" varaints={homeContainer}>
            <HomeTitle variants={homeJobRoles}>{title}.</HomeTitle>
            {listDescription.map((item, index) => (
              <HomeJobRoles variants={homeJobRoles} key={index}>
                {item}.
              </HomeJobRoles>
            ))}

            <HomeButtonContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut" variants={homeJobRoles}>
              <HomeButton to="/#contact">Contact Me</HomeButton>
            </HomeButtonContainer>
          </HomeContentContainer>
          <CornerArt adjustments={cornerArtAdjustments} />
        </HomeContainer>
        <AboutContainer id="about">
          <h3>About Me</h3>
          <p>Hey, I'm Coner a web developer from Norwich 🇬🇧.</p>
          <p>
            I primarily use JavaScript in my work, if you're interested in seeing some of my previous work please check out my{' '}
            <Link to="/portfolio" style={{ fontWeight: 600 }}>
              Portfolio.
            </Link>
          </p>
          <p>
            I also believe in helping others become amazing developers so I release blog posts reguarly, you can see my latest blog post
            above or check out all of them on my{' '}
            <Link to="/blog" style={{ fontWeight: 600 }}>
              Blog.
            </Link>
          </p>
          <p>Currently, the primary technologies I use are:</p>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
            {languagesUsed.map((line, index) => (
              <LanguageIcons language={line} key={index} />
            ))}
          </div>
          <p>But, I'm always looking to add more to this list as I'm always looking to learn new things.</p>
          <p>
            I really hope you enjoy my work and if you want to get in touch with me for any reason, you can do so via the methods listed in
            the{' '}
            <Link to="/#contact" style={{ fontWeight: 600 }}>
              Contact Section.
            </Link>
          </p>
        </AboutContainer>

        <PortfolioContent>
          <h3 style={{ marginTop: '0' }}>Latest Projects</h3>
          <PortfolioPosts>
            {portfolioItems.map((item, index) => {
              const portfolioContentData = {
                internal: false,
                link: item.URL,
                topLine: item.technologies,
                title: item.title,
                bottomLine: item.date,
              };
              return <ContentCard data={portfolioContentData} key={index} />;
            })}
          </PortfolioPosts>
          <HomeButtonContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
            <HomeButton to="/portfolio" style={{ fontSize: '1rem' }}>
              View More
            </HomeButton>
          </HomeButtonContainer>
        </PortfolioContent>
        <BlogContent>
          <h3 style={{ marginTop: '0' }}>Latest Blog Posts</h3>
          <BlogPosts>
            {blogPosts.map(({ node }, index) => {
              const blogcontentData = {
                internal: true,
                link: node.fields.slug,
                topLine: node.frontmatter.languages.join(', '),
                title: node.frontmatter.title,
                bottomLine: `#${node.frontmatter.id} - ${node.frontmatter.date}`,
              };
              return <ContentCard data={blogcontentData} key={index} />;
            })}
          </BlogPosts>
          <HomeButtonContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
            <HomeButton to="/blog" style={{ fontSize: '1rem' }}>
              View More
            </HomeButton>
          </HomeButtonContainer>
        </BlogContent>

        <ContactContainer id="contact">
          <ContactContent>
            <h3>Let's Chat!</h3>
            <p>
              If you have any questions about either my work or me in general I'd be happy to chat with you about them, just get in touch
              with me via one of the shown methods and I'll get back to you as soon as possible.
            </p>
            <p>
              If you have a project in mind you'd like to work with me on, then it's your lucky day I am currently <b>accepting</b> client
              work and would be happy to chat with you about your requirements just get in touch with me via one of the shown methods.
            </p>
          </ContactContent>
          <ContactIconContainer>
            <a href="https://twitter.com/MrConerMurphy" aria-label="Twitter">
              <IconContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
                <FaTwitter />
              </IconContainer>
              <p>@MrConerMurphy</p>
            </a>
            <a href="https://www.instagram.com/mrconermurphy/" aria-label="Instagram">
              <IconContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
                <FaInstagram />
              </IconContainer>
              <p>@MrConerMurphy</p>
            </a>
            <a href="https://github.com/conermurphy" aria-label="Github">
              <IconContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
                <FaGithub />
              </IconContainer>
              <p>Coner Murphy</p>
            </a>
            <a href="https://www.linkedin.com/in/coner-murphy/" aria-label="Linkedin">
              <IconContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
                <FaLinkedin />
              </IconContainer>
              <p>Coner Murphy</p>
            </a>
            <a href="mailto:coner@conermurphy.com" aria-label="Email">
              <IconContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
                <FaEnvelope />
              </IconContainer>
              <p>coner@conermurphy.com</p>
            </a>
          </ContactIconContainer>
        </ContactContainer>
      </MainContainer>
    </Layout>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    dataJson: PropTypes.shape(
      PropTypes.arrayOf({
        node: PropTypes.shape(
          PropTypes.arrayOf(
            PropTypes.shape({
              URL: PropTypes.string,
              description: PropTypes.string,
              technologies: PropTypes.string,
              title: PropTypes.string,
              type: PropTypes.string,
            })
          )
        ),
      }).isRequired
    ),
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              category: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
              languages: PropTypes.array.isRequired,
              id: PropTypes.number.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        })
      ).isRequired,
    }),
  }),
};

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___id, order: DESC }, limit: 2) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD-MM-YYYY")
            category
            description
            languages
            id
          }
          fields {
            slug
          }
        }
      }
    }
    dataJson(title: { eq: "Portfolio" }) {
      content {
        title
        type
        URL
        date
        description
        technologies
      }
    }
  }
`;

export default Index;
