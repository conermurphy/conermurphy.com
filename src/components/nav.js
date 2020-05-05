import React, { useState } from 'react';
import { Link } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPencilAlt, FaBriefcase, FaCommentDots, FaQuestion } from 'react-icons/fa';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Logo from './logo';

const NavContainer = styled(motion.nav)`
  position: ${props => (props.navActive ? 'relative' : 'sticky')};
  display: ${props => (props.navActive ? 'none' : 'flex')};
  justify-content: space-around;
  align-items: center;
  background-color: var(--secondary-color);
  bottom: 0;
  padding: 0.5rem;
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
  background-color: white;

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
    height: 1rem;
    width: 1rem;
    border: 2px solid rgba(50, 50, 50, 200);
    border-radius: 0.5rem;
    padding: 1rem;
  }
`;

const SubNavItemText = styled.p`
  text-align: center;
`;

const navMenuVariants = {
  open: { opacity: 1, x: 0, zIndex: 1, display: 'flex' },
  closed: { opacity: 0, x: 200, zIndex: -1, display: 'none' },
};

const navBarVariants = {
  open: { opacity: 1, x: 0, display: 'flex' },
  closed: { opacity: 0, x: -200, display: 'none' },
};

const navItemHover = {
  scale: 1.1,
  color: 'rgba(149,55,32,255)',
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
        <Link to="/">
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
        <Link to="/" style={{ marginBottom: '2rem' }}>
          <SubNavItemContainer whileHover={navItemHover} whileTap={navItemTap} transition="easeInOut">
            <FaCommentDots />
          </SubNavItemContainer>
          <SubNavItemText>Contact</SubNavItemText>
        </Link>
        <NavItem onClick={onClick} active={navActive} whileHover={navItemHover} whileTap={navItemTap} transition="easeInOut">
          Close
        </NavItem>
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
