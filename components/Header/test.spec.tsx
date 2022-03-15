import { render } from '@testing-library/react';
import React from 'react';
import Header from './Header';

describe('Header', () => {
  it('Matches the snapshot with no props', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
