import { render, screen } from '@testing-library/react';
import { POSTTYPES } from '../../../types';
import PostCard from './PostCard';

const mockData = {
  UUID: 'hfdjkhfjhd',
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
};

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

describe('PostCard', () => {
  it('Should contain all revelant elements', () => {
    const { container } = render(
      <PostCard post={mockData} postType={POSTTYPES.BLOG} />
    );

    const image = container.querySelectorAll('img');
    const title = screen.getByText(/example post 1/i);
    const date = screen.getByText(/26 mar 2022/i);
    const description = screen.getByText(/This is a description of a post/i);

    expect(image).toHaveLength(1);
    expect(title).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
