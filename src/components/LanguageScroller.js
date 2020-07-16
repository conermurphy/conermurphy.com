import React from 'react';
import styled from 'styled-components';
import LanguageIcons from './templates/languageIcons';
import device from './device';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;

  @media ${device.desktop} {
    justify-content: center;
  }
`;

const LanguageScroller = () => {
  const languagesUsed = ['GatsbyJS', 'HTML', 'CSS', 'JavaScript', 'NodeJS', 'ReactJS', 'GraphQL'];

  return (
    <Container>
      {languagesUsed.map(lan => (
        <LanguageIcons language={lan} key={lan} />
      ))}
    </Container>
  );
};

export default LanguageScroller;
