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
    <address className="flex flex-row gap-8 opacity-75">
      <a href="https://twitter.com/MrConerMurphy">
        <FaTwitter size="24px" />
      </a>
      <a href="https://www.linkedin.com/in/conermurphy/">
        <FaLinkedin size="24px" />
      </a>
      <a href="mailto:hey@conermurphy.com">
        <FaEnvelope size="24px" />
      </a>
    </address>
  ) : (
    <address className="flex flex-row gap-5">
      <FaTwitter size="22px" />
      <FaLinkedin size="22px" />
      <FaFacebookSquare size="22px" />
      <FaGithub size="22px" />
      <FaInstagram size="22px" />
      <FaYoutube size="22px" />
    </address>
  );
}
