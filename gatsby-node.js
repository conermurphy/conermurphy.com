import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';

// This is the function called to create the main pages for each base.
function createMainPages(actions, base, component, totalCount) {
  const { createPage } = actions;
  // Setting pageSize and pageCount
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE); // Total number of posts on each page
  const pageCount = Math.ceil(totalCount / pageSize); // Total number of pages required.

  // Loop through each page required (1 to x) and create a new blog page for each.
  Array.from({ length: pageCount }).forEach((_, i) => {
    createPage({
      path: `/${base}/${i === 0 ? '' : i + 1}`,
      component,
      // Context is passed to the page so we can skip the required amount of posts on each page.
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function onCreateNode({ node, getNode, actions }) {
  const { createNodeField } = actions; // Getting the createNodeField API

  // If the node being processed is an MDX node then run this code.
  if (node.internal.type === 'Mdx' && node.frontmatter.type !== 'tweet') {
    // Get the contentType from the file parent directories of each node.
    const contentType = createFilePath({ node, getNode }).split('/')[1];

    // Generate a slug for each file based on the name of the file in the filepath for the node.
    const fileSlug = createFilePath({ node, getNode }).split('/')[3];

    // Decide the slug used for each node based on the:
    // 1) Type of content it is.
    // 2) If there is a slug present in the frontmatter
    // 3) For notes only what category it belonds to.
    let slug;
    if (node.frontmatter.slug) {
      slug = `/${contentType}/${node.frontmatter.slug}/`;
    } else {
      slug = `/${contentType}/${fileSlug}/`;
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
      value: fileSlug,
    });
    createNodeField({
      node,
      name: 'contentCategory',
      value: contentType,
    });
  }
}

async function turnBlogPostsIntoPages({ graphql, actions }) {
  const { createPage } = actions;

  // 1. Query for all of the data related to blog posts.
  const {
    data: {
      blog: { edges: blogPosts, totalCount: blogTotalCount },
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
              published
              date(formatString: "DD/MM/YYYY")
            }
          }
        }
        totalCount
      }
    }
  `);

  // 2. Create a page for every blog post node. (This is for indivual blog posts.)
  blogPosts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/Blog.js'),
      context: {
        slug: node.fields.slug,
        prev: index === 0 ? null : blogPosts[index - 1].node,
        next: index === blogPosts.length - 1 ? null : blogPosts[index + 1].node,
      },
    });
  });

  const blogTemplate = path.resolve('./src/pages/blog.js');

  // Create the main blog pages containing the posts..
  createMainPages(actions, 'blog', blogTemplate, blogTotalCount);
}

// Function to turn Twitter Threads into pages.
async function turnTwitterThreadsIntoPages({ graphql, actions }) {
  const { createPage } = actions;

  // 0: Fetch the template for the threads page.
  const threadsTemplate = path.resolve('./src/pages/threads.js');

  // 1: Query for all Twitter Thread Conversations
  const {
    data: {
      threads: { edges: threads, totalCount: threadsTotalCount },
    },
  } = await graphql(`
    query {
      threads: allMdx(sort: { order: ASC, fields: frontmatter___date }, filter: { fields: { contentCategory: { eq: "threads" } } }) {
        edges {
          node {
            fields {
              slug
              contentCategory
            }
            frontmatter {
              title
              date(formatString: "DD/MM/YYYY HH:mm")
            }
          }
        }
        totalCount
      }
    }
  `);
  // 2: Create an individual post page for every Twitter Thread.
  threads.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/Threads.js'),
      context: {
        slug: node.fields.slug,
        prev: index === 0 ? null : threads[index - 1].node,
        next: index === threads.length - 1 ? null : threads[index + 1].node,
      },
    });
  });

  // 3: Create the actual thread pages, paginated.\
  createMainPages(actions, 'threads', threadsTemplate, threadsTotalCount);
}

// === End of creating pages / posts ===

export async function createPages(params) {
  // After the creation of the nodes create pages for each custom type.
  await Promise.all([
    // Blog Posts
    turnBlogPostsIntoPages(params),
    // Turn sourced Twitter Threads into pages.
    turnTwitterThreadsIntoPages(params),
  ]);
}
