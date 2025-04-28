import { getCompletions as getCompletionsWasm } from '@gorules/zen-engine-wasm';

import { isWasmAvailable } from '../../../helpers/wasm';

type Completion = {
  kind: string;
  label: string;
  detail: string;
  info: string;
  boost?: number;
};

let completions: Completion[] = [];

export const getCompletions = () => {
  if (!isWasmAvailable() || completions.length > 0) {
    return completions;
  }

  completions = getCompletionsWasm();
  return completions;
};
