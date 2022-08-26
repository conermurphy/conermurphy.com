import { POSTTYPES } from '../../../types';
import getAllTopics from './getAllTopics';
import getAllTagsCategories from './getAllTopics';

const mockPosts = [
  {
    data: {
      id: 1,
      title: 'Example Post 1',
      date: '2022-03-26',
      topics: ['JAVASCRIPT'],
      slug: 'example-post-1',
      image:
        '/images/blog/complete-2021-guide-to-http-status-codes-their-seo-influence.png',
      description: 'This is a description of a post',
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
      topics: ['GATSBYJS', 'CONTENT-CREATION'],
      slug: 'example-post-1',
      image:
        '/images/blog/complete-2021-guide-to-http-status-codes-their-seo-influence.png',
      description: 'This is a description of a post',
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
      topics: ['CSS', 'DESIGN'],
      slug: 'example-post-1',
      image:
        '/images/blog/complete-2021-guide-to-http-status-codes-their-seo-influence.png',
      description: 'This is a description of a post',
      published: true,
      canonical_url: '',
      timeToRead: 10,
    },
    content: '',
  },
];

jest.mock('../getAllPosts', () =>
  jest.fn(async () => Promise.resolve(mockPosts))
);

describe('getAllTagsCategories', () => {
  it('Should return all tags and categories from provided posts', async () => {
    const { topics } = await getAllTopics({
      postType: POSTTYPES.BLOG,
    });

    expect(topics).toEqual([
      'JAVASCRIPT',
      'GATSBYJS',
      'CONTENT-CREATION',
      'CSS',
      'DESIGN',
    ]);
  });
});
