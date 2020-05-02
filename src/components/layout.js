// Importing dependcies from other sources to be worked with.
import React from 'react';
import 'normalize.css'; // Installing Normalize css
import styled from 'styled-components';
import '../styles/global.css';
import PropTypes from 'prop-types';
import Nav from './nav';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageContentContainer = styled.main`
  display: flex;
  flex: 10;
  padding 1rem;
  overflow: scroll;
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
