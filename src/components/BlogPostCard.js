import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import matchingLanguageIcon from '../utils/findMatchingLanguageIcon';
import findTagInfo from '../utils/findTagInfo';

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
      margin-bottom: 1.5rem;

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
      h3 {
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

    .tags {
      display: flex;
      flex-direction: row;
      margin: 1.5rem;
      gap: 1rem;
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
      font-weight: bold;
    }
  }
`;

const TagStyle = styled.p`
  margin: 0;
  padding: 0.75rem 1rem;
  font-size: 1.2rem;
  background-color: var(--white);
  border: 1px solid var(--green);
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
        <Img fluid={image.childImageSharp.fluid} />
        <div className="contentContainer">
          <div className="languageIconContainer">{languageIcon}</div>
          <div className="content">
            <h3>{title}</h3>
          </div>
          <div className="tags">
            {tags.map((tag) => {
              const { matchingTag, backgroundColor, color } = findTagInfo(tag);
              return (
                <TagStyle key={`PostTag-${id}-${matchingTag}`} backgroundColor={backgroundColor} color={color}>
                  {matchingTag}
                </TagStyle>
              );
            })}
          </div>
        </div>
        <div className="postIdDate">
          <p className="id">Post: #{id}</p>
          <p>{date}</p>
        </div>
      </PostContainerBody>
    </Link>
  );
}
