import { Post, PostFrontMatter, POSTTYPES } from '../../../types';
import getAllPosts from '../getAllPosts';

interface GetFrontmatterDataProps {
  posts: Post[];
  type: string;
}

interface IProps {
  postType: POSTTYPES;
}

interface ReturnType {
  topics: string[];
}

function getFrontmatterData({
  posts,
  type,
}: GetFrontmatterDataProps): string[] {
  const uniqueValues = [
    ...new Set(
      posts.flatMap(({ data }) => data[type as keyof PostFrontMatter])
    ),
  ];

  return uniqueValues.filter((value) => value).map((value) => value.toString());
}

export default async function getAllTopics({
  postType,
}: IProps): Promise<ReturnType> {
  const posts = await getAllPosts({ postType });

  const topics = getFrontmatterData({ posts, type: 'topics' });

  return { topics };
}
