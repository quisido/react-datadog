import { render } from '@testing-library/react';
import { DataDogAllow, DatadogAllow } from '../..';

const ONCE = 1;
const TEST_CONSOLE_WARN = jest.fn();

describe('DatadogAllow ', (): void => {
  beforeEach((): void => {
    console.warn = TEST_CONSOLE_WARN;
  });

  it('should render an allow privacy class name and data attribute', (): void => {
    const { getByText } = render(<DatadogAllow>children</DatadogAllow>);

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('allow');
    expect(element.classList).toContain('dd-privacy-allow');
  });

  it('should warn when using the deprecated variant', (): void => {
    expect(TEST_CONSOLE_WARN).not.toHaveBeenCalled();

    render(<DataDogAllow>children</DataDogAllow>);

    expect(TEST_CONSOLE_WARN).toHaveBeenCalledTimes(ONCE);
    expect(TEST_CONSOLE_WARN).toHaveBeenLastCalledWith(
      'The `DataDogAllow` component is deprecated. Please use `DatadogAllow` instead.',
    );
  });
});
