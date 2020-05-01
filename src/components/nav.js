import React from 'react';
import { Link } from 'gatsby';
import { FaPenSquare, FaBriefcase } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../../static/profileImgs/CM-Logo-2019.svg';

const NavContainer = styled.nav`
  display: flex;
  position: sticky;
  top: 100vh;
  justify-content: space-evenly;
  align-items: center;

  background-color: rgba(250, 250, 250, 230);

  border-top-right-radius: 2vh;
  border-top-left-radius: 2vh;

  filter: drop-shadow(0 -2px 2px rgba(200, 200, 200, 20));
`;

const NavItem = styled(Link)`
  height: 7.5vh;
  display: flex;
  align-items: center;

  & > svg {
    font-size: 3.75vh;
  }
`;

const Logo = styled.img`
  height: 3.75vh;
  background-color: black;
  border-radius: 50%;
  border: 2px solid var(--body-font-color);
`;

const Nav = () => (
  <NavContainer>
    <NavItem to="/">
      <FaBriefcase />
    </NavItem>
    <NavItem to="/">
      <Logo src={logo} alt="Coner Murphy Creative Logo " />
    </NavItem>
    <NavItem to="/blog">
      <FaPenSquare />
    </NavItem>
  </NavContainer>
);

export default Nav;
