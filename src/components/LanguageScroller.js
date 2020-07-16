import React from 'react';
import styled from 'styled-components';
import LanguageIcons from './templates/languageIcons';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;
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
