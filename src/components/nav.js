import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  position: sticky;
  top: 100vh;
  justify-content: space-evenly;
  align-items: center;
`;

const NavItem = styled.a`
  height: 7.5vh;
  display: flex;
  align-items: center;
`;

const Nav = () => (
  <NavContainer>
    <NavItem href="">1</NavItem>
    <NavItem href="">2</NavItem>
    <NavItem href="">3</NavItem>
    <NavItem href="">4</NavItem>
    <NavItem href="">5</NavItem>
  </NavContainer>
);

export default Nav;
