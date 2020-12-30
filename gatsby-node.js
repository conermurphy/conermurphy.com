import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import findTagInfo from './src/utils/findTagInfo';
import countTagsInPosts from './src/utils/countTagsInPosts';

export async function onCreateNode({ node, getNode, actions }) {
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
      value: fileSlug,
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

  // 3. Creating multiple blog pages to paginate the total amount of posts over multiple pages for usability.
  const pageSize = parseInt(process.env.GATSBY_BLOG_PAGE_SIZE); // Total number of posts on each page
  const pageCount = Math.ceil(blogTotalCount / pageSize); // Total number of pages required.

  // Loop through each page required (1 to x) and create a new blog page for each.
  Array.from({ length: pageCount }).forEach((_, i) => {
    createPage({
      path: `/blog/${i === 0 ? '' : i + 1}`,
      component: path.resolve('./src/pages/blog.js'),
      // Context is passed to the page so we can skip the required amount of posts on each page.
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

async function turnBlogPostTagsIntoPages({ graphql, actions }) {
  const { createPage } = actions;
  // Getting the blog page template.
  const blogTemplate = path.resolve('./src/pages/blog.js');

  // Querying for all of the tags
  const {
    data: {
      blogPostTags: { edges: blogPostTags },
    },
  } = await graphql(`
    query {
      blogPostTags: allMdx(filter: { fields: { contentCategory: { eq: "blog" } } }) {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);

  // Get a total array of tags used in all of the blog posts.
  const { totalArray } = countTagsInPosts(blogPostTags);

  // Filter the above array down to a unique array for us to create into individual pages.
  const uniqueTags = totalArray.filter((val, i, self) => self.indexOf(val) === i);

  const pageSize = parseInt(process.env.GATSBY_BLOG_PAGE_SIZE); // Total number of posts on each page

  // Creating a page for every tag
  uniqueTags.forEach((tag) => {
    const totalNumberOfTag = totalArray.filter((t) => t === tag).length; // Find out how many posts there are in total for each tag.
    const pageCount = Math.ceil(totalNumberOfTag / pageSize); // how many pages are required to show all of that tag's posts

    // Looping from 1 to x and create a new page for the amount determined above.
    Array.from({ length: pageCount }).forEach((_, i) => {
      createPage({
        path: `/blog/${tag.toLowerCase()}/${i === 0 ? '' : i + 1}`,
        component: blogTemplate,
        context: {
          skip: i * pageSize,
          currentPage: i + 1,
          pageSize,
          tag,
          tagRegex: `/${tag}/i`,
        },
      });
    });
  });
}

async function turnNotesIntoPages({ graphql, actions }) {
  const { createPage } = actions;

  // 1. Query for all note posts.
  const {
    data: {
      notes: { edges: notes, totalCount: notesTotalCount },
    },
  } = await graphql(`
    query {
      notes: allMdx(
        sort: { order: [ASC, ASC], fields: [frontmatter___date, frontmatter___id] }
        filter: { fields: { contentCategory: { eq: "notes" } } }
      ) {
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
        totalCount
      }
    }
  `);

  // 2. Create individual pages for each notes post.

  // Get a unique list of every note category based on the folders contained within the 'notes' folder within the 'content' folder.
  const noteCategories = [...new Set(notes.map(({ node: note }) => note.fields.noteCategory))];

  // Map over each unique note category found above and return an array for that category containing all of the nodes of that category from the graphql query 'notes' completed above.
  const noteCategoryNodes = noteCategories.map((cat) => notes.filter(({ node: note }) => note.fields.noteCategory === cat));

  // Loop over the completed array of sub-arrays containing all of the note category nodes found on the above line.
  noteCategoryNodes.forEach((noteCat) => {
    // Map over each individual category array of nodes and run the 'createPage' API on it. This allows us to link to previous and next wihtin that category of notes as each category of notes is looped over seperately so they are not aware of the other categories contained within 'noteCategoryNodes'.
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

  // 3. Create multiple notes pages to paginate out the notes.
  const pageSize = parseInt(process.env.GATSBY_NOTES_PAGE_SIZE); // Total number of posts on each page
  const pageCount = Math.ceil(notesTotalCount / pageSize); // Total number of pages required.

  // Loop through each page required (1 to x) and create a new notes page for each.
  Array.from({ length: pageCount }).forEach((_, i) => {
    createPage({
      path: `/notes/${i === 0 ? '' : i + 1}`,
      component: path.resolve('./src/pages/notes.js'),
      // Context is passed to the page so we can skip the required amount of posts on each page.
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function createPages(params) {
  // 2. After the creation of the nodes create pages for each custom type.
  await Promise.all([
    // 1. Blog Posts
    turnBlogPostsIntoPages(params),
    // 2. Blog Tags Pages
    turnBlogPostTagsIntoPages(params),
    // Notes Pages
    turnNotesIntoPages(params),
  ]);
}
