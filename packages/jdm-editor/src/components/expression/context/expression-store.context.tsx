import type { Variable, VariableType } from '@gorules/zen-engine-wasm';
import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import React, { useMemo } from 'react';
import type { z } from 'zod';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

import type { expressionNodeSchema } from '../../../helpers/schema';
import type { SimulationTrace, SimulationTraceDataExpression } from '../../decision-graph';
import type { DiffMetadata } from '../../decision-graph/dg-types';

const ExpressionStoreContext = React.createContext<
  UseBoundStore<StoreApi<ExpressionStore>> & {
    setState: (partial: Partial<ExpressionStore>) => void;
  }
>({} as any);

export type ExpressionEntry = {
  id: string;
  key: string;
  value: string;
  _diff?: DiffMetadata;
};

export type ExpressionStore = {
  configurable: boolean;
  disabled: boolean;

  addRowAbove: (index?: number, data?: Partial<ExpressionEntry>) => void;
  addRowBelow: (index?: number, data?: Partial<ExpressionEntry>) => void;

  expressions: ExpressionEntry[];
  setExpressions: (expressions: ExpressionEntry[]) => void;

  swapRows: (sourceIndex: number, targetIndex: number) => void;
  updateRow: (index: number, update: Partial<Omit<ExpressionEntry, 'id'>>) => void;
  removeRow: (index: number) => void;

  inputVariableType?: VariableType;

  debug?: {
    snapshot: z.infer<typeof expressionNodeSchema>['content'];
    trace: SimulationTrace<SimulationTraceDataExpression>;
    inputData?: Variable;
  };
};

type ExpressionStoreProviderProps = {
  //
};

export const createExpression = (data: Partial<ExpressionEntry> = {}): ExpressionEntry => ({
  id: crypto.randomUUID(),
  key: '',
  value: '',
  ...data,
});

export const ExpressionStoreProvider: React.FC<React.PropsWithChildren<ExpressionStoreProviderProps>> = ({
  children,
}) => {
  const store = useMemo(
    () =>
      create<ExpressionStore>((set) => ({
        configurable: true,
        disabled: false,
        addRowAbove: (index = 0) => {
          set(
            produce<ExpressionStore>((draft) => {
              draft.expressions.splice(index, 0, createExpression());
              return draft;
            }),
          );
        },
        addRowBelow: (index) => {
          set(
            produce<ExpressionStore>((draft) => {
              index = index ?? draft.expressions.length - 1;
              draft.expressions.splice(index + 1, 0, createExpression());

              return draft;
            }),
          );
        },
        expressions: [],
        setExpressions: (expressions) => {
          set({ expressions });
        },
        swapRows: (sourceIndex, targetIndex) => {
          set(
            produce<ExpressionStore>((draft) => {
              const [input] = draft.expressions.splice(sourceIndex, 1);
              draft.expressions.splice(targetIndex, 0, input);

              return draft;
            }),
          );
        },
        removeRow: (index) => {
          set(
            produce<ExpressionStore>((draft) => {
              draft.expressions.splice(index, 1);
              return draft;
            }),
          );
        },
        updateRow: (index, update) => {
          set(
            produce<ExpressionStore>((draft) => {
              draft.expressions[index] = {
                ...draft.expressions[index],
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
