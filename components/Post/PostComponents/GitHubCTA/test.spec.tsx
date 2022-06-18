import { render, screen } from '@testing-library/react';
import GitHubCTA from './GitHubCTA';

describe('GitHubCTA', () => {
  it('Should render all items with correct link href', () => {
    render(<GitHubCTA postPath="/blog/example.mdx" />);

    const link = screen.getByRole('link', { name: 'Edit post on GitHub' });

    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toContain(
      'https://github.com/conermurphy/conermurphy.com/tree/main/content/blog/example.mdx'
    );
  });
});
