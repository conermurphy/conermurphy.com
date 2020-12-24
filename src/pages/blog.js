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

const PageInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 2rem;
  padding-bottom: 2rem;
  position: relative;

  ::after,
  ::before {
    border-bottom: 2px solid var(--grey);
    width: 100%;
    content: '';
    position: absolute;
    bottom: 0;
  }

  h1 {
    font-size: 2.5rem;
    text-transform: uppercase;
    font-family: var(--body-font);
    position: relative;

    ::before {
      border-bottom: 2px solid var(--green);
      width: 100%;
      content: '';
      position: absolute;
      bottom: -2rem;
      z-index: 2;
    }
  }
`;

export default function Blog({ data }) {
  const { edges: blogPosts } = data.blog;
  useNavTheme('dark');
  return (
    <>
      <PageInfo>
        <h1>Blog Posts</h1>
      </PageInfo>
      <AllPostsContainer>
        {blogPosts.map((post) => (
          <BlogPostCard key={`blogPostCard-${post.node.frontmatter.id}`} post={post} />
        ))}
      </AllPostsContainer>
    </>
  );
}

export const query = graphql`
  query MyQuery {
    blog: allMdx(sort: { order: DESC, fields: frontmatter___date }, filter: { fields: { contentCategory: { eq: "blog" } } }) {
      edges {
        node {
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            slug
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
