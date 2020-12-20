import React from 'react';
import styled from 'styled-components';
import 'normalize.css';
import Typography from '../styles/Typography';
import GlobalStyles from '../styles/GlobalStyles';
import Nav from './Nav';
import Footer from './Footer';

const SiteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 1200px;
`;

export default function Layout({ children }) {
  return (
    <SiteContainer>
      <Typography />
      <GlobalStyles />
      <ContentContainer>
        <Nav />
        {children}
      </ContentContainer>
      <Footer />
    </SiteContainer>
  );
}
