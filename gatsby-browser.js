import React from 'react';
import Layout from './src/components/Layout';
import { NavThemeProvider } from './src/context/NavThemeContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <NavThemeProvider>{element}</NavThemeProvider>;
}
