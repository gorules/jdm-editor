import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

const memoryCache: Record<string, unknown> = {};

export const usePersistentState = <S>(
  key: string,
  defaultValue?: S,
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] => {
  const [state, setState] = useState(() => (memoryCache?.[key] as S) ?? defaultValue);

  useEffect(() => {
    memoryCache[key] = state;
  }, [state]);

  return [state, setState];
};
