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

export const useStorageState = <S>(
  key: string,
  defaultValue?: S,
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] => {
  const [state, setState] = useState(() => {
    try {
      const storageItem = localStorage.getItem(key);
      if (!storageItem) {
        return defaultValue;
      }

      return JSON.parse(storageItem);
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
