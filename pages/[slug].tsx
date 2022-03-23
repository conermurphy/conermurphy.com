import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Post } from '../types';
import { pageDataSource } from '../utils';
import { getAllPostsSlugs, getPost } from '../utils/posts';

interface IProps {
  post: Post;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const BlogPost: NextPage<IProps> = ({ post }) => {
  return <p>{post.data.title}</p>;
};

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const paths = await getAllPostsSlugs({ postType: 'blog' });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { services, testimonials } = pageDataSource({});

  const { slug } = params as IParams;
  const post = await getPost({ slug });

  return {
    props: { services, testimonials, post },
  };
};

export default BlogPost;
