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
};

const defaultTypeField: TypeField = { types: [], rootKind: 'Any' };

export const updateTypeEffect = StateEffect.define<VariableType | null>();

export const typeField = StateField.define<TypeField>({
  create() {
    return defaultTypeField;
  },
  update(value, transaction) {
    const effect = transaction.effects.find((e) => e.is(updateTypeEffect));
    if (effect) {
      const root = effect.value as VariableType | null;
      const newSource = transaction.newDoc.toString();
      if (root === null) {
        return defaultTypeField;
      }

      return {
        root,
        source: newSource,
        types: root.typeCheck(newSource),
        rootKind: root.toJson(),
      };
    }

    if (!transaction.docChanged || !value.root) {
      return value;
    }

    const newSource = transaction.newDoc.toString();
    return { types: value.root.typeCheck(newSource), source: newSource, rootKind: value.rootKind, root: value.root };
  },
  compare(a, b) {
    return a.source === b.source;
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
