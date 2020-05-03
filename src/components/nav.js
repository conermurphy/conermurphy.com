import React from 'react';
import { Link } from 'gatsby';
import { motion } from 'framer-motion';
import { FaAlignCenter } from 'react-icons/fa';
import styled from 'styled-components';
import Logo from './logo';

const NavContainer = styled.nav`
  position: sticky;
  justify-content: space-around;
  align-items: center;

  background-color: var(--secondary-color);

  filter: drop-shadow(0 -2px 2px rgba(200, 200, 200, 20));

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

const Nav = () => (
  <NavContainer>
    <Logo height="3rem" />
    <NavItem>Menu</NavItem>
  </NavContainer>
);

export default Nav;
