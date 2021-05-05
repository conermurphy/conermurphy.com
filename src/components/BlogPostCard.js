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

export function BlogPostCard({ post }) {
  // 1: Destructure out data
  const { excerpt, frontmatter, fields } = post;
  const { date, description, title, image } = frontmatter;
  const { slug } = fields;

  // 2: Return the card
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
