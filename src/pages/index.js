import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import CornerArt from '../components/templates/cornerArt';
import ContentCard from '../components/templates/contentCard';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  padding-top: 0;
  margin-bottom: 0;
  background-color: var(--secondary-color);
  position: relative;

  & > a {
    border: 2px solid var(--header-font-color);
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 2rem 0 0rem 0;
  }
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2rem;

  & > h3 {
    margin-top: 0;
  }
`;

const BlogAndWorkContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const WorkContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--secondary-color);
`;

const BlogContent = styled(WorkContent)``;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
`;

const ContactContent = styled.div`
  padding: 2rem;
  background-color: var(--secondary-color);

  & > h3 {
    margin-top: 0;
  }
`;

const ContactIconContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex=start;
  background-color: var(--background-color);

  & > a {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > svg {
      height: 1rem;
      width: 1rem;
      border: 2px solid var(--body-font-color);
      border-radius: 0.5rem;
      padding: 1rem;
      margin: 1rem 1rem 0 0;
    }
  }
`;

const Index = ({ data }) => {
  const { title, description } = useSiteMetadata();
  const listDescription = description.split(',');
  const portfolioContent = data.dataJson.content;

  console.log(data);
  const lastBlogItem = data.allMdx.edges[0].node;
  const lastPortfolioItem = portfolioContent.pop();

  const workcontentData = {
    internal: false,
    link: lastPortfolioItem.URL,
    topLine: lastPortfolioItem.technologies,
    title: lastPortfolioItem.title,
    bottomLine: lastPortfolioItem.date,
  };

  const blogcontentData = {
    internal: true,
    link: lastBlogItem.fields.slug,
    topLine: lastBlogItem.frontmatter.languages.join(', '),
    title: lastBlogItem.frontmatter.title,
    bottomLine: `Post ${lastBlogItem.fields.postId} - ${lastBlogItem.frontmatter.date}`,
  };

  return (
    <Layout>
      <PageContainer>
        <h1>{title}</h1>
        {listDescription.map((item, index) => (
          <h2 style={{ marginBottom: 0, fontSize: '1.2rem', fontWeight: 400 }} key={index}>
            {item}
          </h2>
        ))}
        <Link to="/#contact">Contact Me</Link>
        <CornerArt adjustments={[2.5, 0, 0, 0]} />
      </PageContainer>
      <AboutContainer id="about">
        <h3>About Me</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus suscipit sed magna vitae facilisis. Nullam et arcu vitae enim
          mollis laoreet non id leo. Suspendisse sollicitudin leo nec velit pulvinar, nec pretium quam mollis. Nulla a neque eu nulla
          sollicitudin maximus malesuada a sem. Phasellus sodales mauris id dui fermentum eleifend. Maecenas commodo egestas quam quis
          commodo. Vivamus pretium ex varius congue pharetra. Etiam cursus cursus diam, sit amet condimentum nibh blandit eget. Curabitur
          egestas dignissim ante vitae placerat. Etiam sit amet mauris vitae turpis accumsan convallis. Nulla vel justo metus.
        </p>
      </AboutContainer>
      <BlogAndWorkContainer>
        <WorkContent>
          <h4>My Latest Project</h4>
          <ContentCard data={workcontentData} key={workcontentData.title} />
        </WorkContent>
        <BlogContent>
          <h4>My Latest Blog Post</h4>
          <ContentCard data={blogcontentData} key={blogcontentData.title} />
        </BlogContent>
      </BlogAndWorkContainer>
      <ContactContainer id="contact">
        <ContactContent>
          <h3>Let's Chat!</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus suscipit sed magna vitae facilisis. Nullam et arcu vitae enim
            mollis laoreet non id leo. Suspendisse sollicitudin leo nec velit pulvinar, nec pretium quam mollis. Nulla a neque eu nulla
            sollicitudin maximus malesuada a sem. Phasellus sodales mauris id dui fermentum eleifend.
          </p>
        </ContactContent>
        <ContactIconContainer>
          <a href="https://twitter.com/MrConerMurphy" aria-label="Twitter">
            <FaTwitter />
            <p>@MrConerMurphy</p>
          </a>
          <a href="https://www.instagram.com/mrconermurphy/" aria-label="Instagram">
            <FaInstagram />
            <p>@MrConerMurphy</p>
          </a>
          <a href="https://github.com/conermurphy" aria-label="Github">
            <FaGithub />
            <p>Coner Murphy</p>
          </a>
          <a href="https://www.linkedin.com/in/coner-murphy/" aria-label="Linkedin">
            <FaLinkedin />
            <p>Coner Murphy</p>
          </a>
          <a href="mailto:coner@conermurphy.com" aria-label="Email">
            <FaEnvelope />
            <p>coner@conermurphy.com</p>
          </a>
        </ContactIconContainer>
      </ContactContainer>
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
    allMdx: PropTypes.arrayOf({
      edges: PropTypes.shape({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            languages: PropTypes.array.isRequired,
          }),
          body: PropTypes.string.isRequired,
          timeToRead: PropTypes.number.isRequired,
          id: PropTypes.string.isRequired,
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }),
        }),
      }).isRequired,
    }),
  }),
};

export const query = graphql`
  query {
    allMdx(sort: { fields: fields___postId, order: DESC }, limit: 1) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD-MM-YYYY")
            category
            description
            languages
          }
          fields {
            postId
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
