import { Post, PostFrontMatter, POSTTYPES } from '../../../types';
import getAllPosts from '../getAllPosts';

interface GetFrontmatterTagsCategoriesProps {
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

function getFrontmatterTagsCategories({
  posts,
  type,
}: GetFrontmatterTagsCategoriesProps): string[] {
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

export default async function getTagsCategories({
  postType,
}: IProps): Promise<ReturnType> {
  const posts = await getAllPosts({ postType });

  const tags = getFrontmatterTagsCategories({ posts, type: 'tags' });
  const categories = getFrontmatterTagsCategories({
    posts,
    type: 'categories',
  });

  return { tags, categories };
}
