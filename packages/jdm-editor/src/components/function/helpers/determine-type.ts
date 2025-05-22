import type { VariableType, VariableTypeJson } from '@gorules/zen-engine-wasm';
import { P, match } from 'ts-pattern';

export const variableTypeToTypescript = (variableType: VariableType) => {
  const json = variableType.toJson();
  return vtJsonToTypescript(json);
};

const vtJsonToTypescript = (vtj: VariableTypeJson): string =>
  match(vtj)
    .with('String', () => 'string')
    .with('Bool', () => 'boolean')
    .with('Number', () => 'number')
    .with('Null', () => 'null')
    .with('Any', () => 'any')
    .with({ Object: P.select() }, (obj) => {
      const innerObject = Object.entries(obj)
        .map(([key, value]) => [key, vtJsonToTypescript(value)].join(':'))
        .join(',');

      return `{${innerObject}}`;
    })
    .with({ Array: P.select() }, (arr) => `${vtJsonToTypescript(arr)}[]`)
    .with({ Const: P.select() }, (c) => `"${c}"`)
    .with({ Enum: [P._, P.select()] }, (en) => en.map((e) => `"${e}"`).join(' | '))
    .exhaustive();
