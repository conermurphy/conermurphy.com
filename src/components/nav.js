import React from 'react';
import { Link } from 'gatsby';
import { motion } from 'framer-motion';
import { FaPenSquare, FaBriefcase } from 'react-icons/fa';
import styled from 'styled-components';
import Logo from './logo';

const NavContainer = styled.nav`
  position: sticky;
  justify-content: space-evenly;
  align-items: center;

  background-color: var(--header-font-color);

  border-top-right-radius: 2vh;
  border-top-left-radius: 2vh;

  filter: drop-shadow(0 -2px 2px rgba(200, 200, 200, 20));

  bottom: 0;
  display: flex;
`;

const NavItem = styled(Link)`
  height: 7.5vh;
  display: flex;
  align-items: center;

  & > svg {
    font-size: 3.75vh;
  }
`;

const Nav = () => (
  <NavContainer>
    <NavItem to="/">
      <FaBriefcase />
    </NavItem>
    <NavItem to="/">
      <Logo height="3.75vh" />
    </NavItem>
    <NavItem to="/blog">
      <FaPenSquare />
    </NavItem>
  </NavContainer>
);

export default Nav;
