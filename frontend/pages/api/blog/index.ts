import { NextApiResponse, NextApiRequest } from 'next';
import { getAllPosts } from '../../../utils/posts';
import { POSTTYPES } from '../../../types';

export default async function blogPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;

  const { type, page, q } = query as {
    type: POSTTYPES;
    page: string;
    q: string;
  };

  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const postData = await getAllPosts({ postType: type });

  if (page && !q) {
    const pageNumber = page ? parseInt(page) : 0;
    // Work out the number of  posts required to skip for the page accessed. E.g. page 2 skip the first 8 posts and return from 9 to 16.
    const skip = pageNumber ? (pageNumber - 1) * postsPerPage : 0;

    const posts = postData.slice(skip, skip + postsPerPage);

    res.status(200).json({
      pageCount: Math.ceil(postData.length / postsPerPage),
      pageNumber,
      posts,
      pageQueries: {
        page: page ?? '',
        queries: [],
      },
    });
  }

  if (q) {
    const queries = q.toUpperCase().split(' ');

    // Filter all the posts to the ones for the selected topics.
    const filteredPosts = postData.filter(({ data }) =>
      data.topics.some((topic) => queries.includes(topic))
    );

    const numberOfPosts = filteredPosts.length;

    const pageNumber = page ? parseInt(page) : 0;
    // Work out the number of  posts required to skip for the page accessed. E.g. page 2 skip the first 8 posts and return from 9 to 16.
    const skip = pageNumber ? (pageNumber - 1) * postsPerPage : 0;

    const posts = filteredPosts.slice(skip, skip + postsPerPage);

    res.status(200).json({
      pageCount: Math.ceil(numberOfPosts / postsPerPage),
      posts,
      pageNumber,
      pageQueries: {
        page: page ?? '',
        queries,
      },
    });
  }
}
