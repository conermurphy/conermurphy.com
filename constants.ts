import { Icons, PostCategories } from './types';

export const ICONS: Icons = {
  MOON: { name: 'MOON' },
  SUN: { name: 'SUN' },
  JUSTIFY: { name: 'JUSTIFY' },
  CLOSE: { name: 'CLOSE' },
  CODE: { name: 'CODE' },
  KEYBOARD: { name: 'KEYBOARD' },
  SOCIALS: { name: 'SOCIALS' },
  TWITTER: { name: 'TWITTER' },
  LINKEDIN: { name: 'LINKEDIN' },
  EMAIL: { name: 'EMAIL' },
  FACEBOOK: { name: 'FACEBOOK' },
  GITHUB: { name: 'GITHUB' },
  INSTAGRAM: { name: 'INSTAGRAM' },
  YOUTUBE: { name: 'YOUTUBE' },
  REDDIT: { name: 'REDDIT' },
  COPY: { name: 'COPY' },
  TICK: { name: 'TICK' },
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
