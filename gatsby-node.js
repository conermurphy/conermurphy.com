const path = require('path');

const nodes = [];

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions; // Getting the createNodeField API
  if (node.internal.type === 'Mdx') {
    nodes.push({ node, date: node.frontmatter.date }); // Adds the node with the date field to the nodes array.
    nodes.sort((a, b) => (a.date - b.date ? -1 : 1)); // Sorts the nodes field into ascending order (oldest = 0).
    const sortedNodes = nodes.map((x, index) => ({ ...x, id: index })); // Creates the new id field based off the sorted array.
    sortedNodes.forEach(e => {
      // Adds the new id field as the slug to the node so can be queried later on.
      createNodeField({
        node,
        name: 'slug',
        value: `/blog/${e.id}`,
      });
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
              category
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
