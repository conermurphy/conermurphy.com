import { render, screen } from '@testing-library/react';
import PageHero from './PageHero';

describe('PageHero', () => {
  it('Should have a matching title to the passed prop', () => {
    const title = 'Example title';
    render(<PageHero title={title} body="" />);

    const pageTitle = screen.getByText(title);
    expect(pageTitle).toBeVisible();
  });

  it('Should have a matching body to the passed prop', () => {
    const body = 'Example body content';
    render(<PageHero title="" body={body} />);

    const pageBody = screen.getByText(body);
    expect(pageBody).toBeVisible();
  });

  it('Should have a newsletter component by default', () => {
    render(<PageHero title="" body="" />);

    const input = screen.queryByPlaceholderText(/Enter your email/i);
    const button = screen.queryByText(/subscribe/i);

    expect(input).toBeVisible();
    expect(button).toBeVisible();
  });

  it('Should not have a newsletter component if passed false to prop', () => {
    render(<PageHero title="" body="" showNewsletter={false} />);

    const input = screen.queryByPlaceholderText(/Enter your email/i);
    const button = screen.queryByText(/subscribe/i);

    expect(input).toBeNull();
    expect(button).toBeNull();
  });
});
