import { NextPage } from 'next';
import React from 'react';
import { PostGridPageProps } from '../../../types';
import { useScrollToTop } from '../../../utils';
import PageHero from '../../PageHero/PageHero';
import SEO from '../../SEO/SEO';
import Testimonials from '../../Testimonials/Testimonials';
import { PagePagination, PageSidebar, PostCardGrid } from '..';

const PostGridPage: NextPage<PostGridPageProps> = ({
  pageNumber,
  pageCount,
  testimonials,
  posts,
  topics,
  filterItem,
  postType,
  pageHeroData: { title },
  metaDescription,
  pageQueries = {
    page: '',
    queries: [],
  },
}) => {
  useScrollToTop();

  const pageName = postType.charAt(0).toUpperCase() + postType.slice(1);

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
      <PageHero title={title} />
      <div className="flex flex-row items-center justify-center pb-12 bg-primaryBg dark:bg-primaryBgDark">
        <div
          className={`flex flex-col items-center gap-12 justify-between w-full md:flex-col-reverse md:items-start max-w-7xl px-6 lg:px-12 2xl:px-0 ${
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
      <Testimonials testimonials={testimonials} />
    </>
  );
};

export default PostGridPage;
