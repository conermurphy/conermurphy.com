import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  position: sticky;
  top: 100vh;
  justify-content: space-evenly;
  align-items: center;
  background-color: #333;
  border-top-right-radius: 2vh;
  border-top-left-radius: 2vh;

  filter: drop-shadow(0 -1px 0px blue);
  filter: drop-shadow(0 -2px 1px blue);
  filter: drop-shadow(0 -4px 2px blue);
  filter: drop-shadow(0 -8px 4px blue);
`;

const NavItem = styled(Link)`
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
