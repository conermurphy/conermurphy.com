import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import MobileHeader from './MobileHeader';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '/',
      events: {
        on: jest.fn(),
      },
    };
  },
}));

describe('MobileHeader', () => {
  it('Should render site title with link to homepage and open menu button', () => {
    render(<MobileHeader />);

    const title = screen.getByRole('link', { name: 'Coner Murphy' });
    const button = screen.getByRole('button', { name: 'Open menu' });

    expect(title).toBeVisible();
    expect(title.getAttribute('href')).toContain('/');
    expect(button).toBeVisible();
  });

  it('NavBar and Newsletter should not be present when menu closed', () => {
    render(<MobileHeader />);

    const nav = screen.queryByRole('landmark');
    const newsletter = screen.queryByRole('form');

    expect(nav).toBe(null);
    expect(newsletter).toBe(null);
  });

  it('Should render site title with link to homepage and close menu button when open', () => {
    render(<MobileHeader />);

    const title = screen.getByRole('link', { name: 'Coner Murphy' });
    const openButton = screen.getByRole('button', { name: 'Open menu' });

    expect(title).toBeVisible();
    expect(title.getAttribute('href')).toContain('/');
    expect(openButton).toBeVisible();

    fireEvent.click(openButton);

    const closeButton = screen.getByRole('button', { name: 'Close menu' });

    expect(closeButton).toBeVisible();

    const homeLink = screen.queryByText(/home/i);
    const blogLink = screen.queryByText(/blog/i);
    const contactLink = screen.queryByText(/contact/i);

    expect(homeLink).toBeVisible();
    expect(blogLink).toBeVisible();
    expect(contactLink).toBeVisible();

    const newsletter = screen.getByTestId('newsletter-form');

    expect(newsletter).toBeVisible();
  });
});
