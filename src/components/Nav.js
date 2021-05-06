import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { FaUserAlt } from 'react-icons/fa';
import NavThemeContext from '../context/NavThemeContext';
import { useSiteMetadata } from '../utils/useSiteMetadata';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;

  ul {
    display: flex;
    gap: 5rem;
    margin: 0;
    padding: 0;
    text-align: center;
    align-items: center;

    & > li {
      display: inline-block;

      & > a:not(.callToAction) {
        padding-bottom: 1rem;
      }
    }
  }

  a {
    text-decoration: none;

    &.active {
      border-bottom: 2px solid var(--accent);
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100vw;

  padding: 1.25rem;
  margin-bottom: 2.5rem;
  background-color: var(--secondaryBg);
  box-shadow: var(--shadow);

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: clamp(600px, 90vw, var(--maxWidth));
  }
`;

const AuthorCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  gap: 1.5rem;

  & img {
    width: 50px;
  }

  & > h3 {
    font-size: 2rem;
  }
`;

export function AuthorCard() {
  const { title, image } = useSiteMetadata();

  return (
    <AuthorCardContainer>
      <Link to="/">
        <img src={image} alt="Site Logo" />
      </Link>
      <h3>{title}</h3>
    </AuthorCardContainer>
  );
}

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
      <div>
        <AuthorCard />
        <StyledNav>
          <ul>
            <li>
              <Link to="/about-me" className={currentRootPage === 'about-me' ? 'active' : ''}>
                About Me
              </Link>
            </li>
            <li>
              <Link to="/blog" className={currentRootPage === 'blog' ? 'active' : ''}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className={currentRootPage === 'portfolio' ? 'active' : ''}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/contact-me" className="callToAction">
                <FaUserAlt /> Hire Me
              </Link>
            </li>
          </ul>
        </StyledNav>
      </div>
    </NavContainer>
  );
}
