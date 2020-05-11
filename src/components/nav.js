import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPencilAlt, FaBriefcase, FaCommentDots, FaQuestion, FaMoon, FaSun, FaWindowClose } from 'react-icons/fa';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Logo from './logo';
import device from './device';

const NavContainer = styled(motion.nav)`
  position: ${props => (props.navActive ? 'relative' : 'sticky')};
  display: ${props => (props.navActive ? 'none' : 'flex')};
  justify-content: space-around;
  align-items: center;
  background-color: var(--secondary-color);
  padding: 0.5rem;
  height: 5vh;
  z-index: 999;
  box-shadow: 0px -2px 2px var(--drop-shadows);

  @media ${device.laptopL} {
    box-shadow: 0px 2px 2px var(--drop-shadows);
  }
`;

const NavItem = styled(motion.button)`
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--header-font-color);
  justify-content: center;
  background-color: var(--secondary-color);
  cursor: pointer;
`;

const SubNavMenuContainer = styled(motion.nav)`
  display: ${props => (props.navActive ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  position: fixed;
  justify-content: center;
  transition: 0.2s all;
  height: 100vh;
  width: 100vw;
  background-color: var(--secondary-color);

  & > a {
    margin: 1rem 0rem 1rem 0;
  }
`;

const SubNavItemContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  & > svg {
    color: var(--body-font-color);
    height: 1rem;
    width: 1rem;
    border: 2px solid var(--header-font-color);
    border-radius: 0.5rem;
    padding: 1rem;
  }
`;

const MiscMenuContainer = styled.div`
  display: flex;

  & > div {
    margin: 1rem;
  }
`;

const SubNavItemText = styled.p`
  text-align: center;
`;

const navMenuVariants = {
  open: { opacity: 1, x: 0, zIndex: 999, display: 'flex' },
  closed: { opacity: 0, x: 200, zIndex: -999, display: 'none' },
};

const navBarVariants = {
  open: { opacity: 1, x: 0, display: 'flex' },
  closed: { opacity: 0, x: -200, display: 'none' },
};

const navItemHover = {
  scale: 1.1,
};

const navItemTap = {
  scale: 0.9,
};

const NavMenu = ({ onClick, navActive, callback }) => {
  function handleClick(e) {
    if (e.currentTarget.tagName === 'NAV') {
      callback();
    }
  }

  let userThemePreference = null;
  let displayIcon = null;

  if (typeof window !== 'undefined') {
    userThemePreference = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    displayIcon = document.documentElement.getAttribute('data-theme') === 'light' ? <FaMoon /> : <FaSun />;
  }

  useEffect(() => {
    if (document.documentElement.getAttribute('data-theme') === null) {
      document.documentElement.setAttribute('data-theme', userThemePreference);
      localStorage.setItem('theme', userThemePreference);
    }
  }, [userThemePreference]);

  const handleDarkLight = () => {
    if (document.documentElement.getAttribute('data-theme') === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <AnimatePresence>
      <SubNavMenuContainer
        active={navActive}
        onClick={handleClick}
        initial="closed"
        animate={navActive ? 'open' : 'closed'}
        variants={navMenuVariants}
        transition={{ ease: 'easeInOut', duration: 0.1 }}
      >
        <SubNavItemContainer>
          <Logo height="3rem" />
        </SubNavItemContainer>
        <Link to="/#about">
          <SubNavItemContainer whileHover={navItemHover} whileTap={navItemTap} transition="easeInOut">
            <FaQuestion />
          </SubNavItemContainer>
          <SubNavItemText>About</SubNavItemText>
        </Link>
        <Link to="/blog">
          <SubNavItemContainer whileHover={navItemHover} whileTap={navItemTap} transition="easeInOut">
            <FaPencilAlt />
          </SubNavItemContainer>
          <SubNavItemText>Blog</SubNavItemText>
        </Link>
        <Link to="/work">
          <SubNavItemContainer whileHover={navItemHover} whileTap={navItemTap} transition="easeInOut">
            <FaBriefcase />
          </SubNavItemContainer>
          <SubNavItemText>Work</SubNavItemText>
        </Link>
        <Link to="/#contact">
          <SubNavItemContainer whileHover={navItemHover} whileTap={navItemTap} transition="easeInOut">
            <FaCommentDots />
          </SubNavItemContainer>
          <SubNavItemText>Contact</SubNavItemText>
        </Link>
        <MiscMenuContainer>
          <SubNavItemContainer onClick={onClick} active={navActive} whileHover={navItemHover} whileTap={navItemTap} transition="easeInOut">
            <FaWindowClose />
            <SubNavItemText>Close</SubNavItemText>
          </SubNavItemContainer>
          <SubNavItemContainer onClick={handleDarkLight} whileHover={navItemHover} transition="easeInOut">
            {displayIcon}
            <SubNavItemText>{localStorage.getItem('theme') === 'light' ? 'Dark?' : 'Light?'}</SubNavItemText>
          </SubNavItemContainer>
        </MiscMenuContainer>
      </SubNavMenuContainer>
    </AnimatePresence>
  );
};

const Nav = () => {
  const [navActive, setNavActive] = useState(false);

  function handleClick() {
    setNavActive(!navActive);
  }

  return (
    <>
      <NavMenu onClick={handleClick} navActive={navActive} callback={handleClick} />
      <NavContainer
        navActive={navActive}
        initial="open"
        animate={navActive ? 'closed' : 'open'}
        variants={navBarVariants}
        transition={{ ease: 'easeInOut', duration: 0.1 }}
      >
        <Logo height="3rem" />
        <NavItem onClick={handleClick}>Menu</NavItem>
      </NavContainer>
    </>
  );
};

NavMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  navActive: PropTypes.bool.isRequired,
};

export default Nav;
