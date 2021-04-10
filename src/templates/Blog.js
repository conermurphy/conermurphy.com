import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import SEO from '../components/SEO';
import findBlogSeries from '../utils/findBlogSeries';
// MDX Component Imports Used on each page.
import Components from '../components/mdx/Components';
import Tags from '../components/Tags';
import ClosingComponents from '../components/mdx/ClosingComponents';
import useNavTheme from '../utils/useNavTheme';
import { PostBodyContainer, PostContainer } from '../styles/BlogNoteStyles';

const BlogHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .postTitle {
    font-size: 2.75rem;
  }

  .postInfo {
    margin-bottom: 2.5rem;
  }
`;

const BlogPost = ({ data, pageContext, path }) => {
  // Destructing out values to use in page.
  const post = data.mdx;
  const { frontmatter, timeToRead, body, fileAbsolutePath, excerpt } = post;
  const { image, title, description, date, series, tags, plainDate } = frontmatter;

  // Setting image path for SEO if no image use the logo.
  const imagePath = image ? image.childImageSharp.gatsbyImageData.images.fallback.src : '/Logo.svg';

  // Updating the nav to show dark theme.
  useNavTheme('dark');

  return (
    <>
      <SEO
        post={{
          slug: path,
          title,
          description: description === null ? excerpt : description,
          image: imagePath,
          article: true,
          date: plainDate,
        }}
      />
      <PostContainer>
        <GatsbyImage className="heroImage" image={image.childImageSharp.gatsbyImageData} />
        <BlogHeader>
          <h1 className="postTitle">{title}</h1>
          <div className="postInfo">
            <p>
              {date} | {timeToRead === 1 ? `${timeToRead} Minute` : `${timeToRead} Minutes`}{' '}
              {series !== null ? `| ${findBlogSeries(series)}` : ''}
            </p>
            <Tags tags={tags} />
          </div>
        </BlogHeader>
        <PostBodyContainer>
          <MDXProvider components={Components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
          <ClosingComponents fileAbsolutePath={fileAbsolutePath} pageContext={pageContext} />
        </PostBodyContainer>
      </PostContainer>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      fileAbsolutePath
      excerpt
      fields {
        filePath
        contentCategory
        slug
      }
      frontmatter {
        title
        description
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        date(formatString: "DD/MM/YYYY")
        plainDate: date
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
      fileAbsolutePath: PropTypes.string,
      excerpt: PropTypes.string,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        series: PropTypes.string,
        description: PropTypes.string,
        tags: PropTypes.array.isRequired,
        image: PropTypes.object,
        plainDate: PropTypes.string,
      }),
    }),
  }).isRequired,
  path: PropTypes.string.isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    prev: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        series: PropTypes.string,
      }),
    }),
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        series: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default BlogPost;
