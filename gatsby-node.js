import path from 'path';
import { createFilePath, createRemoteFileNode } from 'gatsby-source-filesystem';
import fetch from 'isomorphic-fetch';
import { arrayTotaler } from './src/utils/countTags';
import findTagInfo from './src/utils/findTagInfo';
import portfolioData from './src/data/portfolio.json';
import readsData from './src/data/reads.json';

// Wesbos wait function: https://github.com/wesbos/waait/blob/master/index.js
const wait = (amount = 0) => new Promise((resolve) => setTimeout(resolve, amount));

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

// This is a single combined function used to create the pages for both the blog post tags and the note pages categories
function createTagPages(base, arr, template, actions) {
  // We take in 4 props:
  // 1: Base - a string of what the page category being created is: blog or notes
  // 2: Arr - This is the total query data ran in the individual functions below.
  // 3: Template - This is the template file used to create the actual pages
  // 4: Actions - Actions is passed in from the calling function to allow us to destructure out the createPage API to make the new pages.

  const { createPage } = actions;
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE); // Total number of posts on each page

  // Get a total array of tags used in all of the posts and a unique version of the array.
  const { uniqueArray, totalTagArray } = arrayTotaler(base, arr);

  // Creating a page for every tag
  uniqueArray.forEach((tag) => {
    if (tag) {
      const totalNumberOfTag = totalTagArray.filter((t) => t === tag).length; // Find out how many posts there are in total for each tag.
      const pageCount = Math.ceil(totalNumberOfTag / pageSize); // how many pages are required to show all of that tag's posts

      // Create a base for the url path that is all lower case and changed any spaces to a -.
      const pathBase = `/${base}/${tag.toLowerCase().replace(' ', '-')}`;

      // Looping from 1 to x and create a new page for the amount determined above.
      Array.from({ length: pageCount }).forEach((_, i) => {
        createPage({
          path: `${pathBase}/${i === 0 ? '' : i + 1}`,
          component: template,
          context: {
            skip: i * pageSize, // how many posts to skip in the query to ensure each page shows the next content
            currentPage: i + 1, // current page
            pageSize, // Set in env vars to define the size of each page
            tag, // Tag currently being used to create that page
            tagRegex: `/${tag}/i`, // Used to query on the actual pages to show only the requested content for that tag
          },
        });
      });
    }
  });
}

export async function onCreateNode({ node, getNode, actions }) {
  const { createNodeField } = actions; // Getting the createNodeField API

  // If the node being processed is an MDX node then run this code.
  if (node.internal.type === 'Mdx' && node.frontmatter.type !== 'tweet') {
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
      if (contentType === 'blog' || contentType === 'threads') {
        slug = `/${contentType}/${node.frontmatter.slug}/`;
      }
      if (contentType === 'notes') {
        slug = `/${contentType}/${noteCategory}/${node.frontmatter.slug}/`;
      }
    } else {
      if (contentType === 'blog' || contentType === 'threads') {
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
      // Find the matching tag for note creation using correct casing for tag
      const { matchingTag } = findTagInfo(noteCategory);

      createNodeField({
        node,
        name: 'noteCategory',
        value: matchingTag,
      });
    }
  }
  if (node.internal.type === 'Reads') {
    // Creating extra fields for each read to implement extra data from source JSON file.
    const { start, finished, rating, pageCount, status } = JSON.parse(node.internal.content);
    createNodeField({
      node,
      name: 'pageCount',
      value: pageCount,
    });
    createNodeField({
      node,
      name: 'start',
      value: start,
    });

    createNodeField({
      node,
      name: 'finished',
      value: finished,
    });
    createNodeField({
      node,
      name: 'rating',
      value: rating,
    });
    createNodeField({
      node,
      name: 'status',
      value: status,
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

// Turn all Notes into post pages
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

  const pageTemplate = path.resolve('./src/pages/notes.js');

  // Create the main notes pages containing the posts..
  createMainPages(actions, 'notes', pageTemplate, notesTotalCount);
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

// === Below here is the functions used to create the blog post tag pages and the note post category pages ===

async function turnBlogPostTagsIntoPages({ graphql, actions }) {
  // Getting the blog page template.
  const blogTemplate = path.resolve('./src/pages/blog.js');

  // Querying for all of the tags
  const { data } = await graphql(`
    query {
      blog: allMdx(filter: { fields: { contentCategory: { eq: "blog" } } }) {
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

  createTagPages('blog', data, blogTemplate, actions);
}

async function turnNotesCategoriesIntoPages({ graphql, actions }) {
  // Getting the note page template.
  const notesTemplate = path.resolve('./src/pages/notes.js');

  // Querying for all of the categories
  const { data } = await graphql(`
    query {
      notes: allMdx(filter: { fields: { contentCategory: { eq: "notes" } } }) {
        edges {
          node {
            fields {
              noteCategory
            }
          }
        }
      }
    }
  `);

  createTagPages('notes', data, notesTemplate, actions);
}

// Turn Twitter Threads Tags into Pages.
async function turnThreadsTagsIntoPages({ graphql, actions }) {
  // Getting the note page template.
  const threadsTemplate = path.resolve('./src/pages/threads.js');

  // Querying for all of the categories
  const { data } = await graphql(`
    query {
      threads: allMdx(filter: { fields: { contentCategory: { eq: "threads" } } }) {
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

  createTagPages('threads', data, threadsTemplate, actions);
}

async function turnPortfolioTagsIntoPages({ graphql, actions }) {
  // Get the portfolio page template
  const portfolioTemplate = path.resolve('./src/pages/portfolio.js');

  // Query for all of the tags on the portfolio posts
  const { data } = await graphql(`
    query {
      portfolio: allPortfolio {
        edges {
          node {
            tags
          }
        }
      }
    }
  `);

  const { totalCount: portfolioTotalCount } = data.portfolio;

  // Create the main notes pages containing the posts..
  createMainPages(actions, 'portfolio', portfolioTemplate, portfolioTotalCount);

  createTagPages('portfolio', data, portfolioTemplate, actions);
}

async function turnReadsCategoriesIntoPages({ graphql, actions }) {
  // fetch template for reads page.
  const readsTemplate = path.resolve('./src/pages/reads.js');

  const { data } = await graphql(`
    query {
      reads: allReads {
        edges {
          node {
            items {
              volumeInfo {
                categories
              }
            }
          }
        }
        totalCount
      }
    }
  `);

  const { totalCount: readsTotalCount } = data.reads;

  // Create the main notes pages containing the posts..
  createMainPages(actions, 'reads', readsTemplate, readsTotalCount);

  createTagPages('reads', data, readsTemplate, actions);
}

// === End of creating pages / posts ===

// Sourcing the portfolio data into the graphQL API to allow us to create pages off the tags for each post.
async function fetchPortfolioAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  // portfolioData is imported at the top of the file.

  // loop over data and create a node for each one
  portfolioData.forEach((post) => {
    // create the nodeMedta data for each post
    const postMeta = {
      id: createNodeId(`portfolioPost-${post.title}`),
      parent: null,
      children: [],
      internal: {
        type: 'Portfolio',
        mediaType: 'application/json',
        contentDigest: createContentDigest(post),
      },
    };
    // actually creating the node.
    actions.createNode({
      ...post,
      ...postMeta,
    });
  });
}

// Fetch books info from Google Books API based on the ISBN's listed in the reads.json file inside data/
async function fetchReadsAndTurnIntoNodes({ actions, createNodeId, createContentDigest, getCache }) {
  const { createNode } = actions;

  // readsData is imported at the top of the file.

  const apiISBNBase = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';

  await Promise.all(
    readsData.map(async (read) => {
      // Destructure out values to query endpoint
      const { isbn } = read;
      // For each read query the above endpoint.
      let data;
      // Try query endpoint of API.
      try {
        const res = await fetch(`${apiISBNBase}${isbn}`);
        data = await res.json();

        // If Googles API returns an Error throw an error to catch and eventually retry call up to 10 times.
        if (data.error) {
          const { error } = data;
          throw error;
        }
        // Catch the above error if data is not successfully retrieved on first fetch call.
      } catch (e) {
        let error;

        // Retry the call 20 times before erroring out, each time delay longer by one second.
        for (let i = 0; i < 20; i++) {
          try {
            console.log(`Retrying fetch: ${i} of: ${apiISBNBase}${isbn}`);
            // Call wait function from top of the file to delay the fetch request by the amount of seconds = to the number of retries that request is. e.g. 3rd retry wait 3 secs.
            await wait(i * 1000);
            // Call fetch to the API.
            const res = await fetch(`${apiISBNBase}${isbn}`);
            data = await res.json();
            // If data is found then exit.
            return data;
          } catch (err) {
            error = err;
          }
        }
        // If above 20 retries then throw an error.
        throw error;
      }

      try {
        const node = {
          id: await createNodeId(`reads-${data.items[0].id}`),
          parent: null,
          children: [],
          internal: {
            type: 'Reads',
            mediaType: 'application/json',
            content: JSON.stringify(read),
            contentDigest: createContentDigest(data),
          },
        };

        const imageNode = await createRemoteFileNode({
          url: data.items[0].volumeInfo.imageLinks.thumbnail,
          parentNodeId: `reads-${data.items[0].id}`,
          getCache,
          createNode,
          createNodeId,
        });

        if (imageNode) {
          node.localFile___NODE = imageNode.id;
        }

        await createNode({
          ...data,
          ...node,
        });
      } catch (e) {
        console.error(`There was an error on ${isbn}, error: ${e}`);
      }
    })
  );
}

export async function sourceNodes(params) {
  // fetch the portfolio data json file locally and turn into GraphQL nodes to allow us to create portfolio tag pages off the tag and query for all the posts on the portfolio page.
  await Promise.all([fetchPortfolioAndTurnIntoNodes(params), fetchReadsAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // After the creation of the nodes create pages for each custom type.
  await Promise.all([
    // Blog Posts
    turnBlogPostsIntoPages(params),
    // Notes Pages
    turnNotesIntoPages(params),
    // Turn sourced Twitter Threads into pages.
    turnTwitterThreadsIntoPages(params),
    // Blog Tags Pages
    turnBlogPostTagsIntoPages(params),
    // Turn Notes Categories into pages
    turnNotesCategoriesIntoPages(params),
    // Turn Twitter Threads Tags Into Pages
    turnThreadsTagsIntoPages(params),
    // Turn Portfolio Tags into pages
    turnPortfolioTagsIntoPages(params),
    // Turn Read Categories into pages.
    turnReadsCategoriesIntoPages(params),
  ]);
}
