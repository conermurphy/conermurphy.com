import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Pagination from '../components/Pagination';
import { ProjectCard } from '../components/PostCards';
import { Hero } from '../components/Hero';
import { Testimonials } from '../components/Testimonials';

const AllProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  margin-bottom: 5rem;
`;

export default function Projects({ data, pageContext, path }) {
  const { edges: projectPosts, totalCount } = data.projects;
  const { currentPage, skip } = pageContext;

  const heroContent = {
    title: 'Projects',
    subtitle: 'Here are some of my previous projects. If you have any questions please reach out to me.',
    CTA: 'Ready to get started on your project?',
    CTALink: '/contact',
  };

  const pageTitle = `Projects ${currentPage ? `- Page ${currentPage}` : ''}`;

  return (
    <>
      <SEO
        post={{
          slug: path,
          title: pageTitle,
        }}
      />
      <Hero content={heroContent} />
      {totalCount > 8 ? (
        <Pagination
          pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
          totalCount={totalCount}
          currentPage={currentPage || 1}
          skip={skip}
          base={path}
        />
      ) : null}
      <AllProjectsContainer>
        {projectPosts.map(({ node }) => (
          <ProjectCard key={node.id} project={node} />
        ))}
      </AllProjectsContainer>
      <Testimonials />
    </>
  );
}

export const query = graphql`
  query ($skip: Int = 0, $pageSize: Int = 8) {
    projects: allMdx(
      limit: $pageSize
      skip: $skip
      filter: { fields: { contentCategory: { eq: "projects" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            tags
            slug
            description
            repo
            URL
            date(formatString: "MMM Do YYYY")
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
      totalCount
    }
  }
`;
