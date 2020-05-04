import React, { useState } from 'react';
import { Link } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';
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

const NavItem = styled.button`
  display: flex;
  align-items: center;
  margin: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--header-font-color);
  justify-content: center;
  background-color: var(--secondary-color);
`;

const SubNavMenuContainer = styled(motion.nav)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  justify-content: center;
  transition: 0.2s all;
  height: 100vh;
  width: 100vw;
  background-color: white;

  & > div {
    padding: 1rem;
  }
`;

const navMenuVariants = {
  open: { opacity: 1, x: 0, zIndex: 1 },
  closed: { opacity: 0, x: 200, zIndex: -1 },
};

const navBarVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -200 },
};

const NavMenu = ({ onClick, navActive, callback }) => {
  function handleClick(e) {
    if (e.target.tagName === 'NAV' || e.target.href === document.URL) {
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
        <div>
          <h1>Coner Murphy</h1>
        </div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/blog">Blog</Link>
        </div>
        <div>
          <Link to="/work">Work</Link>
        </div>
        <NavItem onClick={onClick}>X</NavItem>
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
