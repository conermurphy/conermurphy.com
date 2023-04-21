import { render, screen } from '@testing-library/react';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
  it('Should render all header items correctly', () => {
    render(<ContactSection />);

    const title = screen.getByRole('heading', { level: 2 });

    expect(title).toBeVisible();
  });

  it('Should render all email section items correctly', () => {
    render(<ContactSection />);

    const title = screen.getByRole('heading', { level: 3, name: 'Email me' });
    const subtitle = screen.getByText(/Let’s get talking./i);
    const link = screen.getByRole('link', { name: 'hey@conermurphy.com' });

    expect(title).toBeVisible();
    expect(subtitle).toBeVisible();
    expect(link).toBeVisible();
    expect(link.getAttribute('href')).toEqual('mailto:hey@conermurphy.com');
  });
});
