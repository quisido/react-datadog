const TEST_INIT = jest.fn();
const TEST_REMOVE_USER = jest.fn();
const TEST_SET_USER = jest.fn();
const TEST_START_SESSION_REPLAY_RECORDING = jest.fn();
const TEST_STOP_SESSION_REPLAY_RECORDING = jest.fn();

jest.mock('@datadog/browser-rum', () => ({
  datadogRum: {
    init: TEST_INIT,
    removeUser: TEST_REMOVE_USER,
    setUser: TEST_SET_USER,
    startSessionReplayRecording: TEST_START_SESSION_REPLAY_RECORDING,
    stopSessionReplayRecording: TEST_STOP_SESSION_REPLAY_RECORDING,
  },
}));

import { renderHook } from '@testing-library/react-hooks';
import DEFAULT_REPLAY_SAMPLE_RATE from '../../constants/default-replay-sample-rate';
import DEFAULT_SAMPLE_RATE from '../../constants/default-sample-rate';
import type User from '../../types/user';
import useDatadog from './datadog.hook';

const ONCE = 1;

const TEST_USER: User = {
  id: 'test-id',
  email: 'foo@bar.com',
  name: 'test-name',
};

describe('useDatadog', (): void => {
  it('should call init', (): void => {
    renderHook(useDatadog, {
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
      replaySampleRate: DEFAULT_REPLAY_SAMPLE_RATE,
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

  it('should not call init if `enabled` is false', (): void => {
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        enabled: false,
      },
    });
    expect(TEST_INIT).not.toHaveBeenCalled();
  });

  it('should allow custom mutable values', (): void => {
    const TEST_SITE = 'charlesstover.com';

    renderHook(useDatadog, {
      initialProps: {
        allowedTracingOrigins: Object.freeze([]),
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        enableExperimentalFeatures: Object.freeze([]),
        replaySampleRate: 1,
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
      replaySampleRate: 1,
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
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
      },
    });
    expect(TEST_START_SESSION_REPLAY_RECORDING).toHaveBeenCalledTimes(ONCE);
    expect(TEST_START_SESSION_REPLAY_RECORDING).toHaveBeenLastCalledWith();
  });

  it('should not start session replay recording when `enabled` is false', (): void => {
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        enabled: false,
      },
    });
    expect(TEST_START_SESSION_REPLAY_RECORDING).not.toHaveBeenCalled();
  });

  it('should not start session replay recording when `sessionReplayRecording` is false', (): void => {
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        sessionReplayRecording: false,
      },
    });
    expect(TEST_START_SESSION_REPLAY_RECORDING).not.toHaveBeenCalled();
  });

  it('should stop session replay recording on unmount', (): void => {
    const { unmount } = renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
      },
    });
    unmount();
    expect(TEST_STOP_SESSION_REPLAY_RECORDING).toHaveBeenCalledTimes(ONCE);
    expect(TEST_STOP_SESSION_REPLAY_RECORDING).toHaveBeenLastCalledWith();
  });

  it('should not set the user when not provided', (): void => {
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
      },
    });

    expect(TEST_SET_USER).not.toHaveBeenCalled();
  });

  it('should set the user when provided', (): void => {
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        user: TEST_USER,
      },
    });

    expect(TEST_SET_USER).toHaveBeenCalledTimes(ONCE);
    expect(TEST_SET_USER).toHaveBeenLastCalledWith(TEST_USER);
  });

  it('should remove the user on unmount', (): void => {
    const { unmount } = renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        user: TEST_USER,
      },
    });

    unmount();

    expect(TEST_REMOVE_USER).toHaveBeenCalledTimes(ONCE);
  });
});
