import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import matchingLanguageIcon from '../utils/findMatchingLanguageIcon';
import Tags from './Tags';

const PostContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow);

  .gatsby-image-wrapper {
    width: 100%;
    overflow: visible;
  }

  .contentContainer {
    display: grid;
    grid-template-rows: auto 1fr;
    flex: 1;
    padding: 2rem;
    padding-bottom: 1rem;
    align-items: center;
    justify-items: center;
    text-align: center;

    .languageIconContainer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: -5rem;
      z-index: 5;

      svg {
        padding: 1rem;
        border-radius: var(--borderRadius);
        background-color: var(--white);
        -moz-box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
        -webkit-box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
        box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
      }
    }

    & > .content {
      margin: 1.5rem 0;

      h2 {
        font-size: 1.75rem;
        padding: 1rem 0;
      }

      p {
        font-size: 1.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 0;
      }
    }
  }

  .postIdDate {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    align-items: center;
    justify-items: center;
    border-top: 0.25rem solid var(--grey);

    p {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      height: 100%;
    }
  }
`;

export default function BlogPostCard({ post }) {
  const { frontmatter, fields } = post.node;
  const { date, id, image, tags, title } = frontmatter;
  const { slug } = fields;

  // Find the language tag to access below to display icon on the blog post
  const languageIcon = matchingLanguageIcon(tags, '3rem');

  return (
    <Link to={slug}>
      <PostContainerBody>
        <GatsbyImage image={image.childImageSharp.gatsbyImageData} alt={title} />
        <div className="contentContainer">
          <div className="languageIconContainer">{languageIcon}</div>
          <div className="content">
            <h2>{title}</h2>
          </div>
          <Tags tags={tags} />
        </div>
        <div className="postIdDate">
          <p className="id">Post: #{id}</p>
          <p>{date}</p>
        </div>
      </PostContainerBody>
    </Link>
  );
}

BlogPostCard.propTypes = {
  post: PropTypes.shape({
    node: PropTypes.shape({
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        id: PropTypes.number,
        image: PropTypes.object,
        tags: PropTypes.array,
        title: PropTypes.string,
      }),
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
    }),
  }),
};
