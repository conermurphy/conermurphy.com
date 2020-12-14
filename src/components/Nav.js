import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Logo from './Logo';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: transparent;

  ul {
    display: grid;
    grid-template-columns: repeat(5, auto);
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;
    align-items: center;
  }
  a {
    display: block;
    font-size: 2.5rem;
    padding: 0 1rem;
    text-decoration: none;
  }
`;

export default function Nav() {
  return (
    <StyledNav>
      <Logo height="7.5rem" />
      <ul>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/reads">Reads</Link>
        </li>
        <li>
          <Link to="/contact">Say Hi!</Link>
        </li>
      </ul>
    </StyledNav>
  );
}
