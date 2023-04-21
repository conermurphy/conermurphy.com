import { render, screen } from '@testing-library/react';
import PageHero from './PageHero';

describe('PageHero', () => {
  it('Should have a matching title to the passed prop', () => {
    const title = 'Example title';
    render(<PageHero title={title} />);

    const pageTitle = screen.getByText(title);
    expect(pageTitle).toBeVisible();
  });

  it('Should have a newsletter component by default', () => {
    render(<PageHero title="" />);

    const input = screen.queryByPlaceholderText(/Enter your email/i);
    const button = screen.queryByRole('button');

    expect(input).toBeVisible();
    expect(button).toBeVisible();
  });

  it('Should not have a newsletter component if passed false to prop', () => {
    render(<PageHero title="" showNewsletter={false} />);

    const input = screen.queryByPlaceholderText(/Enter your email/i);
    const button = screen.queryByRole('button');

    expect(input).toBeNull();
    expect(button).toBeNull();
  });
});
