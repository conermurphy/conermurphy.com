import { render, screen } from '@testing-library/react';
import React from 'react';
import Footer from './Footer';

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

describe('Footer', () => {
  it('Title text is present', () => {
    render(<Footer />);
    const title = screen.getByRole('heading', { level: 2 });

    expect(title).toBeInTheDocument();
  });

  it('SubFooter is present', () => {
    render(<Footer />);
    const subFooterText = screen.queryByText(
      /© 2022 - Designed and developed by Coner Murphy. All Rights Reserved./i
    );

    expect(subFooterText).toBeInTheDocument();
  });

  it('NavBar is present', () => {
    const { container } = render(<Footer />);
    const navbar = container.querySelector('nav');

    expect(navbar).toBeInTheDocument();
  });

  it('Socials is present', () => {
    const { container } = render(<Footer />);
    const socials = container.querySelector('address');

    expect(socials).toBeInTheDocument();
  });
});
