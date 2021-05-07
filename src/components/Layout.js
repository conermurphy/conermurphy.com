import React from 'react';
import styled from 'styled-components';
import 'normalize.css';
import { motion } from 'framer-motion';
import Typography from '../styles/Typography';
import GlobalStyles from '../styles/GlobalStyles';
import Nav from './Nav';
import { Footer } from './Footer';

const SiteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
`;

export default function Layout({ children, path }) {
  return (
    <SiteContainer>
      <Typography />
      <GlobalStyles />
      <Nav path={path} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'spring',
          mass: 0.35,
          stiffness: 75,
          duration: 0.5,
        }}
      >
        {children}
      </motion.main>
      <Footer />
    </SiteContainer>
  );
}
