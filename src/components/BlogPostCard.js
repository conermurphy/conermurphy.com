import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';

const BlogPostContainer = styled.div`
  max-width: 400px;

  .gatsby-image-wrapper {
    max-width: 400px;
    border-radius: var(--borderRadius);
  }

  .published {
    font-size: 1.3rem;
    margin: 0.5rem 0;
    font-weight: 300;
    opacity: 0.75;
  }

  .title {
    line-height: 3.2rem;
  }
`;

const HeroPostContainer = styled.div`
  display: grid;
  grid-template-columns: 700px 400px;
  align-items: center;
  justify-content: center;
  max-width: var(--maxWidth);

  .gatsby-image-wrapper {
    max-width: 700px;
    border-radius: var(--borderRadius);
  }

  .published {
    font-size: 1.3rem;
    margin: 0.5rem 0;
    font-weight: 300;
    opacity: 0.75;
  }

  .title {
    line-height: 3.2rem;
  }
`;

export function HeroPostCard({ post }) {
  // 1: Destructure out data
  const { excerpt, frontmatter, fields } = post;
  const { date, description, title, image } = frontmatter;
  const { slug } = fields;

  // 2: Return the card
  return (
    <Link to={slug} className="postLinks">
      <HeroPostContainer>
        <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={title} />
        <div>
          <p className="published">Published on {date}</p>
          <h3 className="title">{title}</h3>
          {description !== '' ? <p>{description}</p> : <p>{excerpt}</p>}
        </div>
      </HeroPostContainer>
    </Link>
  );
}

export function BlogPostCard({ post }) {
  // 1: Destructure out data
  const { excerpt, frontmatter, fields } = post;
  const { date, description, title, image } = frontmatter;
  const { slug } = fields;

  // 2: Return the card
  return (
    <BlogPostContainer>
      <Link to={slug} className="postLinks">
        <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={title} />
        <p className="published">Published on {date}</p>
        <h3 className="title">{title}</h3>
        {description !== '' ? <p>{description}</p> : <p>{excerpt}</p>}
      </Link>
    </BlogPostContainer>
  );
}
