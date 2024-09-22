import type { Completion } from '@codemirror/autocomplete';
import { StateEffect, StateField } from '@codemirror/state';
import type { VariableType } from '@gorules/zen-engine-wasm';
import { P, match } from 'ts-pattern';

import { applyCompletion } from './zen';

type ZenType = {
  error: string | null;
  kind: any;
  nodeKind: string;
  span: [number, number];
};

type TypeField = {
  root?: VariableType;
  source?: string;
  types: ZenType[];
  rootKind: any;
  expressionType: 'standard' | 'unary';
};

const defaultTypeField: TypeField = { types: [], rootKind: 'Any', expressionType: 'standard' };

export const updateVariableTypeEffect = StateEffect.define<VariableType | null>();
export const updateExpressionTypeEffect = StateEffect.define<'standard' | 'unary'>();

export const typeField = StateField.define<TypeField>({
  create() {
    return defaultTypeField;
  },
  update(value, transaction) {
    const updateExpressionType = transaction.effects.find((e) => e.is(updateExpressionTypeEffect));
    const expressionType: TypeField['expressionType'] = match(updateExpressionType)
      .with({ value: P.string }, (e) => e.value)
      .otherwise(() => value.expressionType);

    const updateVariableType = transaction.effects.find((e) => e.is(updateVariableTypeEffect));
    const variableType: VariableType | null = match(updateVariableType)
      .with({ value: P._ }, (e) => e.value)
      .otherwise(() => value.root || null);
    if (!variableType) {
      return { ...value, expressionType };
    }

    // Triggered without effect and no changes, bail
    if (!transaction.docChanged && !updateExpressionType && !updateVariableType) {
      return { ...value, expressionType };
    }

    const source = transaction.newDoc.toString();
    return {
      source,
      expressionType,
      root: variableType,
      rootKind: variableType.toJson(),
      types: match(expressionType)
        .with('unary', () => variableType.typeCheck(source))
        .otherwise(() => variableType.typeCheck(source)),
    } satisfies TypeField;
  },
  compare(a, b) {
    return a.source === b.source && a.expressionType === b.expressionType && a.root === b.root;
  },
});

type BuildTypeCompletionParams = {
  kind: any;
  type?: string;
};

export const buildTypeCompletion = ({ kind, type = 'property' }: BuildTypeCompletionParams): Completion[] => {
  return match(kind)
    .with({ Object: P._ }, (t) =>
      Object.entries(t.Object as object).map(([k, v]) => ({
        label: k,
        type,
        boost: 10,
        detail: typeToString(v),
        apply: applyCompletion,
      })),
    )
    .otherwise(() => []);
};

const typeToString = (type: unknown): string =>
  match(type)
    .with(P.string, (s) => s.toLowerCase())
    .with({ Object: P._ }, () => 'object')
    .with({ Array: P._ }, (t) => `${typeToString(t.Array)}[]`)
    .otherwise(() => 'unknown');
