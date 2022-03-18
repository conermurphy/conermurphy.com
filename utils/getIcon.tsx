import { ReactNode } from 'react';
import { MdCode, MdKeyboard, MdShare } from 'react-icons/md';
import {
  SiGraphql,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import { ICONS, ICONSCOLORS, THEMES } from '../types';

interface IProps {
  icon: ICONS;
  size?: string;
  theme?: THEMES;
}

function getColor(icon: ICONS, theme: THEMES) {
  switch (icon) {
    case ICONS.GRAPHQL:
      return ICONSCOLORS.GRAPHQL;
    case ICONS.REACT:
      return ICONSCOLORS.REACT;
    case ICONS.NEXTJS:
      return ICONSCOLORS.NEXTJS;
    case ICONS.TYPESCRIPT:
      return ICONSCOLORS.TYPESCRIPT;
    case ICONS.JAVASCRIPT:
      return ICONSCOLORS.JAVASCRIPT;
    default:
      break;
  }
  return theme === THEMES.LIGHT ? 'var(--primary)' : 'var(--offwhite)';
}

export default function getIcon({
  icon,
  size = '24px',
  theme = THEMES.LIGHT,
}: IProps): ReactNode {
  const color = getColor(icon, theme);

  switch (icon) {
    case ICONS.KEYBOARD:
      return (
        <MdKeyboard
          size={size}
          color={color}
          title="keyboard icon"
          data-testid="services-icon"
        />
      );
    case ICONS.CODE:
      return (
        <MdCode
          size={size}
          color={color}
          title="< > symbols"
          data-testid="services-icon"
        />
      );
    case ICONS.SOCIALS:
      return (
        <MdShare
          size={size}
          color={color}
          title="Social media share icon"
          data-testid="services-icon"
        />
      );
    case ICONS.GRAPHQL:
      return (
        <SiGraphql
          size={size}
          color={color}
          title="GraphQL logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.REACT:
      return (
        <SiReact
          size={size}
          color={color}
          title="ReactJS logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.NEXTJS:
      return (
        <SiNextdotjs
          size={size}
          color={color}
          title="Next.js logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.TYPESCRIPT:
      return (
        <SiTypescript
          size={size}
          color={color}
          title="TypeScript logo"
          data-testid="tech-icon"
        />
      );
    case ICONS.JAVASCRIPT:
      return (
        <SiJavascript
          size={size}
          color={color}
          title="JavaScript logo"
          data-testid="tech-icon"
        />
      );
    default:
      break;
  }
}
