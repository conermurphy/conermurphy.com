import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--secondary-color);
  margin: 2rem 0;
  filter: drop-shadow(0 0 2px var(--drop-shadows));
  padding: 1rem;
`;

const ContactMethodContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 1rem;
`;

const ContactMethod = styled(motion.a)`
  & > svg {
    color: var(--body-font-color);
    height: 1rem;
    width: 1rem;
    border: 2px solid var(--header-font-color);
    border-radius: 0.5rem;
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
    <h4 style={{ marginTop: '1rem' }}>Got a question?</h4>
    <p>
      If you've got a question, want to say hi, or are interested in working on a project with me. You can contact me via the links below:
    </p>
    <ContactMethodContainer>
      <ContactMethod href="https://twitter.com/MrConerMurphy" aria-label="Twitter" whileHover={navItemHover} whileTap={navItemTap}>
        <FaTwitter />
      </ContactMethod>
      <ContactMethod href="https://www.instagram.com/mrconermurphy/" aria-label="Instagram" whileHover={navItemHover} whileTap={navItemTap}>
        <FaInstagram />
      </ContactMethod>
      <ContactMethod href="https://github.com/conermurphy" aria-label="Github" whileHover={navItemHover} whileTap={navItemTap}>
        <FaGithub />
      </ContactMethod>
      <ContactMethod href="mailto:coner@conermurphy.com" aria-label="Email" whileHover={navItemHover} whileTap={navItemTap}>
        <FaEnvelope />
      </ContactMethod>
    </ContactMethodContainer>
  </Container>
);

export default ContactBlock;
