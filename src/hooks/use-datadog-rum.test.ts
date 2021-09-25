import { datadogRum } from '@datadog/browser-rum';
import { renderHook } from '@testing-library/react-hooks';
import { useDataDogRum } from '..';

describe('useDataDogRum', (): void => {
  it('should return DataDog RUM object', (): void => {
    const { result } = renderHook(useDataDogRum);
    expect(result.current).toBe(datadogRum);
  });
});
