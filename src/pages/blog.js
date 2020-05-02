import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import BlogPostCard from '../components/blogPostCard';
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

const PostContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Blog = ({ data }) => {
  const [activeLanguages, setActiveLanguages] = useState([]);
  const posts = data.allMdx.edges;
  const allLanguages = [];
  const { title } = useSiteMetadata();

  posts.forEach(post => {
    const { languages } = post.node.frontmatter;
    languages.forEach(language => {
      if (!allLanguages.includes(language)) {
        allLanguages.push(language);
      }
    });
  });

  const handleClick = e => {
    const languageToSet = e.target.innerText;
    if (activeLanguages.includes(languageToSet)) {
      setActiveLanguages(activeLanguages.filter(language => language !== languageToSet));
    } else {
      setActiveLanguages([...activeLanguages, languageToSet]);
    }
  };

  return (
    <Layout>
      <BlogContainer>
        <h1>{title}</h1>
        <p>Some subtitle I need to add back in at a later date.</p>
        <div>
          {allLanguages.map(language => (
            <Tag type="button" key={language} onClick={handleClick} active={!!activeLanguages.includes(language)}>
              {language}
            </Tag>
          ))}
        </div>
        <PostContainer>
          {posts.map(({ node }) => {
            const [...postLanguages] = node.frontmatter.languages;
            return postLanguages.map(language => {
              if (activeLanguages.includes(language) || activeLanguages.length === 0) {
                return <BlogPostCard post={node} key={node.id} />;
              }
              return null;
            });
          })}
        </PostContainer>
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
  query {
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
          id
          fields {
            slug
            postId
          }
        }
      }
    }
  }
`;

export default Blog;
