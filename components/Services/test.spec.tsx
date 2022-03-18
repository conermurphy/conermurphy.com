import { render } from '@testing-library/react';
import React from 'react';
import { ICONS } from '../../types';
import Services from './Services';

const services = [
  {
    title: 'Service Title 1',
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus. Cras scelerisque urna amet sagittis donec arcu ipsum.',
    icon: ICONS.KEYBOARD,
  },
  {
    title: 'Service Title 2',
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus. Cras scelerisque urna amet sagittis donec arcu ipsum.',
    icon: ICONS.CODE,
  },
  {
    title: 'Service Title 3',
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus. Cras scelerisque urna amet sagittis donec arcu ipsum.',
    icon: ICONS.SOCIALS,
  },
];

describe('Services', () => {
  it('Should have 3 child elements', () => {
    const { container } = render(<Services services={services} />);
    const ul = container.querySelector('ul');
    const items = ul?.querySelectorAll('article');

    expect(items).toHaveLength(3);
  });
});
