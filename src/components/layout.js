// Importing dependcies from other sources to be worked with.
import React from 'react';
import 'normalize.css'; // Installing Normalize css
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Nav from './nav';
import device from './device';
import Fonts from './fonts';

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const PageContentContainer = styled.main`
  display: flex;
  margin-bottom: 7vh;
  flex: 9;
  flex-direction: column;
  overflow-y: hidden;

  @media ${device.laptopL} {
    margin-bottom: 0;
    margin-top: 7vh;
  }
`;

const Layout = ({ children }) => (
  <Container>
    <Fonts />
    <Nav />
    <PageContentContainer>{children}</PageContentContainer>
  </Container>
);

Layout.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Layout;
