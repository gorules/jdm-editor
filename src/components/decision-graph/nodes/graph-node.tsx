import clsx from 'clsx';
import React from 'react';
import type { HandleProps } from 'reactflow';
import { Handle, Position, useStore as useReactFlow } from 'reactflow';

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
  const isSelected = useReactFlow(({ getNodes }) => getNodes().some((node) => node.id === id && node.selected));
  const { updateNode, removeNode } = useDecisionGraphStore(({ updateNode, removeNode }) => ({
    updateNode,
    removeNode,
  }));

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
        isSelected={isSelected}
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
