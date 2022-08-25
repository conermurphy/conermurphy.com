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
  FaAlignJustify,
  FaCheck,
  FaSun,
  FaMoon,
  FaLink,
} from 'react-icons/fa';
import { MdCode, MdKeyboard, MdShare } from 'react-icons/md';
import {
  SiGraphql,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
} from 'react-icons/si';
import { IoMdClose } from 'react-icons/io';
import { FiCopy } from 'react-icons/fi';
import { ICONS } from '../constants';

interface IProps {
  icon: string;
  size?: string;
  color?: string;
}

export default function getIcon({
  icon,
  size = '24px',
  color,
}: IProps): ReactNode {
  switch (icon) {
    case ICONS.SUN.name:
      return (
        <FaSun
          size={size}
          color={color}
          title="Light Theme Toggle Icon"
          data-testid="theme-icon"
          role="img"
          aria-label="Light theme toggle icon"
          className="hover:fill-accent"
        />
      );
    case ICONS.MOON.name:
      return (
        <FaMoon
          size={size}
          color={color}
          title="Dark Theme Toggle Icon"
          data-testid="theme-icon"
          role="img"
          aria-label="Dark theme toggle icon"
          className="hover:fill-accent"
        />
      );
    case ICONS.JUSTIFY.name:
      return (
        <FaAlignJustify
          size={size}
          color={color}
          title="Mobile Menu Open Icon"
          data-testid="menu-icon"
          role="img"
          aria-label="mobile menu open icon"
          className="hover:fill-accent"
        />
      );
    case ICONS.LINK.name:
      return (
        <FaLink
          size={size}
          color={color}
          title="Link Icon"
          data-testid="link-icon"
          role="img"
          aria-label="link icon"
          className="hover:fill-accent"
        />
      );
    case ICONS.CLOSE.name:
      return (
        <IoMdClose
          size={size}
          color={color}
          title="Mobile Menu Close Icon"
          data-testid="menu-icon"
          role="img"
          aria-label="mobile menu close icon"
          className="hover:fill-accent"
        />
      );
    case ICONS.KEYBOARD.name:
      return (
        <MdKeyboard
          size={size}
          color={color}
          title="keyboard icon"
          data-testid="services-icon"
          role="img"
          aria-label="Keyboard icon"
          className="hover:fill-accent"
        />
      );
    case ICONS.CODE.name:
      return (
        <MdCode
          size={size}
          color={color}
          title="< > symbols"
          data-testid="services-icon"
          role="img"
          aria-label="< > symbols"
          className="hover:fill-accent"
        />
      );
    case ICONS.SOCIALS.name:
      return (
        <MdShare
          size={size}
          color={color}
          title="Social media share icon"
          data-testid="services-icon"
          role="img"
          aria-label="Social media share icon"
          className="hover:fill-accent"
        />
      );
    case ICONS.COPY.name:
      return (
        <FiCopy
          size={size}
          color={color}
          title="Copy icon"
          data-testid="share-icon"
          role="img"
          aria-label="copy icon"
          className="hover:fill-accent"
        />
      );
    case ICONS.TICK.name:
      return (
        <FaCheck
          size={size}
          color={color}
          title="Tick icon"
          data-testid="tick-icon"
          role="img"
          aria-label="tick icon"
          className="hover:fill-accent"
        />
      );
    case ICONS.TWITTER.name:
      return (
        <FaTwitter
          size={size}
          color={color}
          title="Twitter logo"
          data-testid="socials-icon"
          role="img"
          aria-label="Twitter logo"
          className="hover:fill-accent"
        />
      );
    case ICONS.LINKEDIN.name:
      return (
        <FaLinkedin
          size={size}
          color={color}
          title="LinkedIn logo"
          data-testid="socials-icon"
          role="img"
          aria-label="LinkedIn logo"
          className="hover:fill-accent"
        />
      );
    case ICONS.EMAIL.name:
      return (
        <FaEnvelope
          size={size}
          color={color}
          title="Envelope icon"
          data-testid="socials-icon"
          role="img"
          aria-label="Email icon"
          className="hover:fill-accent"
        />
      );
    case ICONS.FACEBOOK.name:
      return (
        <FaFacebookSquare
          size={size}
          color={color}
          title="Facebook logo"
          data-testid="socials-icon"
          role="img"
          aria-label="Facebook logo"
          className="hover:fill-accent"
        />
      );
    case ICONS.GITHUB.name:
      return (
        <FaGithub
          size={size}
          color={color}
          title="GitHub logo"
          data-testid="socials-icon"
          role="img"
          aria-label="GitHub logo"
          className="hover:fill-accent"
        />
      );
    case ICONS.INSTAGRAM.name:
      return (
        <FaInstagram
          size={size}
          color={color}
          title="Instagram logo"
          data-testid="socials-icon"
          role="img"
          aria-label="Instagram logo"
          className="hover:fill-accent"
        />
      );
    case ICONS.YOUTUBE.name:
      return (
        <FaYoutube
          size={size}
          color={color}
          title="YouTube logo"
          data-testid="socials-icon"
          role="img"
          aria-label="YouTube logo"
          className="hover:fill-accent"
        />
      );
    case ICONS.REDDIT.name:
      return (
        <FaReddit
          size={size}
          color={color}
          title="Reddit logo"
          data-testid="socials-icon"
          role="img"
          aria-label="Reddit logo"
          className="hover:fill-accent"
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
          className={ICONS.NEXTJS.invertDark ? 'dark:invert' : 'dark:invert-0'}
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
    case ICONS.TAILWINDCSS.name:
      return (
        <SiTailwindcss
          size={size}
          color={ICONS.TAILWINDCSS.color}
          title="TailwindCSS logo"
          data-testid="tech-icon"
          role="img"
          aria-label="TailwindCSS logo"
        />
      );
    default:
      return null;
  }
}
