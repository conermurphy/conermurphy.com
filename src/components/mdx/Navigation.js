import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
<<<<<<< HEAD
  padding: 2rem 0;
  width: 100%;

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

  }
=======
  margin: 5rem 0;
>>>>>>> redesign-v4

  & > * {
    padding: 0 2rem;
    text-decoration: none;
    background-color: var(--accent);
    border-radius: var(--borderRadius);
    filter: drop-shadow(var(--shadow));
    font-weight: bold;

    & > div > p {
      color: var(--accentText);
    }

    &[disabled] {
      pointer-events: none;
      opacity: 0.5;
      background-color: var(--secondaryBg);

      & > div > p {
        color: var(--primaryText);
      }
    }
  }
`;

export default function Navigation({ pageContext: { next, prev } }) {
  const hasNextPage = !!next;
  const hasPrevPage = !!prev;

  const prevLink = prev !== null ? prev.fields.slug : '/';
  const nextLink = next !== null ? next.fields.slug : '/';

  const MotionLink = motion(Link);

  return (
    <NavigationContainer>
      <MotionLink title="Previous Page" disabled={!hasPrevPage} to={prevLink} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="previous">
          <p className="link">&#8592; Previous Post</p>
        </div>
      </MotionLink>
      <MotionLink title="Next Page" disabled={!hasNextPage} to={nextLink} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="next">
          <p className="link">Next Post &#8594; </p>
        </div>
      </MotionLink>
    </NavigationContainer>
  );
}
