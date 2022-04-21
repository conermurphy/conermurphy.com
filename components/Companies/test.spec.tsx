import { render } from '@testing-library/react';
import React from 'react';
import Companies from './Companies';

jest.mock('next/image', () => {
  return function Image({ src, alt }: { src: string; alt: string }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  };
});

describe('Companies', () => {
  it('Should have at least one company logo svg', () => {
    const { container } = render(<Companies />);

    const images = container.querySelectorAll('img').length;

    expect(images).toBeGreaterThan(0);
  });
});
