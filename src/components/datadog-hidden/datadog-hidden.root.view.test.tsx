import { render } from '@testing-library/react';
import { DataDogHidden } from '../..';

describe('DataDogHidden ', (): void => {
  it('should render a hidden privacy class name and data attribute', (): void => {
    const { getByText } = render(<DataDogHidden>children</DataDogHidden>);

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('hidden');
    expect(element.classList).toContain('dd-privacy-hidden');
  });
});
