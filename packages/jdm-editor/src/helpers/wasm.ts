import * as ZenEngineWasm from '@gorules/zen-engine-wasm';

export const isWasmAvailable = () => {
  return !!ZenEngineWasm?.default;
};
