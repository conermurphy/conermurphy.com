import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import logo from '../../static/profileImgs/CM-Logo-2020.png';
import SEO from '../components/seo';
// MDX Component Imports Used on each page.
import GithubEdit from '../components/mdx/githubEdit.js';
import EmailSignup from '../components/mdx/emailSignup';

const BlogPostContainer = styled.article`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  padding-bottom: 0;
`;

const PostTitle = styled.h1`
  line-height: 1;
  margin-bottom: 2rem;
`;

/* eslint-disable */
const components = {
  pre: props => <pre {...props} />,
  a: props => <a style={{fontWeight: 'bold'}}{...props} />,
  code: props => <code style={{fontFamily: 'var(--body-font)'}} {...props}/>,
};
/* eslint-enable */

const BlogPost = ({ data, pageContext }) => {
  const post = data.mdx;
  const { filePath } = data.mdx.fields;
  const { image } = post.frontmatter;
  const imagePath = image ? image.childImageSharp.fixed.src : logo;
  return (
    <>
      <SEO title={`${post.frontmatter.title} | Coner Murphy`} description={post.frontmatter.description} image={imagePath} />
      <BlogPostContainer>
        <PostTitle title={post.frontmatter.title}>{post.frontmatter.title}</PostTitle>
        <p style={{ marginTop: 0 }}>
          {post.frontmatter.date.slice(0, 2)}/{post.frontmatter.date.slice(2, 4)}/{post.frontmatter.date.slice(4, 8)} | {post.timeToRead}{' '}
          minute read | <b>Tags:</b> {post.frontmatter.tags.map((tag) => tag).join(', ')}
        </p>
        <p />
        <MDXProvider components={components}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MDXProvider>
        <EmailSignup />
        <GithubEdit filePath={filePath} />
      </BlogPostContainer>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      fields {
        filePath
      }
      frontmatter {
        title
        description
        image {
          childImageSharp {
            fixed {
              src
            }
          }
        }
        date(formatString: "DDMMYYYY")
        series
        tags
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
      fields: PropTypes.shape({
        filePath: PropTypes.string.isRequired,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        series: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired,
        image: PropTypes.object,
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
        series: PropTypes.string.isRequired,
      }),
    }),
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        series: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default BlogPost;
