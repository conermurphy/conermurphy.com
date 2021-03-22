import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { IoIosCalendar, IoIosHeart, IoIosRepeat } from 'react-icons/io';
import { FaTwitter } from 'react-icons/fa';
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
    padding: 2rem;
    margin: 2rem;
    align-items: center;
    justify-items: center;
    text-align: center;
    gap: 2rem;

    .threadTitle {
      font-size: 1.9rem;
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
    grid-template-columns: 50% 50%;
    padding: 2rem;
    gap: 1rem;
    align-items: center;
    justify-items: center;
    background-color: var(--grey);

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      height: 100%;
      font-size: 1.7rem;
      padding: 1rem;

      & > svg {
        font-size: 2rem;
      }
    }
  }
`;

export default function ThreadPostCard({ thread }) {
  const { frontmatter, fields } = thread.node;
  const { title, date, position, tags, numberOfTweets, retweetCount, likeCount } = frontmatter;
  const { slug } = fields;

  // Find the language tag to access below to display icon
  const languageIcon = matchingLanguageIcon(tags, '5rem');

  return (
    <Link to={slug}>
      <ThreadContainer>
        <div className="contentContainer">
          <div className="languageIconContainer">{languageIcon}</div>
          <h2 className="threadTitle">{title}</h2>
          <Tags tags={tags} />
        </div>
        <div className="statsContainer">
          <span className="date" title={`Thread Published on ${date}`}>
            <IoIosCalendar />
            {date}
          </span>
          <span className="threadLength" title={`${numberOfTweets} Tweets`}>
            <FaTwitter />
            {numberOfTweets}
          </span>
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
