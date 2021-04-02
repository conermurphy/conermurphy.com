import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import countTags from '../utils/countTags';

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem;
  /* max-width: 800px; */

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background-color: var(--grey);
    text-decoration: none;
    padding: 0.5rem 1rem;

    .count {
      background-color: var(--white);
      border-radius: 2px;
      padding: 0 0.5rem;
    }
  }
  .active {
    background-color: var(--green);
    color: var(--white);

    .count {
      color: var(--black);
    }
  }
`;

export default function TagFilter({ base, activeTag }) {
  const data = useStaticQuery(graphql`
    query {
      notes: allMdx(filter: { fields: { contentCategory: { eq: "notes" } } }) {
        edges {
          node {
            fields {
              noteCategory
            }
          }
        }
      }
      blog: allMdx(filter: { fields: { contentCategory: { eq: "blog" } } }) {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
      threads: allMdx(filter: { fields: { contentCategory: { eq: "threads" } } }) {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
      portfolio: allPortfolio {
        edges {
          node {
            tags
          }
        }
      }
      reads: allReads {
        edges {
          node {
            items {
              volumeInfo {
                categories
              }
            }
          }
        }
      }
    }
  `);

  // get totalTags array and a breakdown of each tag and how many pieces of content are on it.
  const { totalTagArray, sortedTags: tagsWithCounts } = countTags(base, data);

  return (
    <TagContainer>
      <Link to={`/${base}`} className={!activeTag ? 'active' : ''}>
        <span className="tag">All</span>
        <span className="count">{totalTagArray.length}</span>
      </Link>
      {tagsWithCounts.map(({ tag, count }) => {
        if (tag === null) {
          return;
        }
        return (
          <Link
            to={`/${base}/${tag.toLowerCase().replace(' ', '-')}/`}
            key={`${base}-TagFilter-${tag}-${tag.count}`}
            className={tag === activeTag ? 'active' : ''}
          >
            <span className="tag">{tag}</span>
            <span className="count">{count}</span>
          </Link>
        );
      })}
    </TagContainer>
  );
}

TagFilter.propTypes = {
  base: PropTypes.string,
  activeTag: PropTypes.string,
};
