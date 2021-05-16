import React from 'react';
import Layout from './src/components/Layout';
import { ThemeProvider } from './src/context/ThemeContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <ThemeProvider>{element}</ThemeProvider>;
}
