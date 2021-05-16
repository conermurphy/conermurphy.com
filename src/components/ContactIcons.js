import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaLinkedin, FaEnvelope, FaInstagram, FaGithub, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactIconsContainer = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.5rem;

  & > li {
    & a {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .contactIcon {
    & > svg {
      font-size: 2.5rem;
      fill: var(--headerText);
      overflow: hidden;
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
            <FaGithub />
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
            <FaTwitter />
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
            <FaLinkedin />
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
            <FaInstagram />
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
            <FaFacebook />
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
            <FaEnvelope />
          </a>
        </motion.li>
      </ContactIconsContainer>
    </>
  );
}
