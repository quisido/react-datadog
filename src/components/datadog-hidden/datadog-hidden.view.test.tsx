import { render } from '@testing-library/react';
import { DataDogHidden, DatadogHidden } from '../..';

const ONCE = 1;
const TEST_CONSOLE_WARN = jest.fn();

describe('DatadogHidden ', (): void => {
  beforeEach((): void => {
    console.warn = TEST_CONSOLE_WARN;
  });

  it('should render a hidden privacy class name and data attribute', (): void => {
    const { getByText } = render(<DatadogHidden>children</DatadogHidden>);

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('hidden');
    expect(element.classList).toContain('dd-privacy-hidden');
  });

  it('should warn when using the deprecated variant', (): void => {
    expect(TEST_CONSOLE_WARN).not.toHaveBeenCalled();

    render(<DataDogHidden>children</DataDogHidden>);

    expect(TEST_CONSOLE_WARN).toHaveBeenCalledTimes(ONCE);
    expect(TEST_CONSOLE_WARN).toHaveBeenLastCalledWith(
      'The `DataDogHidden` component is deprecated. Please use `DatadogHidden` instead.',
    );
  });
});
