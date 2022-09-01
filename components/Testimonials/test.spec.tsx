import { render } from '@testing-library/react';
import React from 'react';
import Testimonials from './Testimonials';
import { testimonialsData } from '../../content';

jest.mock(
  'next/image',
  () =>
    function Image({ src, alt }: { src: string; alt: string }) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} />;
    }
);

describe('Testimonials', () => {
  it('Should have more than 0 child elements', () => {
    const { container } = render(
      <Testimonials testimonials={testimonialsData} />
    );

    const ul = container.querySelector('ul');
    const items = ul?.querySelectorAll('article').length;

    expect(items).toBeGreaterThan(0);
  });
});
