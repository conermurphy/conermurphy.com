import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import Logo from '../components/Logo';
import findTagInfo from '../utils/findTagInfo';
// MDX Component Imports Used on each page.
import GithubEdit from '../components/mdx/githubEdit.js';
import Components from '../components/mdx/Components';
import EmailSignupForm from '../components/emailSignupForm';

const BlogPostContainer = styled.article`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-bottom: 0;
  max-width: 700px;

  & > .heroImage {
    border-radius: var(--borderRadius);
    max-width: 1200px;
    position: relative;
    margin: 1rem 0;
    margin-bottom: 2rem;
    filter: drop-shadow(var(--shadow));
  }
`;

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

    .tags {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
  }
`;

const BlogBody = styled.div`
  .closingComponents {
    margin: 5rem 0;
  }
`;

const TagStyle = styled.p`
  margin: 0;
  padding: 0.75rem 1rem;
  font-size: 1.2rem;
  background-color: var(--white);
  border: 1px solid var(--green);
`;

const BlogPost = ({ data, pageContext }) => {
  // Destructing out values to use in page.
  const post = data.mdx;
  const { frontmatter, timeToRead, body, fields } = post;
  const { filePath } = fields;
  const { image, title, description, date, series, tags, id } = frontmatter;

  // Setting image path for SEO if no image use the log.
  const imagePath = image ? image.childImageSharp.fluid : <Logo />;
  return (
    <>
      <SEO title={`${title}`} description={description} image={imagePath} />
      <BlogPostContainer>
        <Img className="heroImage" fluid={image.childImageSharp.fluid} />
        <BlogHeader>
          {/* <div className="headerTitleSeperator"> */}
          <h1 className="postTitle">{title}</h1>
          {/* </div> */}
          <div className="postInfo">
            <p>
              {date} | {timeToRead === 1 ? `${timeToRead} Minute` : `${timeToRead} Minutes`} {series ? `| ${series}` : ''}
            </p>
            <div className="tags">
              {tags.map((tag) => {
                const { matchingTag, backgroundColor, color } = findTagInfo(tag);
                return (
                  <TagStyle key={`PostTag-${id}-${matchingTag}`} backgroundColor={backgroundColor} color={color}>
                    {matchingTag}
                  </TagStyle>
                );
              })}
            </div>
          </div>
        </BlogHeader>
        <BlogBody>
          <MDXProvider components={Components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
          <div className="closingComponents">
            <EmailSignupForm />
            <GithubEdit filePath={filePath} />
          </div>
        </BlogBody>
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
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        date(formatString: "DD/MM/YYYY")
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
