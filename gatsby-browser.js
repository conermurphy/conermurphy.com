import { AnimatePresence } from 'framer-motion';
import React from 'react';
import Layout from './src/components/Layout';
import { ThemeProvider } from './src/context/ThemeContext';
import UseMobileChecker from './src/utils/useMobileChecker';

export function wrapPageElement({ element, props }) {
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Layout {...props}>{element}</Layout>
    </AnimatePresence>
  );
}

export function wrapRootElement({ element }) {
  return <ThemeProvider>{element}</ThemeProvider>;
}
