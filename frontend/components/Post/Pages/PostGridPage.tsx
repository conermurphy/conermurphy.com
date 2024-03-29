import { NextPage } from 'next';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { PostGridPageProps } from '../../../types';
import PageHero from '../../PageHero/PageHero';
import SEO from '../../SEO/SEO';
import { PagePagination, PageSidebar, PostCardGrid } from '..';
import { toUpper } from '../../../utils';
import LatestContent from '../../LatestContent';

const PostGridPage: NextPage<PostGridPageProps> = ({
  pageNumber,
  pageCount,
  posts,
  topics,
  filterItem,
  postType,
  pageHeroData: { title, body },
  metaDescription,
  latestPosts,
  latestYouTubeVideo,
}) => {
  const urlSearchParams = useSearchParams();
  const pageName = toUpper(postType.replaceAll('-', ' '));

  const canonicalUrl =
    pageNumber === 0
      ? postType.toLowerCase()
      : `${postType.toLowerCase()}/${pageNumber}`;

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
        url={canonicalUrl}
        metaImage={{
          title: `${title} ${pageNumber ? `| Page ${pageNumber}` : ''}`,
          description: metaDescription,
        }}
        addNoIndex={pageNumber > 1 || urlSearchParams.toString() !== ''}
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
              {/* <PageSidebar data={topics} /> */}
            </div>
          </div>
          {posts?.length ? (
            <PagePagination pageCount={pageCount} currentPage={pageNumber} />
          ) : null}
        </div>
      </div>
      <LatestContent
        latestBlogs={latestPosts}
        latestVideo={latestYouTubeVideo}
      />
    </>
  );
};

export default PostGridPage;
