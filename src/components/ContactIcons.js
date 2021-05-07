import React from 'react';
import styled from 'styled-components';
import { FaTwitterSquare, FaLinkedin, FaEnvelopeSquare, FaInstagramSquare, FaGithubSquare, FaFacebookSquare } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactIconsContainer = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;

  & > li {
    & a {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .contactIcon {
    & > svg {
      font-size: 3.5rem;
      background-color: var(--white);
      fill: var(--accent);
    }
  }
`;

export default function ContactIcons() {
  return (
    <>
      <ContactIconsContainer>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a
            href="https://github.com/conermurphy"
            target="_blank"
            rel="noopener noreferrer"
            className="contactIcon"
            aria-label="Link to GitHhb Profile"
          >
            <FaGithubSquare style={{ fill: '#211F1F' }} />
          </a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a
            href="https://twitter.com/MrConerMurphy"
            target="_blank"
            rel="noopener noreferrer"
            className="contactIcon"
            aria-label="Link to Twitter Profile"
          >
            <FaTwitterSquare style={{ fill: '#08a0e9' }} />
          </a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a
            href="https://www.linkedin.com/in/coner-murphy/"
            target="_blank"
            rel="noopener noreferrer"
            className="contactIcon"
            aria-label="Link to LinkedIn Profile"
          >
            <FaLinkedin style={{ fill: '#0077B5' }} />
          </a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a
            href="https://instagram.com/mrconermurphy/"
            target="_blank"
            rel="noopener noreferrer"
            className="contactIcon"
            aria-label="Link to Instagram Profile"
          >
            <FaInstagramSquare style={{ fill: '#515BD4' }} />
          </a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a
            href="https://www.facebook.com/MrConerMurphy"
            target="_blank"
            rel="noopener noreferrer"
            className="contactIcon"
            aria-label="Link to Facebook Page"
          >
            <FaFacebookSquare style={{ fill: '#3B5998' }} />
          </a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a
            href="mailto:hey@conermurphy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contactIcon"
            aria-label="Email contact link"
          >
            <FaEnvelopeSquare />
          </a>
        </motion.li>
      </ContactIconsContainer>
    </>
  );
}
