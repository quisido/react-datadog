import type { ReactElement, ReactNode } from 'react';
import DatadogPrivacy from '../../components/datadog-privacy';

interface Props {
  readonly children: ReactNode;
}

export default function DatadogHidden({ children }: Props): ReactElement {
  return <DatadogPrivacy level="hidden">{children}</DatadogPrivacy>;
}

export function DataDogHidden({ children }: Props): ReactElement {
  console.warn(
    'The `DataDogHidden` component is deprecated. Please use `DatadogHidden` instead.',
  );
  return <DatadogHidden>{children}</DatadogHidden>;
}
