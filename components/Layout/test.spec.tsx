import { render } from '@testing-library/react';
import React from 'react';
import Layout from './Layout';

jest.mock('next/router', () => {
  return {
    useRouter: () => {
      return {
        query: { myProp: 'myValue' },
        pathname: '/',
      };
    },
  };
});

jest.mock('next/link', () => {
  return ({ children }: { children: JSX.Element }) => {
    return children;
  };
});

describe('Layout', () => {
  it('Matches the snapshot on mobile', () => {
    const { container } = render(<Layout />);
    expect(container).toMatchSnapshot();
  });
});
