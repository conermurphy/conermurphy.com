import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { FaUserAlt, FaHome, FaKeyboard, FaTwitter, FaAlignJustify, FaBoxes, FaTimes } from 'react-icons/fa';
import { MdChatBubble } from 'react-icons/md';
import { motion } from 'framer-motion';
import { AuthorCard } from './Nav';
import ContactIcons from './ContactIcons';
import { useHiddenNav } from '../utils/useHiddenNav';
import { ThemeToggler } from './ThemeToggler';

const MobileNavBarContainer = styled(motion.nav)`
  position: fixed;
  bottom: 2rem;

  z-index: 999;

  padding: 0.75rem 1.5rem;
  margin: 0;
  width: auto;
  background-color: var(--secondaryBg);
  border-radius: var(--borderRadius);
  filter: drop-shadow(var(--shadow));

  & > ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: clamp(2rem, 6vw, 5rem);

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
      font-weight: bold;
      font-size: 1.3rem;
      background-color: transparent;
      border: none;
      color: var(--primaryText);

      opacity: 0.6;

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
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: var(--secondaryBg);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > .navHeader {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: clamp(200px, 80vw, 350px);

      & > .navControls {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;

        & > button {
          border: none;
          background-color: none;
        }
      }
    }

    & > nav > ul {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;

      & > li > a {
        text-decoration: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 2rem;
        width: max-content;
        font-weight: bold;
        padding-bottom: 0.5rem;

        &.active {
          border-bottom: 3px solid var(--accent);
        }
      }
    }
  }
`;

export function MobileNav({ path, setMobileMenuOpen }) {
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
      <div>
        <div className="navHeader">
          <AuthorCard closeMenu={handleClick} />
          <div className="navControls">
            <ThemeToggler />
            <button type="button" onClick={() => handleClick()} className="buttonToggle">
              <FaTimes />
            </button>
          </div>
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
              <Link to="/contact" onClick={() => handleClick()}>
                <MdChatBubble /> Hire Me
              </Link>
            </li>
            <li>
              <ContactIcons />
            </li>
          </ul>
        </nav>
      </div>
    </MobileNavContainer>
  );
}

export function MobileNavBar({ path, setMobileMenuOpen }) {
  const [navHidden] = useHiddenNav();

  let currentRootPage;
  if (path === undefined) {
    currentRootPage = '';
  } else {
    currentRootPage = path.split('/')[1]; // Used to determine what root page the user is on. e.g. blog, notes, projects...
  }

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -25 },
  };

  return (
    <MobileNavBarContainer variants={variants} animate={navHidden ? 'hidden' : 'visible'} transition={{ ease: 'easeInOut', duration: 0.4 }}>
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
