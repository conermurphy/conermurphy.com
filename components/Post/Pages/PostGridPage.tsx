import { NextPage } from 'next';
import React from 'react';
import { PostGridPageProps } from '../../../types';
import { HeaderBackground } from '../../Header/components';
import PageHero from '../../PageHero/PageHero';
import SEO from '../../SEO/SEO';
import Testimonials from '../../Testimonials/Testimonials';
import PagePagination from '../PagePagination/PagePagination';
import PageSidebar from '../PageSidebar/PageSidebar';
import PostCardGrid from '../PostCardGrid/PostCardGrid';

const PostGridPage: NextPage<PostGridPageProps> = ({
  pageNumber,
  pageCount,
  testimonials,
  posts,
  tagsCats,
  filterItem,
  postType,
  pageHeroData: { title, body },
  metaDescription,
}) => {
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
      <PageHero title={title} body={body} />
      <HeaderBackground bg="bg-secondaryBg" />
      <div className="flex flex-row items-center justify-center pb-72 md:pb-12 bg-secondaryBg">
        <div className="flex flex-col items-center justify-center gap-y-14 gap-x-20 w-full md:px-20 lg:px-106 xl:flex-row-reverse xl:items-start">
          <PostCardGrid posts={posts} postType={postType} />
          <PageSidebar data={tagsCats} />
        </div>
      </div>
      <PagePagination pageCount={pageCount} currentPage={pageNumber} />
      <Testimonials testimonials={testimonials} />
    </>
  );
};

export default PostGridPage;
