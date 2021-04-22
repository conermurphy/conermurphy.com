import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import useNavTheme from '../utils/useNavTheme';
import SEO from '../components/SEO';
import PortfolioPostCard from '../components/PortfolioPostCard';
import Pagination from '../components/Pagination';

const AllPortfolioContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 4rem;
  padding: 1rem 4rem;

  * {
    text-decoration: none;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

export default function Portfolio({ data, pageContext, path }) {
  const { edges: portfolioPosts, totalCount } = data.portfolioNodes;
  const { currentPage, skip, tag } = pageContext;
  // Setting the nav theme for this page
  useNavTheme('dark');

  let pageTitle;

  if (tag) {
    pageTitle = `${tag} Portfolio Posts ${currentPage ? `- Page ${currentPage}` : ''}`;
  } else {
    pageTitle = `Portfolio ${currentPage ? `- Page ${currentPage}` : ''}`;
  }

  return (
    <>
      <SEO
        post={{
          slug: path,
          title: pageTitle,
        }}
      />
      <div className="headerTitleSeperator">
        <h1>Portfolio</h1>
      </div>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base={path}
      />
      <AllPortfolioContainer>
        {portfolioPosts.map(({ node: post }) => (
          <PortfolioPostCard key={post.id} post={post} />
        ))}
      </AllPortfolioContainer>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base={path}
      />
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 6, $tagRegex: String) {
    portfolioNodes: allPortfolio(
      limit: $pageSize
      skip: $skip
      sort: { order: DESC, fields: date }
      filter: { tags: { regex: $tagRegex } }
    ) {
      edges {
        node {
          tags
          repo
          id
          description
          date(formatString: "DD/MM/YYYY")
          URL
          type
          title
          image
        }
      }
      totalCount
    }
  }
`;

Portfolio.propTypes = {
  data: PropTypes.shape({
    portfolioNodes: PropTypes.shape({
      totalCount: PropTypes.number,
      edges: PropTypes.array,
    }),
  }),
  path: PropTypes.string,
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    skip: PropTypes.number,
    tag: PropTypes.string,
  }),
};
