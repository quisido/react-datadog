import type ReplicaUserConfiguration from '../types/replica-user-configuration';

export default interface ReadonlyRumInitConfiguration {
  readonly allowedTracingOrigins?: readonly (RegExp | string)[] | undefined;
  readonly enableExperimentalFeatures?: readonly string[] | undefined;
  readonly replica?: ReplicaUserConfiguration | undefined;
}
