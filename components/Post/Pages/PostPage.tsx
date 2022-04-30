import { NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import { PostPageProps } from '../../../types';
import { HeaderBackground } from '../../Header/components';
import LatestPosts from '../../LatestPosts/LatestPosts';
import SEO from '../../SEO/SEO';
import { Components, GitHubCTA, PostHeader } from '../PostComponents';
import PostSidebar from '../PostSidebar/PostSidebar';

const PostPage: NextPage<PostPageProps> = ({ post, latestPosts }) => {
  const { content, headings, data: frontmatter, filePath } = post;
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
      <div className="flex flex-col items-center pb-10 bg-primaryBg px-0">
        <article className="flex flex-col w-full">
          <PostHeader frontmatter={frontmatter} />
          <div>
            <HeaderBackground bg="bg-primaryBg" />
            <div className="relative flex flex-row justify-center lg:justify-between xl:justify-center gap-0 xl:gap-24 w-full max-w-[1100px] m-auto">
              <div className="min-w-[272px] md:max-w-[650px] mx-4 xl:mx-0">
                {/*  eslint-disable-next-line */}
                {/* @ts-ignore */}
                <MDXRemote {...content} components={Components} />
                <hr />
                <GitHubCTA postPath={filePath} />
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

export default PostPage;
