import React, { useContext, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import 'normalize.css';
import { motion } from 'framer-motion';
import Typography from '../styles/Typography';
import GlobalStyles from '../styles/GlobalStyles';
import Nav from './Nav';
import { Footer } from './Footer';
import { lightTheme, darkTheme } from '../styles/Themes';
import ThemeContext from '../context/ThemeContext';
import { MobileNav, MobileNavBar } from './MobileNav';
import UseMobileChecker from '../utils/useMobileChecker';

const SiteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const MobileMenuOpenContainer = styled(motion.div)`
  width: 100%;
  background-color: var(--primaryBg);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100vh;
  overflow: hidden;

  & > main {
    overflow-y: scroll;
    overflow-x: hidden;
    max-width: 80vw;
    align-self: center;

    & > button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 100%;

      border: none;
      background-color: var(--primaryBg);
      border-radius: var(--borderRadius);
      filter: drop-shadow(var(--shadow));

      & > * {
        line-height: initial;
      }
    }
  }
`;

export default function Layout({ children, path }) {
  const [isMobile] = UseMobileChecker();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isThemeDark, toggleThemeDark, componentMounted] = useContext(ThemeContext);

  return (
    <ThemeProvider theme={isThemeDark ? darkTheme : lightTheme}>
      <SiteContainer>
        <Typography />
        <GlobalStyles />
        {isMobile ? !isMobileMenuOpen ? <MobileNavBar path={path} setMobileMenuOpen={setMobileMenuOpen} /> : null : <Nav path={path} />}
        {isMobile && isMobileMenuOpen && (
          <MobileMenuOpenContainer
            key="MobileMenuContainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'tween',
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            <MobileNav path={path} setMobileMenuOpen={setMobileMenuOpen} />
          </MobileMenuOpenContainer>
        )}
        {!isMobileMenuOpen && (
          <>
            <motion.main
              key={`${path}-Main`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: 'tween',
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              {children}
            </motion.main>
            <Footer />
          </>
        )}
      </SiteContainer>
    </ThemeProvider>
  );
}
