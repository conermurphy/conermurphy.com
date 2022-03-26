import { render } from '@testing-library/react';
import SEO from './SEO';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return children;
    },
  };
});

describe('SEO', () => {
  it('should render title correctly with prop', () => {
    render(<SEO metaTitle="Example Title" metaDescription="A description" />, {
      container: document.head,
    });

    expect(document.title).toBe('Example Title | Coner Murphy');
  });

  it('should render title correctly with empty value', () => {
    render(<SEO metaTitle="" metaDescription="A description" />, {
      container: document.head,
    });

    expect(document.title).toBe('Coner Murphy');
  });
});
