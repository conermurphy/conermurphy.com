import { NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import { PostPageProps, POSTTYPES } from '../../../types';
import { useScrollToTop } from '../../../utils';
import LatestPosts from '../../LatestPosts/LatestPosts';
import SEO from '../../SEO/SEO';
import {
  Components,
  EngagementCounter,
  GitHubCTA,
  NewsletterCloseout,
  PostHeader,
} from '../PostComponents';
import PostSidebar from '../PostSidebar/PostSidebar';

const PostPage: NextPage<PostPageProps> = ({ post, latestPosts, postType }) => {
  const { content, headings, data: frontmatter, filePath } = post;
  const {
    UUID,
    title,
    description,
    slug,
    date,
    image,
    canonical_url: canonicalUrl,
  } = frontmatter;

  const postURL = `${postType}/${slug}`;

  useScrollToTop();

  return (
    <>
      <SEO
        metaTitle={title}
        metaDescription={description}
        url={postURL}
        date={date}
        metaImage={image}
        canonicalUrl={canonicalUrl ?? postURL}
        article
      />
      <div className="flex flex-col items-center pb-10 bg-primaryBg dark:bg-primaryBgDark px-0">
        <article className="flex flex-col gap-6 w-full">
          <PostHeader frontmatter={frontmatter} />
          <div>
            <div className="relative flex flex-row justify-center lg:justify-between xl:justify-center gap-0 xl:gap-24 w-full max-w-5xl m-auto">
              <div className="max-w-2xl mx-4 lg:mx-0">
                {/*  eslint-disable-next-line */}
                {/* @ts-ignore */}
                <MDXRemote {...content} components={Components} />
                {postType === POSTTYPES.NEWSLETTER ? (
                  <NewsletterCloseout />
                ) : null}
                <hr />
                <GitHubCTA postPath={filePath} />
                <hr />
                <EngagementCounter
                  UUID={UUID}
                  postType={postType}
                  slug={slug}
                />
              </div>
              <PostSidebar headings={headings} title={title} />
            </div>
          </div>
        </article>
      </div>
      <LatestPosts posts={latestPosts} postType={postType} />
    </>
  );
};

export default PostPage;
