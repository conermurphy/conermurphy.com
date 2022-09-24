import { render, screen } from '@testing-library/react';
import { POSTTYPES } from '../../types';
import LatestPosts from './LatestPosts';

const mockData = [
  {
    data: {
      UUID: 'hhjhjhhj',
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
  },
  {
    data: {
      UUID: 'dsfdggd',
      id: 2,
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
  },
  {
    data: {
      UUID: 'fef3ffda',
      id: 3,
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
  },
];

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: 'example-post-title',
    };
  },
}));

describe('LatestPosts', () => {
  it('should have correct title and subtitle', () => {
    render(<LatestPosts posts={mockData} postType={POSTTYPES.BLOG} />);

    const title = screen.queryByText(/Latest Blogs/i);

    expect(title).toBeVisible();
  });

  it('should match the length provided', () => {
    render(<LatestPosts posts={mockData} postType={POSTTYPES.BLOG} />);

    const posts = screen.queryAllByText('Example Post 1');

    expect(posts).toHaveLength(3);
  });
});