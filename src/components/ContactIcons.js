import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaLinkedin, FaEnvelope, FaInstagram, FaGithub } from 'react-icons/fa';

const ContactIconsContainer = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 0rem;

  & > li {
    padding: 0.25rem;
    margin: 0;

    & a {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .contactIcon {
    & > svg {
      padding: 0.75rem;
      border-radius: 5px;
      background-color: var(--white);
      fill: var(--black);
      margin: 0rem 0.5rem;
    }
  }
`;

export default function ContactIcons() {
  return (
    <>
      <ContactIconsContainer>
        <li>
          <a
            href="https://github.com/conermurphy"
            target="_blank"
            rel="noopener noreferrer"
            className="contactIcon"
            aria-label="Link to GitHhb Profile"
          >
            <FaGithub />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/MrConerMurphy"
            target="_blank"
            rel="noopener noreferrer"
            className="contactIcon"
            aria-label="Link to Twitter Profile"
          >
            <FaTwitter />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/coner-murphy/"
            target="_blank"
            rel="noopener noreferrer"
            className="contactIcon"
            aria-label="Link to LinkedIn Profile"
          >
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/mrconermurphy/"
            target="_blank"
            rel="noopener noreferrer"
            className="contactIcon"
            aria-label="Link to Instagram Profile"
          >
            <FaInstagram />
          </a>
        </li>
        <li>
          <a
            href="mailto:hey@conermurphy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contactIcon"
            aria-label="Email contact link"
          >
            <FaEnvelope />
          </a>
        </li>
      </ContactIconsContainer>
    </>
  );
}
