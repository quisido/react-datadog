import { datadogRum } from '@datadog/browser-rum';
import { useEffect } from 'react';
import type User from '../../../types/user';
import filterByUndefined from '../utils/filter-by-undefined';
import parseStringifiedObject from '../utils/parse-stringified-object';

const DEFAULT_USER: User = {};

export default function useUser(user: Readonly<User> | undefined): void {
  const { email, id, name, ...restUser } = user ?? DEFAULT_USER;

  // Stringify remaining user properties so that `useEffect`'s memoization array
  //   can check for deep equality.
  const restUserStr: string = JSON.stringify(restUser);
  useEffect((): VoidFunction | undefined => {
    // We must use `object` as a return type here instead of
    //   `Record<string, unknown>`, because the parsed value does not have an
    //   index signature.
    // eslint-disable-next-line @typescript-eslint/ban-types
    const restUserParsed: object = parseStringifiedObject(restUserStr);
    const newUser: User = {
      ...restUserParsed,
      email,
      id,
      name,
    };

    if (Object.values(newUser).every(filterByUndefined)) {
      return;
    }

    datadogRum.setUser(newUser);
    return (): void => {
      datadogRum.removeUser();
    };
  }, [email, id, name, restUserStr]);
}
