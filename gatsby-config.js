module.exports = {
  siteMetadata: {
    title: 'Coner Murphy',
    description: 'Web Developer, Blogger, Content Creator',
    author: 'Coner Murphy',
    url: 'https://conermurphy.com',
    twitterUsername: '@MrConerMurphy',
    image: '../content/media/assets/CM-Logo-2019.svg',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts',
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/data/',
        name: 'data',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
            },
            plugins: ['gatsby-remark-copy-linked-files'],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Coner Murphy',
        short_name: 'Coner Murphy',
        start_url: '/',
        background_color: '#F8F5F5',
        theme_color: '#F8F5F5',
        lang: 'en',
        display: 'standalone',
        icon: './static/profileImgs/CM-Logo-2019.svg', // Change this at a later point
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/', '/blog/*'],
      },
    },
  ],
};
