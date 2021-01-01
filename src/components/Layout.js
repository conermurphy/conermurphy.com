import React from 'react';
import styled from 'styled-components';
import 'normalize.css';
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
  opacity: ${(props) => (props.opacityRequired ? 0.5 : 1)};
`;

export default function Layout({ children, path }) {
  const analyticsAllowed = checkForAnalyticsCookie();

  const cookieCheckRequired = !!(analyticsAllowed === 'promptUser');

  // This is here to fix the cookie popup rendering issue, not going to lie it's a hack...
  if (typeof window === 'undefined') {
    return <></>;
  }

  return (
    <SiteContainer>
      <Typography />
      <GlobalStyles />
      {cookieCheckRequired && <CookieBanner />}
      <ContentContainer opacityRequired={cookieCheckRequired}>
        <Nav path={path} />
        {children}
      </ContentContainer>
      <Footer />
    </SiteContainer>
  );
}
