import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import ContentCard from '../components/templates/contentCard';
import LanguageIcons from '../components/templates/languageIcons';

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
  border: none;
  padding: 0;
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
    const languageToSet = e.currentTarget.dataset.label;
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
          {allLanguages.map((language, index) => (
            <Language key={language} onClick={handleClick} active={!!activeLanguages.includes(language)} data-label={language}>
              <LanguageIcons language={language} key={index} />
            </Language>
          ))}
        </LanguagesContainer>
        <PostContainer>
          {posts.map(({ node }) => {
            const postLanguages = node.frontmatter.languages;
            console.log(activeLanguages.some(language => postLanguages.includes(language)));
            if (activeLanguages.some(language => postLanguages.includes(language)) || activeLanguages.length === 0) {
              const contentData = {
                internal: true,
                link: node.fields.slug,
                topLine: node.frontmatter.languages.join(', '),
                title: node.frontmatter.title,
                bottomLine: `Post ${node.fields.postId} - ${node.frontmatter.date}`,
              };
              return <ContentCard data={contentData} key={node.id} />;
            }
            return null;
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
