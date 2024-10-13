import { createVariableType } from '@gorules/zen-engine-wasm';
import type { DragDropManager } from 'dnd-core';
import equal from 'fast-deep-equal/es6/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { isWasmAvailable } from '../../helpers/wasm';
import type { SimulationTraceDataExpression } from '../decision-graph';
import { ExpressionStoreProvider, useExpressionStoreRaw } from './context/expression-store.context';
import type { ExpressionControllerProps } from './expression-controller';
import { ExpressionController } from './expression-controller';
import { ExpressionList } from './expression-list';
import './expression.scss';

export type ExpressionProps = {
  manager?: DragDropManager;
  traceData?: SimulationTraceDataExpression;
  inputData?: unknown;
} & ExpressionControllerProps;

export const Expression: React.FC<ExpressionProps> = ({ manager, traceData, inputData, ...props }) => {
  const [_, setMounted] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dndProps = useMemo(() => {
    if (manager) {
      return {
        manager,
      };
    }

    return {
      backend: HTML5Backend,
      options: {
        rootElement: container.current,
      },
    };
  }, [container.current, manager]);

  return (
    <div ref={container}>
      {container.current && (
        <DndProvider {...dndProps}>
          <ExpressionStoreProvider>
            <ExpressionController {...props} />
            <ExpressionList />
            <SimulateDataSync traceData={traceData} inputData={inputData} />
          </ExpressionStoreProvider>
        </DndProvider>
      )}
    </div>
  );
};

const SimulateDataSync: React.FC<Pick<ExpressionProps, 'traceData' | 'inputData'>> = ({ traceData, inputData }) => {
  const expressionStoreRaw = useExpressionStoreRaw();

  useEffect(() => {
    const currentState = expressionStoreRaw.getState();

    if (equal(currentState, traceData)) {
      return;
    }

    expressionStoreRaw.setState({ traceData });
  }, [traceData]);

  useEffect(() => {
    if (!isWasmAvailable()) {
      return;
    }

    expressionStoreRaw.setState({ inputVariableType: createVariableType(inputData) });
  }, [inputData]);

  return null;
};
