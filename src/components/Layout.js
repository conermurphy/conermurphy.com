import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import 'normalize.css';
import { motion } from 'framer-motion';
import Typography from '../styles/Typography';
import GlobalStyles from '../styles/GlobalStyles';
import Nav from './Nav';
import { Footer } from './Footer';
import { lightTheme, darkTheme } from '../styles/Themes';
import NavThemeContext from '../context/NavThemeContext';

const SiteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
`;

export default function Layout({ children, path }) {
  const [isThemeDark, toggleThemeDark] = useContext(NavThemeContext);

  return (
    <ThemeProvider theme={isThemeDark ? darkTheme : lightTheme}>
      <SiteContainer>
        <Typography />
        <GlobalStyles />
        <Nav path={path} />
        <motion.main
          key={path}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'spring',
            mass: 0.35,
            stiffness: 75,
            duration: 0.3,
          }}
        >
          {children}
        </motion.main>
        <Footer />
      </SiteContainer>
    </ThemeProvider>
  );
}
