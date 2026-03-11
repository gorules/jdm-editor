import equal from 'fast-deep-equal/es6/react';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import type { DictionaryMap } from '../../theme';
import type { JdmUiMode } from '../decision-table/context/dt-store.context';
import {
  type DecisionGraphStoreType,
  useDecisionGraphActions,
  useDecisionGraphRaw,
  useDecisionGraphState,
} from './context/dg-store.context';
import { type DecisionGraphType } from './dg-types';

export type DecisionGraphEmptyType = {
  id?: string;
  defaultValue?: DecisionGraphType;
  value?: DecisionGraphType;

  disabled?: boolean;

  components?: DecisionGraphStoreType['state']['components'];
  customNodes?: DecisionGraphStoreType['state']['customNodes'];

  hideLeftToolbar?: DecisionGraphStoreType['state']['hideLeftToolbar'];

  name?: DecisionGraphStoreType['state']['name'];

  viewConfigCta?: DecisionGraphStoreType['state']['viewConfigCta'];
  viewConfig?: DecisionGraphStoreType['state']['viewConfig'];
  onViewConfigCta?: DecisionGraphStoreType['listeners']['onViewConfigCta'];

  defaultActivePanel?: string;
  panels?: DecisionGraphStoreType['state']['panels'];
  onPanelsChange?: DecisionGraphStoreType['listeners']['onPanelsChange'];

  simulate?: DecisionGraphStoreType['state']['simulate'];

  dictionaries?: DictionaryMap;
  mode?: JdmUiMode;

  onChange?: DecisionGraphStoreType['listeners']['onChange'];
  onReactFlowInit?: DecisionGraphStoreType['listeners']['onReactFlowInit'];

  onCodeExtension?: DecisionGraphStoreType['listeners']['onCodeExtension'];
  onFunctionReady?: DecisionGraphStoreType['listeners']['onFunctionReady'];
};

export const DecisionGraphEmpty: React.FC<DecisionGraphEmptyType> = ({
  id,
  defaultValue,
  value,
  name,
  disabled = false,
  onChange,
  components,
  customNodes,
  defaultActivePanel,
  hideLeftToolbar,
  panels,
  simulate,
  dictionaries,
  mode,
  viewConfigCta,
  viewConfig,
  onViewConfigCta,
  onPanelsChange,
  onReactFlowInit,
  onCodeExtension,
  onFunctionReady,
}) => {
  const mountedRef = useRef(false);
  const graphActions = useDecisionGraphActions();
  const { stateStore, listenerStore } = useDecisionGraphRaw();
  const { decisionGraph, openTabs, activeTab } = useDecisionGraphState(({ decisionGraph, openTabs, activeTab }) => ({
    decisionGraph,
    openTabs,
    activeTab,
  }));

  const innerChange = useDebouncedCallback((graph: DecisionGraphType) => {
    onChange?.(graph);
  }, 100);

  useEffect(() => {
    if (viewConfig?.enabled) {
      const filtered = openTabs.filter((tab) => !!viewConfig?.permissions?.[tab]);

      stateStore.setState({
        openTabs: filtered,
        activeTab: !!viewConfig?.permissions?.[activeTab] ? activeTab : 'graph',
      });
    }
  }, [viewConfig]);

  useEffect(() => {
    stateStore.setState({
      id,
      disabled,
      components: Array.isArray(components) ? components : [],
      customNodes: Array.isArray(customNodes) ? customNodes : [],
      panels,
      viewConfig,
      viewConfigCta,
      hideLeftToolbar,
      dictionaries,
      mode,
    });
  }, [id, disabled, components, customNodes, panels, viewConfig, viewConfigCta, hideLeftToolbar, dictionaries, mode]);

  useEffect(() => {
    stateStore.setState({ name: name ?? 'graph.json' });
  }, [name]);

  useEffect(() => {
    stateStore.setState({ simulate });
  }, [simulate]);

  useEffect(() => {
    listenerStore.setState({
      onReactFlowInit,
      onPanelsChange,
      onCodeExtension,
      onFunctionReady,
      onViewConfigCta,
    });
  }, [onReactFlowInit, onPanelsChange, onCodeExtension, onFunctionReady, onViewConfigCta]);

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

    stateStore.setState({
      activePanel: defaultActivePanel,
      hideLeftToolbar,
    });
    mountedRef.current = true;
  }, []);

  return null;
};
