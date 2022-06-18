import { Variants } from 'framer-motion';
import { Icons, PostCategories } from './types';

export const ICONS: Icons = {
  MOON: { name: 'MOON' },
  SUN: { name: 'SUN' },
  JUSTIFY: { name: 'JUSTIFY' },
  CLOSE: { name: 'CLOSE' },
  CODE: { name: 'CODE' },
  KEYBOARD: { name: 'KEYBOARD' },
  SOCIALS: { name: 'SOCIALS' },
  TWITTER: { name: 'TWITTER', color: 'rgb(29, 161, 242)' },
  LINKEDIN: { name: 'LINKEDIN', color: 'rgb(0, 119, 181)' },
  EMAIL: { name: 'EMAIL' },
  FACEBOOK: { name: 'FACEBOOK', color: 'rgb(66, 103, 178)' },
  GITHUB: { name: 'GITHUB' },
  INSTAGRAM: { name: 'INSTAGRAM', color: 'rgb(131, 58, 180)' },
  YOUTUBE: { name: 'YOUTUBE', color: 'rgb(255, 0, 0)' },
  REDDIT: { name: 'REDDIT', color: 'rgb(255, 86, 0)' },
  COPY: { name: 'COPY' },
  TICK: { name: 'TICK' },
  LINK: { name: 'LINK' },
  GRAPHQL: { name: 'GRAPHQL', color: 'hsl(319, 100%, 44%)' },
  REACT: { name: 'REACT', color: 'hsl(193, 95%, 68%)' },
  NEXTJS: { name: 'NEXTJS', color: 'hsl(0, 0%, 7%)', invertDark: true },
  TYPESCRIPT: { name: 'TYPESCRIPT', color: 'hsl(211, 60%, 48%)' },
  JAVASCRIPT: { name: 'JAVASCRIPT', color: 'hsl(53, 93%, 54%)' },
  TAILWINDCSS: { name: 'TAILWINDCSS', color: 'rgb(14, 165, 233)' },
};

export const CATEGORIES: PostCategories = {
  ENTREPRENEURSHIP: {
    name: 'Entrepreneurship',
    link: 'entrepreneurship',
  },
  DESIGN: {
    name: 'Design',
    link: 'design',
  },
  DEVELOPMENT: {
    name: 'Development',
    link: 'development',
  },
  'CONTENT-CREATION': {
    name: 'Content Creation',
    link: 'content-creation',
  },
  LIFE: {
    name: 'Life',
    link: 'life',
  },
  PRODUCTIVITY: {
    name: 'Productivity',
    link: 'productivity',
  },
  MARKETING: {
    name: 'Marketing',
    link: 'marketing',
  },
};

export const TECHS = [
  ICONS.GRAPHQL.name,
  ICONS.REACT.name,
  ICONS.NEXTJS.name,
  ICONS.TYPESCRIPT.name,
  ICONS.JAVASCRIPT.name,
];

export const HOME_TYPEWRITER_TEXT = [
  'TypeScript Developer',
  'Technical Writer',
  'Content Creator',
];

// ANIMATION VARIANTS

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const postComponent: Variants = {
  offscreen: {
    y: 25,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 0.6,
    },
  },
};

export const viewportSettings = { once: true, amount: 0.8 };
