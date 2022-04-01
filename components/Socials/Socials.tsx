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
  compact?: boolean;
}

export default function Socials({ compact = true }: IProps): JSX.Element {
  return compact ? (
    <address className="flex flex-row gap-8 opacity-75">
      <a href="https://twitter.com/MrConerMurphy">
        <FaTwitter size="20px" />
      </a>
      <a href="https://www.linkedin.com/in/conermurphy/">
        <FaLinkedin size="20px" />
      </a>
      <a href="mailto:hey@conermurphy.com">
        <FaEnvelope size="20px" />
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
