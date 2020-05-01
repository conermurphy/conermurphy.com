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

const Tag = styled.button`
  margin: 0.5rem;
  padding: 0.5rem;
  transition: 0.2s all;
  background-color: ${props => (props.active ? 'var(--header-color)' : '')};
  border: 1px solid ${props => (props.active ? 'var(--background-color)' : 'var(--header-color)')};
  color: ${props => (props.active ? 'var(--background-color)' : 'var(--header-color)')};

  &:hover {
    transform: scale(1.1);
  }
`;

const Blog = ({ data }) => {
  const [activeCategories, setActiveCategories] = useState([]);
  const posts = data.allMdx.edges;
  const categories = [];
  const { title } = useSiteMetadata();

  // console.log(data);

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
        <div>
          {categories.map(category => (
            <Tag type="button" key={category.class} onClick={handleClick} active={!!activeCategories.includes(category)}>
              {category}
            </Tag>
          ))}
        </div>
        <div>
          {posts.map(({ node }) => {
            const postCategory = node.frontmatter.category;
            if (activeCategories.includes(postCategory) || activeCategories.length === 0) {
              // return <PortfolioPost post={node} key={node.id} page="blog" />;
            }
            return null;
          })}
        </div>
      </BlogContainer>
    </Layout>
  );
};

Blog.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape(
      PropTypes.arrayOf({
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
      }).isRequired
    ),
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
