import type { Completion } from '@codemirror/autocomplete';
import { StateEffect, StateField } from '@codemirror/state';
import type { VariableType } from '@gorules/zen-engine-wasm';
import { P, match } from 'ts-pattern';

import { applyCompletion } from './zen';

export type ZenType = {
  error: string | null;
  kind: any;
  nodeKind: string;
  span: [number, number];
};

type TypeField = {
  root?: VariableType;
  expectedVariableType?: VariableType;
  source?: string;
  types: ZenType[];
  rootKind: any;
  expressionType: 'standard' | 'unary';
  strict: boolean;
};

const defaultTypeField: TypeField = { types: [], rootKind: 'Any', expressionType: 'standard', strict: false };

export const updateVariableTypeEffect = StateEffect.define<VariableType | null>();
export const updateExpressionTypeEffect = StateEffect.define<'standard' | 'unary'>();
export const updateExpectedVariableTypeEffect = StateEffect.define<VariableType | null>();
export const updateStrictModeEffect = StateEffect.define<boolean>();

export const typeField = StateField.define<TypeField>({
  create() {
    return defaultTypeField;
  },
  update(value, transaction) {
    try {
      const updateExpressionType = transaction.effects.find((e) => e.is(updateExpressionTypeEffect));
      const expressionType: TypeField['expressionType'] = match(updateExpressionType)
        .with({ value: P.string }, (e) => e.value)
        .otherwise(() => value.expressionType);

      const updateExpectedVariableType = transaction.effects.find((e) => e.is(updateExpectedVariableTypeEffect));
      const expectedVariableType = match(updateExpectedVariableType)
        .with({ value: P.nonNullable }, ({ value }) => value)
        .with({ value: P.nullish }, () => undefined)
        .otherwise(() => value.expectedVariableType);

      const updateVariableType = transaction.effects.find((e) => e.is(updateVariableTypeEffect));
      const variableType: VariableType | null = match(updateVariableType)
        .with({ value: P._ }, (e) => e.value)
        .otherwise(() => value.root || null);

      const updateStrictMode = transaction.effects.find((e) => e.is(updateStrictModeEffect));
      const strict: boolean = match(updateStrictMode)
        .with({ value: P.boolean }, ({ value }) => value)
        .otherwise(() => value.strict);

      if (!variableType) {
        return { ...value, expressionType, expectedVariableType, strict };
      }

      // Triggered without effect and no changes, bail
      if (!transaction.docChanged && !updateExpressionType && !updateVariableType) {
        return { ...value, expressionType, expectedVariableType, strict };
      }

      const source = transaction.newDoc.toString();
      return {
        source,
        expressionType,
        expectedVariableType,
        strict,
        root: variableType,
        rootKind: variableType.toJson(),
        types: match(expressionType)
          .with('unary', () => variableType.typeCheckUnary(source))
          .otherwise(() => variableType.typeCheck(source)),
      } satisfies TypeField;
    } catch {
      return value;
    }
  },
  compare(a, b) {
    return (
      a.source === b.source &&
      a.expressionType === b.expressionType &&
      a.root === b.root &&
      a.expectedVariableType === b.expectedVariableType &&
      a.strict === b.strict
    );
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
        boost: 50,
        detail: zenKindToString(v),
        apply: applyCompletion,
      })),
    )
    .otherwise(() => []);
};

export const zenKindToString = (type: unknown): string =>
  match(type)
    .with(P.string, (s) => s.toLowerCase())
    .with({ Object: P._ }, () => 'object')
    .with({ Array: P._ }, (t) => `${zenKindToString(t.Array)}[]`)
    .with({ Const: P.string }, (c) => `"${c.Const}"`)
    .with({ Enum: P.array(P.string) }, (t) => t.Enum.map((s) => `"${s}"`).join(' | '))
    .otherwise(() => 'unknown');
