import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CornerArt from './cornerArt';

const CardLink = styled(Link)`
  margin: 1rem;
`;

const CardLinkExternal = styled.a`
  margin: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  padding-top: 1.5rem;
  width: 60vw;
  height: auto;
  max-width: 20rem;
  border-radius: 2vh;
  overflow: hidden;
  background-color: var(--secondary-color);

  box-shadow: 0px 2px 2px rgba(200, 200, 200, 20);
  box-shadow: 0px 4px 4px rgba(200, 200, 200, 20);
  box-shadow: 0px 6px 6px rgba(200, 200, 200, 20);
`;

const PostInfo = styled.p`
  font-size: 0.9rem;
  margin: 0.5rem;
`;

const PostTitle = styled.h3`
  margin: 0.5rem;
  font-size: 1.4rem;
`;

const AuthorName = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
`;

const contentCard = ({ data }) => {
  const { internal, link, topLine, title, bottomLine } = data;

  return internal ? (
    <CardLink to={link}>
      <CardContainer>
        <PostInfo>{topLine}</PostInfo>
        <PostTitle>{title}</PostTitle>
        <PostInfo>{bottomLine}</PostInfo>
        <AuthorName>@MrConerMurphy</AuthorName>
        <CornerArt adjustments={[1.5, 0, 0, 0]} />
      </CardContainer>
    </CardLink>
  ) : (
    <CardLinkExternal href={link}>
      <CardContainer>
        <PostInfo>{topLine}</PostInfo>
        <PostTitle>{title}</PostTitle>
        <PostInfo>{bottomLine}</PostInfo>
        <AuthorName>@MrConerMurphy</AuthorName>
        <CornerArt adjustments={[1.5, 0, 0, 0]} />
      </CardContainer>
    </CardLinkExternal>
  );
};

export default contentCard;
