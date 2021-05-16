import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { FaUserAlt, FaHome, FaPalette, FaKeyboard, FaTwitter, FaAlignJustify } from 'react-icons/fa';
import ThemeContext from '../context/ThemeContext';

const MobileNavBarContainer = styled.nav`
  position: fixed;
  bottom: 10px;

  z-index: 999;

  padding: 1rem 2rem;
  margin: 0;
  width: auto;
  background-color: var(--accent);
  border-radius: var(--borderRadius);

  & > ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: clamp(2rem, 1vw, 4rem);

    margin: 0;

    & > li > a,
    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      font-size: clamp(1.2rem, 2vw, 1.6rem);
      text-decoration: none;
      background-color: transparent;
      border: none;
      color: var(--primaryText);

      opacity: 0.75;

      & > svg {
        font-size: clamp(1.6rem, 2vw, 2rem);
      }

      &.active {
        opacity: 1;
      }
    }
  }
`;

export function MobileNavBar({ path }) {
  const [isThemeDark, toggleThemeDark] = useContext(ThemeContext);

  let currentRootPage;
  if (path === undefined) {
    currentRootPage = '';
  } else {
    currentRootPage = path.split('/')[1]; // Used to determine what root page the user is on. e.g. blog, notes, projects...
  }

  return (
    <MobileNavBarContainer>
      <ul>
        <li>
          <Link to="/" className={currentRootPage === '' ? 'active' : ''}>
            <FaHome />
            Home
          </Link>
        </li>
        <li>
          <Link to="/about-me" className={currentRootPage === 'about-me' ? 'active' : ''}>
            <FaUserAlt />
            About
          </Link>
        </li>
        <li>
          <Link to="/blog" className={currentRootPage === 'blog' ? 'active' : ''}>
            <FaKeyboard />
            Blog
          </Link>
        </li>
        <li>
          <Link to="/threads" className={currentRootPage === 'threads' ? 'active' : ''}>
            <FaTwitter />
            Threads
          </Link>
        </li>
        <li>
          <button type="button">
            <FaAlignJustify />
            Menu
          </button>
        </li>
      </ul>
    </MobileNavBarContainer>
  );
}
