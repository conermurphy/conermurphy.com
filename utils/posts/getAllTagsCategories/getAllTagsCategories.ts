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
  tags: string[];
  categories: string[];
}

function getFrontmatterData({
  posts,
  type,
}: GetFrontmatterDataProps): string[] {
  const uniqueValues = [
    ...new Set(
      posts.flatMap(({ data }) => {
        return data[type as keyof PostFrontMatter];
      })
    ),
  ];

  return uniqueValues
    .map((value) => {
      return value.toString();
    })
    .filter((value) => {
      return value;
    });
}

export default async function getAllTagsCategories({
  postType,
}: IProps): Promise<ReturnType> {
  const posts = await getAllPosts({ postType });

  const tags = getFrontmatterData({ posts, type: 'tags' });
  const categories = getFrontmatterData({
    posts,
    type: 'categories',
  });

  return { tags, categories };
}
