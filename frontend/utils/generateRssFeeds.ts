import fs from 'fs';
import { Feed } from 'feed';
import getAllPosts from './posts/getAllPosts';
import { server } from '../config';
import { POSTTYPES } from '../types';

export default async function generateRssFeeds() {
  const fsPromises = fs.promises;
  const date = new Date();

  // 1: Fetch all required data on blog and newsletter posts
  const blogPosts = await getAllPosts({ postType: POSTTYPES.BLOG });
  const newsletterPosts = await getAllPosts({ postType: POSTTYPES.NEWSLETTER });

  // 2: Create base feed and author data to be used in feed
  const author = {
    name: 'Coner Murphy',
    email: 'hey@conermurphy.com',
    link: 'https://conermurphy.com/',
  };

  const feedOptions = {
    title: 'Coner Murphy',
    description:
      'Fullstack web development, online business, content creation, and more...',
    id: server,
    link: server,
    image: `${server}/favicon.png`,
    favicon: `${server}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Coner Murphy`,
    updated: date,
    generator: 'Feed for Node.js',
    author,
  };

  // 3: Create blog and newsletter feeds
  const blogFeed = new Feed({
    ...feedOptions,
    feedLinks: {
      rss2: `${server}/rss/blog.xml`,
      json: `${server}/rss/blog.json`,
    },
  });

  const newsletterFeed = new Feed({
    ...feedOptions,
    feedLinks: {
      rss2: `${server}/rss/newsletter.xml`,
      json: `${server}/rss/newsletter.json`,
    },
  });

  // 4: Add posts to their respective feeds.
  blogPosts.forEach(({ data: post }) => {
    const url = `${server}/blog/${post.slug}`;
    blogFeed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.description,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });

  newsletterPosts.forEach(({ data: post }) => {
    const url = `${server}/newsletter/${post.slug}`;
    newsletterFeed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.description,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });

  try {
    await fs.promises.access('./public/rss');
    // The check succeeded
  } catch (error) {
    await fsPromises.mkdir('./public/rss');
  }

  // 5: Write the feeds out to files
  await fsPromises.writeFile('./public/rss/blog.xml', blogFeed.rss2());
  await fsPromises.writeFile('./public/rss/blog.json', blogFeed.json1());
  await fsPromises.writeFile(
    './public/rss/newsletter.xml',
    newsletterFeed.rss2()
  );
  await fsPromises.writeFile(
    './public/rss/newsletter.json',
    newsletterFeed.json1()
  );
}
