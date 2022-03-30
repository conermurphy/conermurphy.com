import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Img from 'next/image';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { PostFrontMatter } from '../types';
import { pageDataSource } from '../utils';
import { getAllPostsSlugs, getPost } from '../utils/posts';
import { SEO } from '../components';
import { Tags } from '../components/Blog';
import { Components } from '../components/Blog/PostComponents';

interface IProps {
  post: {
    content: MDXRemoteSerializeResult;
    data: PostFrontMatter;
  };
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const BlogPost: NextPage<IProps> = ({ post }) => {
  const { content, data: frontmatter } = post;
  const {
    title,
    description,
    slug,
    date,
    image,
    tags,
    canonical_url: canonicalUrl,
    timeToRead,
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
      <div className="flex flex-col items-center">
        <article className="flex flex-col w-full">
          <header className="flex flex-col items-center bg-[linear-gradient(0deg,_#FFF_15%,_#111827_15%)] md:bg-[linear-gradient(0deg,_#FFF_25%,_#111827_25%)] pt-10 md:pt-72">
            <div className="max-w-[272px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1200px] w-full pb-10 md:pb-12">
              <p className="text-xs md:text-base font-semiBold text-offWhite opacity-100 mb-1">
                {`Published on
              ${new Date(date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              | ${timeToRead} Minute Read`}
              </p>
              <h1 className="text-2xl md:text-40 text-offWhite mb-2 max-w-5xl">
                {title}
              </h1>
              <p className="text-base md:text-lg text-offWhite opacity-100 mb-3 max-w-2xl">
                {description}
              </p>
              <Tags tags={tags} />
            </div>
            <div className="relative w-[272px] h-[153px] sm:w-[500px] sm:h-[281px] md:w-[700px] md:h-[394px] lg:w-[900px] lg:h-[506px] xl:w-[1200px] xl:h-[675px] rounded-2xl overflow-hidden">
              <Img src={image} layout="fill" alt={title} />
            </div>
          </header>
          <div>
            <MDXRemote {...content} components={Components} />
          </div>
        </article>
      </div>
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
  const { latestPosts } = await pageDataSource({ latestPosts: true });

  const { slug } = params as IParams;
  const post = await getPost({ slug });
  let content;

  if (post.content) {
    content = await serialize(post.content);
  }

  return {
    props: { latestPosts, post: { content, data: post.data } },
  };
};

export default BlogPost;
