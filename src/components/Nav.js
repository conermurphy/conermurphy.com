import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Logo from './Logo';
import NavThemeContext from '../context/NavThemeContext';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: none;

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
    font-size: 2rem;
    padding: 0 1rem;
    text-decoration: none;

    &:hover {
      color: var(--green);
    }

    &[aria-current='page'] {
      border-bottom: 2px solid var(--green);
      color: var(--green);
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  // Setting the colour of the logo and nav items based on the context theme
  * {
    fill: ${(props) => (props.theme === 'dark' ? 'var(--black)' : 'var(--white)')};
    color: ${(props) => (props.theme === 'dark' ? 'var(--black)' : 'var(--white)')};
  }
`;

export default function Nav() {
  const [theme, setTheme] = useContext(NavThemeContext);

  return (
    <NavContainer theme={theme}>
      <Logo height="7.5rem" />
      <StyledNav>
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
    </NavContainer>
  );
}
