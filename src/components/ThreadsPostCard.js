import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { IoIosHeart, IoIosRepeat } from 'react-icons/io';
import matchingLanguageIcon from '../utils/findMatchingLanguageIcon';
import Tags from './Tags';

const ThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow);

  .contentContainer {
    display: grid;
    grid-template-rows: 0.75fr 1fr auto;
    flex: 1;
    padding: 2rem;
    margin: 2rem;
    align-items: center;
    justify-items: center;
    text-align: center;
    gap: 2rem;

    .threadTitle {
      font-size: 1.8rem;
      padding: 1rem 0;
    }

    .languageIconContainer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      z-index: 5;

      svg {
        padding: 0;
      }
    }
  }

  .statsContainer {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    align-items: center;
    justify-items: center;
    border-top: 0.25rem solid var(--grey);
    padding: 1rem;

    p,
    span {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      height: 100%;
      margin: 0.5rem 0;
      flex-direction: row;
      font-weight: bold;
      justify-content: center;
    }

    & > span {
      font-size: 2rem;
    }
  }
`;

export default function ThreadPostCard({ thread }) {
  const { frontmatter, fields } = thread.node;
  const { title, date, position, tags, numberOfTweets, retweetCount, likeCount } = frontmatter;
  const { slug } = fields;

  // Find the language tag to access below to display icon
  const languageIcon = matchingLanguageIcon(tags, '3.5rem');

  return (
    <Link to={slug}>
      <ThreadContainer>
        <div className="contentContainer">
          <div className="languageIconContainer">{languageIcon}</div>
          <h2 className="threadTitle">{title}</h2>
          <Tags tags={tags} />
        </div>
        <div className="statsContainer">
          <p className="threadLength">{numberOfTweets} Tweets</p>
          <p className="date">{date}</p>
          <span className="likes" title={`${likeCount} Likes`}>
            <IoIosHeart />
            {likeCount}
          </span>
          <span className="retweets" title={`${retweetCount} Retweets`}>
            <IoIosRepeat />
            {retweetCount}
          </span>
        </div>
      </ThreadContainer>
    </Link>
  );
}

ThreadPostCard.propTypes = {};
