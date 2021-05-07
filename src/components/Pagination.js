import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5rem;
  flex-wrap: wrap;
  gap: 1rem;

  .nextPrevButton {
    background-color: var(--accent);
    color: var(--accentText);
  }

  & > * {
    padding: 1rem 2rem;
    text-decoration: none;
    border-radius: var(--borderRadius);
    font-weight: 600;
    background-color: var(--secondaryBg);

    &[aria-current],
    &.current {
      background-color: var(--accent);
      color: var(--accentText);
    }
    &[disabled] {
      pointer-events: none;
      opacity: 0.5;
      color: var(--primaryText);
      background-color: var(--secondaryBg);
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

  const MotionLink = motion(Link);

  return (
    <PaginationContainer>
      <MotionLink
        title="prev page"
        disabled={!hasPrevPage}
        to={prevLink}
        className="nextPrevButton"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        &#8592; <span className="word">Previous</span>{' '}
      </MotionLink>
      {Array.from({ length: totalPages }).map((_, i) => (
        <MotionLink
          key={`${navigateBase}-page-${i}`}
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          to={`${navigateBase}/${i === 0 ? '' : i + 1}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {i + 1}
        </MotionLink>
      ))}
      <MotionLink
        title="next page"
        disabled={!hasNextPage}
        to={nextLink}
        className="nextPrevButton"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="word">Next</span> &#8594;
      </MotionLink>
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
