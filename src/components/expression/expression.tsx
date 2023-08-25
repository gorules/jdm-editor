import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ExpressionStoreProvider } from './context/expression-store.context';
import type { ExpressionControllerProps } from './expression-controller';
import { ExpressionController } from './expression-controller';
import { ExpressionList } from './expression-list';
import './expression.scss';

export type ExpressionRef = null;

export type ExpressionProps = {
  manager?: any;
} & ExpressionControllerProps;

export const Expression = React.forwardRef<ExpressionRef, ExpressionProps>(({ manager, ...props }) => {
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
  }, [container.current]);

  return (
    <div ref={container}>
      {container.current && (
        <DndProvider {...dndProps}>
          <ExpressionStoreProvider>
            <ExpressionController {...props} />
            <ExpressionList />
          </ExpressionStoreProvider>
        </DndProvider>
      )}
    </div>
  );
});
