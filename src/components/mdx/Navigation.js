import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const NavigationContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;

  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > a {
      padding: 2rem;
    }
  }

  & > a {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      text-align: right;

      @media (max-width: 850px) {
        text-align: center;
        align-items: center;
      }

      & > p {
        margin: 0.5rem;
      }
    }

    .previous {
      align-items: flex-start;
      text-align: left;

      @media (max-width: 850px) {
        text-align: center;
        align-items: center;
      }
    }

    .link {
      font-weight: bold;
    }
  }

  & > * {
    padding: 0rem 2rem;
    text-decoration: none;

    &[aria-current],
    &.current {
      color: var(--green);
      font-weight: 600;
      border-bottom: 2px solid var(--green);
    }
    &[disabled] {
      pointer-events: none;
      text-decoration: line-through;
      color: var(--black);
      opacity: 0.5;
    }
  }
`;

export default function Navigation({ pageContext: { next, prev } }) {
  const hasNextPage = !!next;
  const hasPrevPage = !!prev;

  const prevTitle = prev !== null ? prev.frontmatter.title : '';
  const prevLink = prev !== null ? prev.fields.slug : '/';
  const nextTitle = next !== null ? next.frontmatter.title : '';
  const nextLink = next !== null ? next.fields.slug : '/';

  return (
    <NavigationContainer>
      <Link title="Previous Page" disabled={!hasPrevPage} to={prevLink}>
        <div className="previous">
          <p className="link">&#8592; Previous</p>
          <p>{prevTitle}</p>
        </div>
      </Link>
      <Link title="Next Page" disabled={!hasNextPage} to={nextLink}>
        <div className="next">
          <p className="link">Next &#8594; </p>
          <p>{nextTitle}</p>
        </div>
      </Link>
    </NavigationContainer>
  );
}
