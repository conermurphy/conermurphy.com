import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { PostWithFrontmatter } from '../types';
import { pageDataSource } from '../utils';
import { getAllPostsSlugs, getPost } from '../utils/posts';
import { SEO } from '../components';

interface IProps {
  post: PostWithFrontmatter;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const BlogPost: NextPage<IProps> = ({ post }) => {
  const { data: frontmatter } = post;
  const {
    title,
    description,
    slug,
    date,
    image,
    canonical_url: canonicalUrl,
  } = frontmatter;

  return (
    <>
      <SEO
        metaTitle={title}
        metaDescription={description}
        url={slug}
        date={date}
        metaImage={image}
        canonicalUrl={canonicalUrl}
        article
      />
      <p>{title}</p>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const paths = await getAllPostsSlugs({ postType: 'blog' });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { services, testimonials } = await pageDataSource({});

  const { slug } = params as IParams;
  const post = await getPost({ slug });

  return {
    props: { services, testimonials, post },
  };
};

export default BlogPost;
