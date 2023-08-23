import equal from 'fast-deep-equal/es6/react';
import React, { useEffect, useRef } from 'react';
import { XYPosition } from 'reactflow';
import { shallow } from 'zustand/shallow';

import {
  CustomNodeType,
  DecisionGraphType,
  DecisionNode,
  useDecisionGraphRaw,
  useDecisionGraphStore,
} from './context/dg-store.context';

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
  const setDecisionGraph = useDecisionGraphStore((store) => store.setDecisionGraph, shallow);
  const decisionGraph = useDecisionGraphStore((store) => store.decisionGraph, equal);

  useEffect(() => {
    store.setState({
      id,
      disabled,
      configurable,
      components,
      onChange,
      onAddNode,
      onOpenNode,
      onTabChange,
      onEditGraph,
    });
  }, [id, disabled, configurable, components, onChange, onAddNode, onOpenNode, onTabChange, onEditGraph]);

  useEffect(() => {
    if (mountedRef.current && !equal(value, decisionGraph)) {
      setDecisionGraph(value);
    }
  }, [value]);

  useEffect(() => {
    setDecisionGraph(value === undefined ? defaultValue : value);
    mountedRef.current = true;
  }, []);
  return null;
};
