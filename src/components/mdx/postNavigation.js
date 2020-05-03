import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { FaDice } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 2rem;
`;

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  transition: 0.2s all ease;
  background-color: ${props => (props.available ? 'var(--secondary-color)' : 'var(--header-font-color)')};
  border: 1px solid ${props => (props.available ? 'var(--header-font-color)' : 'var(--secondary-color)')};
  border-radius: 0.5rem;
  color: ${props => (props.available ? 'var(--header-color)' : 'var(--secondary-color)')};

  box-shadow: 0px 1px 1px rgba(200, 200, 200, 10);
  box-shadow: 0px 2px 2px rgba(200, 200, 200, 10);
  box-shadow: 0px 3px 3px rgba(200, 200, 200, 10);
`;

const PostNavigation = ({ pageContext }) => {
  const { prev, next } = pageContext;
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            fields {
              postId
            }
          }
        }
      }
    }
  `);

  const totalPosts = data.allMdx.edges.length;
  const prevAvailable = prev !== null;
  const nextAvailable = next !== null;

  console.log(prevAvailable);
  console.log(nextAvailable);

  return (
    <Container>
      <NavButton available>Prev</NavButton>
      <NavButton available>
        <FaDice />
      </NavButton>
      <NavButton available>Next</NavButton>
    </Container>
  );
};

PostNavigation.propTypes = {
  pageContext: PropTypes.shape({
    prev: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
        postId: PropTypes.number,
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
        postId: PropTypes.number,
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
