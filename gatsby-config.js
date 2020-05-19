module.exports = {
  siteMetadata: {
    title: 'Coner Murphy',
    description: 'Web Developer, Blogger, Content Creator',
    author: 'Coner Murphy',
    url: 'https://conermurphy.com',
    twitterUsername: '@MrConerMurphy',
    image: '/static/profileImgs/CM-Logo-2020.png',
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
            resolve: 'gatsby-remark-vscode',
            options: {
              theme: 'Cobalt2',
              extensions: ['theme-cobalt2'],
            },
          },
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
        icon: './static/profileImgs/CM-Logo-2020.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
  ],
};
