import { fireEvent, render, screen } from '@testing-library/react';
import Newsletter from './Newsleter';

describe('Newsletter', () => {
  it('Should render all form elements', () => {
    render(<Newsletter />);

    const title = screen.queryByText(/stay up to date/i);
    const copy = screen.queryByText(
      /Get exclusive content and be notified of my content before anyone else by subscribing to my newsletter below./i
    );
    const input = screen.queryByPlaceholderText(/Enter your email/i);
    const button = screen.queryByText(/subscribe/i);

    expect(title).toBeVisible();
    expect(copy).toBeVisible();
    expect(input).toBeVisible();
    expect(button).toBeVisible();
  });

  it('should display no email message when no email is provided', () => {
    const { getByTestId, getByText } = render(<Newsletter />);

    const form = getByTestId('newsletter-form');

    fireEvent.submit(form);

    const message = getByText(/Oops! There was no email entered/i);

    expect(message).toBeVisible();
  });
});
