import { render, screen } from '@testing-library/react';
import PageSidebar from './PageSidebar';

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

const mockPosts = [
  {
    data: {
      id: 9,
      title: 'JavaScript Array Methods: Array.of()',
      description:
        "The Array is one of the most important types of data in JavaScript, so in this series we are going to cover all of the Array Methods, in this post it's Array.of()",
      date: '2020-05-30',
      tags: ['JAVASCRIPT'],
      categories: ['DEVELOPMENT'],
      slug: 'javascript-array-methods-of-explained',
      image:
        '/images/blog/9-Array-Methods-of-explained/array-methods-of-explained.png',
      published: true,
      canonical_url: '',
      timeToRead: 10,
    },
  },
  {
    data: {
      id: 2,
      title: 'Nodejs article',
      description:
        "The Array is one of the most important types of data in JavaScript, so in this series we are going to cover all of the Array Methods, in this post it's Array.of()",
      date: '2020-05-30',
      tags: ['NODEJS'],
      categories: ['DESIGN'],
      slug: 'javascript-array-methods-of-explained',
      image:
        '/images/blog/9-Array-Methods-of-explained/array-methods-of-explained.png',
      published: true,
      canonical_url: '',
      timeToRead: 10,
    },
  },
];

describe('PostSidebar', () => {
  it('Should render all items correctly', () => {
    render(<PageSidebar posts={mockPosts} />);

    const categoriesTitle = screen.getByText(/categories/i);
    const tagsTitle = screen.getByText(/tags/i);

    const jsTag = screen.getByText(/javascript/i);
    const nodeTag = screen.getByText(/nodejs/i);

    const designCategory = screen.getByText(/design/i);
    const developmentCategory = screen.getByText(/development/i);

    expect(categoriesTitle).toBeVisible();
    expect(tagsTitle).toBeVisible();

    expect(jsTag).toBeVisible();
    expect(nodeTag).toBeVisible();

    expect(jsTag.getAttribute('href')).toContain('/blog/javascript');
    expect(nodeTag.getAttribute('href')).toContain('/blog/nodejs');

    expect(designCategory).toBeVisible();
    expect(developmentCategory).toBeVisible();

    expect(designCategory.getAttribute('href')).toContain('/blog/design');
    expect(developmentCategory.getAttribute('href')).toContain(
      '/blog/development'
    );
  });
});
