import { NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import { PostPageProps, POSTTYPES } from '../../../types';
import SEO from '../../SEO/SEO';
import {
  Components,
  EngagementCounter,
  GitHubCTA,
  NewsletterCloseout,
  PostHeader,
} from '../PostComponents';
import PostSidebar from '../PostSidebar/PostSidebar';
import LatestContent from '../../LatestContent';
import Newsletter from '../../Newsletter/Newsletter';

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

  const updatedHeadings = headings.map((heading) => ({
    ...heading,
    ref: React.createRef<HTMLHeadingElement>(),
  }));

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
      <div className="flex flex-col items-center pb-10 bg-primaryBg dark:bg-primaryBgDark px-6 xl:px-0">
        <article className="flex flex-col gap-12 w-full">
          <PostHeader frontmatter={frontmatter} />
          <div>
            <div className="relative flex flex-row justify-center lg:justify-between xl:justify-center gap-0 lg:gap-12 xl:gap-24 w-full max-w-5xl m-auto">
              <div className="max-w-2xl w-full">
                <MDXRemote
                  {...content}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  components={Components(updatedHeadings)}
                />
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
              <PostSidebar headings={updatedHeadings} title={title} />
            </div>
          </div>
        </article>
      </div>
      <LatestContent latestBlog={latestPosts[0]} link="TEST_LINK" />
      <Newsletter />
    </>
  );
};

export default PostPage;
