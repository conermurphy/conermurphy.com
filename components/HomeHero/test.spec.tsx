import { render, screen } from '@testing-library/react';
import HomeHero from './HomeHero';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        route: '/',
        pathname: '',
        query: '',
        asPath: '/',
      };
    },
  };
});

describe('HomeHero', () => {
  it('Should render correctly', () => {
    render(<HomeHero />);

    const introTitle = screen.getByTestId('hey-text');
    const roleCarousel = screen.queryByTestId('typewriter-wrapper');
    const icons = screen.queryAllByTestId('tech-icon').length;
    const hireButton = screen.getByRole('link', { name: 'Hire Me' });
    const blogButton = screen.getByRole('link', { name: 'Latest Blog Posts' });

    expect(introTitle).toBeVisible();
    expect(roleCarousel).toBeVisible();
    expect(icons).toBeGreaterThan(0);
    expect(hireButton).toBeVisible();
    expect(blogButton).toBeVisible();
  });
});
