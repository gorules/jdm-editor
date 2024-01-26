import clsx from 'clsx';
import React from 'react';
import type { HandleProps } from 'reactflow';
import { Handle, Position } from 'reactflow';

import type { DecisionNodeProps } from '../../decision-node/decision-node';
import { DecisionNode } from '../../decision-node/decision-node';

export type GraphNodeProps = {
  handleLeft?: boolean | Partial<HandleProps>;
  handleRight?: boolean | Partial<HandleProps>;
  className?: string;
} & DecisionNodeProps;

export const GraphNode: React.FC<GraphNodeProps> = ({
  handleLeft = true,
  handleRight = true,
  className,
  ...decisionNodeProps
}) => {
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
      <DecisionNode {...decisionNodeProps} />
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
