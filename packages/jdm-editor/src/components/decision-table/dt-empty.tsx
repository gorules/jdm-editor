import { type Variable, createVariableType } from '@gorules/zen-engine-wasm';
import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { P, match } from 'ts-pattern';
import { useDebouncedCallback } from 'use-debounce';

import type { SchemaSelectProps } from '../../helpers/components';
import { isWasmAvailable } from '../../helpers/wasm';
import type { SimulationTrace, SimulationTraceDataTable } from '../decision-graph';
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
  inputData?: unknown;
  debug?: { trace: SimulationTrace<SimulationTraceDataTable>; inputData?: Variable; snapshot: DecisionTableType };
  minColWidth?: number;
  colWidth?: number;
  onChange?: (val: DecisionTableType) => void;
  snapshot?: DecisionTableType;
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
  inputData,
  debug,
  colWidth,
  minColWidth,
  cellRenderer,
  onChange,
  snapshot,
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
    if (!isWasmAvailable()) {
      return;
    }

    stateStore.setState({ inputVariableType: createVariableType(inputData) });
  }, [inputData]);

  useEffect(() => {
    if (!debug) {
      stateStore.setState({ debug: undefined });
      return;
    }

    const activeRules = match(debug.trace.traceData)
      .with(P.array(), (t) => t.map((d) => d?.rule?._id))
      .otherwise((t) => [t?.rule?._id]);

    stateStore.setState({
      debug: {
        trace: debug.trace,
        snapshot: debug.snapshot,
        inputData: debug.inputData,
        activeRules,
      },
    });
  }, [debug, snapshot]);

  return null;
};
