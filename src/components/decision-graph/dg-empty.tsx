import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';
import type { XYPosition } from 'reactflow';
import { useDebouncedCallback } from 'use-debounce';

import type { CustomNodeType, DecisionGraphType, DecisionNode } from './context/dg-store.context';
import { useDecisionGraphRaw, useDecisionGraphStore } from './context/dg-store.context';

export type DecisionGraphEmptyType = {
  id?: string;
  defaultValue?: DecisionGraphType;
  value?: DecisionGraphType;

  disabled?: boolean;
  configurable?: boolean;

  components?: CustomNodeType[];

  onChange?: (val: DecisionGraphType) => void;
  onAddNode?: (type: string, position?: XYPosition) => void;
  onOpenNode?: (node: DecisionNode) => void;
  onTabChange?: (tab?: string) => void;
  onEditGraph?: (edit: boolean) => void;
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
  components,
}) => {
  const mountedRef = useRef(false);
  const store = useDecisionGraphRaw();
  const { setDecisionGraph, decisionGraph } = useDecisionGraphStore(
    ({ setDecisionGraph, decisionGraph }) => ({
      setDecisionGraph,
      decisionGraph,
    }),
    equal,
  );

  const innerChange = useDebouncedCallback((graph: DecisionGraphType) => {
    onChange?.(graph);
  }, 50);

  useEffect(() => {
    store.setState({
      id,
      disabled,
      configurable,
      components,
      onChange: innerChange,
      onAddNode,
      onOpenNode,
      onTabChange,
      onEditGraph,
    });
  }, [id, disabled, configurable, components, onAddNode, onOpenNode, onTabChange, onEditGraph]);

  useEffect(() => {
    if (mountedRef.current && value !== undefined && !equal(value, decisionGraph)) {
      setDecisionGraph(value);
    }
  }, [value]);

  useEffect(() => {
    if (value !== undefined) {
      setDecisionGraph(value);
    } else if (defaultValue !== undefined) {
      setDecisionGraph(defaultValue);
    }

    mountedRef.current = true;
  }, []);
  return null;
};
