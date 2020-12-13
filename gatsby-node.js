const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions; // Getting the createNodeField API
  if (node.internal.type === 'Mdx') {
    // Adds the new id field as the slug to the node so can be queried later on.
    const slug = createFilePath({ node, getNode }).split('/')[2];
    createNodeField({
      node,
      name: 'slug',
      value: node.frontmatter.slug ? `/${node.frontmatter.slug}/` : slug,
    });
    createNodeField({
      node,
      name: 'filePath',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx(sort: { order: ASC, fields: frontmatter___date }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "DD/MM/YYYY")
              series
            }
          }
        }
      }
    }
  `);

  const posts = result.data.allMdx.edges;

  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/blogPost.js'),
      context: {
        slug: node.fields.slug,
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === posts.length - 1 ? null : posts[index + 1].node,
      },
    });
  });
};
