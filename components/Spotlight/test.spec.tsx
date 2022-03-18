import { render, screen } from '@testing-library/react';
import React from 'react';
import { SPOTLIGHT } from '../../types';
import Spotlight from './Spotlight';

jest.mock('next/image', () => {
  return function Image({ src, alt }: { src: string; alt: string }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  };
});

describe('Spotlight', () => {
  it('When showing the tech spotlight, should have tech title', () => {
    render(<Spotlight type={SPOTLIGHT.TECH} />);

    const title = screen.queryByText(
      /Using the latest technologies and more.../i
    );

    expect(title).toBeVisible();
  });

  it('When showing the tech spotlight, at least one SVG should be present from the tech enum', () => {
    render(<Spotlight type={SPOTLIGHT.TECH} />);

    const icons = screen.queryAllByTestId('tech-icon').length;

    expect(icons).toBeGreaterThan(0);
  });

  it('When showing the companies spotlight, should have companies title', () => {
    render(<Spotlight type={SPOTLIGHT.COMPANIES} />);

    const title = screen.queryByText(/Trusted by companies around the globe/i);

    expect(title).toBeVisible();
  });

  it('When showing the companies spotlight, should have at least one company logo svg', () => {
    const { container } = render(<Spotlight type={SPOTLIGHT.COMPANIES} />);

    const images = container.querySelectorAll('img').length;

    expect(images).toBeGreaterThan(0);
  });
});
