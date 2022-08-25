import { render, screen } from '@testing-library/react';
import React from 'react';
import NavBar from './NavBar';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '/',
    };
  },
}));

describe('NavBar', () => {
  it('3 links should be rendered', () => {
    render(<NavBar />);

    const links = screen.queryAllByRole('link').length;
    const homeLink = screen.queryByText(/home/i);
    const blogLink = screen.queryByText(/blog/i);
    const newsletterLink = screen.queryByText(/newsletter/i);
    const contactLink = screen.queryByText(/contact/i);

    expect(links).toEqual(4);
    expect(homeLink).toBeVisible();
    expect(blogLink).toBeVisible();
    expect(newsletterLink).toBeVisible();
    expect(contactLink).toBeVisible();
  });
});
