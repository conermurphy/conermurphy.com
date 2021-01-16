import React from 'react';
import styled from 'styled-components';
import 'normalize.css';
import PropTypes from 'prop-types';
import Typography from '../styles/Typography';
import GlobalStyles from '../styles/GlobalStyles';
import Nav from './Nav';
import Footer from './Footer';
import checkForAnalyticsCookie from '../utils/checkForAnalyticsCookie';
import CookieBanner from './CookieBanner';

const SiteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
`;

const ContentContainer = styled.div`
  width: 1200px;
  flex-grow: 1;

  @media (max-width: 1200px) {
    max-width: 1200px;
    width: auto;
  }
`;

export default function Layout({ children, path }) {
  const analyticsAllowed = checkForAnalyticsCookie();

  const cookieCheckRequired = !!(analyticsAllowed === 'promptUser');

  return (
    <SiteContainer>
      <Typography />
      <GlobalStyles />
      <ContentContainer>
        <Nav path={path} />
        {children}
        {cookieCheckRequired && <CookieBanner />}
      </ContentContainer>
      <Footer />
    </SiteContainer>
  );
}

Layout.propTypes = {
  children: PropTypes.object,
  path: PropTypes.string,
};
