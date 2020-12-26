import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import useNavTheme from '../utils/useNavTheme';
import BlogPostCard from '../components/BlogPostCard';

const AllPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  padding: 5rem;

  * {
    text-decoration: none;
  }
`;

export default function Blog({ data, pageContext }) {
  const { edges: blogPosts } = data.blog;
  const { currentPage, skip } = pageContext; // Used for pagination.
  useNavTheme('dark');
  return (
    <>
      <div className="headerTitleSeperator">
        <h1>Blog Posts</h1>
      </div>
      <AllPostsContainer>
        {blogPosts.map((post) => (
          <BlogPostCard key={`blogPostCard-${post.node.frontmatter.id}`} post={post} />
        ))}
      </AllPostsContainer>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 6) {
    blog: allMdx(
      limit: $pageSize
      skip: $skip
      sort: { order: DESC, fields: frontmatter___date }
      filter: { fields: { contentCategory: { eq: "blog" } } }
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
            id
            image {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
