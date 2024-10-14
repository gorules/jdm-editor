import { VariableType } from '../dist/zen_engine_wasm.js';

export function createVariableType(variable) {
  if (!variable) {
    return VariableType.fromJson('Any');
  }

  if (variable instanceof VariableType) {
    return variable;
  }

  try {
    return VariableType.fromJson(variable);
  } catch {
    return new VariableType(variable);
  }
}
