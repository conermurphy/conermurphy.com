import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--secondary-color);
  margin: 2rem 0;
  filter: drop-shadow(0 0 2px var(--drop-shadows));
  padding: 1rem;

  &::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-bottom: 1rem solid var(--secondary-color);
    position: absolute;
    top: -1rem;
    left: 10%;
  }
`;

const ContactMethodContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 1rem;

  & > a > svg {
    color: var(--body-font-color);
    height: 1rem;
    width: 1rem;
    border: 2px solid var(--header-font-color);
    border-radius: 0.5rem;
    padding: 1rem;
  }
`;

const ContactBlock = () => (
  <Container>
    <h4 style={{ marginTop: '1rem' }}>Got a question?</h4>
    <p>
      If you've got a question, want to say hi, or are interested in working on a project with me. You can contact me via the links below:
    </p>
    <ContactMethodContainer>
      <a href="https://twitter.com/MrConerMurphy" aria-label="Twitter">
        <FaTwitter />
      </a>
      <a href="https://www.instagram.com/mrconermurphy/" aria-label="Instagram">
        <FaInstagram />
      </a>
      <a href="https://github.com/conermurphy" aria-label="Github">
        <FaGithub />
      </a>
      <a href="mailto:coner@conermurphy.com" aria-label="Email">
        <FaEnvelope />
      </a>
    </ContactMethodContainer>
  </Container>
);

export default ContactBlock;
