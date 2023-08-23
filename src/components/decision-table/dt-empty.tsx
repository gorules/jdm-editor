import equal from 'fast-deep-equal/es6/react';
import React, { useEffect, useRef } from 'react';
import { shallow } from 'zustand/shallow';

import { SchemaSelectProps } from '../../helpers/components';
import {
  DecisionTableType,
  parseDecisionTable,
  useDecisionTableRaw,
  useDecisionTableStore,
} from './context/dt-store.context';
import { TableCellProps } from './table/table-default-cell';

export type DecisionTableEmptyType = {
  id?: string;
  defaultValue?: DecisionTableType;
  value?: DecisionTableType;
  disabled?: boolean;
  configurable?: boolean;
  disableHitPolicy?: boolean;
  activeRules?: string[];
  cellRenderer?: (props: TableCellProps) => JSX.Element | null | undefined;
  inputsSchema?: SchemaSelectProps[];
  outputsSchema?: SchemaSelectProps[];
  minColWidth?: number;
  colWidth?: number;
  onChange?: (val: DecisionTableType) => void;
};
export const DecisionTableEmpty: React.FC<DecisionTableEmptyType> = ({
  id,
  defaultValue,
  value,
  disabled = false,
  configurable = true,
  disableHitPolicy = false,
  activeRules,
  inputsSchema,
  outputsSchema,
  colWidth,
  minColWidth,
  cellRenderer,
  onChange,
}) => {
  const mountedRef = useRef(false);
  const store = useDecisionTableRaw();
  const setDecisionTable = useDecisionTableStore((store) => store.setDecisionTable, shallow);
  const decisionTable = useDecisionTableStore((store) => store.decisionTable, shallow);

  useEffect(() => {
    store.setState({
      id,
      disabled,
      configurable,
      disableHitPolicy,
      activeRules,
      inputsSchema,
      outputsSchema,
      colWidth: colWidth || 200,
      minColWidth: minColWidth || 150,
      cellRenderer,
      onChange,
    });
  }, [
    id,
    disabled,
    configurable,
    disableHitPolicy,
    activeRules,
    inputsSchema,
    minColWidth,
    colWidth,
    outputsSchema,
    cellRenderer,
    onChange,
  ]);

  useEffect(() => {
    if (mountedRef.current && !equal(value, decisionTable)) {
      setDecisionTable(parseDecisionTable(value));
    }
  }, [value]);

  useEffect(() => {
    setDecisionTable(parseDecisionTable(value === undefined ? defaultValue : value));
    mountedRef.current = true;
  }, []);
  return null;
};
