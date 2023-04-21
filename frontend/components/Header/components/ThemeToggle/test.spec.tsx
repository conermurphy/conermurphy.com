import { render, screen } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  it('Should render correctly', () => {
    render(<ThemeToggle />);

    const icon = screen.getByTestId('theme-icon');

    expect(icon).toBeVisible();
  });
});
