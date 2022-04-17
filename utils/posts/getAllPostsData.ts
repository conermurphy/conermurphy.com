import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { Post, PostFrontMatter, POSTTYPES } from '../../types';

interface IProps {
  posts: string[];
  postType: POSTTYPES;
  getContent?: boolean;
}

export default async function getAllPostsData({
  posts,
  postType,
  getContent = false,
}: IProps): Promise<Post[]> {
  const fsPromises = fs.promises;
  const dir = path.join(process.cwd(), 'content', postType);

  // Map over all of the posts in the given postType directory and return the frontmatter and content for it
  const postsData = await Promise.all(
    posts.map(async (post) => {
      const filePath = `${dir}/${post}`;
      const gitHubFilePath = filePath.split('content')[1];

      const { dataWithTTR: data, tempContent: content } = await fsPromises
        .readFile(filePath, 'utf-8')
        .then((fileContent) => {
          const { data: tempData, content: tempContent } = matter(fileContent);

          const totalWords = tempContent.trim().split(/\s+/).length;
          const ttr = Math.ceil(
            totalWords / parseInt(process.env.NEXT_PUBLIC_WPM)
          );

          const dataWithTTR = {
            ...(tempData as PostFrontMatter),
            timeToRead: ttr,
          };

          return { dataWithTTR, tempContent };
        });

      return getContent
        ? { data, content, filePath: gitHubFilePath }
        : { data };
    })
  );

  return postsData;
}
