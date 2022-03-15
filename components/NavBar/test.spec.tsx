import { render } from '@testing-library/react';
import React from 'react';
import NavBar from './NavBar';

describe('NavBar', () => {
  it('Matches the snapshot', () => {
    const { container } = render(<NavBar />);
    expect(container).toMatchSnapshot();
  });
});
