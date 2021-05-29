import React from 'react';
import styled from 'styled-components';
import { BlogPostCard } from './PostCards';

const AllPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 5rem;

  & > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    align-items: flex-start;
    justify-items: center;
    width: clamp(400px, 80vw, 850px);
    gap: 4rem 2rem;
  }
`;

export function BlogPostsContainer({ posts }) {
  return (
    <AllPostsContainer>
      <div>
        {posts.map(({ node }) => {
          if (!node.frontmatter.published) return null;
          return <BlogPostCard key={`blogPostCard-${node.frontmatter.title}`} post={node} />;
        })}
      </div>
    </AllPostsContainer>
  );
}
