import type { Variable, VariableType } from '@gorules/zen-engine-wasm';
import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import React, { useMemo } from 'react';
import type { z } from 'zod';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

import { type GetNodeDataResult } from '../../../helpers/node-data';
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

export type ExpressionPermission = 'edit:full' | 'edit:values' | 'view';

export type ExpressionStore = {
  disabled: boolean;

  permission?: ExpressionPermission;

  addRowAbove: (index?: number, data?: Partial<ExpressionEntry>) => void;
  addRowBelow: (index?: number, data?: Partial<ExpressionEntry>) => void;

  expressions: ExpressionEntry[];
  setExpressions: (expressions: ExpressionEntry[]) => void;

  swapRows: (sourceIndex: number, targetIndex: number) => void;
  updateRow: (index: number, update: Partial<Omit<ExpressionEntry, 'id'>>) => void;
  removeRow: (index: number) => void;

  inputVariableType?: VariableType;

  debugIndex: number;
  calculatedInputData?: Variable;
  debug?: {
    snapshot: z.infer<typeof expressionNodeSchema>['content'];
    trace: SimulationTrace<SimulationTraceDataExpression>;
    inputData?: GetNodeDataResult;
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
        disabled: false,
        debugIndex: 0,
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

function useStoreSelectorWithEquality<TState, TSlice>(
  selector: (state: TState) => TSlice,
  equals: (a: TSlice, b: TSlice) => boolean,
) {
  const selectorRef = React.useRef(selector);
  selectorRef.current = selector;
  const equalsRef = React.useRef(equals);
  equalsRef.current = equals;
  const prevRef = React.useRef<TSlice | undefined>(undefined);
  const hasPrevRef = React.useRef(false);

  return React.useCallback(
    (state: TState) => {
      const next = selectorRef.current(state);
      if (hasPrevRef.current && equalsRef.current(prevRef.current as TSlice, next)) {
        return prevRef.current as TSlice;
      }

      prevRef.current = next;
      hasPrevRef.current = true;
      return next;
    },
    [],
  );
}

export function useExpressionStore<T>(
  selector: (state: ExpressionStore) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  const stableSelector = useStoreSelectorWithEquality(selector, equals);
  return React.useContext(ExpressionStoreContext)(stableSelector);
}

export const useExpressionStoreRaw = () => React.useContext(ExpressionStoreContext);
