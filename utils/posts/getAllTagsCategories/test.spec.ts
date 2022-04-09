import { POSTTYPES } from '../../../types';
import getAllTagsCategories from './getAllTagsCategories';

const mockPosts = [
  {
    data: {
      id: 1,
      title: 'Example Post 1',
      date: '2022-03-26',
      tags: ['JAVASCRIPT'],
      slug: 'example-post-1',
      image:
        '/images/blog/complete-2021-guide-to-http-status-codes-their-seo-influence.png',
      description: 'This is a description of a post',
      categories: [''],
      published: true,
      canonical_url: '',
      timeToRead: 10,
    },
    content: '',
  },
  {
    data: {
      id: 2,
      title: 'Example Post 1',
      date: '2022-03-26',
      tags: ['GATSBYJS'],
      slug: 'example-post-1',
      image:
        '/images/blog/complete-2021-guide-to-http-status-codes-their-seo-influence.png',
      description: 'This is a description of a post',
      categories: ['CONTENT_CREATION'],
      published: true,
      canonical_url: '',
      timeToRead: 10,
    },
    content: '',
  },
  {
    data: {
      id: 3,
      title: 'Example Post 1',
      date: '2022-03-26',
      tags: ['CSS'],
      slug: 'example-post-1',
      image:
        '/images/blog/complete-2021-guide-to-http-status-codes-their-seo-influence.png',
      description: 'This is a description of a post',
      categories: ['DESIGN'],
      published: true,
      canonical_url: '',
      timeToRead: 10,
    },
    content: '',
  },
];

jest.mock('../getAllPosts', () => {
  return jest.fn(async () => {
    return Promise.resolve(mockPosts);
  });
});

describe('getAllTagsCategories', () => {
  it('Should return all tags and categories from provided posts', async () => {
    const { tags, categories } = await getAllTagsCategories({
      postType: POSTTYPES.BLOG,
    });

    expect(tags).toEqual(['JAVASCRIPT', 'GATSBYJS', 'CSS']);
    expect(categories).toEqual(['CONTENT_CREATION', 'DESIGN']);
  });
});
