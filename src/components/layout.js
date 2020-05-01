// Importing dependcies from other sources to be worked with.
import React from 'react';
import 'normalize.css'; // Installing Normalize css
import styled from 'styled-components';
import '../styles/global.css';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-areas: 'sidebar main ';
  grid-template-columns: 17.5vw auto;
`;

const MainSectionContainer = styled.div`{
    grid-area: main;
    margin: 5rem 15rem;
    justify-self: center;
    width: fit-content;
`;

// Template for other pages to use.
const Layout = ({ children }) => (
  <LayoutContainer>
    <MainSectionContainer>{children}</MainSectionContainer>
  </LayoutContainer>
);

export default Layout;
