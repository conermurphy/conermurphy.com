import { render, screen } from '@testing-library/react';
import PostCardGrid from './PostCardGrid';

const mockData = [
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
  },
  {
    data: {
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

describe('PostCardGrid', () => {
  it('should match length', () => {
    render(<PostCardGrid posts={mockData} />);

    const title = screen.getAllByText(/example post 1/i);

    expect(title).toHaveLength(3);
  });
});
