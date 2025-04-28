import type { DragDropManager } from 'dnd-core';
import React, { useMemo, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import RulebookProvider from './context/rb-store.context';
import { RulebookMain } from './rb-main';
import type { RulebookControllerProps } from './rulebook-controller';
import { RulebookController } from './rulebook-controller';
import './rulebook.scss';

export type RulebookProps = {
  manager?: DragDropManager;
} & RulebookControllerProps;

// Main Rulebook Component
export const Rulebook: React.FC<RulebookProps> = ({ manager, ...props }) => {
  const container = useRef<HTMLDivElement>(null);
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
    <div ref={container} className='grl-rb'>
      <DndProvider {...dndProps}>
        <RulebookProvider>
          <RulebookMain />
          <RulebookController {...props} />
        </RulebookProvider>
      </DndProvider>
    </div>
  );
};
