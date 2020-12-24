import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import tagData from '../data/tags.json';
import LanguageIcons, { languageList } from '../templates/LanguageIcons';
import Logo from './Logo';

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
  const { date, id, image, slug, tags, title } = post.node.frontmatter;

  // Find the index of the first matching tag in the blog posts frontmatter. If both are found then take the first one in the list.
  const firstMatchingLanguageTagIndex = tags.map((tag) => (languageList.includes(tag) ? languageList.indexOf(tag) : null)).slice(0, 1);
  // Accessing the language name from the array so we can pass it in to the LanguageIcons component further down to render the logo of the langauge.
  const firstMatchingLanguageTag = languageList[firstMatchingLanguageTagIndex];

  return (
    <Link to={slug}>
      <PostContainerBody>
        <Img fluid={image.childImageSharp.fluid} />
        <div className="contentContainer">
          <div className="languageIconContainer">
            {firstMatchingLanguageTag ? (
              <LanguageIcons language={firstMatchingLanguageTag} width="3rem" />
            ) : (
              <Logo height="3rem" link={false} />
            )}
          </div>
          <div className="content">
            <h3>{title}</h3>
          </div>
          <div className="tags">
            {tags.map((tag) => {
              const tagInfo = tagData[tag];
              const { backgroundColor, color } = tagInfo;
              return (
                <TagStyle key={`PostTag-${id}-${tag}`} backgroundColor={backgroundColor} color={color}>
                  {tag}
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
