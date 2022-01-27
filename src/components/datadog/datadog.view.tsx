import type { RumInitConfiguration } from '@datadog/browser-rum';
import type { ReactElement, ReactNode } from 'react';
import type ReadonlyRumInitConfiguration from '../../types/readonly-rum-init-configuration';
import type User from '../../types/user';
import useDatadog from './datadog.hook';

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
  readonly enabled?: boolean | undefined;
  readonly sessionReplayRecording?: boolean | undefined;
  readonly user?: User | undefined;
}

export default function Datadog({
  actionNameAttribute,
  allowedTracingOrigins,
  applicationId,
  beforeSend,
  children,
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
  sessionReplayRecording,
  silentMultipleInit,
  site,
  trackInteractions,
  trackSessionAcrossSubdomains,
  trackViewsManually,
  useCrossSiteSessionCookie,
  useSecureSessionCookie,
  user,
  version,
}: Readonly<Props>): ReactElement {
  useDatadog({
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
    sessionReplayRecording,
    silentMultipleInit,
    site,
    trackInteractions,
    trackSessionAcrossSubdomains,
    trackViewsManually,
    useCrossSiteSessionCookie,
    useSecureSessionCookie,
    user,
    version,
  });

  return <>{children}</>;
}
