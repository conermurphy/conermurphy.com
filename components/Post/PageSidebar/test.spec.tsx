import { render, screen } from '@testing-library/react';
import PageSidebar from './PageSidebar';

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

const mockData = ['JAVASCRIPT', 'NODEJS', 'DESIGN', 'DEVELOPMENT'];

describe('PageSidebar', () => {
  it('Should render all items correctly', () => {
    render(<PageSidebar data={mockData} />);

    const jsTag = screen.getByText(/javascript/i);
    const nodeTag = screen.getByText(/nodejs/i);

    const designCategory = screen.getByText(/design/i);
    const developmentCategory = screen.getByText(/development/i);

    expect(jsTag).toBeVisible();
    expect(nodeTag).toBeVisible();

    expect(jsTag.getAttribute('href')).toContain('/?q=javascript');
    expect(nodeTag.getAttribute('href')).toContain('/?q=nodejs');

    expect(designCategory).toBeVisible();
    expect(developmentCategory).toBeVisible();

    expect(designCategory.getAttribute('href')).toContain('/?q=design');
    expect(developmentCategory.getAttribute('href')).toContain(
      '/?q=development'
    );
  });
});
