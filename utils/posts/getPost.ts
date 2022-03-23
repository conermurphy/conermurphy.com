import { Post } from '../../types';
import getAllPostsData from './getAllPostsData';
import getAllPostNames from './getAllPostsNames';

interface IProps {
  slug: string;
}

export default async function getPost({ slug }: IProps): Promise<Post> {
  const allPostNames = await getAllPostNames({});
  const allPostData = await getAllPostsData({
    posts: allPostNames,
    getContent: true,
  });

  const [post] = allPostData.filter((postData) => {
    const { slug: postSlug }: { slug?: string } = postData.data;

    if (!postSlug) return;

    return postSlug === slug;
  });

  return post;
}
