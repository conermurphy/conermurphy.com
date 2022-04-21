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
