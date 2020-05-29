module.exports = {
  siteMetadata: {
    title: 'Coner Murphy',
    description: 'Web Developer, Blogger, Content Creator',
    author: 'Coner Murphy',
    url: 'https://conermurphy.com',
    twitterUsername: '@MrConerMurphy',
    image: '/src/assets/logo/CM-Logo-2020.png',
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
        icon: './src/assets/logo/CM-Logo-2020.png',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-167225463-1',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
          site {
            siteMetadata {
              title
              description
              url
            }
          }
        }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.edges.map(edge =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.url + edge.node.fields.slug,
                  guid: site.siteMetadata.url + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.body }],
                })
              ),
            query: `
              {
                allMdx {
                  edges {
                    node {
                      frontmatter {
                        title
                        date
                        description
                      }
                      rawBody
                      fields {
                        slug
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'conermurphy.com RSS Feed',
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/blog/',
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
  ],
};
