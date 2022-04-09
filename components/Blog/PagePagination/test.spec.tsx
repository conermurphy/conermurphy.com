import { render, screen } from '@testing-library/react';
import { POSTTYPES } from '../../../types';
import PagePagination from './PagePagination';

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

describe('PagePagination', () => {
  it('Should render all items correctly', () => {
    render(
      <PagePagination pageCount={5} currentPage={2} postType={POSTTYPES.BLOG} />
    );

    const previousPage = screen.getByRole('link', {
      name: '< ← Previous Page',
    });
    const nextPage = screen.getByRole('link', {
      name: '> Next Page →',
    });

    expect(previousPage).toBeVisible();
    expect(previousPage.getAttribute('href')).toContain('/blog');

    expect(nextPage).toBeVisible();
    expect(nextPage.getAttribute('href')).toContain('/blog/3');

    const paginationNumbers = screen.getAllByTestId('pagination-number');
    const ellipses = screen.queryByTestId('pagination-ellipses');

    expect(paginationNumbers).toHaveLength(5);
    expect(ellipses).toBeNull();

    const page1 = screen.getByRole('link', { name: '1' });
    const page2 = screen.getByRole('link', { name: '2' });
    const page3 = screen.getByRole('link', { name: '3' });
    const page4 = screen.getByRole('link', { name: '4' });
    const page5 = screen.getByRole('link', { name: '5' });

    expect(page1).toBeVisible();
    expect(page1.getAttribute('href')).toContain('/blog');

    expect(page2).toBeVisible();
    expect(page2.getAttribute('href')).toContain('/blog/2');

    expect(page3).toBeVisible();
    expect(page3.getAttribute('href')).toContain('/blog/3');

    expect(page4).toBeVisible();
    expect(page4.getAttribute('href')).toContain('/blog/4');

    expect(page5).toBeVisible();
    expect(page5.getAttribute('href')).toContain('/blog/5');
  });

  it('Should render all items correctly with 6 or above pages', () => {
    render(
      <PagePagination pageCount={6} currentPage={2} postType={POSTTYPES.BLOG} />
    );

    const paginationNumbers = screen.getAllByTestId('pagination-number');
    const ellipses = screen.queryByTestId('pagination-ellipses');

    expect(paginationNumbers).toHaveLength(4);
    expect(ellipses).toBeVisible();

    const page1 = screen.getByRole('link', { name: '1' });
    const page2 = screen.getByRole('link', { name: '2' });
    const page3 = screen.queryByRole('link', { name: '3' });
    const page4 = screen.queryByRole('link', { name: '4' });
    const page5 = screen.getByRole('link', { name: '5' });
    const page6 = screen.getByRole('link', { name: '6' });

    expect(page1).toBeVisible();
    expect(page1.getAttribute('href')).toContain('/blog');

    expect(page2).toBeVisible();
    expect(page2.getAttribute('href')).toContain('/blog/2');

    expect(page3).toBeNull();
    expect(page4).toBeNull();

    expect(page5).toBeVisible();
    expect(page5.getAttribute('href')).toContain('/blog/5');

    expect(page6).toBeVisible();
    expect(page6.getAttribute('href')).toContain('/blog/6');
  });
});
