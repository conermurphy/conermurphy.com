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

  & > main {
    margin-top: ${(props) => (props.isMobile ? '0' : '10rem')};
    z-index: 100;
  }
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
`;

export default function Layout({ children, path }) {
  const [isMobile] = UseMobileChecker();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isThemeDark, toggleThemeDark, componentMounted] = useContext(ThemeContext);

  const mainVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <ThemeProvider theme={isThemeDark ? darkTheme : lightTheme}>
      <SiteContainer isMobile={isMobile}>
        <Typography />
        <GlobalStyles />
        {componentMounted ? (
          isMobile ? (
            !isMobileMenuOpen ? (
              <MobileNavBar path={path} setMobileMenuOpen={setMobileMenuOpen} />
            ) : null
          ) : (
            <Nav path={path} />
          )
        ) : null}
        {isMobile && isMobileMenuOpen && (
          <MobileMenuOpenContainer
            key="MobileMenuContainer"
            initial="hidden"
            variants={mainVariants}
            animate={isMobileMenuOpen ? 'visible' : 'hidden'}
            exit="hidden"
            transition={{
              type: 'tween',
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            <MobileNav path={path} setMobileMenuOpen={setMobileMenuOpen} />
          </MobileMenuOpenContainer>
        )}
        <motion.main
          key={`${path}-Main`}
          initial="hidden"
          variants={mainVariants}
          animate={isMobileMenuOpen ? 'hidden' : 'visible'}
          exit="hidden"
          transition={{
            type: 'tween',
            duration: 0.25,
            ease: 'easeInOut',
          }}
        >
          {children}
        </motion.main>
        <Footer />
      </SiteContainer>
    </ThemeProvider>
  );
}
