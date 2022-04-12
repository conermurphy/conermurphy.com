import getAllPostsData from './getAllPostsData';
import getAllPostNames from './getAllPostsNames';
import { Post, POSTTYPES } from '../../types';

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

  const sortedPosts = posts.sort((a, b) => {
    const { date: aDate } = a.data;
    const { date: bDate } = b.data;

    return bDate.localeCompare(aDate);
  });

  // If limit is passed than slice off 0 to the limit and return
  if (limit) {
    return sortedPosts.slice(skip, skip + limit);
  }

  return sortedPosts;
}
