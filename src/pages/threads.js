import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';
import ThreadsPostCard from '../components/ThreadsPostCard';
import { Hero } from '../components/Hero';

const AllPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  & > div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    align-items: flex-start;
    justify-items: center;
    width: clamp(400px, 80vw, 850px);
    gap: 4rem 2rem;
  }
`;

export default function Threads({ data, pageContext, path }) {
  const { edges: twitterThreads, totalCount } = data.threads;
  const { currentPage, skip } = pageContext; // Used for pagination.

  const pageTitle = `Twitter Threads ${currentPage ? `- Page ${currentPage}` : ''}`;

  const heroContent = {
    title: 'Twitter Threads',
    subtitle: 'I publish a lot of free content over on Twitter. Here are all of my threads.',
    CTA: 'Follow me on Twitter',
    CTALink: 'https://twitter.com/MrConerMurphy',
  };

  return (
    <>
      <SEO
        post={{
          slug: path,
          title: pageTitle,
        }}
      />
      <Hero content={heroContent} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base={path}
      />
      <AllPostsContainer>
        <div>
          {twitterThreads.map((thread) => (
            <ThreadsPostCard key={`threadsPostCard-${thread.node.frontmatter.conversationId}`} thread={thread} />
          ))}
        </div>
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
  query ($skip: Int = 0, $pageSize: Int = 8) {
    threads: allMdx(
      limit: $pageSize
      skip: $skip
      sort: { order: DESC, fields: frontmatter___date }
      filter: { fields: { contentCategory: { eq: "threads" } } }
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
