/** @type {import('next-sitemap').IConfig} */

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  siteUrl: dev ? 'http://localhost:3000' : 'https://conermurphy.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/*?',
      },
    ],
  },
  exclude: () => Array.from({ length: 100 }, (_, i) => `*/${i + 1}`),
};
