import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: 'Coner Murphy',
    description: 'Web Developer & Content Creator',
    author: 'Coner Murphy',
    siteUrl: 'https://conermurphy.com',
    twitterUsername: '@MrConerMurphy',
    image: '/Logo.png',
  },
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content/`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/images`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          'gatsby-remark-copy-linked-files',
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
              maxWidth: 1920,
              quality: 100,
            },
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
        background_color: '#FFFFFF',
        theme_color: '#4E66A6',
        lang: 'en',
        display: 'standalone',
        icon: './static/Logo.png',
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
              siteUrl
            }
          }
        }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.edges.map((edge) => ({
                ...edge.node.frontmatter,
                description: edge.node.description,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              })),
            query: `
              {
                allMdx(filter: {fields: {contentCategory: {eq: "blog"}}}, sort: {fields: frontmatter___date, order: DESC}) {
                  edges {
                    node {
                      frontmatter {
                        title
                        date
                        description
                      }
                      html
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
    'gatsby-plugin-image',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap',
  ],
};
