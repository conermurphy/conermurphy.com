import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import { FaExternalLinkAlt } from 'react-icons/fa';

const BlogPostContainer = styled(motion.div)`
  width: clamp(300px, 80vw, 400px);

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
    max-width: 400px;
  }
`;

const HeroPostContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;

  & > div {
    width: clamp(300px, 80vw, 400px);
  }

  .gatsby-image-wrapper {
    width: clamp(330px, 60vw, 700px);
    border-radius: var(--borderRadius);
    filter: drop-shadow(var(--shadow));
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

  .linkContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .readMore {
    font-weight: 600;

    & > a {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    }
  }

  .codeRepoLink {
    border-left: 1px solid var(--primaryText);
    padding-left: 2rem;
  }
`;

export function ProjectCard({ project }) {
  // 1: Destructure out data
  const { repo, description, date, URL, title, image } = project.frontmatter;

  // 2: Return the card
  return (
    <HeroPostContainer whileHover={{ scale: 1.025 }}>
      <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={title} />
      <div>
        <p className="published">Published on {date}</p>
        <h3 className="title">{title}</h3>
        <p>{description}</p>
        <div className="linkContainer">
          <p className="readMore">
            <a href={URL} className="postLinks" target="_blank" rel="noopener noreferrer">
              <FaExternalLinkAlt />
              Website
            </a>
          </p>

          {repo && (
            <p className="readMore codeRepoLink">
              <a href={repo} className="postLinks" target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt />
                Code Repository
              </a>
            </p>
          )}
        </div>
      </div>
    </HeroPostContainer>
  );
}

export function HeroPostCard({ post }) {
  // 1: Destructure out data
  const { excerpt, frontmatter, fields } = post;
  const { date, description, title, image } = frontmatter;
  const { slug } = fields;

  // 2: Return the card
  return (
    <Link to={slug} className="postLinks">
      <HeroPostContainer whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
        <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={title} />
        <div>
          <p className="published">Published on {date}</p>
          <h3 className="title">{title}</h3>
          {description !== '' ? <p>{description}</p> : <p>{excerpt}</p>}
          <p className="readMore">Read more...</p>
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
    <BlogPostContainer whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
      <Link to={slug} className="postLinks">
        <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={title} />
        <p className="published">Published on {date}</p>
        <h3 className="title">{title}</h3>
        {description !== '' ? <p>{description}</p> : <p>{excerpt}</p>}
      </Link>
    </BlogPostContainer>
  );
}
