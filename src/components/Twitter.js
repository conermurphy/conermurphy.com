// Inspired by https://github.com/wesbos/wesbos/blob/master/src/components/Twitter.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosHeart, IoIosRepeat } from 'react-icons/io';
import PropTypes from 'prop-types';

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;

  p,
  a {
    color: var(--white);
    text-decoration: none;
  }
`;

const IndividualTweetContainer = styled.div`
  margin: 1rem 0;
`;

const TweetStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--grey);

  & > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const serverlessUrl = '/.netlify/functions/twitter';

function useTwitter() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(serverlessUrl)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);
  return posts;
}

function Media({ media, alt }) {
  if (!media) return null;
  const url = media[0].media_url;
  return (
    <img
      src={`https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=200&fit=inside`}
      alt={alt}
      width="200"
      height="auto"
      style={{ fontSize: 0 }}
    />
  );
}

export default function Twitter() {
  const tweets = useTwitter();

  return (
    <TweetsContainer>
      {tweets.length === 0 && <p>brb getting some good tweets...</p>}
      {tweets.map((tweet) => {
        const text = tweet.full_text.split('https://t.co').shift().slice(0, 100);
        const { media } = tweet.entities;
        const { retweet_count, favorite_count } = tweet;
        const tweetID = `${tweet.id}`;
        return (
          <a key={tweet.id} href={`https://twitter.com/MrConerMurphy/status/${tweetID}`} target="_blank" rel="noopener noreferrer">
            <IndividualTweetContainer>
              <Media media={media} alt={text} />
              <p>{text}...</p>
              <TweetStats>
                <span title={`${retweet_count} Retweets`}>
                  <IoIosRepeat />
                  {retweet_count}
                </span>
                <span title={`${favorite_count} Hearts`}>
                  <IoIosHeart className="heart" />
                  {favorite_count}
                </span>
              </TweetStats>
            </IndividualTweetContainer>
          </a>
        );
      })}
    </TweetsContainer>
  );
}

Media.propTypes = {
  media: PropTypes.array,
  alt: PropTypes.string,
};
