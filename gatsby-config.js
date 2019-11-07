module.exports = {
  siteMetadata: {
    title: `Coner Murphy`,
    description: "The Web Made Simple.",
    author: `Coner Murphy`,
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
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 800,
          },
        },
      ],
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Coner Murphy`,
      short_name: `Coner Murphy`,
      start_url: `/`,
      background_color: `#1f2a51`,
      theme_color: `#1f2a51`,
      // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
      // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
      display: `standalone`,
      icon: `content/media/assets/CM-Logo-2019.gif`, // This path is relative to the root of the site.
    },
  }, 
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      // replace "UA-XXXXXXXXX-X" with your own Tracking ID
      trackingId: "UA-107696124-1",
    },
  },
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-offline`,
  ],
}
