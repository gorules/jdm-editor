import React from 'react';
import type { HandleProps } from 'reactflow';
import { Handle, Position } from 'reactflow';

import type { DecisionNodeProps } from '../../decision-node/decision-node';
import { DecisionNode } from '../../decision-node/decision-node';

export type GraphNodeProps = {
  handleLeft?: boolean | Partial<HandleProps>;
  handleRight?: boolean | Partial<HandleProps>;
} & DecisionNodeProps;

export const GraphNode: React.FC<GraphNodeProps> = ({
  handleLeft = true,
  handleRight = true,
  ...decisionNodeProps
}) => {
  return (
    <div style={{ minWidth: 250 }}>
      {handleLeft && (
        <Handle type='target' position={Position.Left} {...(typeof handleLeft !== 'boolean' ? handleLeft : {})} />
      )}
      <DecisionNode {...decisionNodeProps} />
      {handleRight && (
        <Handle type='source' position={Position.Right} {...(typeof handleRight !== 'boolean' ? handleRight : {})} />
      )}
    </div>
  );
};
