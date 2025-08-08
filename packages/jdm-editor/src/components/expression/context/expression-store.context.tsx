import type { Variable, VariableType } from '@gorules/zen-engine-wasm';
import equal from 'fast-deep-equal/es6/react';
import type { WritableDraft } from 'immer';
import { produce } from 'immer';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { P, match } from 'ts-pattern';
import type { z } from 'zod';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

import { type GetNodeDataResult } from '../../../helpers/node-data';
import type { expressionNodeSchema } from '../../../helpers/schema';
import type { SimulationTrace, SimulationTraceDataExpression } from '../../decision-graph';
import type { DiffMetadata } from '../../decision-graph/dg-types';

const pathToArray = (path: string[]): [string, number] => {
  const newPath = path.join('.').split('.');
  const index = newPath.pop();
  if (isNaN(Number(index))) {
    return [[...newPath, index].filter(Boolean).join('.'), 0];
  }

  return [newPath.join('.'), Number.parseInt(index ?? '0')];
};

const pathToBase = <Item,>(arr: Item[], path: string[]): [Item[], number] => {
  const [basePath, index] = pathToArray(path);
  const array = match(basePath)
    .with(P.string.minLength(1), () => _.get(arr, basePath) as Item[])
    .otherwise(() => arr);

  return [array, index];
};

const ExpressionStoreContext = React.createContext<
  UseBoundStore<StoreApi<ExpressionStore>> & {
    setState: (partial: Partial<ExpressionStore>) => void;
  }
>({} as any);

type ExpressionEntryKind = 'item' | 'group';

export type ExpressionEntry = ExpressionEntryItem | ExpressionEntryGroup;

export type ExpressionEntryItem = {
  id: string;
  key: string;
  value: string;
  _diff?: DiffMetadata;
};

export type ExpressionEntryGroupRule = {
  id: string;
  if?: string;
  then: ExpressionEntry[];
};

export type ExpressionEntryGroup = {
  id: string;
  rules: ExpressionEntryGroupRule[];
};

type AddRowOptions = {
  path?: string[];
  kind?: ExpressionEntryKind;
};

export type ExpressionStore = {
  configurable: boolean;
  disabled: boolean;

  addRowAbove: (options?: AddRowOptions) => void;
  addRowBelow: (options?: AddRowOptions) => void;

  expressions: ExpressionEntry[];
  setExpressions: (expressions: ExpressionEntry[]) => void;

  swapRows: (sourcePath: string[], targetPath: string[], direction?: 'up' | 'down') => void;
  patchRow: (path: string[], update: Partial<Omit<ExpressionEntry, 'id'>>) => void;
  updateRow: (path: string[], updater: (draft: WritableDraft<ExpressionEntry>) => void) => void;
  removeRow: (path: string[]) => void;

  inputVariableType?: VariableType;

  debugIndex: number;
  calculatedInputData?: Variable;
  calculatedVariableType?: VariableType;

  debug?: {
    snapshot: z.infer<typeof expressionNodeSchema>['content'];
    trace: SimulationTrace<SimulationTraceDataExpression>;
    inputData?: GetNodeDataResult;
  };
};

type ExpressionStoreProviderProps = {
  //
};

export const createExpression = (kind: ExpressionEntryKind): ExpressionEntry =>
  match(kind)
    .with(
      'item',
      () =>
        ({
          id: crypto.randomUUID(),
          key: '',
          value: '',
        }) satisfies ExpressionEntryItem,
    )
    .with(
      'group',
      () =>
        ({
          id: crypto.randomUUID(),
          rules: [
            {
              id: crypto.randomUUID(),
              if: '',
              then: [createExpression('item')],
            },
          ],
        }) satisfies ExpressionEntryGroup,
    )
    .exhaustive();

export const ExpressionStoreProvider: React.FC<React.PropsWithChildren<ExpressionStoreProviderProps>> = ({
  children,
}) => {
  const store = useMemo(
    () =>
      create<ExpressionStore>((set) => ({
        configurable: true,
        disabled: false,
        debugIndex: 0,
        addRowAbove: (options = {}) => {
          const { kind = 'item' } = options;
          const path = match(options.path)
            .with(
              P.when((s) => s && s.length > 0),
              (a) => a as string[],
            )
            .otherwise(() => []);

          const newState = produce<ExpressionStore>((draft) => {
            const [base, index] = pathToBase(draft.expressions, path);
            base.splice(index, 0, createExpression(kind));
          });

          set(newState);
        },
        addRowBelow: (options = {}) => {
          const { path: defaultPath, kind = 'item' } = options;

          set(
            produce<ExpressionStore>((draft) => {
              const expressionLength = Math.max(draft.expressions.length - 1, 0);
              const path = match(defaultPath)
                .with(P.nonNullable, (p) => p)
                .otherwise(() => [expressionLength.toString()]);

              const [base, index] = pathToBase(draft.expressions, path);
              base.splice(index + 1, 0, createExpression(kind));
            }),
          );
        },
        expressions: [],
        setExpressions: (expressions) => {
          set({ expressions });
        },
        swapRows: (sourcePath, targetPath, direction = 'up') => {
          set(
            produce<ExpressionStore>((draft) => {
              const [sourceBase, sourceIndex] = pathToBase(draft.expressions, sourcePath);
              const [targetBase, targetIndex] = pathToBase(draft.expressions, targetPath);

              const sameLevel = sourceBase === targetBase;
              const additional = match([direction, sameLevel])
                .with(['down', false], () => 1)
                .otherwise(() => 0);

              const [input] = sourceBase.splice(sourceIndex, 1);
              targetBase.splice(targetIndex + additional, 0, input);
            }),
          );
        },
        removeRow: (path) => {
          set(
            produce<ExpressionStore>((draft) => {
              const [base, index] = pathToBase(draft.expressions, path);
              base.splice(index, 1);
            }),
          );
        },
        updateRow: (path, updater) => {
          set(
            produce<ExpressionStore>((draft) => {
              const [base, index] = pathToBase(draft.expressions, path);
              const target = base[index];

              updater(target);
            }),
          );
        },
        patchRow: (path, update) => {
          set(
            produce<ExpressionStore>((draft) => {
              const [base, index] = pathToBase(draft.expressions, path);
              base[index] = {
                ...base[index],
                ...update,
              };

              return draft;
            }),
          );
        },
      })),
    [],
  );

  return <ExpressionStoreContext.Provider value={store}>{children}</ExpressionStoreContext.Provider>;
};

export function useExpressionStore<T>(
  selector: (state: ExpressionStore) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(ExpressionStoreContext)(selector, equals);
}

export const useExpressionStoreRaw = () => React.useContext(ExpressionStoreContext);
