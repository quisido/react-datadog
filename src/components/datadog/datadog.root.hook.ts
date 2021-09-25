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
  readonly sessionReplayRecording?: boolean | undefined;
}

export default function useDataDog({
  actionNameAttribute,
  allowedTracingOrigins,
  applicationId,
  beforeSend,
  clientToken,
  defaultPrivacyLevel,
  enableExperimentalFeatures,
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
    const getAllowedTracingOrigins = (): (RegExp | string)[] | undefined => {
      if (typeof allowedTracingOrigins === 'undefined') {
        return;
      }
      return [...allowedTracingOrigins];
    };

    const getEnableExperimentalFeatures = (): string[] | undefined => {
      if (typeof enableExperimentalFeatures === 'undefined') {
        return;
      }
      return [...enableExperimentalFeatures];
    };

    datadogRum.init({
      actionNameAttribute,
      allowedTracingOrigins: getAllowedTracingOrigins(),
      applicationId,
      beforeSend,
      clientToken,
      defaultPrivacyLevel,
      enableExperimentalFeatures: getEnableExperimentalFeatures(),
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
    if (!sessionReplayRecording) {
      return;
    }

    datadogRum.startSessionReplayRecording();
    return (): void => {
      datadogRum.stopSessionReplayRecording();
    };
  }, [sessionReplayRecording]);
}
