import getAllPostsData from './getAllPostsData';
import getAllPostNames from './getAllPostsNames';
import { Post, POSTTYPES } from '../../types';
import { dev } from '../../config';

interface IProps {
  postType: POSTTYPES;
  limit?: number;
  skip?: number;
}

export default async function getAllPosts({
  limit,
  postType,
  skip = 0,
}: IProps): Promise<Post[]> {
  const postNames = await getAllPostNames({ postType });

  // Loop through all mdx posts, get content and data from gray-matter
  const posts = await getAllPostsData({
    posts: postNames,
    getContent: false,
    postType,
  });

  const postsToDisplay = posts
    .filter((post) => {
      if (!dev && !post.data.published) return null;

      return post;
    })
    .sort((a, b) => {
      const { date: aDate, id: aId } = a.data;
      const { date: bDate, id: bId } = b.data;

      if (bDate.localeCompare(aDate) !== 0) return bDate.localeCompare(aDate);

      if (aId > bId) return -1;
      if (bId > aId) return 1;

      return 0;
    });

  // If limit is passed than slice off 0 to the limit and return
  if (limit) {
    return postsToDisplay.slice(skip, skip + limit);
  }

  return postsToDisplay;
}
