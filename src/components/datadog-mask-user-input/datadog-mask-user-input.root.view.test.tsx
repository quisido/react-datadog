import { render } from '@testing-library/react';
import { DataDogMaskUserInput } from '../..';

describe('DataDogMask ', (): void => {
  it('should render a mask-user-input privacy class name and data attribute', (): void => {
    const { getByText } = render(
      <DataDogMaskUserInput>children</DataDogMaskUserInput>,
    );

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('mask-user-input');
    expect(element.classList).toContain('dd-privacy-mask-user-input');
  });
});
