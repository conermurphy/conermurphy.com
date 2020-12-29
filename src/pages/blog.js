import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import useNavTheme from '../utils/useNavTheme';
import BlogPostCard from '../components/BlogPostCard';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';
import BlogTagFilter from '../components/BlogTagFilter';

const AllPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  padding: 1rem 5rem;

  * {
    text-decoration: none;
  }
`;

export default function Blog({ data, pageContext, path }) {
  const { edges: blogPosts, totalCount } = data.blog;
  const { currentPage, skip } = pageContext; // Used for pagination.
  useNavTheme('dark');

  return (
    <>
      <SEO
        post={{
          slug: path,
          title: `Blog ${currentPage ? `- Page ${currentPage}` : ''}`,
        }}
      />
      <div className="headerTitleSeperator">
        <h1>Blog Posts</h1>
      </div>
      <BlogTagFilter />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_BLOG_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base={path}
      />
      <AllPostsContainer>
        {blogPosts.map((post) => (
          <BlogPostCard key={`blogPostCard-${post.node.frontmatter.id}`} post={post} />
        ))}
      </AllPostsContainer>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_BLOG_PAGE_SIZE)}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
        base={path}
      />
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 6, $tagRegex: String) {
    blog: allMdx(
      limit: $pageSize
      skip: $skip
      sort: { order: DESC, fields: frontmatter___date }
      filter: { fields: { contentCategory: { eq: "blog" } }, frontmatter: { tags: { regex: $tagRegex } } }
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
      totalCount
    }
  }
`;
