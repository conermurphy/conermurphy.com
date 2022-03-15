import { render } from '@testing-library/react';
import Home from '../pages/index';

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

it('homepage matches snapshot', () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
