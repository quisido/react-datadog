import { render } from '@testing-library/react';
import DataDogPrivacy from '.';

describe('DataDogPrivacy', (): void => {
  it('should render a privacy class name and data attribute', (): void => {
    const { getByText } = render(
      <DataDogPrivacy level="allow">children</DataDogPrivacy>,
    );

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('allow');
    expect(element.classList).toContain('dd-privacy-allow');
  });
});
