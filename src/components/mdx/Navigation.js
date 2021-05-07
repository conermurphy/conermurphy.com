import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 5rem;

  & > * {
    padding: 0 2rem;
    text-decoration: none;
    background-color: var(--accent);
    color: var(--accentText);
    border-radius: var(--borderRadius);
    filter: drop-shadow(var(--shadow));
    font-weight: bold;

    &[disabled] {
      pointer-events: none;
      opacity: 0.5;
      color: var(--primaryText);
      background-color: var(--secondaryBg);
    }
  }
`;

export default function Navigation({ pageContext: { next, prev } }) {
  const hasNextPage = !!next;
  const hasPrevPage = !!prev;

  const prevLink = prev !== null ? prev.fields.slug : '/';
  const nextLink = next !== null ? next.fields.slug : '/';

  return (
    <NavigationContainer>
      <Link title="Previous Page" disabled={!hasPrevPage} to={prevLink}>
        <div className="previous">
          <p className="link">&#8592; Previous Post</p>
        </div>
      </Link>
      <Link title="Next Page" disabled={!hasNextPage} to={nextLink}>
        <div className="next">
          <p className="link">Next Post &#8594; </p>
        </div>
      </Link>
    </NavigationContainer>
  );
}
