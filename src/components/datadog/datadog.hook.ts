import type { RumInitConfiguration } from '@datadog/browser-rum';
import { datadogRum } from '@datadog/browser-rum';
import { useEffect } from 'react';
import DEFAULT_REPLAY_SAMPLE_RATE from '../../constants/default-replay-sample-rate';
import DEFAULT_SAMPLE_RATE from '../../constants/default-sample-rate';
import type ReadonlyRumInitConfiguration from '../../types/readonly-rum-init-configuration';
import type User from '../../types/user';
import useUser from './hooks/use-user';

interface Props
  extends Omit<
      RumInitConfiguration,
      | 'allowedTracingOrigins'
      | 'enableExperimentalFeatures'
      | 'proxyHost'
      | 'replica'
    >,
    ReadonlyRumInitConfiguration {
  readonly enabled?: boolean | undefined;
  readonly sessionReplayRecording?: boolean | undefined;
  readonly user?: User | undefined;
}

const FIRST_ITEM = 0;

export default function useDatadog({
  actionNameAttribute,
  allowedTracingOrigins,
  applicationId,
  beforeSend,
  clientToken,
  defaultPrivacyLevel,
  enableExperimentalFeatures,
  enabled = true,
  env,
  internalMonitoringApiKey,
  proxyUrl,
  replaySampleRate = DEFAULT_REPLAY_SAMPLE_RATE,
  replica,
  sampleRate = DEFAULT_SAMPLE_RATE,
  service,
  sessionReplayRecording = true,
  silentMultipleInit,
  site = 'datadoghq.com',
  trackInteractions = true,
  trackSessionAcrossSubdomains,
  trackViewsManually,
  useCrossSiteSessionCookie,
  useSecureSessionCookie,
  user,
  version,
}: Readonly<Props>): void {
  useEffect((): void => {
    if (!enabled) {
      return;
    }

    datadogRum.init({
      actionNameAttribute,
      allowedTracingOrigins: allowedTracingOrigins?.slice(FIRST_ITEM),
      applicationId,
      beforeSend,
      clientToken,
      defaultPrivacyLevel,
      enableExperimentalFeatures: enableExperimentalFeatures?.slice(FIRST_ITEM),
      env,
      internalMonitoringApiKey,
      proxyUrl,
      replaySampleRate,
      replica,
      sampleRate,
      service,
      silentMultipleInit,
      site,
      trackInteractions,
      trackSessionAcrossSubdomains,
      trackViewsManually,
      useCrossSiteSessionCookie,
      useSecureSessionCookie,
      version,
    });
  }, [
    actionNameAttribute,
    allowedTracingOrigins,
    applicationId,
    beforeSend,
    clientToken,
    defaultPrivacyLevel,
    enableExperimentalFeatures,
    enabled,
    env,
    internalMonitoringApiKey,
    proxyUrl,
    replaySampleRate,
    replica,
    sampleRate,
    service,
    silentMultipleInit,
    site,
    trackInteractions,
    trackSessionAcrossSubdomains,
    trackViewsManually,
    useCrossSiteSessionCookie,
    useSecureSessionCookie,
    version,
  ]);

  useEffect((): VoidFunction | undefined => {
    if (!enabled || !sessionReplayRecording) {
      return;
    }

    datadogRum.startSessionReplayRecording();
    return (): void => {
      datadogRum.stopSessionReplayRecording();
    };
  }, [enabled, sessionReplayRecording]);

  useUser(user);
}
