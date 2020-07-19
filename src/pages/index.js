import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Layout from '../components/layout';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import BlogContentCard from '../components/templates/blogContentCard';
import PortfolioContentCard from '../components/templates/portfolioContentCard';
import device from '../components/device';
import SEO from '../components/seo';
import HomeInfoCards from '../components/homeInfoCards';
import LanguageScroller from '../components/LanguageScroller';
import ContactIcons from '../components/ContactIcons';

const MainContainer = styled.div`
  display: grid;
  grid-template-areas: 'home' 'scroller' 'portfolio' 'blog' 'contact';
  grid-template-columns: repeat(1, 1fr);
`;

const HomeContainer = styled.section`
  grid-area: home;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 0;
  margin-bottom: 0;
  background-color: var(--secondary-color);
  position: relative;
  z-index: 2;
  overflow: hidden;
`;

const HomeContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: -webkit-fill-available;
  margin: 0rem;
  margin-bottom: 0;

  @media ${device.desktop} {
    height: calc(100vh - 5vh);
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: 100%;
  }
`;

const HomeTitleSection = styled.div`
  @media ${device.desktop} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 5rem;
  }
`;

const HomeAboutSection = styled.div`
  width: inherit;
  max-width: 80rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${device.desktop} {
    height: inherit;
    background-color: var(--background-color);
    overflow-x: hidden;
  }
`;

const HomeTitle = styled(motion.h1)`
  text-align: center;
  font-size: 2.5rem;

  @media ${device.tablet} {
    font-size: 3.5rem;
  }

  @media ${device.desktop} {
    font-size: 15rem;
    position: relative;
    text-transform: uppercase;
    text-align: left;
    line-height: 0.75;
    margin: 0;
    margin-bottom: 2rem;
    z-index: 3;

    ::after {
      content: 'Coner Murphy';
      position: absolute;
      top: -4px;
      left: 4px;
      color: var(--body-font-color);
    }
  }
`;

const AboutText = styled.div`
  width: 80%;
  text-align: center;
  margin-bottom: 2.5rem;

  @media ${device.laptopL} {
    margin-bottom: 0;
  }

  & > h3 {
    font-size: 2rem;
  }

  & > p,
  a {
    font-size: 1.1rem;
  }
`;

const HomeButtonContainer = styled(motion.div)`
  display: flex;
  border: 2px solid var(--header-font-color);
  border-radius: 10px;
  width: auto;
  align-items: center;
  justify-content: center;
`;

const HomeViewMoreContainer = styled(HomeButtonContainer)`
  display: none;

  @media ${device.laptopL} {
    display: block;
    margin: 2.5rem;
  }
`;

const HomeButton = styled(Link)`
  font-size: 1rem;
  z-index: 2;
  margin: 1rem;
`;

const PortfolioContent = styled.section`
  grid-area: portfolio;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  padding-top: 2rem;

  @media ${device.laptopL} {
    padding: 1.5rem;
    width: 75vw;
    margin: auto;
    align-items: center;
  }

  @media ${device.desktop} {
    max-width: 80rem;
  }

  & > h3 {
    margin: 1rem 0;
    font-size: 2rem;
  }
`;

const BlogContent = styled(PortfolioContent)`
  grid-area: blog;
  padding-bottom: 2rem;
`;

const PortfolioPosts = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const BlogPosts = styled(PortfolioPosts)`
  margin-bottom: 2rem;
`;

const ContactContainer = styled.section`
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-color);
  flex-wrap: wrap;
  position: relative;
  grid-area: contact;

  @media ${device.laptopL} {
    flex-wrap: wrap;
  }
`;

const ContactContent = styled.div`
  padding: 2rem;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  text-align: center;

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
    margin: auto;
    width: 60vw;
    flex: 1;
    justify-content: center;
    height: 25vh;
  }
`;

const Index = ({ data }) => {
  const { title } = useSiteMetadata();
  const portfolioContent = data.dataJson.content;

  const blogPosts = data.allMdx.edges;
  const portfolioItems = portfolioContent.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 2);

  const handleClick = e => {
    const destination = e.currentTarget.attributes.href.value.slice(1);
    document
      .querySelector(destination)
      .querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])')[0]
      .focus();
  };

  const itemHover = {
    scale: 1.05,
  };

  const itemTap = {
    scale: 0.9,
  };

  return (
    <Layout>
      <SEO
        title={`Home | ${title}`}
        description="The personal portfolio and blog of Coner Murphy. Start your journey to becoming a better developer today."
      />
      <MainContainer>
        <HomeContainer>
          <HomeContentContainer initial="hidden" animate="visible">
            <HomeTitleSection>
              <HomeTitle>{title}</HomeTitle>
              <ContactIcons />
            </HomeTitleSection>
            <HomeAboutSection>
              <HomeInfoCards style={{ gridArea: 'scroller' }} />
              <AboutText>
                <h3>About Me</h3>
                <p>Hey, I'm Coner a web developer from Norwich 🇬🇧.</p>
                <p>
                  I primarily use JavaScript in my work, if you're interested in seeing some of my previous work please check out my{' '}
                  <Link to="/portfolio" style={{ fontWeight: 600 }}>
                    Portfolio.
                  </Link>
                </p>
                <p>
                  I also believe in helping others become amazing developers so I release blog posts regularly, you can see my latest blog
                  post above or check out all of them on my{' '}
                  <Link to="/blog" style={{ fontWeight: 600 }}>
                    Blog.
                  </Link>
                </p>
                <p>
                  I really hope you enjoy my work and if you want to get in touch with me for any reason, you can do so via the methods
                  listed in the{' '}
                  <Link to="/#contact" style={{ fontWeight: 600 }} onClick={handleClick}>
                    Contact Section.
                  </Link>
                </p>
              </AboutText>

              <HomeViewMoreContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
                <HomeButton to="/#portfolio" onClick={handleClick}>
                  View More...
                </HomeButton>
              </HomeViewMoreContainer>
            </HomeAboutSection>
          </HomeContentContainer>
        </HomeContainer>
        <LanguageScroller />
        <PortfolioContent id="portfolio">
          <h3 style={{ marginLeft: '1rem' }}>Latest Projects</h3>
          <PortfolioPosts>
            {portfolioItems.map((item, index) => {
              const portfolioContentData = {
                link: item.URL,
                technologies: item.technologies,
                title: item.title,
                date: item.date,
                description: item.description,
                repo: item.repo,
                image: item.image,
              };
              return <PortfolioContentCard data={portfolioContentData} key={index} />;
            })}
            <BlogContentCard
              data={{ link: '/portfolio', topLine: ['See More'], title: 'Want to see more posts?', bottomLine: 'Click here...' }}
            />
          </PortfolioPosts>
        </PortfolioContent>
        <BlogContent>
          <h3 style={{ marginLeft: '1rem' }}>Latest Blog Posts</h3>
          <BlogPosts>
            {blogPosts.map(({ node }, index) => {
              const blogcontentData = {
                link: node.fields.slug,
                topLine: node.frontmatter.tags,
                title: node.frontmatter.title,
                bottomLine: `#${node.frontmatter.id} - ${node.frontmatter.date}`,
              };
              return <BlogContentCard data={blogcontentData} key={index} />;
            })}
            <BlogContentCard
              data={{ link: '/blog', topLine: ['See More'], title: 'Want to see more posts?', bottomLine: 'Click here...' }}
            />
          </BlogPosts>
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
          <ContactIcons />
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
              repo: PropTypes.string,
              image: PropTypes.string,
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
              series: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
              tags: PropTypes.array.isRequired,
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
            date(formatString: "DD/MM/YYYY")
            series
            description
            tags
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
        repo
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default Index;
