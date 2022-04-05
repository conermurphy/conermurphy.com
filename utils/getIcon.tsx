import { ReactNode } from 'react';
import {
  FaTwitter,
  FaLinkedin,
  FaFacebookSquare,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaReddit,
} from 'react-icons/fa';
import { MdCode, MdKeyboard, MdShare } from 'react-icons/md';
import {
  SiGraphql,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import { FiCopy } from 'react-icons/fi';
import { ICONS } from '../constants';

interface IProps {
  icon: string;
  size?: string;
}

export default function getIcon({ icon, size = '24px' }: IProps): ReactNode {
  switch (icon) {
    case ICONS.KEYBOARD.name:
      return (
        <MdKeyboard
          size={size}
          color="var(--primaryBackground)"
          title="keyboard icon"
          data-testid="services-icon"
          role="img"
          aria-label="Keyboard icon"
        />
      );
    case ICONS.CODE.name:
      return (
        <MdCode
          size={size}
          color="var(--primaryBackground)"
          title="< > symbols"
          data-testid="services-icon"
          role="img"
          aria-label="< > symbols"
        />
      );
    case ICONS.SOCIALS.name:
      return (
        <MdShare
          size={size}
          color="var(--primaryBackground)"
          title="Social media share icon"
          data-testid="services-icon"
          role="img"
          aria-label="Social media share icon"
        />
      );
    case ICONS.COPY.name:
      return (
        <FiCopy
          size={size}
          color="var(--primaryText)"
          title="Copy link icon"
          data-testid="share-icon"
          role="img"
          aria-label="copy link icon"
        />
      );
    case ICONS.TWITTER.name:
      return (
        <FaTwitter
          size={size}
          color="var(--primaryText)"
          title="Twitter logo"
          data-testid="socials-icon"
          role="img"
          aria-label="Twitter logo"
        />
      );
    case ICONS.LINKEDIN.name:
      return (
        <FaLinkedin
          size={size}
          color="var(--primaryText)"
          title="LinkedIn logo"
          data-testid="socials-icon"
          role="img"
          aria-label="LinkedIn logo"
        />
      );
    case ICONS.EMAIL.name:
      return (
        <FaEnvelope
          size={size}
          color="var(--primaryText)"
          title="Envelope icon"
          data-testid="socials-icon"
          role="img"
          aria-label="Email icon"
        />
      );
    case ICONS.FACEBOOK.name:
      return (
        <FaFacebookSquare
          size={size}
          color="var(--primaryText)"
          title="Facebook icon"
          data-testid="socials-icon"
          role="img"
          aria-label="Facebook logo"
        />
      );
    case ICONS.GITHUB.name:
      return (
        <FaGithub
          size={size}
          color="var(--primaryText)"
          title="GitHub icon"
          data-testid="socials-icon"
          role="img"
          aria-label="GitHub logo"
        />
      );
    case ICONS.INSTAGRAM.name:
      return (
        <FaInstagram
          size={size}
          color="var(--primaryText)"
          title="Instagram icon"
          data-testid="socials-icon"
          role="img"
          aria-label="Instagram logo"
        />
      );
    case ICONS.YOUTUBE.name:
      return (
        <FaYoutube
          size={size}
          color="var(--primaryText)"
          title="YouTube icon"
          data-testid="socials-icon"
          role="img"
          aria-label="YouTube logo"
        />
      );
    case ICONS.REDDIT.name:
      return (
        <FaReddit
          size={size}
          color="var(--primaryText)"
          title="Reddit icon"
          data-testid="socials-icon"
          role="img"
          aria-label="Reddit logo"
        />
      );
    case ICONS.GRAPHQL.name:
      return (
        <SiGraphql
          size={size}
          color={ICONS.GRAPHQL.color}
          title="GraphQL logo"
          data-testid="tech-icon"
          role="img"
          aria-label="GraphQL logo"
        />
      );
    case ICONS.REACT.name:
      return (
        <SiReact
          size={size}
          color={ICONS.REACT.color}
          title="ReactJS logo"
          data-testid="tech-icon"
          role="img"
          aria-label="React logo"
        />
      );
    case ICONS.NEXTJS.name:
      return (
        <SiNextdotjs
          size={size}
          color={ICONS.NEXTJS.color}
          title="Next.js logo"
          data-testid="tech-icon"
          role="img"
          aria-label="Next.js logo"
        />
      );
    case ICONS.TYPESCRIPT.name:
      return (
        <SiTypescript
          size={size}
          color={ICONS.TYPESCRIPT.color}
          title="TypeScript logo"
          data-testid="tech-icon"
          role="img"
          aria-label="TypeScript logo"
        />
      );
    case ICONS.JAVASCRIPT.name:
      return (
        <SiJavascript
          size={size}
          color={ICONS.JAVASCRIPT.color}
          title="JavaScript logo"
          data-testid="tech-icon"
          role="img"
          aria-label="JavaScript logo"
        />
      );
    default:
      return null;
  }
}
