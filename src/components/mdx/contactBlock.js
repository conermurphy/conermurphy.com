import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa';
import device from '../device';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--secondary-color);
  margin: 2rem 0;
  filter: drop-shadow(0 0 2px var(--drop-shadows));

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const ContactMethodContainer = styled.div`
  flex: 1;
  display: grid;
  width: 20rem;
  height: 10rem;
  grid-template-columns: repeat(2, 10rem);
  grid-template-rows: repeat(2, 5rem);
  justify-content: center;
  align-items: center;
  overflow-y: visible;

  @media ${device.tablet} {
    overflow: hidden;
  }
`;

const ContactMethod = styled(motion.a)`
  height: 5rem;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--header-font-color);

  & > svg {
    color: var(--body-font-color);
    height: 2rem;
    width: 2rem;
    padding: 1rem;
  }
`;

const navItemHover = {
  scale: 1.1,
  ease: 'easeInOut',
};

const navItemTap = {
  scale: 0.9,
  ease: 'easeInOut',
};

const ContactBlock = () => (
  <Container>
    <div style={{ flex: 2, padding: '1rem' }}>
      <h4 style={{ marginTop: '0' }}>Got a question?</h4>
      <p>
        If you've got a question, want to say hi, or are interested in working on a project with me. You can contact me via the links below:
      </p>
    </div>
    <ContactMethodContainer>
      <ContactMethod
        href="https://twitter.com/MrConerMurphy"
        aria-label="Twitter"
        whileHover={navItemHover}
        whileTap={navItemTap}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTwitter />
      </ContactMethod>
      <ContactMethod
        href="https://www.instagram.com/mrconermurphy/"
        aria-label="Instagram"
        whileHover={navItemHover}
        whileTap={navItemTap}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram />
      </ContactMethod>
      <ContactMethod
        href="https://github.com/conermurphy"
        aria-label="Github"
        whileHover={navItemHover}
        whileTap={navItemTap}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub />
      </ContactMethod>
      <ContactMethod
        href="mailto:coner@conermurphy.com"
        aria-label="Email"
        whileHover={navItemHover}
        whileTap={navItemTap}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaEnvelope />
      </ContactMethod>
    </ContactMethodContainer>
  </Container>
);

export default ContactBlock;
