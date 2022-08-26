import { render, screen } from '@testing-library/react';
import React from 'react';
import DesktopHeader from './DesktopHeader';

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

describe('DesktopHeader', () => {
  it('Should render the site title', () => {
    render(<DesktopHeader />);

    const title = screen.getByText(/coner murphy/i);

    expect(title).toBeVisible();
  });

  it('Should render a link to home', () => {
    render(<DesktopHeader />);

    const title = screen.getByRole('link', { name: 'Coner Murphy' });

    expect(title).toBeVisible();
    expect(title.getAttribute('href')).toMatch(/.*\/$/);
  });

  it('Should render a nav component for the nav bar', () => {
    render(<DesktopHeader />);

    const nav = screen.getByRole('navigation');

    expect(nav).toBeVisible();
  });

  it('Should render all icons', () => {
    render(<DesktopHeader />);

    const icons = screen.queryAllByRole('img').length;

    const twitterIcon = screen.getByLabelText('Twitter logo');
    const linkedInIcon = screen.getByLabelText('LinkedIn logo');
    const emailIcon = screen.getByLabelText('Email icon');
    const themeIcon = screen.getByTestId('theme-icon');

    expect(twitterIcon).toBeVisible();
    expect(linkedInIcon).toBeVisible();
    expect(emailIcon).toBeVisible();
    expect(themeIcon).toBeVisible();
    expect(icons).toEqual(6);
  });
});
