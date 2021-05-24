import React, { useContext } from 'react';
import styled from 'styled-components';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { FaPalette } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { MdChatBubble } from 'react-icons/md';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useSiteMetadata } from '../utils/useSiteMetadata';
import ThemeContext from '../context/ThemeContext';

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
  justify-content: center;

  gap: 1.5rem;

  & > a > .gatsby-image-wrapper {
    width: 50px;
    height: 50px;
  }

  & > h3 {
    font-size: 2rem;
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
      </Link>
      <h3>{title}</h3>
    </AuthorCardContainer>
  ) : (
    <AuthorCardContainer>
      <Link to="/">
        <GatsbyImage image={logo.childImageSharp.gatsbyImageData} alt="Logo" />
      </Link>
      <h3>{title}</h3>
    </AuthorCardContainer>
  );
}

export default function Nav({ path }) {
  const [isThemeDark, toggleThemeDark] = useContext(ThemeContext);

  let currentRootPage;
  if (path === undefined) {
    currentRootPage = '';
  } else {
    currentRootPage = path.split('/')[1]; // Used to determine what root page the user is on. e.g. blog, notes, projects...
  }

  return (
    <NavContainer>
      <div>
        <AuthorCard />
        <StyledNav>
          <ul>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/about-me" className={currentRootPage === 'about-me' ? 'active' : ''}>
                About Me
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/blog" className={currentRootPage === 'blog' ? 'active' : ''}>
                Blog
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/threads" className={currentRootPage === 'threads' ? 'active' : ''}>
                Threads
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/projects" className={currentRootPage === 'projects' ? 'active' : ''}>
                Projects
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="callToAction">
                <MdChatBubble /> Hire Me
              </Link>
            </motion.li>
          </ul>
          <motion.button
            type="button"
            onClick={() => toggleThemeDark()}
            className="darkModeToggle"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle Dark Mode"
          >
            <FaPalette />
          </motion.button>
        </StyledNav>
      </div>
    </NavContainer>
  );
}
