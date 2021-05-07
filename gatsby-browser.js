import { AnimatePresence } from 'framer-motion';
import React from 'react';
import Layout from './src/components/Layout';
import { NavThemeProvider } from './src/context/NavThemeContext';

export function wrapPageElement({ element, props }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Layout {...props}>{element}</Layout>
    </AnimatePresence>
  );
}

export function wrapRootElement({ element }) {
  return <NavThemeProvider>{element}</NavThemeProvider>;
}
