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
  FaAws,
} from 'react-icons/fa';
import { MdCode, MdKeyboard, MdShare } from 'react-icons/md';
import {
  SiGraphql,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiCss3,
  SiPrisma,
  SiNpm,
  SiNodedotjs,
} from 'react-icons/si';
import { IoMdClose } from 'react-icons/io';
import { FiCopy } from 'react-icons/fi';
import Img from 'next/image';
import { ICONS } from '../constants';

interface IProps {
  icon: string;
  size?: string;
  color?: string;
  disableHoverAnimation?: boolean;
}

export default function getIcon({
  icon,
  size = '24px',
  color,
  disableHoverAnimation = false,
}: IProps): ReactNode {
  switch (icon) {
    case ICONS.SUN.name:
      return (
        <FaSun
          size={size}
          color={color}
          title="Light Theme Toggle Icon"
          data-testid="theme-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.MOON.name:
      return (
        <FaMoon
          size={size}
          color={color}
          title="Dark Theme Toggle Icon"
          data-testid="theme-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.JUSTIFY.name:
      return (
        <FaAlignJustify
          size={size}
          color={color}
          title="Mobile Menu Open Icon"
          data-testid="menu-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.LINK.name:
      return (
        <FaLink
          size={size}
          color={color}
          title="Link Icon"
          data-testid="link-icon"
          className="hover:text-accent overflow-visible"
        />
      );
    case ICONS.CLOSE.name:
      return (
        <IoMdClose
          size={size}
          color={color}
          title="Mobile Menu Close Icon"
          data-testid="menu-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.KEYBOARD.name:
      return (
        <MdKeyboard
          size={size}
          color={color}
          title="keyboard icon"
          data-testid="services-icon"
        />
      );
    case ICONS.CODE.name:
      return (
        <MdCode
          size={size}
          color={color}
          title="< > symbols"
          data-testid="services-icon"
        />
      );
    case ICONS.SOCIALS.name:
      return (
        <MdShare
          size={size}
          color={color}
          title="Social media share icon"
          data-testid="services-icon"
        />
      );
    case ICONS.COPY.name:
      return (
        <FiCopy
          size={size}
          color={color}
          title="Copy icon"
          data-testid="share-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.TICK.name:
      return (
        <FaCheck
          size={size}
          color={color}
          title="Tick icon"
          data-testid="tick-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.TWITTER.name:
      return (
        <FaTwitter
          size={size}
          color={color}
          title="Twitter logo"
          data-testid="socials-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.LINKEDIN.name:
      return (
        <FaLinkedin
          size={size}
          color={color}
          title="LinkedIn logo"
          data-testid="socials-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.EMAIL.name:
      return (
        <FaEnvelope
          size={size}
          color={color}
          title="Envelope icon"
          data-testid="socials-icon"
          className={`${!disableHoverAnimation ? 'hover:text-accent' : ''}`}
        />
      );
    case ICONS.FACEBOOK.name:
      return (
        <FaFacebookSquare
          size={size}
          color={color}
          title="Facebook logo"
          data-testid="socials-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.GITHUB.name:
      return (
        <FaGithub
          size={size}
          color={color}
          title="GitHub logo"
          data-testid="socials-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.INSTAGRAM.name:
      return (
        <FaInstagram
          size={size}
          color={color}
          title="Instagram logo"
          data-testid="socials-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.YOUTUBE.name:
      return (
        <FaYoutube
          size={size}
          color={color}
          title="YouTube logo"
          data-testid="socials-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.REDDIT.name:
      return (
        <FaReddit
          size={size}
          color={color}
          title="Reddit logo"
          data-testid="socials-icon"
          className="hover:text-accent"
        />
      );
    case ICONS.GRAPHQL.name:
      return (
        <SiGraphql
          size={size}
          color={ICONS.GRAPHQL.color}
          title="GraphQL logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.REACTJS.name:
      return (
        <SiReact
          size={size}
          color={ICONS.REACTJS.color}
          title="ReactJS logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.NEXTJS.name:
      return (
        <SiNextdotjs
          size={size}
          color={ICONS.NEXTJS.color}
          title="Next.js logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.TYPESCRIPT.name:
      return (
        <SiTypescript
          size={size}
          color={ICONS.TYPESCRIPT.color}
          title="TypeScript logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.JAVASCRIPT.name:
      return (
        <SiJavascript
          size={size}
          color={ICONS.JAVASCRIPT.color}
          title="JavaScript logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.CSS.name:
      return (
        <SiCss3
          size={size}
          color={ICONS.CSS.color}
          title="CSS logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.TAILWINDCSS.name:
      return (
        <SiTailwindcss
          size={size}
          color={ICONS.TAILWINDCSS.color}
          title="TailwindCSS logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.PRISMA.name:
      return (
        <SiPrisma
          size={size}
          color={ICONS.PRISMA.color}
          title="Prisma logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.NPM.name:
      return (
        <SiNpm
          size={size}
          color={ICONS.NPM.color}
          title="NPM logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.NODEJS.name:
      return (
        <SiNodedotjs
          size={size}
          color={ICONS.NODEJS.color}
          title="Node.js logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.PLANETSCALE.name:
      return (
        <div className="relative" style={{ width: size, height: size }}>
          <Img
            src="/images/companies/planetscale.svg"
            fill
            alt="PlanetScale logo"
            title="PlanetScale logo"
          />
        </div>
      );
    case ICONS.AWS.name:
      return (
        <FaAws
          size={size}
          color={ICONS.AWS.color}
          title="AWS logo"
          data-testid="aws-icon"
        />
      );
    default:
      return null;
  }
}
