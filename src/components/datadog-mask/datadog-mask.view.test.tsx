import { render } from '@testing-library/react';
import { DataDogMask, DatadogMask } from '../..';

const ONCE = 1;
const TEST_CONSOLE_WARN = jest.fn();

describe('DatadogMask ', (): void => {
  beforeEach((): void => {
    console.warn = TEST_CONSOLE_WARN;
  });

  it('should render a mask privacy class name and data attribute', (): void => {
    const { getByText } = render(<DatadogMask>children</DatadogMask>);

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('mask');
    expect(element.classList).toContain('dd-privacy-mask');
  });

  it('should warn when using the deprecated variant', (): void => {
    expect(TEST_CONSOLE_WARN).not.toHaveBeenCalled();

    render(<DataDogMask>children</DataDogMask>);

    expect(TEST_CONSOLE_WARN).toHaveBeenCalledTimes(ONCE);
    expect(TEST_CONSOLE_WARN).toHaveBeenLastCalledWith(
      'The `DataDogMask` component is deprecated. Please use `DatadogMask` instead.',
    );
  });
});
