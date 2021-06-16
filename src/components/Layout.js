import React, { useContext, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import 'normalize.css';
import { motion, useIsPresent } from 'framer-motion';
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
`;

export default function Layout({ children, path }) {
  const [isMobile] = UseMobileChecker();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isThemeDark] = useContext(ThemeContext);

  const mainVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const isPresent = useIsPresent();

  return (
    <ThemeProvider theme={isThemeDark ? darkTheme : lightTheme}>
      <SiteContainer>
        <Typography />
        <GlobalStyles />
        {isPresent && isMobile !== undefined ? (
          isMobile ? (
            !isMobileMenuOpen ? (
              <MobileNavBar path={path} setMobileMenuOpen={setMobileMenuOpen} />
            ) : null
          ) : (
            <Nav path={path} />
          )
        ) : null}
        {isPresent && isMobile && isMobileMenuOpen && (
          <MobileMenuOpenContainer>
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
