import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
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
  margin-top: 2rem;
  background-color: var(--secondary-color);

  filter: drop-shadow(0 0 3px rgba(200, 200, 200, 10));

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

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  transition: 0.2s all ease;
  background-color: ${props => (props.active ? 'var(--secondary-color)' : 'var(--header-font-color)')};
  border: 1px solid ${props => (props.active ? 'var(--header-font-color)' : 'var(--secondary-color)')};
  border-radius: 0.5rem;
  color: ${props => (props.active ? 'var(--header-color)' : 'var(--secondary-color)')};

  pointer-events: ${props => (props.active ? 'auto' : 'none')};
  cursor: ${props => (props.active ? 'pointer' : 'none')};
  text-decoration: ${props => (props.active ? 'none' : 'line-through')};

  box-shadow: 0px 1px 1px rgba(200, 200, 200, 10);
  box-shadow: 0px 2px 2px rgba(200, 200, 200, 10);
  box-shadow: 0px 3px 3px rgba(200, 200, 200, 10);
`;

const ButtonLink = styled(Link)`
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`;

const PostNavigation = ({ pageContext, postId }) => {
  const { prev, next } = pageContext;
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { order: ASC, fields: fields___postId }) {
        edges {
          node {
            fields {
              postId
              slug
            }
          }
        }
      }
    }
  `);

  const totalPosts = data.allMdx.edges;

  const idMaker = () => Math.round(Math.random() * totalPosts.length) - 1;

  let randomPostId = idMaker();

  if (randomPostId < 0) {
    randomPostId = 0;
  } else if (randomPostId === postId) {
    randomPostId += 1;
  }

  const randPost = totalPosts[randomPostId];
  const randLink = randPost.node.fields.slug;
  const prevLink = prev !== null ? prev.fields.slug : '/';
  const nextLink = next !== null ? next.fields.slug : '/';

  return (
    <Container>
      <ButtonLink to={prevLink} disabled={prev === null}>
        <NavButton active={prev !== null}>Prev</NavButton>
      </ButtonLink>
      <Link to={randLink}>
        <NavButton active>
          <FaDice />
        </NavButton>
      </Link>
      <ButtonLink to={nextLink} disabled={next === null}>
        <NavButton active={next !== null}>Next</NavButton>
      </ButtonLink>
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
  postId: PropTypes.number.isRequired,
};

export default PostNavigation;
