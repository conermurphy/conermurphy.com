import { render, screen } from '@testing-library/react';
import { POSTTYPES } from '../../../types';
import PostCardGrid from './PostCardGrid';

const mockData = [
  {
    data: {
      UUID: 'hhjhjhhj',
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
  },
  {
    data: {
      UUID: 'dsfdggd',
      id: 2,
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
  },
  {
    data: {
      UUID: 'fef3ffda',
      id: 3,
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
  },
];

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        route: '/',
        pathname: '',
        query: '',
        asPath: 'example-post-title',
      };
    },
  };
});

describe('PostCardGrid', () => {
  it('should match length', () => {
    render(
      <PostCardGrid
        posts={mockData}
        postType={POSTTYPES.BLOG}
        pageQueries={{ page: '', queries: [] }}
      />
    );

    const title = screen.getAllByText(/example post 1/i);

    expect(title).toHaveLength(3);
  });
});
