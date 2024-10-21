import { VariableType } from '@gorules/zen-engine-wasm';

import { NodeTypeKind, useDecisionGraphState } from '../components';
import { isWasmAvailable } from './wasm';

type NodeTypeParams = {
  attachGlobals?: boolean;
};

export const useNodeType = (id: string, { attachGlobals = true }: NodeTypeParams = {}) =>
  useDecisionGraphState(({ nodeTypes, globalType }) => {
    if (!isWasmAvailable()) {
      return undefined;
    }

    const nodeType =
      nodeTypes[id]?.[NodeTypeKind.Input] ??
      nodeTypes[id]?.[NodeTypeKind.InferredInput] ??
      VariableType.fromJson({ Object: {} });
    if (!attachGlobals) {
      return nodeType;
    }

    Object.entries(globalType).forEach(([k, v]) => nodeType.set(k, v));
    return nodeType;
  });
