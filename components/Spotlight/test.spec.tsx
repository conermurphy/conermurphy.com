import { render, screen } from '@testing-library/react';
import React from 'react';
import { SPOTLIGHTTYPE } from '../../types';
import Spotlight from './Spotlight';

describe('Spotlight', () => {
  it('When showing the tech spotlight, should have tech title', () => {
    render(<Spotlight type={SPOTLIGHTTYPE.TECH} />);

    const title = screen.queryByText(
      /Using the latest technologies and more.../i
    );

    expect(title).toBeVisible();
  });

  it('When showing the tech spotlight, at least one SVG should be present from the tech enum', () => {
    render(<Spotlight type={SPOTLIGHTTYPE.TECH} />);

    const icons = screen.queryAllByTestId('tech-icon').length;

    expect(icons).toBeGreaterThan(0);
  });

  it('When showing the companies spotlight, should have companies title', () => {
    render(<Spotlight type={SPOTLIGHTTYPE.COMPANIES} />);

    const title = screen.queryByText(/Trusted by companies around the globe/i);

    expect(title).toBeVisible();
  });
});
