import { Variable, VariableType } from '@gorules/zen-engine-wasm';
import type { DragDropManager } from 'dnd-core';
import equal from 'fast-deep-equal/es6/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { isWasmAvailable } from '../../helpers/wasm';
import type { ExpressionStore } from './context/expression-store.context';
import { ExpressionStoreProvider, useExpressionStore, useExpressionStoreRaw } from './context/expression-store.context';
import { ExpressionCommandBar } from './expression-command-bar';
import type { ExpressionControllerProps } from './expression-controller';
import { ExpressionController } from './expression-controller';
import { ExpressionHeading } from './expression-heading';
import { ExpressionList } from './expression-list';
import './expression.scss';
import { walkExpressions } from './walker';

export type ExpressionProps = {
  manager?: DragDropManager;
  debug?: ExpressionStore['debug'];
  hideCommandBar?: boolean;
} & ExpressionControllerProps;

export const Expression: React.FC<ExpressionProps> = ({ manager, debug, hideCommandBar, ...props }) => {
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
            {!hideCommandBar && <ExpressionCommandBar />}
            <ExpressionHeading />
            <ExpressionBody />
            {/* Expression overscroll */}
            <div style={{ height: '40px' }} />
            <SimulateDataSync debug={debug} />
            <ExpressionDataInference />
          </ExpressionStoreProvider>
        </DndProvider>
      )}
    </div>
  );
};

const ExpressionBody: React.FC = () => {
  const { expressions } = useExpressionStore(({ expressions }) => ({ expressions }), equal);

  return <ExpressionList expressions={expressions} />;
};

const SimulateDataSync: React.FC<Pick<ExpressionProps, 'debug'>> = ({ debug }) => {
  const expressionStoreRaw = useExpressionStoreRaw();

  useEffect(() => {
    const currentState = expressionStoreRaw.getState();
    if (equal(currentState.debug, debug)) {
      return;
    }

    expressionStoreRaw.setState({ debug });
  }, [debug]);

  useEffect(() => {
    if (!isWasmAvailable()) {
      return;
    }

    const isLoop = (store: ExpressionStore) => {
      return store.debug?.snapshot.executionMode === 'loop';
    };

    const applyDebug = (state: ExpressionStore) => {
      const inputData = state.debug?.inputData;
      if (!inputData) {
        return;
      }

      const varInputData = new Variable(inputData.data);
      if (isLoop(state)) {
        let newInputData = varInputData.get(state.debugIndex).cloneWith('$nodes', inputData.$nodes);
        if (inputData.$) {
          newInputData = newInputData.cloneWith('$', inputData.$);
        }

        expressionStoreRaw.setState({
          calculatedInputData: newInputData,
          inputVariableType: VariableType.fromVariable(newInputData),
        });
      } else {
        let newInputData = varInputData.cloneWith('$nodes', inputData.$nodes);
        if (inputData.$) {
          newInputData = newInputData.cloneWith('$', inputData.$);
        }

        expressionStoreRaw.setState({
          calculatedInputData: newInputData,
          inputVariableType: VariableType.fromVariable(newInputData),
        });
      }
    };

    applyDebug(expressionStoreRaw.getState());
    return expressionStoreRaw.subscribe((state, prevState) => {
      if (state.debugIndex === prevState.debugIndex && state.debug === prevState.debug) {
        return;
      }

      applyDebug(state);
    });
  }, []);

  return null;
};

const ExpressionDataInference: React.FC = () => {
  const expressionStoreRaw = useExpressionStoreRaw();

  useEffect(() => {
    const calculateHash = (store: ExpressionStore) => {
      if (!store.inputVariableType) {
        return null;
      }

      const referenceHash: Record<string, string> = {};
      walkExpressions(store.expressions).forEach(({ type, entry }) => {
        if (type === 'item') {
          referenceHash[entry.key] = entry.value;
        }
      });

      return referenceHash;
    };

    const applyCalculatedType = (store: ExpressionStore) => {
      if (!store.inputVariableType) {
        expressionStoreRaw.setState({ calculatedVariableType: undefined });
        return;
      }

      const variableType = store.inputVariableType.clone();
      walkExpressions(store.expressions).forEach(({ type, entry }) => {
        if (type === 'item') {
          const newType = variableType.calculateType(entry.value);
          variableType.set(`$.${entry.key}`, newType);
        }
      });

      expressionStoreRaw.setState({ calculatedVariableType: variableType });
    };

    applyCalculatedType(expressionStoreRaw.getState());
    return expressionStoreRaw.subscribe((state, prevState) => {
      const prevHash = calculateHash(prevState);
      const hash = calculateHash(state);

      if (equal(prevHash, hash)) {
        return;
      }

      applyCalculatedType(state);
    });
  }, []);

  return null;
};
