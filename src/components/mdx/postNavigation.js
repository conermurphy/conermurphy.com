import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaDice } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-evenly;
  padding: 1rem;
  margin: 0rem;
  margin-top: 2.5rem;
  background-color: var(--secondary-color);

  filter: drop-shadow(0 0 2px var(--drop-shadows));

  &::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-bottom: 1rem solid var(--secondary-color);
    position: absolute;
    top: -1rem;
    left: 10%;
  }
`;

const NavButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  transition: 0.2s all ease;
  background-color: ${props => (props.active ? 'var(--secondary-color)' : 'var(--header-font-color)')};
  border: 2px solid ${props => (props.active ? 'var(--header-font-color)' : 'transparent')};
  border-radius: 0.5rem;
  color: ${props => (props.active ? 'var(--header-color)' : 'var(--secondary-color)')};

  pointer-events: ${props => (props.active ? 'auto' : 'none')};
  cursor: ${props => (props.active ? 'pointer' : 'none')};
  text-decoration: ${props => (props.active ? 'none' : 'line-through')};

  box-shadow: 0px 1px 1px var(--drop-shadows);
  box-shadow: 0px 2px 2px var(--drop-shadows);
  box-shadow: 0px 3px 3px var(--drop-shadows);
`;

const ButtonLink = styled(Link)`
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`;

const navItemHover = {
  scale: 1.1,
  ease: 'easeInOut',
};

const navItemTap = {
  scale: 0.9,
  ease: 'easeInOut',
};

const PostNavigation = ({ pageContext }) => {
  const { prev, next } = pageContext;
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { order: ASC, fields: frontmatter___id }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const totalPosts = data.allMdx.edges;

  const randomPostId = Math.floor(Math.random() * totalPosts.length);

  const randPost = totalPosts[randomPostId];
  const randLink = randPost.node.fields.slug;
  const prevLink = prev !== null ? prev.fields.slug : '/';
  const nextLink = next !== null ? next.fields.slug : '/';

  return (
    <Container>
      <ButtonLink to={prevLink} disabled={prev === null}>
        <NavButton active={prev !== null} whileHover={navItemHover} whileTap={navItemTap}>
          Prev
        </NavButton>
      </ButtonLink>
      <ButtonLink to={randLink}>
        <NavButton active whileHover={navItemHover} whileTap={navItemTap}>
          <FaDice />
        </NavButton>
      </ButtonLink>
      <ButtonLink to={nextLink} disabled={next === null}>
        <NavButton active={next !== null} whileHover={navItemHover} whileTap={navItemTap}>
          Next
        </NavButton>
      </ButtonLink>
    </Container>
  );
};

PostNavigation.propTypes = {
  pageContext: PropTypes.shape({
    prev: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      }),
    }),
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      }),
    }),
  }),
};

export default PostNavigation;
