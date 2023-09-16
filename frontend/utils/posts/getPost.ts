import { Post, POSTTYPES } from '../../types';
import getAllPostsData from './getAllPostsData';
import getAllPostNames from './getAllPostsNames';

interface IProps {
  slug: string;
  postType: POSTTYPES;
}

export default async function getPost({
  slug,
  postType,
}: IProps): Promise<Post> {
  const allPostNames = await getAllPostNames({ postType });
  const allPostData = await getAllPostsData({
    posts: allPostNames,
    getContent: true,
    postType,
  });

  const [post] = allPostData.filter((postData) => {
    const { slug: postSlug } = postData.frontmatter;

    if (!postSlug) return;

    return postSlug === slug;
  });

  return post;
}
