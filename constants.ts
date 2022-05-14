import { Icons, PostCategories } from './types';

export const ICONS: Icons = {
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
  NEXTJS: { name: 'NEXTJS', color: 'hsl(0, 0%, 7%)' },
  TYPESCRIPT: { name: 'TYPESCRIPT', color: 'hsl(211, 60%, 48%)' },
  JAVASCRIPT: { name: 'JAVASCRIPT', color: 'hsl(53, 93%, 54%)' },
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

export const THEMES = {
  light: {
    '--primaryBackground': 'rgba(248, 248, 250,1)',
    '--secondaryBackground': 'rgb(255,255,255,1)',
    '--primaryText': 'rgba(17,24,39,1)',
    '--accentBackground': 'rgba(249, 115, 22, .5)',
    '--accent': 'rgb(249, 115, 22)',
    '--primaryBorder': 'hsla(221, 39%, 11%, 0.25)',
  },
  dark: {
    '--primaryBackground': 'rgba(17, 24, 39,1)',
    '--secondaryBackground': 'rgb(12,18,29,1)',
    '--primaryText': 'rgba(248, 248, 250,1)',
    '--primaryTextDimmed': 'rgba(248, 248, 250,.75)',
    '--accentBackground': 'rgba(249, 115, 22, .5)',
    '--accent': 'rgb(249, 115, 22)',
    '--primaryBorder': 'hsla(221, 40%, 96%, 0.25)',
  },
};
