import { render, screen } from '@testing-library/react';
import ImageCaption from './ImageCaption';

describe('ImageCaption', () => {
  it('should render all items (optional when provided)', () => {
    const { container } = render(
      <ImageCaption
        src="/test-image.png"
        alt="Test Image"
        caption="This is an image"
      />
    );

    const image = container.querySelectorAll('img').length;
    const caption = screen.getByText(/this is an image/i);
    const altText = [...container.querySelectorAll('img')].map(
      ({ alt }) => alt
    );

    expect(image).toEqual(1);
    expect(altText).toContain('Test Image');
    expect(caption).toBeVisible();
  });

  it('should render items correctly (optional not provided)', () => {
    const { container } = render(<ImageCaption src="/test-image.png" />);

    const image = container.querySelectorAll('img').length;
    const altText = [...container.querySelectorAll('img')].map(
      ({ alt }) => alt
    );
    const caption = screen.queryByText(/this is an image/i);

    expect(image).toEqual(1);
    expect(altText).toEqual(['']);
    expect(caption).toBeNull();
  });
});
