import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { Post } from '../../types';

interface IProps {
  posts: string[];
  postType?: string;
  getContent?: boolean;
}

export default async function getAllPostsData({
  posts,
  postType = 'blog',
  getContent = false,
}: IProps): Promise<Post[]> {
  const fsPromises = fs.promises;
  const dir = path.join(process.cwd(), 'content', postType);

  // Map over all of the posts in the given postType directory and return the frontmatter and content for it
  const postsData = await Promise.all(
    posts.map(async (post) => {
      const folder = post.replace(/.mdx$/, '');
      const filePath = `${dir}/${folder}/${post}`;

      const { data, content } = await fsPromises
        .readFile(filePath, 'utf-8')
        .then((fileContent) => {
          return matter(fileContent);
        });

      return getContent ? { data, content } : { data };
    })
  );

  return postsData;
}