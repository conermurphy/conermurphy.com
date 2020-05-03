import React, { useState } from 'react';
import { Link } from 'gatsby';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Logo from './logo';

const NavContainer = styled.nav`
  position: ${props => (props.navActive ? 'relative' : 'sticky')};
  justify-content: space-around;
  align-items: center;
  background-color: var(--secondary-color);

  bottom: 0;
  display: flex;
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

const SubNavMenuContainer = styled.div`
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

const NavMenu = ({ onClick, navActive }) => (
  <SubNavMenuContainer>
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
    <NavItem onClick={onClick}>{navActive ? 'X' : 'Menu'}</NavItem>
  </SubNavMenuContainer>
);

const Nav = () => {
  const [navActive, setNavActive] = useState(false);

  function handleClick() {
    setNavActive(!navActive);
  }

  return navActive ? (
    <NavMenu onClick={handleClick} navActive={navActive} />
  ) : (
    <NavContainer navActive={navActive}>
      <Logo height="3rem" />
      <NavItem onClick={handleClick}>{navActive ? 'X' : 'Menu'}</NavItem>
    </NavContainer>
  );
};

NavMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  navActive: PropTypes.bool.isRequired,
};

export default Nav;
