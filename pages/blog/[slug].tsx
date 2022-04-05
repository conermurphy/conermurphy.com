import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { PostFrontMatter, PostHeading, PostWithFrontmatter } from '../../types';
import { pageDataSource } from '../../utils';
import { getAllPostsSlugs, getHeadings, getPost } from '../../utils/posts';
import { LatestPosts, SEO } from '../../components';
import { Components, PostHeader } from '../../components/Blog/PostComponents';
import { HeaderBackground } from '../../components/Header/components';
import { PostSidebar } from '../../components/Blog';

interface IProps {
  post: {
    content: MDXRemoteSerializeResult;
    data: PostFrontMatter;
    headings: PostHeading[];
  };
  latestPosts: PostWithFrontmatter[];
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const BlogPost: NextPage<IProps> = ({ post, latestPosts }) => {
  const { content, headings, data: frontmatter } = post;
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
      <div className="flex flex-col items-center pb-10 bg-primaryBg px-6">
        <article className="flex flex-col w-full">
          <PostHeader frontmatter={frontmatter} />
          <div>
            <HeaderBackground bg="bg-primaryBg" />
            <div className="relative flex flex-row justify-center lg:justify-between xl:justify-center gap-0 xl:gap-24 w-full max-w-[1100px] m-auto">
              <div className="min-w-[272px] md:max-w-[650px] mx-6 xl:mx-0">
                {/*  eslint-disable-next-line */}
                {/* @ts-ignore */}
                <MDXRemote {...content} components={Components} />
              </div>
              <PostSidebar headings={headings} title={title} />
            </div>
          </div>
        </article>
      </div>
      <LatestPosts posts={latestPosts} />
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
  let headings;

  if (post.content) {
    headings = getHeadings(post.content);
    content = await serialize(post.content);
  }

  return {
    props: { latestPosts, post: { content, headings, data: post.data } },
  };
};

export default BlogPost;
