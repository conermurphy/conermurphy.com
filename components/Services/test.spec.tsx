import { render } from '@testing-library/react';
import React from 'react';
import Services from './Services';

const services = [
  {
    title: 'Service Title 1',
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus. Cras scelerisque urna amet sagittis donec arcu ipsum.',
    icon: 'keyboard',
  },
  {
    title: 'Service Title 2',
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus. Cras scelerisque urna amet sagittis donec arcu ipsum.',
    icon: 'code',
  },
  {
    title: 'Service Title 3',
    copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla arcu at facilisis dignissim arcu pretium tempus. Cras scelerisque urna amet sagittis donec arcu ipsum.',
    icon: 'socials',
  },
];

describe('Services', () => {
  it('Matches the snapshot', () => {
    const { container } = render(<Services services={services} />);
    expect(container).toMatchSnapshot();
  });
});
