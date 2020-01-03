module.exports = {
  siteMetadata: {
    title: `Coner Murphy`,
    description: "The Web Made Simple.",
    author: `Coner Murphy`,
    siteUrl: `https://conermurphy.com`
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
  `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./content/data/`,
      },
    },
  {
    resolve: `gatsby-source-instagram`,
    options: {
      username: `conermurphy`,
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
      lang: `en`,
      display: `standalone`,
      icon: `content/media/assets/CM-Logo-2019.svg`, // This path is relative to the root of the site.
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
  `gatsby-plugin-styled-components`,
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-offline`,
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      // feeds: [
      //   {
      //     serialize: ({ query: { site, allMarkdownRemark } }) => {
      //       return allMarkdownRemark.edges.map(edge => {
      //         return Object.assign({}, edge.node.frontmatter, {
      //           description: edge.node.excerpt,
      //           date: edge.node.frontmatter.date,
      //           url: site.siteMetadata.siteUrl + edge.node.fields.slug,
      //           guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
      //           custom_elements: [{ "content:encoded": edge.node.html }],
      //         })
      //       })
      //     },
      //     query: `
      //       {
      //         allMarkdownRemark(
      //           sort: { order: DESC, fields: [frontmatter___date] },
      //         ) {
      //           edges {
      //             node {
      //               excerpt
      //               html
      //               fields { slug }
      //               frontmatter {
      //                 title
      //                 date
      //               }
      //             }
      //           }
      //         }
      //       }
      //     `,
      //     output: "/rss.xml",
      //     title: "Your Site's RSS Feed",
      //     // optional configuration to insert feed reference in pages:
      //     // if `string` is used, it will be used to create RegExp and then test if pathname of
      //     // current page satisfied this regular expression;
      //     // if not provided or `undefined`, all pages will have feed reference inserted
      //     match: "^/blog/",
      //     // optional configuration to specify external rss feed, such as feedburner
      //     link: "https://feeds.feedburner.com/gatsby/blog",
      //   },
      // ],
    },
  },
  ],
}
