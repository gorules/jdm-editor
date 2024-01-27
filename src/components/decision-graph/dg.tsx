import type { DragDropManager } from 'dnd-core';
import React, { forwardRef } from 'react';
import { ReactFlowProvider } from 'reactflow';

import type { DecisionGraphContextProps } from './context/dg-store.context';
import { DecisionGraphProvider } from './context/dg-store.context';
import type { DecisionGraphEmptyType } from './dg-empty';
import { DecisionGraphEmpty } from './dg-empty';
import type { DecisionGraphWrapperProps } from './dg-wrapper';
import { DecisionGraphWrapper } from './dg-wrapper';
import './dg.scss';
import type { GraphRef } from './graph/graph';

export type DecisionGraphProps = {
  manager?: DragDropManager;
} & DecisionGraphWrapperProps &
  DecisionGraphContextProps &
  DecisionGraphEmptyType;

export const DecisionGraph = forwardRef<GraphRef, DecisionGraphProps>(
  ({ manager: _, reactFlowProOptions, hideExportImport, ...props }, ref) => {
    return (
      <div className={'grl-dg'}>
        <ReactFlowProvider>
          <DecisionGraphProvider>
            <DecisionGraphWrapper
              reactFlowProOptions={reactFlowProOptions}
              hideExportImport={hideExportImport}
              ref={ref}
            />
            <DecisionGraphEmpty {...props} />
          </DecisionGraphProvider>
        </ReactFlowProvider>
      </div>
    );
  },
);
