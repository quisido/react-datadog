import { datadogRum } from '@datadog/browser-rum';
import { renderHook } from '@testing-library/react-hooks';
import { useDataDogRum, useDatadogRum } from '..';

const ONCE = 1;
const TEST_CONSOLE_WARN = jest.fn();

describe('useDataDogRum', (): void => {
  beforeEach((): void => {
    console.warn = TEST_CONSOLE_WARN;
  });

  it('should log a deprecation warning', (): void => {
    expect(TEST_CONSOLE_WARN).not.toHaveBeenCalled();
    renderHook(useDataDogRum);
    expect(TEST_CONSOLE_WARN).toHaveBeenCalledTimes(ONCE);
    expect(TEST_CONSOLE_WARN).toHaveBeenLastCalledWith(
      '`useDataDogRum` is deprecated. Please use `useDatadogRum` instead.',
    );
  });

  it('should return DataDog RUM object', (): void => {
    const { result } = renderHook(useDataDogRum);
    expect(result.current).toBe(datadogRum);
  });
});

describe('useDatadogRum', (): void => {
  it('should return DataDog RUM object', (): void => {
    const { result } = renderHook(useDatadogRum);
    expect(result.current).toBe(datadogRum);
  });
});
