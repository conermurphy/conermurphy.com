import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    max-width: 90%;
  }

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
  const navigateBase = base.split('/').slice(0, -1).join('/');

  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;

  const prevLink = prevPage === 1 ? navigateBase : `${navigateBase}/${prevPage}`;
  const nextLink = `${navigateBase}/${nextPage}`;

  return (
    <PaginationContainer>
      <Link title="prev page" disabled={!hasPrevPage} to={prevLink}>
        &#8592; <span className="word">Previous</span>{' '}
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          key={`${navigateBase}-page-${i}`}
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          to={`${navigateBase}/${i === 0 ? '' : i + 1}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link title="next page" disabled={!hasNextPage} to={nextLink}>
        <span className="word">Next</span> &#8594;
      </Link>
    </PaginationContainer>
  );
}

Pagination.propTypes = {
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  skip: PropTypes.number,
  base: PropTypes.string,
};
