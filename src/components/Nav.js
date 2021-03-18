import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
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

    @media (max-width: 600px) {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
  }
  a {
    display: block;
    font-size: 2rem;
    padding: 1rem;
    text-decoration: none;

    &:hover {
      color: var(--green);
    }

    &.active {
      border-bottom: 2px solid var(--green);
      color: var(--green);
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 2.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }

  // Setting the colour of the logo and nav items based on the context theme
  * {
    fill: ${(props) => (props.theme === 'dark' ? 'var(--black)' : 'var(--white)')};
    color: ${(props) => (props.theme === 'dark' ? 'var(--black)' : 'var(--white)')};
  }
`;

export default function Nav({ path }) {
  const [theme, setTheme] = useContext(NavThemeContext);

  let currentRootPage;
  if (path === undefined) {
    currentRootPage = '';
  } else {
    currentRootPage = path.split('/')[1]; // Used to determine what root page the user is on. e.g. blog, notes, portfolio...
  }

  return (
    <NavContainer theme={theme}>
      <Logo height="7.5rem" link />
      <StyledNav>
        <ul>
          <li>
            <Link to="/blog" className={currentRootPage === 'blog' ? 'active' : ''}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/notes" className={currentRootPage === 'notes' ? 'active' : ''}>
              Notes
            </Link>
          </li>
          <li>
            <Link to="/threads" className={currentRootPage === 'threads' ? 'active' : ''}>
              Threads
            </Link>
          </li>
          <li>
            <Link to="/portfolio" className={currentRootPage === 'portfolio' ? 'active' : ''}>
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/reads" className={currentRootPage === 'reads' ? 'active' : ''}>
              Reads
            </Link>
          </li>
          <li>
            <Link to="/#aboutMe">Say Hi!</Link>
          </li>
        </ul>
      </StyledNav>
    </NavContainer>
  );
}

Nav.propTypes = {
  path: PropTypes.string,
};
