import { graphql } from 'gatsby';
import React from 'react';
import { Testimonials } from '../components/Testimonials';
import { BlogPostsContainer } from '../components/BlogPostsContainter';
import { Hero } from '../components/Hero';

export default function Page404({ data }) {
  const heroContent = {
    title: '404',
    subtitle: "Looks like you've hit a page that doesn't exist. If you think this is an error please contact me.",
    CTA: 'Contact Me',
    CTALink: '/contact',
  };
  return (
    <>
      <Hero content={heroContent} />
      <BlogPostsContainer posts={data.latestPosts.edges} />
      <Testimonials />
    </>
  );
}

export const query = graphql`
  query {
    latestPosts: allMdx(
      limit: 4
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { published: { eq: true } }, fields: { contentCategory: { eq: "blog" } } }
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
            published
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
