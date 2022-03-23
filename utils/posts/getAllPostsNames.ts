import fs from 'fs';
import path from 'path';

interface IProps {
  postType?: string;
}

export default async function getAllPostsNames({
  postType = 'blog',
}: IProps): Promise<string[]> {
  const fsPromises = fs.promises;
  const blogPostDir = path.join(process.cwd(), 'content', postType);

  // Get all subfolders within the content/blog directory
  const dirs = await fsPromises.readdir(blogPostDir, {
    withFileTypes: true,
  });

  // Return all of the folders names
  const folders = dirs.map(({ name }: { name: string }) => {
    return name;
  });

  // Loop through all of the subFolders and return the mdx file names for each post
  const postFileNames = await Promise.all(
    folders.map(async (folder) => {
      const files = await fsPromises.readdir(`${blogPostDir}/${folder}`, {
        withFileTypes: true,
      });

      const [mdxFile] = files.flatMap(({ name }) => {
        return name.includes('.mdx') ? name : [];
      });

      return mdxFile;
    })
  );

  // Remove any posts that are undefined from not containing .mdx in the filename above
  return postFileNames.filter((post) => {
    return post;
  });
}
