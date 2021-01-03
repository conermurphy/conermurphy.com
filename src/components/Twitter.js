// Inspired by https://github.com/wesbos/wesbos/blob/master/src/components/Twitter.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosHeart, IoIosRepeat } from 'react-icons/io';

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

const url = '/.netlify/functions/twitter';

function useTwitter() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);
  return posts;
}

function Media({ url, alt }) {
  if (!url) return null;
  //   const parts = mediaURL.split('.');
  const thumb = `${url}?name=thumb&format=jpg`;
  return <img src={`https://images.weserv.nl/?url=${encodeURIComponent(thumb)}&w=300&h=300&fit=inside"`} alt={alt} width="300" />;
}

export default function Twitter() {
  const tweets = useTwitter();

  return (
    <TweetsContainer>
      {tweets.length === 0 && <p>brb getting some good tweets...</p>}
      {tweets.map((tweet) => {
        const text = tweet.text.split('https://t.co').shift().slice(0, 100);
        const { preview_image_url } = tweet;
        return (
          <a href={`https://twitter.com/MrConerMurphy/status/${tweet.id}`} target="_blank" rel="noopener noreferrer">
            <IndividualTweetContainer key={tweet.id}>
              <Media url={preview_image_url} alt={text} />
              <p>{text}...</p>
              <TweetStats>
                <span title={`${tweet.public_metrics.retweet_count} Retweets`}>
                  <IoIosRepeat />
                  {tweet.public_metrics.retweet_count}
                </span>
                <span title={`${tweet.public_metrics.like_count} Hearts`}>
                  <IoIosHeart className="heart" />
                  {tweet.public_metrics.like_count}
                </span>
              </TweetStats>
            </IndividualTweetContainer>
          </a>
        );
      })}
    </TweetsContainer>
  );
}
