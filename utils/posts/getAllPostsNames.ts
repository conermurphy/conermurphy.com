import fs from 'fs';
import path from 'path';

interface IProps {
  postType?: string;
}

export default async function getAllPostsNames({
  postType = 'blog',
}: IProps): Promise<string[]> {
  const fsPromises = fs.promises;
  const dir = path.join(process.cwd(), 'content', postType);

  // Read all files in the directory and return an array of all mdx files.
  const postFileNames = await fsPromises
    .readdir(dir, {
      withFileTypes: true,
    })
    .then((data) => {
      return data.flatMap(({ name }) => {
        return name.includes('.mdx') ? name : [];
      });
    });

  // Remove any posts that are undefined from not containing .mdx in the filename above
  return postFileNames.filter((post) => {
    return post;
  });
}
