import type { DragDropManager } from 'dnd-core';
import React, { forwardRef } from 'react';
import { ReactFlowProvider } from 'reactflow';

import type { DecisionGraphContextProps } from './context/dg-store.context';
import { DecisionGraphProvider } from './context/dg-store.context';
import type { DecisionGraphEmptyType } from './dg-empty';
import { DecisionGraphEmpty } from './dg-empty';
import { DecisionGraphInferTypes } from './dg-infer';
import type { DecisionGraphWrapperProps } from './dg-wrapper';
import { DecisionGraphWrapper } from './dg-wrapper';
import './dg.scss';
import type { GraphRef } from './graph/graph';

export type DecisionGraphProps = {
  manager?: DragDropManager;
} & DecisionGraphWrapperProps &
  DecisionGraphContextProps &
  DecisionGraphEmptyType;

export type DecisionGraphRef = GraphRef;

export const DecisionGraph = forwardRef<DecisionGraphRef, DecisionGraphProps>(
  ({ manager: _, reactFlowProOptions, tabBarExtraContent, ...props }, ref) => {
    return (
      <div className={'grl-dg'}>
        <ReactFlowProvider>
          <DecisionGraphProvider>
            <DecisionGraphWrapper
              ref={ref}
              reactFlowProOptions={reactFlowProOptions}
              tabBarExtraContent={tabBarExtraContent}
            />
            <DecisionGraphInferTypes />
            <DecisionGraphEmpty {...props} />
          </DecisionGraphProvider>
        </ReactFlowProvider>
      </div>
    );
  },
);
