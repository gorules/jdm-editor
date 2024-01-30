import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';
import type { XYPosition } from 'reactflow';
import { useDebouncedCallback } from 'use-debounce';

import {
  type DecisionGraphStoreType,
  type DecisionGraphType,
  type DecisionNode,
  useDecisionGraphActions,
  useDecisionGraphRaw,
  useDecisionGraphState,
} from './context/dg-store.context';
import type { NodeSpecification } from './nodes/specification-types';

export type DecisionGraphEmptyType = {
  id?: string;
  defaultValue?: DecisionGraphType;
  value?: DecisionGraphType;

  disabled?: boolean;
  configurable?: boolean;

  simulate?: any;

  components?: NodeSpecification[];

  onChange?: (val: DecisionGraphType) => void;
  onAddNode?: (type: string, position?: XYPosition) => void;
  onOpenNode?: (node: DecisionNode) => void;
  onTabChange?: (tab?: string) => void;
  onEditGraph?: (edit: boolean) => void;
  onSimulationRun?: DecisionGraphStoreType['listeners']['onSimulationRun'];
};
export const DecisionGraphEmpty: React.FC<DecisionGraphEmptyType> = ({
  id,
  defaultValue,
  value,
  disabled = false,
  configurable = true,
  onChange,
  onAddNode,
  onOpenNode,
  onTabChange,
  onEditGraph,
  onSimulationRun,
  components,
  simulate,
}) => {
  const mountedRef = useRef(false);
  const graphActions = useDecisionGraphActions();
  const { stateStore, listenerStore } = useDecisionGraphRaw();
  const { decisionGraph } = useDecisionGraphState(({ decisionGraph }) => ({
    decisionGraph,
  }));

  const innerChange = useDebouncedCallback((graph: DecisionGraphType) => {
    onChange?.(graph);
  }, 100);

  useEffect(() => {
    stateStore.setState({
      id,
      disabled,
      configurable,
      components: Array.isArray(components) ? components : [],
      simulate,
    });
  }, [id, disabled, configurable, components, simulate]);

  useEffect(() => {
    listenerStore.setState({
      onAddNode,
      onOpenNode,
      onTabChange,
      onEditGraph,
      onSimulationRun,
    });
  }, [onAddNode, onOpenNode, onTabChange, onEditGraph, onSimulationRun]);

  useEffect(() => {
    listenerStore.setState({ onChange: innerChange });
  }, [innerChange]);

  useEffect(() => {
    if (mountedRef.current && value !== undefined && !equal(value, decisionGraph)) {
      graphActions.setDecisionGraph(value);
    }
  }, [value]);

  useEffect(() => {
    if (value !== undefined) {
      graphActions.setDecisionGraph(value);
    } else if (defaultValue !== undefined) {
      graphActions.setDecisionGraph(defaultValue);
    }

    mountedRef.current = true;
  }, []);

  return null;
};
