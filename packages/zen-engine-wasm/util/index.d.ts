import type { VariableType, VariableTypeJson } from '../dist/zen_engine_wasm';

export type { SimpleOperator, SimpleValue, ExpressionBuilderData, StandardExpressionData } from './expression-builder';

export function createVariableType(data: VariableTypeJson | VariableType | unknown): VariableType;
