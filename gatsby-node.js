const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions; // Getting the createNodeField API
  if (node.internal.type === 'Mdx') {
    // If the filepath contains 'blog' then create the slug prefixed with /blog/
    if (node.fileAbsolutePath.includes('blog')) {
      // Adds the new id field as the slug to the node so can be queried later on.
      const slug = createFilePath({ node, getNode }).split('/')[2];
      createNodeField({
        node,
        name: 'slug',
        value: node.frontmatter.slug ? `/blog/${node.frontmatter.slug}/` : `/blog/${slug}/`,
      });
      createNodeField({
        node,
        name: 'filePath',
        value: slug,
      });
      createNodeField({
        node,
        name: 'contentCategory',
        value: 'blog',
      });
      return;
    }

    // If the filepath contains 'nottes' then create the slug prefixed with /notes/
    if (node.fileAbsolutePath.includes('notes')) {
      const slug = createFilePath({ node, getNode }).split('/')[2];
      createNodeField({
        node,
        name: 'slug',
        value: node.frontmatter.slug ? `/notes/${node.frontmatter.slug}/` : `/notes/${slug}/`,
      });
      createNodeField({
        node,
        name: 'filePath',
        value: slug,
      });
      createNodeField({
        node,
        name: 'contentCategory',
        value: 'notes',
      });
    }
  }
};

// Query for every node and then use the regex matches to determine which content type it is and use the correct template.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Querying for every node filtered on contentType created above and then destructured out to seperate vars to use below.
  const {
    data: {
      blog: { edges: blog },
      notes: { edges: notes },
    },
  } = await graphql(`
    query {
      blog: allMdx(sort: { order: ASC, fields: frontmatter___date }, filter: { fields: { contentCategory: { eq: "blog" } } }) {
        edges {
          node {
            fields {
              slug
              contentCategory
            }
            frontmatter {
              title
              date(formatString: "DD/MM/YYYY")
            }
          }
        }
      }
      notes: allMdx(sort: { order: ASC, fields: frontmatter___date }, filter: { fields: { contentCategory: { eq: "blog" } } }) {
        edges {
          node {
            fields {
              slug
              contentCategory
            }
            frontmatter {
              title
              date(formatString: "DD/MM/YYYY")
            }
          }
        }
      }
    }
  `);

  // Creating a page for every blog post.
  blog.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/Blog.js'),
      context: {
        slug: node.fields.slug,
        prev: index === 0 ? null : blog[index - 1].node,
        next: index === blog.length - 1 ? null : blog[index + 1].node,
      },
    });
  });

  // TODO: Add a createPage for every note node found in the query with the abiltiy to go back and forth between notes of the same category.
};
