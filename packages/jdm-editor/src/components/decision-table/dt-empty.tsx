import { Variable, VariableType } from '@gorules/zen-engine-wasm';
import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import type { SchemaSelectProps } from '../../helpers/components';
import type { GetNodeDataResult } from '../../helpers/node-data';
import { isWasmAvailable } from '../../helpers/wasm';
import type { SimulationTrace, SimulationTraceDataTable } from '../decision-graph';
import type { DecisionTableStoreType } from './context/dt-store.context';
import {
  type DecisionTableType,
  parseDecisionTable,
  useDecisionTableActions,
  useDecisionTableRaw,
  useDecisionTableState,
} from './context/dt-store.context';
import type { TableCellProps } from './table/table-default-cell';

export type DecisionTableEmptyType = {
  id?: string;
  name?: string;
  defaultValue?: DecisionTableType;
  value?: DecisionTableType;
  disabled?: boolean;
  configurable?: boolean;
  disableHitPolicy?: boolean;
  cellRenderer?: (props: TableCellProps) => JSX.Element | null | undefined;
  inputsSchema?: SchemaSelectProps[];
  outputsSchema?: SchemaSelectProps[];
  debug?: {
    trace: SimulationTrace<SimulationTraceDataTable>;
    inputData?: GetNodeDataResult;
    snapshot: DecisionTableType;
  };
  minColWidth?: number;
  colWidth?: number;
  onChange?: (val: DecisionTableType) => void;
};

export const DecisionTableEmpty: React.FC<DecisionTableEmptyType> = ({
  id,
  name,
  defaultValue,
  value,
  disabled = false,
  configurable = true,
  disableHitPolicy = false,
  inputsSchema,
  outputsSchema,
  debug,
  colWidth,
  minColWidth,
  cellRenderer,
  onChange,
}) => {
  const mountedRef = useRef(false);
  const { stateStore, listenerStore } = useDecisionTableRaw();
  const tableActions = useDecisionTableActions();
  const { decisionTable } = useDecisionTableState(({ decisionTable }) => ({
    decisionTable,
  }));

  const innerChange = useDebouncedCallback((table: DecisionTableType) => {
    onChange?.(table);
  }, 100);

  useEffect(() => {
    stateStore.setState({
      id,
      name,
      disabled,
      configurable,
      disableHitPolicy,
      inputsSchema,
      outputsSchema,
      colWidth: colWidth || 200,
      minColWidth: minColWidth || 150,
    });
  }, [id, name, disabled, configurable, disableHitPolicy, inputsSchema, minColWidth, colWidth, outputsSchema]);

  useEffect(() => {
    listenerStore.setState({
      cellRenderer,
      onChange: innerChange,
    });
  }, [cellRenderer, innerChange]);

  useEffect(() => {
    if (mountedRef.current && value !== undefined && !equal(value, decisionTable)) {
      tableActions.setDecisionTable(parseDecisionTable(value));
    }
  }, [value]);

  useEffect(() => {
    tableActions.setDecisionTable(parseDecisionTable(value === undefined ? defaultValue : value));
    mountedRef.current = true;

    return () => {
      const { derivedVariableTypes } = stateStore.getState();

      Object.values(derivedVariableTypes).forEach((vt) => {
        vt.free();
      });
    };
  }, []);

  useEffect(() => {
    if (!debug) {
      stateStore.setState({ debug: undefined });
      return;
    }

    stateStore.setState({
      debug: {
        trace: debug.trace,
        snapshot: debug.snapshot,
        inputData: debug.inputData,
      },
    });
  }, [debug]);

  useEffect(() => {
    if (!isWasmAvailable()) {
      return;
    }

    const isLoop = (store: DecisionTableStoreType['state']) => {
      return store.debug?.snapshot.executionMode === 'loop';
    };

    const applyDebug = (state: DecisionTableStoreType['state']) => {
      const inputData = state.debug?.inputData;
      if (!inputData) {
        return;
      }

      const varInputData = new Variable(inputData.data);
      if (isLoop(state)) {
        const newInputData = varInputData.get(state.debugIndex).cloneWith('$nodes', inputData.$nodes);
        stateStore.setState({
          calculatedInputData: newInputData,
          inputVariableType: VariableType.fromVariable(newInputData),
        });
      } else {
        const newInputData = varInputData.cloneWith('$nodes', inputData.$nodes);
        stateStore.setState({
          calculatedInputData: newInputData,
          inputVariableType: VariableType.fromVariable(newInputData),
        });
      }
    };

    applyDebug(stateStore.getState());
    return stateStore.subscribe((state, prevState) => {
      if (state.debugIndex === prevState.debugIndex && state.debug === prevState.debug) {
        return;
      }

      applyDebug(state);
    });
  }, []);

  return null;
};
