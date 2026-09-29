// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Coner Murphy'
export const SITE_DESCRIPTION =
  "I'm Coner, a full-stack developer, AWS Community Builder, speaker, content creator, and indie hacker based in Norwich, UK 🇬🇧."
export const PAGE_POST_LIMIT = 10

export const CONTACT_LINKS = [
  { name: 'Email', url: 'mailto:hey@conermurphy.com', icon: 'mail' },
  { name: 'GitHub', url: 'https://github.com/conermurphy/', icon: 'github' },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/conermurphy/',
    icon: 'linkedin',
  },
] as const

export const CLIENT_NAMES = {
  PRISMIC: 'Prismic',
  LOGROCKET: 'LogRocket',
  SNAPPIFY: 'Snappify',
} as const
