import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import useNavTheme from '../utils/useNavTheme';
import Pagination from '../components/Pagination';
import TagFilter from '../components/TagFilter';
import SEO from '../components/SEO';
import ReadsCard from '../components/ReadsCard';

const PageContainer = styled.div`
  @media (max-width: 400px) {
    & > p {
      text-align: center;
    }
  }
`;

const AllReadsContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > a :last-child {
    > div:last-child {
      border-bottom: none;
    }
  }

  * {
    text-decoration: none;
  }
`;

export default function Reads({ data, pageContext, path }) {
  const { edges: reads, totalCount } = data.reads;
  const { currentPage, skip, tag } = pageContext;

  // Setting the nav theme for this page
  useNavTheme('dark');

  let pageTitle;

  if (tag) {
    pageTitle = `${tag} Reads ${currentPage ? `- Page ${currentPage}` : ''}`;
  } else {
    pageTitle = `Reads ${currentPage ? `- Page ${currentPage}` : ''}`;
  }

  return (
    <PageContainer>
      <SEO
        post={{
          slug: path,
          title: pageTitle,
        }}
      />
      <div className="headerTitleSeperator">
        <h1>Reads</h1>
      </div>
      <p>
        Below is a list of all the books that either read or am in the process of reading. This page is more of a personal tracker to
        replace the many lists and notebooks I've had over the years. As I was re-designing my website when I thought about this doing I
        decided to intergrate it and share it with the world.
      </p>
      <p>
        All the content sourced here with the exceptions of the status, start and finish dates, ratings and pageCounts have come from the{' '}
        <a href="https://developers.google.com/books" target="_blank" rel="noopener noreferrer">
          Google Books API.
        </a>
      </p>
      <TagFilter base="reads" activeTag={tag} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base={path}
      />
      <AllReadsContainer>
        {reads.map(({ node: read }) => (
          <ReadsCard key={read.items[0].id} read={read} />
        ))}
      </AllReadsContainer>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base={path}
      />
    </PageContainer>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 6, $tagRegex: String) {
    reads: allReads(
      limit: $pageSize
      skip: $skip
      sort: { fields: fields___finished, order: DESC }
      filter: { items: { elemMatch: { volumeInfo: { categories: { regex: $tagRegex } } } } }
    ) {
      edges {
        node {
          items {
            volumeInfo {
              title
              categories
              authors
              description
              infoLink
            }
            id
          }
          localFile {
            childImageSharp {
              fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          fields {
            status
            start
            finished
            pageCount
            rating
          }
        }
      }
      totalCount
    }
  }
`;

Reads.propTypes = {
  data: PropTypes.shape({
    reads: PropTypes.shape({
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
