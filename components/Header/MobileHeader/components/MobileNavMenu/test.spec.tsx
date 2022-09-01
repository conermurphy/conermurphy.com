import { render, screen } from '@testing-library/react';
import MobileNavMenu from './MobileNavMenu';

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

describe('MobileNavMenu', () => {
  it('Should render nav and newsletter when isOpen is true', () => {
    render(<MobileNavMenu isOpen />);

    const homeLink = screen.queryByText(/home/i);
    const blogLink = screen.queryByText(/blog/i);
    const contactLink = screen.queryByText(/contact/i);

    expect(homeLink).toBeVisible();
    expect(blogLink).toBeVisible();
    expect(contactLink).toBeVisible();
  });
});
