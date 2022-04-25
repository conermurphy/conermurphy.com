import { render, screen } from '@testing-library/react';
import PageSidebar from './PageSidebar';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        route: '/',
        pathname: '',
        query: '',
        asPath: '/blog',
      };
    },
  };
});

const mockData = {
  tags: ['JAVASCRIPT', 'NODEJS'],
  categories: ['DESIGN', 'DEVELOPMENT'],
};

describe('PageSidebar', () => {
  it('Should render all items correctly', () => {
    render(<PageSidebar data={mockData} />);

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
