import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useNavTheme from '../utils/useNavTheme';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';
import ThreadsPostCard from '../components/ThreadsPostCard';
import TagFilter from '../components/TagFilter';

const AllPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  padding: 1rem 4rem;

  * {
    text-decoration: none;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

export default function Threads({ data, pageContext, path }) {
  const { edges: twitterThreads, totalCount } = data.threads;
  const { currentPage, skip, tag } = pageContext; // Used for pagination.

  useNavTheme('dark');

  let pageTitle;

  if (tag) {
    pageTitle = `${tag} Twitter Threads ${currentPage ? `- Page ${currentPage}` : ''}`;
  } else {
    pageTitle = `Twitter Threads ${currentPage ? `- Page ${currentPage}` : ''}`;
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
        <h1>Twitter Threads</h1>
      </div>
      <TagFilter base="threads" activeTag={tag} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base={path}
      />
      <AllPostsContainer>
        {twitterThreads.map((thread) => (
          <ThreadsPostCard key={`threadsPostCard-${thread.node.frontmatter.conversationId}`} thread={thread} />
        ))}
      </AllPostsContainer>
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
  query($skip: Int = 0, $pageSize: Int = 6, $tag: String) {
    threads: allMdx(
      limit: $pageSize
      skip: $skip
      sort: { order: DESC, fields: frontmatter___date }
      filter: { fields: { contentCategory: { eq: "threads" } }, frontmatter: { tags: { eq: $tag } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            tags
            conversationId
            title
            numberOfTweets
            retweetCount
            likeCount
          }
        }
      }
      totalCount
    }
  }
`;

Threads.propTypes = {
  data: PropTypes.shape({
    threads: PropTypes.shape({
      edges: PropTypes.array,
      totalCount: PropTypes.number,
    }),
  }),
  pageContext: PropTypes.shape({
    currentPage: PropTypes.string,
    skip: PropTypes.number,
    tag: PropTypes.string,
  }),
  path: PropTypes.string,
};
