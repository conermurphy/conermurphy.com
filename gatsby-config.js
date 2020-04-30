module.exports = {
  siteMetadata: {
    title: 'Coner Murphy',
    description: 'The Web Made Simple.',
    author: 'Coner Murphy',
    siteUrl: 'https://conermurphy.com'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts`,
        name: 'posts'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/media/images`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/media/assets`,
        name: 'assets'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './content/data/'
      }
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
        icon: 'content/media/assets/CM-Logo-2019.svg' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
  ]
};
