import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

const PortfolioPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow);

  .gatsby-image-wrapper {
    width: 100%;
    overflow: visible;
  }

  .contentContainer {
    display: grid;
    grid-template-rows: auto 1fr;
    margin: 2rem;
    align-items: center;
    justify-items: center;
    text-align: center;

    & > h2 {
      font-size: 1.75rem;
      margin: 1rem 0;
      padding: 1rem 0;
    }
  }

  .contentFooter {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    align-items: center;
    justify-content: center;
    border-top: 2px solid var(--grey);
    padding: 1rem;

    & > p {
      font-weight: bold;
      font-size: 1.5rem;
    }

    & > a,
    p {
      text-align: center;

      & > svg {
        width: 2.5rem;
        height: 2.5rem;
      }
    }

    @media (max-width: 600px) {
      grid-template-columns: 100%;

      & > p,
      svg {
        margin: 1rem;
      }
    }
  }
`;

export default function PortfolioPostCard({ post }) {
  // Querying for all images used for the portfolio.
  const data = useStaticQuery(graphql`
    query {
      portfolioImages: allFile(filter: { relativePath: { regex: "/portfolioImages/i" } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  `);

  // Destructing out values
  const { edges: portfolioImage } = data.portfolioImages;
  const { tags, repo, id, description, date, URL, type, title, image } = post;

  // Flatten the entire array of images returned from graphQL into one array
  const flattendImageArray = portfolioImage.map(({ node }) => node).flat();

  // Seach through the above array of GraphQL images and return the one that includes the name of the image passed in the original portfolio JSON file mapped into this component from the portfolio page
  const { childImageSharp: imageToDisplay } = flattendImageArray.find(({ name }) => image.includes(name));

  // Returning the post card template.
  return (
    <PortfolioPostContainer>
      <GatsbyImage image={imageToDisplay.gatsbyImageData} />
      <div className="contentContainer">
        <h2>{title}</h2>
      </div>
      <div className="contentFooter">
        <p>{date}</p>
        <a href={URL} aria-label={`Link to ${title}`}>
          <FaExternalLinkAlt />
        </a>
        {repo ? (
          <a href={repo} aria-label={`Link to code repository for ${title}`}>
            <FaGithub />
          </a>
        ) : undefined}
      </div>
    </PortfolioPostContainer>
  );
}

PortfolioPostCard.propTypes = {
  post: PropTypes.shape({
    tags: PropTypes.array,
    repo: PropTypes.string,
    id: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    URL: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
  }),
};
