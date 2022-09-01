import { render, screen } from '@testing-library/react';
import PostHeader from './PostHeader';

const frontmatter = {
  UUID: 'some-uuid',
  id: 40,
  title: 'The Complete 2021 Guide to HTTP Status Codes and Their SEO Influence',
  date: '2021-06-01',
  topics: ['JAVASCRIPT'],
  slug: 'complete-2021-guide-to-http-status-codes-seo-influence',
  image:
    '/images/blog/40-complete-2021-guide-http-status-codes-seo-influence/complete-2021-guide-to-http-status-codes-their-seo-influence.png',
  published: true,
  canonical_url: '',
  description:
    'HTTP status codes are a vital part of the web, they allow for clear communication between clients and servers.',
  timeToRead: 10,
};

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '/blog',
    };
  },
}));

describe('PostHeader', () => {
  it('should render all items', () => {
    const { container } = render(<PostHeader frontmatter={frontmatter} />);

    const date = screen.getByText(/published on 1 jun 2021/i);
    const ttr = screen.getByText(/10 minute read/i);
    const title = screen.getByText(
      /The Complete 2021 Guide to HTTP Status Codes and Their SEO Influence/i
    );
    const description = screen.getByText(
      /HTTP status codes are a vital part of the web, they allow for clear communication between clients and servers./i
    );
    const image = container.querySelectorAll('img').length;

    expect(date).toBeVisible();
    expect(ttr).toBeVisible();
    expect(title).toBeVisible();
    expect(description).toBeVisible();
    expect(image).toEqual(1);
  });
});
