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
    // This is a bit hacky as the gray-matter package only supports generic typings at the time of writing for frontmatter so TS errors that date is missing as it's not explicity defined.
    const { date: aDate }: { date?: string } = a.data;
    const { date: bDate }: { date?: string } = b.data;

    // This should never actually be called it's just here to filter the types for TS
    if (!aDate || !bDate) return 0;

    return bDate.localeCompare(aDate);
  });

  // If limit is passed than slice off 0 to the limit and return
  if (limit) {
    return sortedPosts.slice(skip, skip + limit);
  }

  return sortedPosts;
}
