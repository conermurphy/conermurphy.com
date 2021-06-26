import React, { useContext } from 'react';
import styled from 'styled-components';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { motion } from 'framer-motion';
import { MdChatBubble } from 'react-icons/md';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FaTwitter } from 'react-icons/fa';
import { useSiteMetadata } from '../utils/useSiteMetadata';
import ThemeContext from '../context/ThemeContext';
import { useHiddenNav } from '../utils/useHiddenNav';
import { ThemeToggler } from './ThemeToggler';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

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
    position: relative;

    &:not(.callToAction):before {
      content: '';
      position: absolute;
      width: 100%;
      height: 0px;
      border-bottom: 2px solid var(--accent);
      bottom: -2px;
      -webkit-transform: scaleX(0);
      -ms-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transition: -webkit-transform 0.2s ease-in;
      transition: transform 0.4s ease-in;
    }
    &:hover:before {
      -webkit-transform: scaleX(1);
      -ms-transform: scaleX(1);
      transform: scaleX(1);
    }

    &.active {
      border-bottom: 2px solid var(--accent);
    }
  }
`;

const NavContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: fixed;
  z-index: 999;

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
  > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;

    > .gatsby-image-wrapper {
      width: 50px;
      height: 50px;
    }
  }
`;

export function AuthorCard({ closeMenu }) {
  const { title } = useSiteMetadata();

  const data = useStaticQuery(graphql`
    query {
      logo: file(name: { eq: "Logo" }) {
        childImageSharp {
          gatsbyImageData(width: 50, placeholder: BLURRED)
        }
      }
    }
  `);

  const { logo } = data;

  return closeMenu ? (
    <AuthorCardContainer>
      <Link to="/" onClick={() => closeMenu()}>
        <GatsbyImage image={logo.childImageSharp.gatsbyImageData} alt="Logo" />
        <h3>{title}</h3>
      </Link>
    </AuthorCardContainer>
  ) : (
    <AuthorCardContainer>
      <Link to="/">
        <GatsbyImage image={logo.childImageSharp.gatsbyImageData} alt="Logo" />
        <h3>{title}</h3>
      </Link>
    </AuthorCardContainer>
  );
}

export default function Nav({ path }) {
  const [isThemeDark, toggleThemeDark] = useContext(ThemeContext);
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
    <NavContainer
      variants={variants}
      initial="visible"
      animate={navHidden ? 'hidden' : 'visible'}
      transition={{ ease: 'easeInOut', duration: 0.4 }}
    >
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
              <Link to="/threads" className={currentRootPage === 'threads' ? 'active' : ''}>
                Twitter Threads
              </Link>
            </li>
            <li>
              <Link to="/projects" className={currentRootPage === 'projects' ? 'active' : ''}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/contact" className="callToAction">
                <MdChatBubble /> Hire Me
              </Link>
            </li>
          </ul>
          <ThemeToggler />
        </StyledNav>
      </div>
    </NavContainer>
  );
}
