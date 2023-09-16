import { NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';
import { PostPageProps, POSTTYPES } from '../../../types';
import SEO from '../../SEO/SEO';
import PostSidebar from '../PostSidebar/PostSidebar';
import LatestContent from '../../LatestContent';
import Newsletter from '../../Newsletter/Newsletter';
import { EngagementCounter } from '../PostComponents/EngagementCounter/EngagementCounter';
import { GitHubCTA } from '../PostComponents/GitHubCTA/GitHubCTA';
import { NewsletterCloseout } from '../PostComponents/NewsletterCloseout/NewsletterCloseout';
import { components } from '../PostComponents/Components';
import { PostHeader } from '../PostComponents/PostHeader/PostHeader';

const PostPage: NextPage<PostPageProps> = ({
  post,
  latestPosts,
  postType,
  latestYouTubeVideo,
}) => {
  if (!post || !post.content) return null;

  const { content, headings, frontmatter, filePath } = post;
  const {
    UUID,
    title,
    description,
    slug,
    date,
    canonical_url: canonicalUrl,
  } = frontmatter;

  const postURL = `${postType}/${slug}`;

  const updatedHeadings = headings?.map((heading) => ({
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
        metaImage={{
          title,
          description,
          date,
          ttr: frontmatter.timeToRead.toString(),
        }}
        canonicalUrl={canonicalUrl ?? postURL}
        article
      />
      <div className="flex flex-col items-center pb-10 bg-background">
        <article className="flex flex-col gap-12 w-full">
          <PostHeader frontmatter={frontmatter} />
          <div>
            <div className="relative flex flex-row justify-center lg:justify-between xl:justify-center gap-0 lg:gap-12 xl:gap-24 w-full max-w-5xl m-auto px-6 xl:px-0">
              <div className="max-w-2xl w-full">
                {/* eslint-disable */}
                {/* @ts-ignore */}
                <MDXRemote
                  source={content}
                  //  @ts-ignore
                  components={components(updatedHeadings)}
                  />
                  {/* eslint-enable */}
                {postType === POSTTYPES.NEWSLETTER ? (
                  <NewsletterCloseout />
                ) : null}
                <hr />
                {filePath ? <GitHubCTA postPath={filePath} /> : null}
                <hr />
                <EngagementCounter UUID={UUID} />
              </div>
              {updatedHeadings ? (
                <PostSidebar headings={updatedHeadings} title={title} />
              ) : null}
            </div>
          </div>
        </article>
      </div>
      <LatestContent
        latestBlog={latestPosts && latestPosts[0]}
        latestVideo={latestYouTubeVideo}
      />
      <Newsletter />
    </>
  );
};

export default PostPage;
