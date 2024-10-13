import type * as ZenEngineWasm from '@gorules/zen-engine-wasm';

const customWindow = window as any as { zenWasm: typeof ZenEngineWasm };

const {
  default: defaultExport,
  VariableType,
  createVariableType,
  evaluateExpression,
  evaluateUnaryExpression,
  validateUnaryExpression,
  validateExpression,
  initSync,
  renderTemplate,
} = customWindow?.zenWasm ?? {};

export {
  VariableType,
  createVariableType,
  evaluateExpression,
  evaluateUnaryExpression,
  validateUnaryExpression,
  validateExpression,
  initSync,
  renderTemplate,
};

export default defaultExport;
