import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PostNavigation = ({ pageContext }) => {
  const { prev, next } = pageContext;
  return <div></div>;
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
