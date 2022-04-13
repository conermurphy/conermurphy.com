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
  PostWithFrontmatter,
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
import { Components, PostHeader } from '../../components/Blog/PostComponents';
import { HeaderBackground } from '../../components/Header/components';
import {
  PagePagination,
  PageSidebar,
  PostCardGrid,
  PostSidebar,
} from '../../components/Blog';
import { POST_TAGS } from '../../components/Blog/Tags/Tags';
import { CATEGORIES } from '../../constants';

interface IParams extends ParsedUrlQuery {
  slug: string[];
}

interface BlogPageProps {
  blogPage: number;
  pageCount: number;
  testimonials: Testimonial[];
  posts: PostWithFrontmatter[];
  tagsCats: PostTagsCats;
  filterItem: string;
}

interface BlogPostProps {
  post: {
    content: MDXRemoteSerializeResult;
    data: PostFrontMatter;
    headings: PostHeading[];
  };
  latestPosts: PostWithFrontmatter[];
}

interface IProps extends BlogPageProps, BlogPostProps {
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
  const tagInfo = POST_TAGS[slug?.toUpperCase()];
  const catInfo = CATEGORIES[slug?.toUpperCase()];

  const skip = slugPage ? (slugPage - 1) * postsPerPage : 0;

  const filteredPosts = posts.filter(({ data }) => {
    return data[filterType].includes(slug.toUpperCase());
  });

  const paginatedPosts = filteredPosts.slice(skip, skip + postsPerPage);

  return {
    postsLength: filteredPosts.length,
    posts: paginatedPosts,
    filterItem: tagInfo?.name || catInfo?.name,
  };
}

// Page to show for /blog or /blog/x where x is a number representing the page number
const BlogPage: NextPage<BlogPageProps> = ({
  blogPage,
  pageCount,
  testimonials,
  posts,
  tagsCats,
  filterItem,
}) => {
  return (
    <>
      <SEO
        metaTitle={`${filterItem ? `${filterItem} Posts |` : ''} Blog${
          blogPage ? ` - Page ${blogPage}` : ''
        }`}
        metaDescription="My Blog"
        url="blog"
      />
      <PageHero
        title="My Content"
        body="Blog posts, tutorials, technical writing and much more. All of my
            content in one place to enjoy..."
      />
      <HeaderBackground bg="bg-white" />
      <div className="flex flex-row items-center justify-center mb-72 md:mb-12">
        <div className="flex flex-col items-center justify-center gap-y-14 gap-x-20 w-full md:px-20 lg:px-106 xl:flex-row-reverse xl:items-start">
          <PostCardGrid posts={posts} />
          <PageSidebar data={tagsCats} />
        </div>
      </div>
      <PagePagination pageCount={pageCount} currentPage={blogPage} />
      <Testimonials testimonials={testimonials} />
    </>
  );
};

// Page to show for /blog/x where x is a slug of a blog post.
const BlogPost: NextPage<BlogPostProps> = ({ post, latestPosts }) => {
  const { content, headings, data: frontmatter } = post;
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
      <div className="flex flex-col items-center pb-10 bg-primaryBg px-6">
        <article className="flex flex-col w-full">
          <PostHeader frontmatter={frontmatter} />
          <div>
            <HeaderBackground bg="bg-primaryBg" />
            <div className="relative flex flex-row justify-center lg:justify-between xl:justify-center gap-0 xl:gap-24 w-full max-w-[1100px] m-auto">
              <div className="min-w-[272px] md:max-w-[650px] mx-6 xl:mx-0">
                {/*  eslint-disable-next-line */}
                {/* @ts-ignore */}
                <MDXRemote {...content} components={Components} />
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
const Blog: NextPage<IProps> = ({ isPostGridPage, ...params }) => {
  return isPostGridPage ? <BlogPage {...params} /> : <BlogPost {...params} />;
};

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const paths = await getPostPaths({ postType: POSTTYPES.BLOG });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const postData = await getAllPosts({ postType: POSTTYPES.BLOG });
  const { slug } = params as IParams;

  const { latestPosts, testimonials } = await pageDataSource({
    latestPosts: true,
    testimonials: true,
  });

  const { categories, tags } = await getAllTagsCategories({
    postType: POSTTYPES.BLOG,
  });

  // If there is a slug, take the value of it otherwise '0'
  const slugVal = slug?.length ? slug[0] : '0';
  const slugFilterPage = slug?.length === 2 ? slug[1] : '0';

  const slugInt = parseInt(slugVal);
  const slugFilterPageInt = parseInt(slugFilterPage);

  const isPostGridPage = slugVal.match(/^[0-9]*$/gm);

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
        blogPage: slugFilterPageInt,
        posts,
        tagsCats: { categories, tags },
        testimonials,
        filterItem,
      },
    };
  }

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
        blogPage: slugFilterPageInt,
        posts,
        tagsCats: { categories, tags },
        testimonials,
        filterItem,
      },
    };
  }

  // If it is a blog page pagination return props required for it
  if (isPostGridPage) {
    // Work out the number of blog posts required to skip for the page accessed. E.g. page 2 skip the first 8 posts and return from 9 to 16.
    const skip = slugInt ? (slugInt - 1) * postsPerPage : 0;

    const posts = postData.slice(skip, skip + postsPerPage);

    return {
      props: {
        isPostGridPage,
        pageCount: Math.ceil(postData.length / postsPerPage),
        blogPage: slugInt,
        posts,
        tagsCats: { categories, tags },
        testimonials,
      },
    };
  }

  // If it is a blog post return props required for it
  const post = await getPost({ slug: slugVal, postType: POSTTYPES.BLOG });
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
      post: { content, headings, data: post.data },
    },
  };
};

export default Blog;
