import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
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

      const { frontmatter, content } = await fsPromises
        .readFile(filePath, 'utf-8')
        .then((fileContent) => {
          const { data: tempFrontmatter, content: tempContent } =
            matter(fileContent);

          const totalWords = tempContent.toString().trim().split(/\s+/).length;
          const ttr = Math.ceil(
            totalWords / parseInt(process.env.NEXT_PUBLIC_WPM)
          );

          const frontmatterWithTtr = {
            ...(tempFrontmatter as PostFrontMatter),
            timeToRead: ttr,
          };

          return {
            frontmatter: { ...frontmatterWithTtr, timeToRead: ttr },
            content: tempContent,
          };
        });

      return getContent
        ? { frontmatter, content, filePath: gitHubFilePath }
        : { frontmatter };
    })
  );

  return postsData;
}
