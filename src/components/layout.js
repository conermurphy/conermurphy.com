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
  flex-direction: column;

  @media ${device.laptopL} {
    flex-direction: column-reverse;
  }
`;

const PageContentContainer = styled.main`
  display: flex;
  flex: 9;
  overflow-y: scroll;
  flex-direction: column;
`;

const Layout = ({ children }) => (
  <Container>
    <PageContentContainer>{children}</PageContentContainer>
    <Nav />
  </Container>
);

Layout.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Layout;
