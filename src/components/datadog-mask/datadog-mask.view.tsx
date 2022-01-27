import type { ReactElement, ReactNode } from 'react';
import DatadogPrivacy from '../../components/datadog-privacy';

interface Props {
  readonly children: ReactNode;
}

export default function DatadogMask({ children }: Props): ReactElement {
  return <DatadogPrivacy level="mask">{children}</DatadogPrivacy>;
}

export function DataDogMask({ children }: Props): ReactElement {
  console.warn(
    'The `DataDogMask` component is deprecated. Please use `DatadogMask` instead.',
  );
  return <DatadogMask>{children}</DatadogMask>;
}
