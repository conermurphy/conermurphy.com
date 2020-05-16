// Importing dependcies from other sources to be worked with.
import React from 'react';
import 'normalize.css'; // Installing Normalize css
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Nav from './nav';
import device from './device';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  // scroll-snap-type: y mandatory;
  // scroll-padding: 10vh;

  @media ${device.laptopL} {
    flex-direction: column;
  }
`;

const PageContentContainer = styled.main`
  display: flex;
  flex: 9;
  flex-direction: column;
`;

const Layout = ({ children }) => (
  <Container>
    <Nav />
    <PageContentContainer>{children}</PageContentContainer>
  </Container>
);

Layout.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Layout;
