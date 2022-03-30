import { render, screen } from '@testing-library/react';
import Tags from './Tags';

describe('Tags', () => {
  it('tags passed should display', () => {
    render(<Tags tags={['JAVASCRIPT', 'TYPESCRIPT']} />);

    const js = screen.getByText(/javascript/i);
    const ts = screen.getByText(/typescript/i);

    expect(js).toBeVisible();
    expect(ts).toBeVisible();
  });
});
