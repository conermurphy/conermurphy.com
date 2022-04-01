import { ReactNode } from 'react';
import { MdCode, MdKeyboard, MdShare } from 'react-icons/md';
import {
  SiGraphql,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
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
          color="var(--primary)"
          title="keyboard icon"
          data-testid="services-icon"
        />
      );
    case ICONS.CODE.name:
      return (
        <MdCode
          size={size}
          color="var(--primary)"
          title="< > symbols"
          data-testid="services-icon"
        />
      );
    case ICONS.SOCIALS.name:
      return (
        <MdShare
          size={size}
          color="var(--primary)"
          title="Social media share icon"
          data-testid="services-icon"
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
    case ICONS.REACT.name:
      return (
        <SiReact
          size={size}
          color={ICONS.REACT.color}
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
    default:
      return null;
  }
}
