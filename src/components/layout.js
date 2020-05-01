// Importing dependcies from other sources to be worked with.
import React from 'react';
import 'normalize.css'; // Installing Normalize css
import styled from 'styled-components';
import '../styles/global.css';
import PropTypes from 'prop-types';
import Header from './header';
import Nav from './nav';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;

const PageContentContainer = styled.main`
  display: flex;
  flex: 10;
`;

const Layout = ({ children }) => (
  <Container>
    <PageContentContainer>{children}</PageContentContainer>
    <Nav />
  </Container>
);

Layout.propTypes = {
  children: PropTypes.shape,
};

export default Layout;
