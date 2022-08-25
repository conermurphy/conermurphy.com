import { POST_TAGS } from '../../components/Post/Tags/Tags';
import { CATEGORIES } from '../../constants';
import { Post } from '../../types';

interface CreateFilterPostPageProps {
  slug: string;
  posts: Post[];
  postsPerPage: number;
  slugPage: number;
  filterType: 'tags' | 'categories';
}

export default function createFilterPostPage({
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
  const filteredPosts = posts.filter(({ data }) =>
    data[filterType].includes(upperSlug)
  );

  // Paginate the posts off the skip value and the postsPerPage value
  const paginatedPosts = filteredPosts.slice(skip, skip + postsPerPage);

  return {
    postsLength: filteredPosts.length,
    posts: paginatedPosts,
    filterItem: tagInfo?.name || catInfo?.name,
  };
}
