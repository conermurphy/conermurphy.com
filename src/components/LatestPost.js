import { graphql, useStaticQuery, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';

const LatestPostContainer = styled.div`
  max-width: 400px;

  .gatsby-image-wrapper {
    max-width: 400px;
    border-radius: var(--borderRadius);
  }

  .published {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-weight: 300;
  }
`;

export function LatestPost() {
  // 1: Query for data from GraphQL to get latest post
  const data = useStaticQuery(graphql`
    query {
      allMdx(limit: 1, sort: { fields: frontmatter___date, order: DESC }, filter: { frontmatter: { published: { eq: true } } }) {
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
  `);

  // 2: Destructure out data
  const { node } = data.allMdx.edges[0];
  const { excerpt, frontmatter, fields } = node;
  const { date, description, title, image } = frontmatter;
  const { slug } = fields;

  return (
    <LatestPostContainer>
      <Link to={slug} className="postLinks">
        <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={title} />
        <p className="published">Published on {date}</p>
        <h3 className="title">{title}</h3>
        {description !== '' ? <p>{description}</p> : <p>{excerpt}</p>}
      </Link>
    </LatestPostContainer>
  );
}
