import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import {
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

interface IParams extends ParsedUrlQuery {
  slug: string[];
}

interface BlogPageProps {
  blogPage: number;
  pageCount: number;
  testimonials: Testimonial[];
  posts: PostWithFrontmatter[];
  tagsCats: PostTagsCats;
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
  isBlogPage: boolean;
}

// Page to show for /blog or /blog/x where x is a number representing the page number
const BlogPage: NextPage<BlogPageProps> = ({
  blogPage,
  pageCount,
  testimonials,
  posts,
  tagsCats,
}) => {
  return (
    <>
      <SEO
        metaTitle={`Blog${blogPage ? ` - Page ${blogPage}` : ''}`}
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
          <PostCardGrid posts={posts} postType={POSTTYPES.BLOG} />
          <PageSidebar data={tagsCats} />
        </div>
      </div>
      <PagePagination
        pageCount={pageCount}
        currentPage={blogPage}
        postType={POSTTYPES.BLOG}
      />
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
          <PostHeader frontmatter={frontmatter} postType={POSTTYPES.BLOG} />
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

// This controls which page to show based off the isBlogPage prop
const Blog: NextPage<IProps> = ({ isBlogPage, ...params }) => {
  return isBlogPage ? <BlogPage {...params} /> : <BlogPost {...params} />;
};

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const postData = await getAllPosts({ postType: POSTTYPES.BLOG });

  // Get all post slugs
  const postPaths = postData.map((post) => {
    const { slug } = post.data;

    return {
      params: {
        slug: [slug],
      },
    };
  });

  // Get all Tags and Categories for postType
  const { categories, tags } = await getAllTagsCategories({
    postType: POSTTYPES.BLOG,
  });

  const tagPaths = tags
    .map((tag) => {
      const totalPostsWithTag = postData.filter(
        ({ data: { tags: postTags } }) => {
          return postTags.includes(tag);
        }
      ).length;

      const pagesRequired = Math.ceil(totalPostsWithTag / postsPerPage);

      const paths = Array.from({ length: pagesRequired }).map((_, i) => {
        return {
          params: {
            slug: [tag, `${i !== 0 ? i + 1 : ''}`],
          },
        };
      });

      return paths;
    })
    .flat();

  const catPaths = categories
    .map((cat) => {
      const totalPostsWithCat = postData.filter(
        ({ data: { categories: postCategories } }) => {
          return postCategories.includes(cat);
        }
      ).length;

      const pagesRequired = Math.ceil(totalPostsWithCat / postsPerPage);

      const paths = Array.from({ length: pagesRequired }).map((_, i) => {
        return {
          params: {
            slug: [cat, `${i !== 0 ? i + 1 : ''}`],
          },
        };
      });

      return paths;
    })
    .flat();

  // Find the total number of blog posts and calculate the number of pages required to show them with 8 per page
  const postsLength = postData.length;
  const pages = postsLength / postsPerPage;

  // Create the routes for each blog page and then add the post paths onto the array
  const blogPaths = Array.from({ length: pages }).map((_, i) => {
    return {
      params: {
        slug: [`${i !== 0 ? i + 1 : ''}`],
      },
    };
  });

  return {
    paths: [...blogPaths, ...postPaths, ...catPaths, ...tagPaths],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postsPerPage = parseInt(process.env.POSTS_PER_PAGE);
  const { slug } = params as IParams;

  const { latestPosts, testimonials } = await pageDataSource({
    latestPosts: true,
    testimonials: true,
  });

  // If there is a slug, take the value of it otherwise '0'
  const slugVal = Array.isArray(slug) ? slug[0] : '0';

  // Try convert the slug into a number.
  const slugInt = parseInt(slugVal);

  // If the slug passed is all numbers, it must be blog page pagination
  const isBlogPage = slugVal.match(/^[0-9]*$/gm);

  // If it is a blog page pagination return props required for it
  if (isBlogPage) {
    // Work out the number of blog posts required to skip for the page accessed. E.g. page 2 skip the first 8 posts and return from 9 to 16.
    const skip = slugInt ? (slugInt - 1) * postsPerPage : 0;

    const postData = await getAllPosts({ postType: POSTTYPES.BLOG });
    const posts = postData.slice(skip, skip + postsPerPage);

    const tagsCats = await getAllTagsCategories({ postType: POSTTYPES.BLOG });

    return {
      props: {
        isBlogPage,
        pageCount: postData.length / postsPerPage,
        blogPage: slugInt,
        posts,
        tagsCats,
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
      isBlogPage,
      latestPosts,
      post: { content, headings, data: post.data },
    },
  };
};

export default Blog;
