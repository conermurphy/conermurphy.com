import { render, screen } from '@testing-library/react';
import ComponentWrapper from './ComponentWrapper';

describe('ComponentWrapper', () => {
  it('Should render all items when provided', () => {
    render(
      <ComponentWrapper data={{ title: 'Title', subTitle: 'SubTitle' }}>
        <p>Child component</p>
      </ComponentWrapper>
    );

    const title = screen.getByRole('heading', { level: 2 });
    const subtitle = screen.getByText(/subtitle/i);
    const child = screen.getByText(/child component/i);

    expect(title).toBeVisible();
    expect(subtitle).toBeVisible();
    expect(child).toBeVisible();
  });
});
