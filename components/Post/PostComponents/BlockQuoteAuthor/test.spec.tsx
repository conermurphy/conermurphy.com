import { render, screen } from '@testing-library/react';
import BlockQuoteAuthor from './BlockQuoteAuthor';

describe('BlockQuoteAuthor', () => {
  it('should render correctly when all props passed', () => {
    render(
      <BlockQuoteAuthor
        quote="This is a quote"
        caption="A person"
        cite={{ url: 'google.com', text: 'Google' }}
      />
    );

    const quote = screen.getByText(/this is a quote/i);
    const caption = screen.getByText(/a person/i);
    const citeText = screen.getByText(/google/i);
    const citeLink = screen.getByRole('figure').querySelector('blockquote');

    expect(quote).toBeVisible();
    expect(caption).toBeVisible();
    expect(citeText).toBeVisible();
    expect(citeLink).toHaveAttribute('cite', 'google.com');
  });

  it('should render correctly when only manadatory props passed', () => {
    render(<BlockQuoteAuthor quote="This is a quote" caption="A person" />);

    const quote = screen.getByText(/this is a quote/i);
    const caption = screen.getByText(/a person/i);
    const citeText = screen.queryByText(/google/i);
    const citeLink = screen.queryByText('figure')?.querySelector('blockquote');

    expect(quote).toBeVisible();
    expect(caption).toBeVisible();
    expect(citeText).toBeNull();
    expect(citeLink).toBeUndefined();
  });
});
