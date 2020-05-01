import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BlogPostCard = ({ post }) => {
  const postID = post.fields.slug.split('/')[2];
  console.log(postID);
  return (
    <div>
      <p>{post.frontmatter.category}</p>
      <h3>{post.frontmatter.title}</h3>
      <p>{post.frontmatter.date}</p>
    </div>
  );
};

BlogPostCard.propTypes = {
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      languages: PropTypes.array.isRequired,
    }),
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }),
};

export default BlogPostCard;
