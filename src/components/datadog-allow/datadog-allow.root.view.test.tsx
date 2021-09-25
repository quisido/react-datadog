import { render } from '@testing-library/react';
import { DataDogAllow } from '../..';

describe('DataDogAllow ', (): void => {
  it('should render an allow privacy class name and data attribute', (): void => {
    const { getByText } = render(<DataDogAllow>children</DataDogAllow>);

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('allow');
    expect(element.classList).toContain('dd-privacy-allow');
  });
});
