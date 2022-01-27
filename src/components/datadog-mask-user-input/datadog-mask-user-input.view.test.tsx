import { render } from '@testing-library/react';
import { DataDogMaskUserInput, DatadogMaskUserInput } from '../..';

const ONCE = 1;
const TEST_CONSOLE_WARN = jest.fn();

describe('DatadogMaskUserInput ', (): void => {
  beforeEach((): void => {
    console.warn = TEST_CONSOLE_WARN;
  });

  it('should render a mask-user-input privacy class name and data attribute', (): void => {
    const { getByText } = render(
      <DatadogMaskUserInput>children</DatadogMaskUserInput>,
    );

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('mask-user-input');
    expect(element.classList).toContain('dd-privacy-mask-user-input');
  });

  it('should warn when using the deprecated variant', (): void => {
    expect(TEST_CONSOLE_WARN).not.toHaveBeenCalled();

    render(<DataDogMaskUserInput>children</DataDogMaskUserInput>);

    expect(TEST_CONSOLE_WARN).toHaveBeenCalledTimes(ONCE);
    expect(TEST_CONSOLE_WARN).toHaveBeenLastCalledWith(
      'The `DataDogMaskUserInput` component is deprecated. Please use `DatadogMaskUserInput` instead.',
    );
  });
});
