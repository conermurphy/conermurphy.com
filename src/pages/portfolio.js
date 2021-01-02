import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import useNavTheme from '../utils/useNavTheme';
import SEO from '../components/SEO';
import PortfolioPostCard from '../components/PortfolioPostCard';
import TagFilter from '../components/TagFilter';
import Pagination from '../components/Pagination';

const AllPortfolioContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  padding: 1rem 5rem;

  * {
    text-decoration: none;
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
      <TagFilter base="portfolio" activeTag={tag} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_BLOG_PAGE_SIZE)}
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
        pageSize={parseInt(process.env.GATSBY_BLOG_PAGE_SIZE)}
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
