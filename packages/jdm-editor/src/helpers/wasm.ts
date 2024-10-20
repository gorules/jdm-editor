import { isReady } from '@gorules/zen-engine-wasm';

let wasmAvailable = false;

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
