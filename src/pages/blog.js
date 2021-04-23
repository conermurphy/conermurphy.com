import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useNavTheme from '../utils/useNavTheme';
import BlogPostCard from '../components/BlogPostCard';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const AllPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  padding: 1rem 4rem;

  * {
    text-decoration: none;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

export default function Blog({ data, pageContext, path }) {
  const { edges: blogPosts, totalCount } = data.blog;
  const { currentPage, skip, tag } = pageContext; // Used for pagination.
  useNavTheme('dark');

  let pageTitle;

  if (tag) {
    pageTitle = `${tag} Blog Posts ${currentPage ? `- Page ${currentPage}` : ''}`;
  } else {
    pageTitle = `Blog ${currentPage ? `- Page ${currentPage}` : ''}`;
  }

  return (
    <>
      <SEO
        post={{
          slug: path,
          title: pageTitle,
        }}
      />
      <div className="headerTitleSeperator">
        <h1>Blog</h1>
      </div>
      <Pagination pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)} totalCount={totalCount} currentPage={currentPage || 1} base={path} />
      <AllPostsContainer>
        {blogPosts.map((post) => (
          <BlogPostCard key={`blogPostCard-${post.node.frontmatter.id}`} post={post} />
        ))}
      </AllPostsContainer>
      <Pagination pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)} totalCount={totalCount} currentPage={currentPage || 1} base={path} />
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 6) {
    blog: allMdx(
      limit: $pageSize
      skip: $skip
      sort: { order: [DESC], fields: [frontmatter___date] }
      filter: { fields: { contentCategory: { eq: "blog" } }, frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            tags
            title
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
      totalCount
    }
  }
`;

Blog.propTypes = {
  data: PropTypes.shape({
    blog: PropTypes.shape({
      totalCount: PropTypes.number,
      edges: PropTypes.array,
    }),
  }),
  path: PropTypes.string,
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    skip: PropTypes.number,
    tag: PropTypes.string,
  }),
};
