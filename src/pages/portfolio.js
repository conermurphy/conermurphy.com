import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import device from '../components/device';
import SEO from '../components/seo';
import PortfolioContentCard from '../components/templates/portfolioContentCard';

const PortfolioContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1em;

  & > header {
    text-align: center;
  }

  @media ${device.tablet} {
    padding: 0 3rem;
  }
`;

const PostContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;

  @media ${device.laptopL} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Portfolio = ({ data }) => {
  const portfolio = data.dataJson.content;
  const { title } = useSiteMetadata();

  return (
    <Layout>
      <SEO
        title={`Portfolio | ${title}`}
        description="My portfolio showcasing my past web development work including both client and personal projects."
      />
      <PortfolioContainer>
        <header>
          <h1>My Portfolio</h1>
          <p>
            Here's all my recent projects I've been working on. Including a mixture of previous client work and personal projects I've
            built.
          </p>
          <p>
            If you have any questions or want to chat about working with me on a future project please get in touch using the methods listed
            on the{' '}
            <Link to="/#contact" style={{ fontWeight: 600 }}>
              Contact Section.
            </Link>
          </p>
        </header>
        <PostContainer>
          {portfolio.map((item, index) => {
            const contentData = {
              link: item.URL,
              technologies: item.technologies,
              title: item.title,
              date: item.date,
              description: item.description,
            };
            return <PortfolioContentCard data={contentData} key={index} />;
          })}
        </PostContainer>
      </PortfolioContainer>
    </Layout>
  );
};

Portfolio.propTypes = {
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
  }),
};

export const query = graphql`
  query {
    dataJson(title: { eq: "Portfolio" }) {
      id
      content {
        title
        type
        URL
        description
        technologies
        date
      }
    }
  }
`;

export default Portfolio;
