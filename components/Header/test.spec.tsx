import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from './Header';

describe('Header', () => {
  it('Should render the site title', () => {
    render(<Header />);

    const title = screen.getByText(/coner murphy/i);

    expect(title).toBeVisible();
  });

  it('Should render a nav component for the nav bar', () => {
    render(<Header />);

    const nav = screen.getByRole('navigation');

    expect(nav).toBeVisible();
  });
});
