import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import {
  type DecisionGraphStoreType,
  type DecisionGraphType,
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

  components?: NodeSpecification[];

  onChange?: DecisionGraphStoreType['listeners']['onChange'];
  onSimulationRun?: DecisionGraphStoreType['listeners']['onSimulationRun'];
  onSimulatorOpen?: DecisionGraphStoreType['listeners']['onSimulatorOpen'];
  onReactFlowInit?: DecisionGraphStoreType['listeners']['onReactFlowInit'];
};
export const DecisionGraphEmpty: React.FC<DecisionGraphEmptyType> = ({
  id,
  defaultValue,
  value,
  disabled = false,
  configurable = true,
  onChange,
  onSimulationRun,
  components,
  onSimulatorOpen,
  onReactFlowInit,
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
    });
  }, [id, disabled, configurable, components]);

  useEffect(() => {
    listenerStore.setState({
      onSimulationRun,
      onSimulatorOpen,
      onReactFlowInit,
    });
  }, [onSimulationRun, onSimulatorOpen, onReactFlowInit]);

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
