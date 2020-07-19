import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import device from './device';

const ContactIconContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0.5rem;
  }

  @media ${device.tablet} {
    flex-wrap: wrap;
  }
`;

const IconContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0.5rem 0;

  & > svg {
    height: 1rem;
    width: 1rem;
    border: 2px solid var(--header-font-color);
    border-radius: 0.5rem;
    padding: 1rem;
  }
`;

const ContactIcons = () => {
  const itemHover = {
    scale: 1.05,
  };

  const itemTap = {
    scale: 0.9,
  };

  return (
    <ContactIconContainer>
      <a href="https://twitter.com/MrConerMurphy" aria-label="Twitter">
        <IconContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
          <FaTwitter />
        </IconContainer>
      </a>
      <a href="https://www.instagram.com/mrconermurphy/" aria-label="Instagram">
        <IconContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
          <FaInstagram />
        </IconContainer>
      </a>
      <a href="https://github.com/conermurphy" aria-label="Github">
        <IconContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
          <FaGithub />
        </IconContainer>
      </a>
      <a href="https://www.linkedin.com/in/coner-murphy/" aria-label="Linkedin">
        <IconContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
          <FaLinkedin />
        </IconContainer>
      </a>
      <a href="mailto:coner@conermurphy.com" aria-label="Email">
        <IconContainer whileHover={itemHover} whileTap={itemTap} transition="easeInOut">
          <FaEnvelope />
        </IconContainer>
      </a>
    </ContactIconContainer>
  );
};

export default ContactIcons;
