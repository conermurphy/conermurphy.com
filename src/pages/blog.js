import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { BlogPostCard } from '../components/BlogPostCard';
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
  const { currentPage, tag } = pageContext; // Used for pagination.

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
        {blogPosts.map(({ node }) => {
          console.log(node);
          return <BlogPostCard key={`blogPostCard-${node.frontmatter.title}`} post={node} />;
        })}
      </AllPostsContainer>
      <Pagination pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)} totalCount={totalCount} currentPage={currentPage || 1} base={path} />
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 6) {
    blog: allMdx(
      skip: $skip
      limit: $pageSize
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM Do YYYY")
            description
            tags
            title
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
      totalCount
    }
  }
`;
