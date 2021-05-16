import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { FaUserAlt, FaHome, FaPalette, FaKeyboard, FaTwitter, FaAlignJustify, FaBoxes } from 'react-icons/fa';
import { MdChatBubble } from 'react-icons/md';
import ThemeContext from '../context/ThemeContext';
import { AuthorCard } from './Nav';

const MobileNavBarContainer = styled.nav`
  position: fixed;
  bottom: 10px;

  z-index: 999;

  padding: 0.75rem 1.5rem;
  margin: 0;
  width: auto;
  background-color: var(--secondaryBg);
  border-radius: var(--borderRadius);

  & > ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: clamp(2rem, 5vw, 5rem);

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
    .openMenuButton {
      cursor: pointer;
    }
  }
`;

const MobileNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 5rem 0;
  width: clamp(300px, 80vw, 1200px);

  & > .navHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  & > nav > ul {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;

    & > li > a {
      text-decoration: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 2rem;
      width: max-content;
      font-weight: bold;

      &:not(.callToAction) {
        padding-bottom: 0.5rem;
      }

      &.active {
        border-bottom: 3px solid var(--accent);
      }
    }
  }
`;

export function MobileNav({ path, setMobileMenuOpen }) {
  const [isThemeDark, toggleThemeDark] = useContext(ThemeContext);

  let currentRootPage;
  if (path === undefined) {
    currentRootPage = '';
  } else {
    currentRootPage = path.split('/')[1]; // Used to determine what root page the user is on. e.g. blog, notes, projects...
  }

  function handleClick() {
    setMobileMenuOpen(false);
  }

  return (
    <MobileNavContainer>
      <div className="navHeader">
        <AuthorCard closeMenu={handleClick} />
        <button type="button" onClick={() => toggleThemeDark()} className="darkModeToggle">
          <FaPalette />
        </button>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/about-me" className={currentRootPage === 'about-me' ? 'active' : ''} onClick={() => handleClick()}>
              <FaUserAlt />
              About Me
            </Link>
          </li>
          <li>
            <Link to="/blog" className={currentRootPage === 'blog' ? 'active' : ''} onClick={() => handleClick()}>
              <FaKeyboard />
              Blog
            </Link>
          </li>
          <li>
            <Link to="/threads" className={currentRootPage === 'threads' ? 'active' : ''} onClick={() => handleClick()}>
              <FaTwitter />
              Threads
            </Link>
          </li>
          <li>
            <Link to="/projects" className={currentRootPage === 'projects' ? 'active' : ''} onClick={() => handleClick()}>
              <FaBoxes />
              Projects
            </Link>
          </li>
          <li>
            <Link to="/contact-me" className="callToAction" onClick={() => handleClick()}>
              <MdChatBubble /> Hire Me
            </Link>
          </li>
        </ul>
      </nav>
    </MobileNavContainer>
  );
}

export function MobileNavBar({ path, setMobileMenuOpen }) {
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
          <button type="button" className="openMenuButton" onClick={() => setMobileMenuOpen(true)}>
            <FaAlignJustify />
            Menu
          </button>
        </li>
      </ul>
    </MobileNavBarContainer>
  );
}
