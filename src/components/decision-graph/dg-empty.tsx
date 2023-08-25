import equal from 'fast-deep-equal/es6/react';
import React, { useEffect, useRef } from 'react';
import { XYPosition } from 'reactflow';

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
  const { setDecisionGraph } = useDecisionGraphStore(
    ({ setDecisionGraph }) => ({
      setDecisionGraph,
    }),
    equal
  );

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
    if (mountedRef.current && value !== undefined) {
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