const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');
const { node } = require('prop-types');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions; // Getting the createNodeField API

  // If the node being processed is an MDX node then run this code.
  if (node.internal.type === 'Mdx') {
    // Get the contentType from the file parent directories of each node.
    const contentType = createFilePath({ node, getNode }).split('/')[1];
    const noteCategory = contentType === 'notes' ? createFilePath({ node, getNode }).split('/')[2] : null;

    // Generate a slug for each file based on the name of the file in the filepath for the node.
    const fileSlug = createFilePath({ node, getNode }).split('/')[3];

    // Decide the slug used for each node based on the:
    // 1) Type of content it is.
    // 2) If there is a slug present in the frontmatter
    // 3) For notes only what category it belonds to.
    let slug;
    if (node.frontmatter.slug) {
      if (contentType === 'blog') {
        slug = `/${contentType}/${node.frontmatter.slug}/`;
      }
      if (contentType === 'notes') {
        slug = `/${contentType}/${noteCategory}/${node.frontmatter.slug}/`;
      }
    } else {
      if (contentType === 'blog') {
        slug = `/${contentType}/${fileSlug}/`;
      }
      if (contentType === 'notes') {
        slug = `/${contentType}/${noteCategory}/${fileSlug}/`;
      }
    }

    // Creating extra fields for each node.
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
    createNodeField({
      node,
      name: 'filePath',
      value: slug,
    });
    createNodeField({
      node,
      name: 'contentCategory',
      value: contentType,
    });

    // If the node being processed if for a 'notes' node then add the cateogry of the note into the fields of the node.
    if (contentType === 'notes') {
      createNodeField({
        node,
        name: 'noteCategory',
        value: noteCategory,
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
      notes: allMdx(sort: { order: ASC, fields: frontmatter___date }, filter: { fields: { contentCategory: { eq: "notes" } } }) {
        edges {
          node {
            fields {
              slug
              contentCategory
              noteCategory
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
  const noteCategories = [...new Set(notes.map(({ node: note }) => note.fields.noteCategory))];

  const noteCategoryNodes = noteCategories.map((cat) => notes.filter(({ node: note }) => note.fields.noteCategory === cat));

  noteCategoryNodes.forEach((noteCat) => {
    noteCat.forEach(({ node: note }, index) => {
      createPage({
        path: note.fields.slug,
        component: path.resolve('./src/templates/Notes.js'),
        context: {
          slug: note.fields.slug,
          prev: index === 0 ? null : noteCat[index - 1].node,
          next: index === noteCat.length - 1 ? null : noteCat[index + 1].node,
        },
      });
    });
  });
};
