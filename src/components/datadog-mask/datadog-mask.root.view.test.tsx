import { render } from '@testing-library/react';
import { DataDogMask } from '../..';

describe('DataDogMask ', (): void => {
  it('should render a mask privacy class name and data attribute', (): void => {
    const { getByText } = render(<DataDogMask>children</DataDogMask>);

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('mask');
    expect(element.classList).toContain('dd-privacy-mask');
  });
});
