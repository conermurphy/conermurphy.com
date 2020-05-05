import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import BlogPostCard from '../components/templates/blogPostCard';

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LanguagesContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Language = styled.button`
  padding: 0.7rem;
  transition: 0.2s all ease;
  background-color: ${props => (props.active ? 'var(--header-font-color)' : 'var(--secondary-color)')};
  border: 1px solid ${props => (props.active ? 'var(--secondary-color)' : 'var(--header-font-color)')};
  border-radius: 2vw;
  color: ${props => (props.active ? 'var(--secondary-color)' : 'var(--header-color)')};

  box-shadow: 0px 1px 1px rgba(200, 200, 200, 10);
  box-shadow: 0px 2px 2px rgba(200, 200, 200, 10);
  box-shadow: 0px 3px 3px rgba(200, 200, 200, 10);
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
        <h1>Blog Posts</h1>
        <p style={{ textAlign: 'center' }}>
          Welcome to my blog! Here you'll find all of my latest posts, published here anywhere else. If you have any questions I'd be happy
          answer them!
        </p>
        <LanguagesContainer>
          {allLanguages.map(language => (
            <Language type="button" key={language} onClick={handleClick} active={!!activeLanguages.includes(language)}>
              {language}
            </Language>
          ))}
        </LanguagesContainer>
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
    allMdx(sort: { order: DESC, fields: fields___postId }) {
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
