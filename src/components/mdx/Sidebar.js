import React from 'react';
import styled from 'styled-components';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';

const SideBarContainer = styled.aside`
  margin: 1.6rem 0;
  margin-right: 5rem;
`;

const SocialIconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & svg {
    border-radius: var(--borderRadius);
    margin: 0.5rem;
  }
`;

function ShareButtons({ title, url, twitterHandle = 'MrConerMurphy', tags }) {
  return (
    <SocialIconsContainer>
      <FacebookShareButton url={url}>
        <FacebookIcon size={55} />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title} via={twitterHandle} hashtags={tags}>
        <TwitterIcon size={55} />
      </TwitterShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon size={55} />
      </LinkedinShareButton>

      <RedditShareButton url={url} title={title}>
        <RedditIcon size={55} />
      </RedditShareButton>
    </SocialIconsContainer>
  );
}

export function Sidebar({ data }) {
  const { title, url, twitterHandle, tags } = data;

  return (
    <SideBarContainer>
      <ShareButtons title={title} url={url} twitterHandle={twitterHandle} tags={tags} />
    </SideBarContainer>
  );
}
