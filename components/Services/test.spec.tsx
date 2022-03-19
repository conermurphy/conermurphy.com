import { render } from '@testing-library/react';
import React from 'react';
import { servicesData } from '../../content';
import Services from './Services';

describe('Services', () => {
  it('Should have 3 child elements', () => {
    const { container } = render(<Services services={servicesData} />);
    const ul = container.querySelector('ul');
    const items = ul?.querySelectorAll('article');

    expect(items).toHaveLength(3);
  });
});
