import React from 'react';
import {
  FaTwitter,
  FaLinkedin,
  FaFacebookSquare,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from 'react-icons/fa';

interface IProps {
  isHeader?: boolean;
}

export default function Socials({ isHeader = true }: IProps): JSX.Element {
  return isHeader ? (
    <address className="flex flex-row gap-8">
      <a href="https://twitter.com/MrConerMurphy">
        <FaTwitter size="1.5rem" />
      </a>
      <a href="https://www.linkedin.com/in/conermurphy/">
        <FaLinkedin size="1.5rem" />
      </a>
      <a href="mailto:hey@conermurphy.com">
        <FaEnvelope size="1.5rem" />
      </a>
    </address>
  ) : (
    <address className="flex flex-row gap-5">
      <FaTwitter size="1.375rem" />
      <FaLinkedin size="1.375rem" />
      <FaFacebookSquare size="1.375rem" />
      <FaGithub size="1.375rem" />
      <FaInstagram size="1.375rem" />
      <FaYoutube size="1.375rem" />
    </address>
  );
}
