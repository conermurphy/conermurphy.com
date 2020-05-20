// Importing dependcies from other sources to be worked with.
import React from 'react';
import 'normalize.css'; // Installing Normalize css
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Nav from './nav';
import device from './device';

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column-reverse;

  @media ${device.laptopL} {
    flex-direction: column;
  }
`;

const PageContentContainer = styled.main`
  display: flex;
  margin-bottom: 7.5vh;
  flex: 9;
  flex-direction: column;
  overflow-y: scroll;
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
