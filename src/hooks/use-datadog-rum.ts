import { datadogRum } from '@datadog/browser-rum';

/*
`useDatadogRum` does not need to be a hook, but it allows us the extensibility
  of using multiple instances of DatadogRum in the future, where each instance
  can be configured by the `Datadog` component.
*/

export function useDatadogRum(): typeof datadogRum {
  return datadogRum;
}

export function useDataDogRum(): typeof datadogRum {
  console.warn(
    '`useDataDogRum` is deprecated. Please use `useDatadogRum` instead.',
  );
  return useDatadogRum();
}
