import type { ReactElement, ReactNode } from 'react';
import DatadogPrivacy from '../../components/datadog-privacy';

interface Props {
  readonly children: ReactNode;
}

export default function DatadogAllow({ children }: Props): ReactElement {
  return <DatadogPrivacy level="allow">{children}</DatadogPrivacy>;
}

export function DataDogAllow({ children }: Props): ReactElement {
  console.warn(
    'The `DataDogAllow` component is deprecated. Please use `DatadogAllow` instead.',
  );
  return <DatadogAllow>{children}</DatadogAllow>;
}
