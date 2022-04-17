import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from './DesktopHeader';

describe('Header', () => {
  it('Should render the site title', () => {
    render(<Header />);

    const title = screen.getByText(/coner murphy/i);

    expect(title).toBeVisible();
  });

  it('Should render a link to home', () => {
    render(<Header />);

    const title = screen.getByRole('link', { name: 'Coner Murphy' });

    expect(title).toBeVisible();
    expect(title.getAttribute('href')).toMatch(/.*\/$/);
  });

  it('Should render a nav component for the nav bar', () => {
    render(<Header />);

    const nav = screen.getByRole('navigation');

    expect(nav).toBeVisible();
  });

  it('Should render the socials component', () => {
    render(<Header />);

    const icons = screen.queryAllByRole('img').length;

    const twitterIcon = screen.getByLabelText('Twitter logo');
    const linkedInIcon = screen.getByLabelText('LinkedIn logo');
    const emailIcon = screen.getByLabelText('Email icon');

    expect(twitterIcon).toBeVisible();
    expect(linkedInIcon).toBeVisible();
    expect(emailIcon).toBeVisible();
    expect(icons).toEqual(3);
  });
});
