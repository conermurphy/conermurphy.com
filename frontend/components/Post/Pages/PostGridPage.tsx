import { NextPage } from 'next';
import React from 'react';
import { PostGridPageProps } from '../../../types';
import PageHero from '../../PageHero/PageHero';
import { PagePagination, PostCardGrid } from '..';
import LatestContent from '../../LatestContent';

const PostGridPage: NextPage<PostGridPageProps> = ({
  pageNumber,
  pageCount,
  posts,
  postType,
  pageHeroData: { title, body },
  latestPosts,
  latestYouTubeVideo,
}) => (
  <>
    <div className="flex flex-col gap-24">
      <PageHero title={title} description={body} tag="Content" />
      <div className="flex flex-col gap-24">
        <div className="flex flex-row items-center justify-center">
          <div
            className={`flex flex-col items-center gap-24 justify-between w-full md:flex-col-reverse max-w-7xl px-6 lg:px-12 2xl:px-0 ${
              posts?.length ? 'xl:justify-between' : 'xl:justify-end'
            }`}
          >
            {posts ? <PostCardGrid posts={posts} postType={postType} /> : null}
            {/* <PageSidebar data={topics} /> */}
          </div>
        </div>
        {posts?.length && pageCount ? (
          <PagePagination pageCount={pageCount} currentPage={pageNumber || 1} />
        ) : null}
      </div>
    </div>
    <LatestContent
      latestBlog={latestPosts && latestPosts[0]}
      latestVideo={latestYouTubeVideo}
    />
  </>
);

export default PostGridPage;
