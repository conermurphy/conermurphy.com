import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
`;

const Blog = ({ data }) => {
  const [activeCategories, setActiveCategories] = useState([]);
  const posts = data.allMdx.edges;
  const categories = [];
  const { title } = useSiteMetadata();

  posts.forEach(post => {
    const { category } = post.node.frontmatter;
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });

  const handleClick = e => {
    const categoryToSet = e.target.innerText;
    if (activeCategories.includes(categoryToSet)) {
      setActiveCategories(activeCategories.filter(category => category !== categoryToSet));
    } else {
      setActiveCategories([...activeCategories, categoryToSet]);
    }
  };

  return (
    <Layout>
      <BlogContainer>
        <h1>{title}</h1>
        <p>Some subtitle I need to add back in at a later date.</p>
      </BlogContainer>
    </Layout>
  );
};

Blog.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            languages: PropTypes.array.isRequired,
          }),
          body: PropTypes.string.isRequired,
          timeToRead: PropTypes.number.isRequired,
          id: PropTypes.string.isRequired,
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }),
        }),
      }),
    }),
  }).isRequired,
};

export const query = graphql`
  query blogQuery {
    allMdx(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "DD-MM-YYYY")
            category
            description
            languages
          }
          body
          timeToRead
          id
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Blog;
