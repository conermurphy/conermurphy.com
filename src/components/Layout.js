import React from 'react';
import styled from 'styled-components';
import 'normalize.css';
import Typography from '../styles/Typography';
import GlobalStyles from '../styles/GlobalStyles';
import Nav from './Nav';
import { Footer } from './Footer';

const SiteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
`;

const ContentContainer = styled.div``;

export default function Layout({ children, path }) {
  return (
    <SiteContainer>
      <Typography />
      <GlobalStyles />
      <ContentContainer>
        <Nav path={path} />
        {children}
      </ContentContainer>
      <Footer />
    </SiteContainer>
  );
}
