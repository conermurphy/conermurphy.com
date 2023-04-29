import { NextPage } from 'next';
import React from 'react';
import { PostGridPageProps } from '../../../types';
import PageHero from '../../PageHero/PageHero';
import SEO from '../../SEO/SEO';
import { PagePagination, PageSidebar, PostCardGrid } from '..';
import { toUpper } from '../../../utils';
import LatestContent from '../../LatestContent';
import Newsletter from '../../Newsletter/Newsletter';

const PostGridPage: NextPage<PostGridPageProps> = ({
  pageNumber,
  pageCount,
  posts,
  topics,
  filterItem,
  postType,
  pageHeroData: { title, body },
  metaDescription,
  pageQueries = {
    page: '',
    queries: [],
  },
  latestPosts,
  latestYouTubeVideo,
}) => {
  const pageName = toUpper(postType.replaceAll('-', ' '));

  return (
    <>
      <SEO
        metaTitle={`${
          filterItem
            ? `${filterItem} Posts ${
                pageNumber ? ` - Page ${pageNumber}` : ''
              } |`
            : ''
        } ${pageName} ${
          !filterItem && pageNumber ? `- Page ${pageNumber}` : ''
        }`}
        metaDescription={metaDescription}
        url={postType}
      />
      <div className="flex flex-col gap-24">
        <PageHero title={title} description={body} tag="Content" />
        <div className="flex flex-col gap-24">
          <div className="flex flex-row items-center justify-center">
            <div
              className={`flex flex-col items-center gap-24 justify-between w-full md:flex-col-reverse max-w-7xl px-6 lg:px-12 2xl:px-0 ${
                posts?.length ? 'xl:justify-between' : 'xl:justify-end'
              }`}
            >
              <PostCardGrid posts={posts} postType={postType} />
              <PageSidebar data={topics} pageQueries={pageQueries} />
            </div>
          </div>
          {posts?.length ? (
            <PagePagination
              pageCount={pageCount}
              currentPage={pageNumber}
              pageQueries={pageQueries}
            />
          ) : null}
        </div>
      </div>
      <LatestContent
        latestBlog={latestPosts[0]}
        latestVideo={latestYouTubeVideo}
      />
      <Newsletter />
    </>
  );
};

export default PostGridPage;
