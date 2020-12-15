import React from 'react';
import styled from 'styled-components';
import 'normalize.css';
import Typography from '../styles/Typography';
import GlobalStyles from '../styles/GlobalStyles';
import Nav from './Nav';

const SiteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Layout({ children }) {
  return (
    <SiteContainer>
      <Typography />
      <GlobalStyles />
      <div>
        <Nav />
        {children}
      </div>
    </SiteContainer>
  );
}
