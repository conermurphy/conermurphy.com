import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  & > * {
    padding: 1rem 2rem;
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

export default function Pagination({ pageSize, totalCount, currentPage, skip, base }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  return (
    <PaginationContainer>
      <Link title="prev page" disabled={!hasPrevPage} to={`/${base}/${prevPage}`}>
        &#8592; <span className="word">Previous</span>{' '}
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link key={`${base}-page-${i}`} className={currentPage === 1 && i === 0 ? 'current' : ''} to={`/${base}/${i > 0 ? i + 1 : ''}`}>
          {i + 1}
        </Link>
      ))}
      <Link title="next page" disabled={!hasNextPage} to={`/${base}/${nextPage}`}>
        <span className="word">Next</span> &#8594;
      </Link>
    </PaginationContainer>
  );
}
