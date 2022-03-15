import { render } from '@testing-library/react';
import React from 'react';
import Socials from './Socials';

describe('Socials', () => {
  it('Matches the snapshot with no props', () => {
    const { container } = render(<Socials />);
    expect(container).toMatchSnapshot();
  });

  it('Matches the snapshot with header false', () => {
    const { container } = render(<Socials isHeader={false} />);
    expect(container).toMatchSnapshot();
  });
});
