import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import CodeBlock from '../components/mdx/codeBlock.js';

const components = {
  pre: props => <div {...props} />,
  code: props => <CodeBlock {...props} />,
};

const BlogPost = ({ data, pageContext }) => {
  const post = data.mdx;
  console.log(post);
  return (
    <div>
      <h1>Hello World</h1>
      <MDXProvider components={components}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </MDXProvider>
    </div>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        description
        date(formatString: "DDMMYYYY")
        category
        languages
      }
      fields {
        postId
      }
    }
  }
`;

BlogPost.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      body: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        languages: PropTypes.array.isRequired,
      }),
      fields: PropTypes.shape({
        postId: PropTypes.number.isRequired,
      }),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    prev: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
        postId: PropTypes.number.isRequired,
      }),
    }),
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        postId: PropTypes.number.isRequired,
      }),
    }),
  }).isRequired,
};

export default BlogPost;
