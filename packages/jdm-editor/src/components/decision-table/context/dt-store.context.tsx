import type { Variable, VariableType } from '@gorules/zen-engine-wasm';
import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import React, { useMemo } from 'react';
import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

import type { SchemaSelectProps } from '../../../helpers/components';
import type { SimulationTrace, SimulationTraceDataTable } from '../../decision-graph';
import type { Diff, DiffMetadata } from '../../decision-graph/dg-types';
import type { TableCellProps } from '../table/table-default-cell';

export type TableExportOptions = {
  name: string;
};

export type TableCursor = {
  x: string;
  y: number;
};

export type TableSchemaItem = {
  id: string;
  name: string;
  field?: string;
  defaultValue?: string;
  _diff?: DiffMetadata;
};

export type HitPolicy = 'first' | 'collect';
export type ColumnType = 'inputs' | 'outputs';

export type DecisionTableType = {
  hitPolicy: HitPolicy | string;
  passThorough?: boolean;
  inputField?: string;
  outputPath?: string;
  executionMode?: 'single' | 'loop';
  inputs: TableSchemaItem[];
  outputs: TableSchemaItem[];
  rules: Record<string, string>[];
} & Diff;

const cleanupTableRule = (
  decisionTable: DecisionTableType,
  rule: Record<string, string>,
  defaultId?: string,
): Record<string, string> => {
  const schemaItems = [...decisionTable.inputs, ...decisionTable.outputs];
  const newRule: Record<string, string> = {
    _id: rule._id || crypto.randomUUID(),
    _description: rule._description,
  };
  schemaItems.forEach((schemaItem) => {
    if (defaultId && newRule._id === defaultId) {
      return (newRule[schemaItem.id] = rule?.[schemaItem.id] || schemaItem?.defaultValue || '');
    }
    newRule[schemaItem.id] = rule?.[schemaItem.id] || '';
  });
  return newRule;
};

const cleanupTableRules = (decisionTable: DecisionTableType, defaultId?: string): Record<string, string>[] => {
  const rules = decisionTable?.rules || [];
  const schemaItems = [...decisionTable.inputs, ...decisionTable.outputs];
  return rules.map((rule) => {
    const newRule: Record<string, string> = {
      _id: rule._id || crypto.randomUUID(),
      _description: rule._description,
    };
    schemaItems.forEach((schemaItem) => {
      if (defaultId && newRule._id === defaultId) {
        return (newRule[schemaItem.id] = rule?.[schemaItem.id] || schemaItem?.defaultValue || '');
      }
      newRule[schemaItem.id] = rule?.[schemaItem.id] || '';
    });
    return newRule;
  });
};

export const parseDecisionTable = (decisionTable?: DecisionTableType) => {
  const dt: DecisionTableType = {
    hitPolicy: decisionTable?.hitPolicy || 'first',
    inputs: decisionTable?.inputs || [],
    outputs: decisionTable?.outputs || [],
    rules: decisionTable?.rules || [],
    passThorough: decisionTable?.passThorough ?? false,
    inputField: decisionTable?.inputField,
    outputPath: decisionTable?.outputPath,
    executionMode: decisionTable?.executionMode ?? 'single',
    _diff: decisionTable?._diff,
  };

  if (dt.inputs?.length === 0) {
    dt.inputs = [
      {
        id: crypto.randomUUID(),
        name: 'Input',
      },
    ];
  }

  if (dt.outputs?.length === 0) {
    dt.outputs = [
      {
        id: crypto.randomUUID(),
        field: 'output',
        name: 'Output',
      },
    ];
  }

  dt.rules.forEach((r) => {
    if (typeof (r as Record<string, unknown>)._id === 'string' && r._id.length > 0) {
      return;
    }

    r._id = crypto.randomUUID();
  });

  return dt;
};

export type DecisionTableStoreType = {
  state: {
    id?: string;
    name?: string;
    decisionTable: DecisionTableType;
    cursor: TableCursor | null;

    disabled: boolean;
    configurable: boolean;
    disableHitPolicy: boolean;

    minColWidth: number;
    colWidth: number;

    inputVariableType?: VariableType;
    derivedVariableTypes: Record<string, VariableType>;

    inputsSchema?: SchemaSelectProps[];
    outputsSchema?: SchemaSelectProps[];

    debug?: {
      snapshot: DecisionTableType;
      trace: SimulationTrace<SimulationTraceDataTable>;
      inputData?: Variable;
      activeRules: string[];
    };
  };

  actions: {
    setDecisionTable: (val: DecisionTableType) => void;
    setCursor: (cursor: TableCursor | null) => void;
    commitData: (data: string, cursor: TableCursor) => void;
    swapRows: (source: number, target: number) => void;
    addRowAbove: (target?: number) => void;
    addRowBelow: (target?: number) => void;
    removeRow: (target?: number) => void;
    addColumn: (type: ColumnType, column: TableSchemaItem) => void;
    updateColumn: (type: ColumnType, id: string, column: TableSchemaItem) => void;
    removeColumn: (type: ColumnType, id: string) => void;
    reorderColumns: (type: ColumnType, columns: TableSchemaItem[]) => void;
    updateHitPolicy: (hitPolicy: HitPolicy) => void;
  };

  listeners: {
    onChange?: (val: DecisionTableType) => void;
    cellRenderer?: (props: TableCellProps) => React.ReactNode | null | undefined;
    onColumnResize?: () => void;
  };
};

type ExposedStore<T> = UseBoundStore<StoreApi<T>> & {
  setState: (partial: Partial<T>) => void;
};

const DecisionTableStoreContext = React.createContext<{
  stateStore: ExposedStore<DecisionTableStoreType['state']>;
  listenerStore: ExposedStore<DecisionTableStoreType['listeners']>;
  actions: DecisionTableStoreType['actions'];
}>({} as any);

export type DecisionTableContextProps = {
  //
};

export const DecisionTableProvider: React.FC<React.PropsWithChildren<DecisionTableContextProps>> = (props) => {
  const { children } = props;

  const stateStore = useMemo(
    () =>
      create<DecisionTableStoreType['state']>(() => ({
        id: undefined,
        name: undefined,
        decisionTable: parseDecisionTable(),
        cursor: null,

        disabled: false,
        configurable: true,
        disableHitPolicy: false,

        colWidth: 200,
        minColWidth: 150,

        inputsSchema: undefined,
        outputsSchema: undefined,

        derivedVariableTypes: {},
        inputVariableType: undefined,
        debug: undefined,
      })),
    [],
  );

  const listenerStore = useMemo(
    () =>
      create<DecisionTableStoreType['listeners']>(() => ({
        onChange: undefined,
        cellRenderer: undefined,
      })),
    [],
  );

  const actions = useMemo<DecisionTableStoreType['actions']>(
    () => ({
      setDecisionTable: (decisionTable) => stateStore.setState({ decisionTable }),
      setCursor: (cursor: TableCursor | null) => stateStore.setState({ cursor }),
      commitData: (value: string, cursor: TableCursor) => {
        const { decisionTable } = stateStore.getState();

        const updatedDecisionTable = produce(decisionTable, (draft) => {
          const { x, y } = cursor;
          draft.rules[y][x] = value;
          return draft;
        });

        stateStore.setState({ decisionTable: updatedDecisionTable });
        listenerStore.getState().onChange?.(updatedDecisionTable);
      },
      swapRows: (source: number, target: number) => {
        const { decisionTable } = stateStore.getState();

        const updatedDecisionTable = produce(decisionTable, (draft) => {
          const input = draft?.rules?.[source];
          draft.rules.splice(source, 1);
          draft.rules.splice(target, 0, input);
          return draft;
        });

        stateStore.setState({ decisionTable: updatedDecisionTable, cursor: null });
        listenerStore.getState().onChange?.(updatedDecisionTable);
      },
      addRowAbove: (target?: number) => {
        const { decisionTable } = stateStore.getState();

        const updatedDecisionTable = produce(decisionTable, (draft) => {
          if (target === undefined) {
            target = 0;
          }

          const _id = crypto.randomUUID();
          draft.rules.splice(target, 0, cleanupTableRule(draft, { _id }, _id));

          return draft;
        });

        stateStore.setState({ decisionTable: updatedDecisionTable });
        listenerStore.getState().onChange?.(updatedDecisionTable);

        const { cursor } = stateStore.getState();
        if (cursor && cursor?.y === target) {
          stateStore.setState({ cursor: { x: cursor.x, y: cursor.y + 1 } });
        }
      },
      addRowBelow: (target?: number) => {
        const { decisionTable } = stateStore.getState();

        const updatedDecisionTable = produce(decisionTable, (draft) => {
          if (target === undefined) {
            target = draft?.rules?.length;
          } else {
            target += 1;
          }

          const _id = crypto.randomUUID();
          draft.rules.splice(target, 0, cleanupTableRule(draft, { _id }, _id));
          return draft;
        });
        stateStore.setState({ decisionTable: updatedDecisionTable });
        listenerStore.getState().onChange?.(updatedDecisionTable);

        const { cursor } = stateStore.getState();
        if (cursor && cursor?.y === target) {
          stateStore.setState({ cursor: { x: cursor.x, y: cursor.y - 1 } });
        }
      },
      removeRow: (target?: number) => {
        const { decisionTable } = stateStore.getState();

        const updatedDecisionTable = produce(decisionTable, (draft) => {
          if (target === undefined) {
            target = draft?.rules?.length || 0;
          }

          draft.rules.splice(target, 1);
          return draft;
        });

        stateStore.setState({ decisionTable: updatedDecisionTable });
        listenerStore.getState().onChange?.(updatedDecisionTable);
      },
      addColumn: (type: ColumnType, column: TableSchemaItem) => {
        const { decisionTable } = stateStore.getState();

        const updatedDecisionTable = produce(decisionTable, (draft) => {
          draft[type].push(column);
          draft.rules = cleanupTableRules(draft);
          return draft;
        });

        stateStore.setState({ decisionTable: updatedDecisionTable });
        listenerStore.getState().onChange?.(updatedDecisionTable);
      },
      updateColumn: (type: ColumnType, id: string, data: TableSchemaItem) => {
        const { decisionTable } = stateStore.getState();

        const updatedDecisionTable = produce(decisionTable, (draft) => {
          draft[type] = draft[type].map((item) => {
            if (item.id === id) {
              return {
                ...item,
                name: data?.name,
                field: data?.field,
                defaultValue: data?.defaultValue,
              };
            }
            return item;
          });

          draft.rules = cleanupTableRules(draft);
          return draft;
        });

        stateStore.setState({ decisionTable: updatedDecisionTable });
        listenerStore.getState().onChange?.(updatedDecisionTable);
      },
      removeColumn: (type: ColumnType, id: string) => {
        const { decisionTable } = stateStore.getState();

        const updatedDecisionTable = parseDecisionTable(
          produce(decisionTable, (draft) => {
            draft[type] = (draft?.[type] || []).filter((item) => item?.id !== id);
            draft.rules = cleanupTableRules(draft);
            return draft;
          }),
        );

        stateStore.setState({ decisionTable: updatedDecisionTable, cursor: null });
        listenerStore.getState().onChange?.(updatedDecisionTable);
      },
      reorderColumns: (type: ColumnType, columns: TableSchemaItem[]) => {
        const { decisionTable } = stateStore.getState();

        const updatedDecisionTable = produce(decisionTable, (draft) => {
          draft[type] = columns;
          draft.rules = cleanupTableRules(draft);
          return draft;
        });

        stateStore.setState({ decisionTable: updatedDecisionTable });
        listenerStore.getState().onChange?.(updatedDecisionTable);
      },
      updateHitPolicy: (hitPolicy: HitPolicy) => {
        const { decisionTable } = stateStore.getState();

        const updatedDecisionTable = produce(decisionTable, (draft) => {
          draft.hitPolicy = hitPolicy;
          return draft;
        });

        stateStore.setState({ decisionTable: updatedDecisionTable });
        listenerStore.getState().onChange?.(updatedDecisionTable);
      },
    }),
    [],
  );

  const value = useMemo(
    () => ({
      stateStore,
      listenerStore,
      actions,
    }),
    [stateStore, listenerStore, actions],
  );

  return <DecisionTableStoreContext.Provider value={value}>{children}</DecisionTableStoreContext.Provider>;
};

export function useDecisionTableState<T>(
  selector: (state: DecisionTableStoreType['state']) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(DecisionTableStoreContext).stateStore(selector, equals);
}

export function useDecisionTableListeners<T>(
  selector: (state: DecisionTableStoreType['listeners']) => T,
  equals: (a: any, b: any) => boolean = equal,
): T {
  return React.useContext(DecisionTableStoreContext).listenerStore(selector, equals);
}

export function useDecisionTableActions(): DecisionTableStoreType['actions'] {
  return React.useContext(DecisionTableStoreContext).actions;
}

export const useDecisionTableRaw = () => React.useContext(DecisionTableStoreContext);
export default DecisionTableProvider;
