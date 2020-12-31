import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { count } from '../utils/countTagsInPosts';

const BlogPostTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem;

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

export default function NoteCategoryFilter({ activeCat }) {
  // query for all of the tags
  const {
    cats: { edges: cats },
  } = useStaticQuery(graphql`
    query {
      cats: allMdx(filter: { fields: { contentCategory: { eq: "notes" } } }) {
        edges {
          node {
            fields {
              noteCategory
            }
          }
        }
      }
    }
  `);

  // Get a complete list of all of the note categories
  const totalArray = cats.map(({ node }) => node.fields.noteCategory).flat();

  // count the total amount of tags for every post
  const countedArray = count(totalArray);

  return (
    <BlogPostTagContainer>
      <Link to="/notes" className={!activeCat ? 'active' : ''}>
        <span className="tag">All</span>
        <span className="count">{cats.length}</span>
      </Link>
      {countedArray.map(({ tag: cat, count: catCount }) => (
        <Link
          to={`/notes/${cat.toLowerCase()}/`}
          key={`NoteCategoryCatFilter-${cat}-${cat.count}`}
          className={cat === activeCat ? 'active' : ''}
        >
          <span className="tag">{cat}</span>
          <span className="count">{catCount}</span>
        </Link>
      ))}
    </BlogPostTagContainer>
  );
}
