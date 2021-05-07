import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import { motion, useSpring, useTransform, useViewportScroll } from 'framer-motion';
import SEO from '../components/SEO';
// MDX Component Imports Used on each page.
import Components from '../components/mdx/Components';
import ClosingComponents from '../components/mdx/ClosingComponents';
import { PostBodyContainer, PostContainer, BlogHeader } from '../styles/BlogPostStyles';
import { Sidebar } from '../components/mdx/Sidebar';

const BlogPost = ({ data, pageContext, path, location }) => {
  // Destructing out values to use in page.
  const post = data.mdx;
  const { frontmatter, timeToRead, body, fileAbsolutePath, excerpt } = post;
  const { image, title, description, date, plainDate, tags } = frontmatter;

  // Variables and state for animating scroll
  const [isComplete, setIsComplete] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => yRange.onChange((v) => setIsComplete(v >= 1)), [yRange]);

  // Setting image path for SEO if no image use the logo.
  const imagePath = image ? image.childImageSharp.gatsbyImageData.images.fallback.src : '/Logo.png';

  const postData = {
    title,
    url: location.href,
    twitterHande: 'MrConerMurphy',
    tags,
  };

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
        <svg className="progress-icon" viewBox="0 0 60 60">
          <motion.path
            fill="none"
            strokeWidth="5"
            strokeDasharray="0 1"
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            style={{
              pathLength,
              rotate: 90,
              translateX: 5,
              translateY: 5,
              scaleX: -1, // Reverse direction of line animation
            }}
          />
          <motion.path
            fill="none"
            strokeWidth="5"
            d="M14,26 L 22,33 L 35,16"
            initial={false}
            strokeDasharray="0 1"
            animate={{ pathLength: isComplete ? 1 : 0 }}
          />
        </svg>
        <BlogHeader>
          <p>
            {date} | {timeToRead === 1 ? `${timeToRead} Minute` : `${timeToRead} Minutes Read`}{' '}
          </p>
          <h1 className="postTitle">{title}</h1>
          <div className="tagContainer">
            {tags.map((tag) => (
              <p className="tag" key={tag}>
                {tag}
              </p>
            ))}
          </div>
        </BlogHeader>
        <GatsbyImage className="heroImage" image={image.childImageSharp.gatsbyImageData} />
        <PostBodyContainer>
          <Sidebar data={postData} />
          <div className="content">
            <MDXProvider components={Components}>
              <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
            <ClosingComponents fileAbsolutePath={fileAbsolutePath} pageContext={pageContext} />
          </div>
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
        date(formatString: "MMM Do YYYY")
        plainDate: date
        tags
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
