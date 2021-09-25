const TEST_INIT = jest.fn();
const TEST_START_SESSION_REPLAY_RECORDING = jest.fn();
const TEST_STOP_SESSION_REPLAY_RECORDING = jest.fn();

jest.mock('@datadog/browser-rum', () => ({
  datadogRum: {
    init: TEST_INIT,
    startSessionReplayRecording: TEST_START_SESSION_REPLAY_RECORDING,
    stopSessionReplayRecording: TEST_STOP_SESSION_REPLAY_RECORDING,
  },
}));

import { renderHook } from '@testing-library/react-hooks';
import DEFAULT_SAMPLE_RATE from '../../constants/default-sample-rate';
import useDataDog from './datadog.root.hook';

const ONCE = 1;

describe('useDataDog', (): void => {
  it('should call init', (): void => {
    renderHook(useDataDog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
      },
    });
    expect(TEST_INIT).toHaveBeenCalledTimes(ONCE);
    expect(TEST_INIT).toHaveBeenLastCalledWith({
      actionNameAttribute: undefined,
      allowedTracingOrigins: undefined,
      applicationId: 'test-application-id',
      beforeSend: undefined,
      clientToken: 'test-client-token',
      defaultPrivacyLevel: undefined,
      enableExperimentalFeatures: undefined,
      env: undefined,
      intakeApiVersion: undefined,
      internalMonitoringApiKey: undefined,
      proxyUrl: undefined,
      replaySampleRate: undefined,
      replica: undefined,
      silentMultipleInit: undefined,
      sampleRate: DEFAULT_SAMPLE_RATE,
      service: undefined,
      site: 'datadoghq.com',
      trackInteractions: true,
      trackSessionAcrossSubdomains: undefined,
      trackViewsManually: undefined,
      useAlternateIntakeDomains: undefined,
      useCrossSiteSessionCookie: undefined,
      useSecureSessionCookie: undefined,
      version: undefined,
    });
  });

  it('should allow custom mutable values', (): void => {
    const TEST_SITE = 'charlesstover.com';

    renderHook(useDataDog, {
      initialProps: {
        allowedTracingOrigins: Object.freeze([]),
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        enableExperimentalFeatures: Object.freeze([]),
        sampleRate: 1,
        site: TEST_SITE,
        trackInteractions: false,
      },
    });

    expect(TEST_INIT).toHaveBeenCalledTimes(ONCE);
    expect(TEST_INIT).toHaveBeenLastCalledWith({
      actionNameAttribute: undefined,
      allowedTracingOrigins: [],
      applicationId: 'test-application-id',
      beforeSend: undefined,
      clientToken: 'test-client-token',
      defaultPrivacyLevel: undefined,
      enableExperimentalFeatures: [],
      env: undefined,
      intakeApiVersion: undefined,
      internalMonitoringApiKey: undefined,
      proxyUrl: undefined,
      replaySampleRate: undefined,
      replica: undefined,
      silentMultipleInit: undefined,
      sampleRate: 1,
      service: undefined,
      site: TEST_SITE,
      trackInteractions: false,
      trackSessionAcrossSubdomains: undefined,
      trackViewsManually: undefined,
      useAlternateIntakeDomains: undefined,
      useCrossSiteSessionCookie: undefined,
      useSecureSessionCookie: undefined,
      version: undefined,
    });
  });

  it('should start session replay recording on mount', (): void => {
    renderHook(useDataDog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
      },
    });
    expect(TEST_START_SESSION_REPLAY_RECORDING).toHaveBeenCalledTimes(ONCE);
    expect(TEST_START_SESSION_REPLAY_RECORDING).toHaveBeenLastCalledWith();
  });

  it('should not start session replay recording when `sessionReplayRecording` is false', (): void => {
    renderHook(useDataDog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        sessionReplayRecording: false,
      },
    });
    expect(TEST_START_SESSION_REPLAY_RECORDING).not.toHaveBeenCalled();
  });

  it('should stop session replay recording on unmount', (): void => {
    const { unmount } = renderHook(useDataDog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
      },
    });
    unmount();
    expect(TEST_STOP_SESSION_REPLAY_RECORDING).toHaveBeenCalledTimes(ONCE);
    expect(TEST_STOP_SESSION_REPLAY_RECORDING).toHaveBeenLastCalledWith();
  });
});
