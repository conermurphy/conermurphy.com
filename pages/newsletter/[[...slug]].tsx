import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import {
  Post,
  PostFrontMatter,
  PostHeading,
  PostTagsCats,
  POSTTYPES,
  Testimonial,
} from '../../types';
import { pageDataSource } from '../../utils';
import {
  getAllPosts,
  getAllTagsCategories,
  getHeadings,
  getPost,
  getPostPaths,
} from '../../utils/posts';
import { LatestPosts, PageHero, SEO, Testimonials } from '../../components';
import {
  Components,
  GitHubCTA,
  PostHeader,
} from '../../components/Post/PostComponents';
import { HeaderBackground } from '../../components/Header/components';
import {
  PagePagination,
  PageSidebar,
  PostCardGrid,
  PostSidebar,
} from '../../components/Post';
import { POST_TAGS } from '../../components/Post/Tags/Tags';
import { CATEGORIES } from '../../constants';

interface IParams extends ParsedUrlQuery {
  slug: string[];
}

interface PageProps {
  newsletterPage: number;
  pageCount: number;
  testimonials: Testimonial[];
  posts: Post[];
  tagsCats: PostTagsCats;
  filterItem: string;
  postType: POSTTYPES;
}

interface PostProps {
  post: {
    content: MDXRemoteSerializeResult;
    data: PostFrontMatter;
    headings: PostHeading[];
    filePath: string;
  };
  latestPosts: Post[];
}

interface IProps extends PageProps, PostProps {
  isPostGridPage: boolean;
}

interface CreateFilterPostPageProps {
  slug: string;
  posts: Post[];
  postsPerPage: number;
  slugPage: number;
  filterType: 'tags' | 'categories';
}

function createFilterPostPage({
  slug,
  posts,
  postsPerPage,
  slugPage,
  filterType,
}: CreateFilterPostPageProps) {
  const upperSlug = slug.toUpperCase();
  // Try access the slug on both POST_TAGS and CATEGORIES constants
  const tagInfo = POST_TAGS[upperSlug];
  const catInfo = CATEGORIES[upperSlug];

  // Calculate the skip value off the page number
  const skip = slugPage ? (slugPage - 1) * postsPerPage : 0;

  // Filter all posts to just the ones matching the provided tag/category
  const filteredPosts = posts.filter(({ data }) => {
    return data[filterType].includes(upperSlug);
  });

  // Paginate the posts off the skip value and the postsPerPage value
  const paginatedPosts = filteredPosts.slice(skip, skip + postsPerPage);

  return {
    postsLength: filteredPosts.length,
    posts: paginatedPosts,
    filterItem: tagInfo?.name || catInfo?.name,
  };
}

// Page to show for /newsletter or /newsletter/x where x is a number representing the page number
const NewsletterPage: NextPage<PageProps> = ({
  newsletterPage,
  pageCount,
  testimonials,
  posts,
  tagsCats,
  filterItem,
  postType,
}) => {
  return (
    <>
      <SEO
        metaTitle={`${
          filterItem
            ? `${filterItem} Posts ${
                newsletterPage ? ` - Page ${newsletterPage}` : ''
              } |`
            : ''
        } Newsletter ${
          !filterItem && newsletterPage ? `- Page ${newsletterPage}` : ''
        }`}
        metaDescription="Thoughts, stories, questions, and actionable advise for developers, entrepreneurs, and more. That's the theme of my newsletter, come give it a read."
        url="newsletter"
      />
      <PageHero
        title="My Newsletter"
        body="Thoughts, stories, questions, and actionable advise for developers, entrepreneurs, and more..."
      />
      <HeaderBackground bg="bg-white" />
      <div className="flex flex-row items-center justify-center mb-72 md:mb-12">
        <div className="flex flex-col items-center justify-center gap-y-14 gap-x-20 w-full md:px-20 lg:px-106 xl:flex-row-reverse xl:items-start">
          <PostCardGrid posts={posts} postType={postType} />
          <PageSidebar data={tagsCats} />
        </div>
      </div>
      <PagePagination pageCount={pageCount} currentPage={newsletterPage} />
      <Testimonials testimonials={testimonials} />
    </>
  );
};

// Page to show for /newsletter/x where x is a slug of a newsletter post.
const NewsletterPost: NextPage<PostProps> = ({ post, latestPosts }) => {
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

// This controls which page to show based off the isPostGridPage prop
const Newsletter: NextPage<IProps> = ({ isPostGridPage, ...params }) => {
  return isPostGridPage ? (
    <NewsletterPage {...params} />
  ) : (
    <NewsletterPost {...params} />
  );
};

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  // Get all post paths for NEWSLETTER POSTTYPE including generic newsletter pages, post pages, tag and category pages
  const paths = await getPostPaths({ postType: POSTTYPES.NEWSLETTER });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const postType = POSTTYPES.NEWSLETTER;
  const postData = await getAllPosts({ postType });
  const { slug } = params as IParams;

  // Source data for extra sections being displayed on the page
  const { latestPosts, testimonials } = await pageDataSource({
    latestPosts: true,
    testimonials: true,
  });

  // Get all tags and categories used on the POSTTYPE
  const { categories, tags } = await getAllTagsCategories({
    postType,
  });

  // If slug is an array, take the first value, otherwise return '0' to indidicate page 0
  const slugVal = slug?.length ? slug[0] : '0';
  // If slug is an array and has a length of 2, take the second item otherwise '0'
  const slugFilterPage = slug?.length === 2 ? slug[1] : '0';

  const slugInt = parseInt(slugVal);
  const slugFilterPageInt = parseInt(slugFilterPage);

  // Check if slugVal stars with a number not in a word to indicate if its newsletter page pagination or not
  const isPostGridPage = slugVal.match(/^[0-9]*$/gm);

  // Check if the first slug value is included in categories, if so return the required props for it
  if (categories.includes(slugVal.toUpperCase())) {
    const { postsLength, posts, filterItem } = createFilterPostPage({
      slug: slugVal,
      posts: postData,
      postsPerPage,
      slugPage: slugFilterPageInt,
      filterType: 'categories',
    });

    return {
      props: {
        isPostGridPage: true,
        pageCount: Math.ceil(postsLength / postsPerPage),
        newsletterPage: slugFilterPageInt,
        posts,
        tagsCats: { categories, tags },
        testimonials,
        filterItem,
        postType,
      },
    };
  }

  // Check if the first slug value is included in tags, if so return the required props for it
  if (tags.includes(slugVal.toUpperCase())) {
    const { postsLength, posts, filterItem } = createFilterPostPage({
      slug: slugVal,
      posts: postData,
      postsPerPage,
      slugPage: slugFilterPageInt,
      filterType: 'tags',
    });

    return {
      props: {
        isPostGridPage: true,
        pageCount: Math.ceil(postsLength / postsPerPage),
        newsletterPage: slugFilterPageInt,
        posts,
        tagsCats: { categories, tags },
        testimonials,
        filterItem,
        postType,
      },
    };
  }

  // If it is overall newsletter page pagination return props for it
  if (isPostGridPage) {
    // Work out the number of newsletter posts required to skip for the page accessed. E.g. page 2 skip the first 8 posts and return from 9 to 16.
    const skip = slugInt ? (slugInt - 1) * postsPerPage : 0;

    const posts = postData.slice(skip, skip + postsPerPage);

    return {
      props: {
        isPostGridPage,
        pageCount: Math.ceil(postData.length / postsPerPage),
        newsletterPage: slugInt,
        posts,
        tagsCats: { categories, tags },
        testimonials,
        postType,
      },
    };
  }

  // If it is a newsletter post return props for it
  const post = await getPost({ slug: slugVal, postType });
  let content;
  let headings;

  if (post.content) {
    headings = getHeadings(post.content);
    content = await serialize(post.content);
  }

  return {
    props: {
      isPostGridPage,
      latestPosts,
      post: { content, headings, data: post.data, filePath: post.filePath },
    },
  };
};

export default Newsletter;
