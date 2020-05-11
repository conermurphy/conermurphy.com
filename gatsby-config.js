module.exports = {
  siteMetadata: {
    title: 'Coner Murphy',
    description: 'Web Developer, Blogger, Content Creator',
    author: 'Coner Murphy',
    siteUrl: 'https://conermurphy.com',
    twitter: '',
    // logo: '../content/media/assets/CM-Logo-2019.svg',
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
        background_color: '#1f2a51',
        theme_color: '#1f2a51',
        lang: 'en',
        display: 'standalone',
        icon: './content/media/assets/CM-Logo-2019.svg', // Change this at a later point
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
  ],
};
