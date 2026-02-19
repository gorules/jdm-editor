import initWasm, { isReady } from '@gorules/zen-engine-wasm';
import { useEffect, useState } from 'react';

let wasmAvailable = false;
let wasmInitPromise: Promise<void> | null = null;
const wasmListeners = new Set<() => void>();

export const isWasmAvailable = () => {
  if (wasmAvailable) {
    return true;
  }

  try {
    if (isReady()) {
      wasmAvailable = true;
      return wasmAvailable;
    }
  } catch {
    return false;
  }
};

export const ensureWasmLoaded = (): Promise<void> => {
  if (isWasmAvailable()) {
    return Promise.resolve();
  }

  if (!wasmInitPromise) {
    wasmInitPromise = initWasm()
      .then(() => {
        wasmAvailable = true;
        wasmListeners.forEach((fn) => fn());
        wasmListeners.clear();
      })
      .catch(() => {
        wasmInitPromise = null;
      });
  }

  return wasmInitPromise;
};

export const useWasmReady = (): boolean => {
  const [ready, setReady] = useState(() => !!isWasmAvailable());

  useEffect(() => {
    if (isWasmAvailable()) {
      setReady(true);
      return;
    }

    const listener = () => setReady(true);
    wasmListeners.add(listener);
    ensureWasmLoaded();

    return () => {
      wasmListeners.delete(listener);
    };
  }, []);

  return ready;
};
