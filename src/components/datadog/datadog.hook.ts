import type { RumInitConfiguration } from '@datadog/browser-rum';
import { datadogRum } from '@datadog/browser-rum';
import { useEffect } from 'react';
import DEFAULT_SAMPLE_RATE from '../../constants/default-sample-rate';
import type ReadonlyRumInitConfiguration from '../../types/readonly-rum-init-configuration';

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
}

const FIRST_ITEM = 0;

export default function useDataDog({
  actionNameAttribute,
  allowedTracingOrigins,
  applicationId,
  beforeSend,
  clientToken,
  defaultPrivacyLevel,
  enableExperimentalFeatures,
  enabled = true,
  env,
  intakeApiVersion,
  internalMonitoringApiKey,
  proxyUrl,
  replaySampleRate,
  replica,
  sampleRate = DEFAULT_SAMPLE_RATE,
  service,
  sessionReplayRecording = true,
  silentMultipleInit,
  site = 'datadoghq.com',
  trackInteractions = true,
  trackSessionAcrossSubdomains,
  trackViewsManually,
  useAlternateIntakeDomains,
  useCrossSiteSessionCookie,
  useSecureSessionCookie,
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
      intakeApiVersion,
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
      useAlternateIntakeDomains,
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
    intakeApiVersion,
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
    useAlternateIntakeDomains,
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
}
