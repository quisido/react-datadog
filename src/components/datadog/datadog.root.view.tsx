import type { RumInitConfiguration } from '@datadog/browser-rum';
import type { ReactElement, ReactNode } from 'react';
import type ReadonlyRumInitConfiguration from '../../types/readonly-rum-init-configuration';
import useDataDog from './datadog.root.hook';

interface Props
  extends Omit<
      RumInitConfiguration,
      | 'allowedTracingOrigins'
      | 'enableExperimentalFeatures'
      | 'proxyHost'
      | 'replica'
    >,
    ReadonlyRumInitConfiguration {
  readonly children: ReactNode;
  readonly sessionReplayRecording?: boolean | undefined;
}

export default function DataDog({
  actionNameAttribute,
  allowedTracingOrigins,
  applicationId,
  beforeSend,
  children,
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
  sessionReplayRecording,
  silentMultipleInit,
  site,
  trackInteractions,
  trackSessionAcrossSubdomains,
  trackViewsManually,
  useAlternateIntakeDomains,
  useCrossSiteSessionCookie,
  useSecureSessionCookie,
  version,
}: Readonly<Props>): ReactElement {
  useDataDog({
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
    sessionReplayRecording,
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

  return <>{children}</>;
}
