import React, { useContext, useEffect, useState } from 'react';
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
`;

const MobileMenuOpenContainer = styled.div`
  width: 100%;
  background-color: var(--secondaryBg);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100vh;
  overflow: hidden;

  & > main {
    background-color: var(--primaryBg);
    align-self: center;
    border-radius: var(--borderRadius);
    filter: drop-shadow(var(--shadow));
    overflow: scroll;
    max-width: 80vw;
  }
`;

export default function Layout({ children, path }) {
  const [isMobile] = UseMobileChecker();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(true);
  const [isThemeDark, toggleThemeDark, componentMounted] = useContext(ThemeContext);

  if (!componentMounted) {
    return <div />;
  }

  const CustomThemeProvider = motion(ThemeProvider);

  return isMobile && isMobileMenuOpen ? (
    <CustomThemeProvider theme={isThemeDark ? darkTheme : lightTheme}>
      <MobileMenuOpenContainer>
        <Typography />
        <GlobalStyles />
        <MobileNav path={path} setMobileMenuOpen={setMobileMenuOpen} />
        <main>{children}</main>
      </MobileMenuOpenContainer>
    </CustomThemeProvider>
  ) : (
    <CustomThemeProvider theme={isThemeDark ? darkTheme : lightTheme}>
      <SiteContainer>
        <Typography />
        <GlobalStyles />
        {isMobile ? <MobileNavBar path={path} setMobileMenuOpen={setMobileMenuOpen} /> : <Nav path={path} />}
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
      </SiteContainer>
    </CustomThemeProvider>
  );
}
