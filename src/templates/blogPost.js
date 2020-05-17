import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import device from '../components/device';
// MDX Component Imports Used on each page.
import PostNavigation from '../components/mdx/postNavigation.js';
import ContactBlock from '../components/mdx/contactBlock.js';
import SEO from '../components/seo';

const BlogPostContainer = styled.article`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-bottom: 0;

  @media ${device.desktop} {
    width: 50%;
    margin: auto;
  }
`;

/* eslint-disable */
const components = {
  pre: props => <pre {...props} />,
};
/* eslint-enable */

const BlogPost = ({ data, pageContext }) => {
  const post = data.mdx;
  console.log(post);
  return (
    <Layout>
      <SEO title={`${post.frontmatter.title} | Coner Murphy`} description={post.frontmatter.description} />
      <BlogPostContainer>
        <h1>{post.frontmatter.title}</h1>
        <p style={{ marginTop: 0 }}>
          {post.frontmatter.date.slice(0, 2)}/{post.frontmatter.date.slice(2, 4)}/{post.frontmatter.date.slice(4, 8)} |{' '}
          {post.frontmatter.languages} | {post.timeToRead} mins
        </p>
        <MDXProvider components={components}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MDXProvider>
        <PostNavigation pageContext={pageContext} />
        <ContactBlock />
      </BlogPostContainer>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      frontmatter {
        title
        description
        date(formatString: "DDMMYYYY")
        category
        languages
        id
      }
    }
  }
`;

BlogPost.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string.isRequired,
      timeToRead: PropTypes.number.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        languages: PropTypes.array.isRequired,
      }),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
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
        slug: PropTypes.string.isRequired,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default BlogPost;
