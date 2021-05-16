import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { BlogPostCard, HeroPostCard } from '../components/PostCards';
import { Hero } from '../components/Hero';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';
import { Testimonials } from '../components/Testimonials';

const AllPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  & > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    align-items: flex-start;
    justify-items: center;
    width: clamp(400px, 80vw, 850px);
    gap: 4rem 2rem;
  }
`;

export default function Blog({ data, pageContext, path }) {
  const { edges: blogPosts, totalCount } = data.blog;
  const {
    edges: [latestPost],
  } = data.latestPost;

  const { currentPage } = pageContext; // Used for pagination.

  const heroContent = {
    title: 'Blog',
    subtitle: 'Here is where you’ll find all my blog posts. I cover everything from tutorials to content creation and more.',
    CTA: '',
    CTALink: '',
  };

  const pageTitle = `Blog ${currentPage ? `- Page ${currentPage}` : ''}`;

  return (
    <>
      <SEO
        post={{
          slug: path,
          title: pageTitle,
        }}
      />
      <Hero content={heroContent} />
      <HeroPostCard post={latestPost.node} />
      <Pagination pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)} totalCount={totalCount} currentPage={currentPage || 1} base={path} />
      <AllPostsContainer>
        <div>
          {blogPosts.map(({ node }) => {
            if (node.frontmatter.published === false) return null;
            return <BlogPostCard key={`blogPostCard-${node.frontmatter.title}`} post={node} />;
          })}
        </div>
      </AllPostsContainer>
      <Pagination pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)} totalCount={totalCount} currentPage={currentPage || 1} base={path} />
      <Testimonials />
    </>
  );
}

export const query = graphql`
  query ($skip: Int = 1, $pageSize: Int = 8) {
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
    latestPost: allMdx(limit: 1, sort: { fields: frontmatter___date, order: DESC }, filter: { frontmatter: { published: { eq: true } } }) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMM Do YYYY")
            description
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
    }
  }
`;
