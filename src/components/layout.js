// Importing dependcies from other sources to be worked with.
import React from 'react';
import 'normalize.css'; // Installing Normalize css
import styled from 'styled-components';
import '../styles/global.css';
import PropTypes from 'prop-types';
import Header from './header';

const Layout = ({ children }) => (
  <>
    <main>{children}</main>
    <header></header>
  </>
);

Layout.propTypes = {
  children: PropTypes.shape,
};

export default Layout;
