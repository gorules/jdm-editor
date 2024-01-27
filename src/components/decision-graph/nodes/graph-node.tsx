import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React from 'react';
import type { HandleProps } from 'reactflow';
import { Handle, Position } from 'reactflow';

import type { DecisionNodeProps } from '../../decision-node/decision-node';
import { DecisionNode } from '../../decision-node/decision-node';
import { useDecisionGraphStore } from '../context/dg-store.context';

export type GraphNodeProps = {
  id: string;
  handleLeft?: boolean | Partial<HandleProps>;
  handleRight?: boolean | Partial<HandleProps>;
  className?: string;
} & DecisionNodeProps;

export const GraphNode: React.FC<GraphNodeProps> = ({
  id,
  handleLeft = true,
  handleRight = true,
  className,
  ...decisionNodeProps
}) => {
  const { updateNode, removeNode } = useDecisionGraphStore(
    ({ updateNode, removeNode }) => ({
      updateNode,
      removeNode,
    }),
    equal,
  );

  return (
    <div className={clsx('grl-graph-node', className)} style={{ minWidth: 250 }}>
      {handleLeft && (
        <Handle
          className='grl-graph-node__handle-left'
          type='target'
          position={Position.Left}
          {...(typeof handleLeft !== 'boolean' ? handleLeft : {})}
        />
      )}
      <DecisionNode
        {...decisionNodeProps}
        onDelete={() => removeNode(id)}
        onNameChange={(name) => {
          updateNode(id, (draft) => {
            draft.name = name;
            return draft;
          });
        }}
      />
      {handleRight && (
        <Handle
          className='grl-graph-node__handle-right'
          type='source'
          position={Position.Right}
          {...(typeof handleRight !== 'boolean' ? handleRight : {})}
        />
      )}
    </div>
  );
};
