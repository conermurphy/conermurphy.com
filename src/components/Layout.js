import React from 'react';
import styled from 'styled-components';
import 'normalize.css';
import Typography from '../styles/Typography';
import GlobalStyles from '../styles/GlobalStyles';
import Nav from './Nav';

const ContentStyles = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--white);
  padding: 0 5rem;
`;

export default function Layout({ children }) {
  return (
    <>
      <Typography />
      <GlobalStyles />
      <ContentStyles>
        <Nav />
        {children}
      </ContentStyles>
    </>
  );
}
