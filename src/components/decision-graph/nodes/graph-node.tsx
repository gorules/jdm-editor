import clsx from 'clsx';
import React from 'react';
import type { HandleProps } from 'reactflow';
import { Handle, Position } from 'reactflow';

import type { DecisionNodeProps } from '../../decision-node/decision-node';
import { DecisionNode } from '../../decision-node/decision-node';
import { useDecisionGraphActions, useDecisionGraphState } from '../context/dg-store.context';
import type { MinimalNodeSpecification } from './specification-types';

export type GraphNodeProps = {
  id: string;
  handleLeft?: boolean | Partial<HandleProps>;
  handleRight?: boolean | Partial<HandleProps>;
  className?: string;
  specification: MinimalNodeSpecification;
} & Partial<DecisionNodeProps>;

export const GraphNode: React.FC<GraphNodeProps> = ({
  id,
  handleLeft = true,
  handleRight = true,
  className,
  specification,
  ...decisionNodeProps
}) => {
  const graphActions = useDecisionGraphActions();
  const { disabled } = useDecisionGraphState(({ disabled }) => ({ disabled }));

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
        disabled={disabled}
        icon={specification.icon}
        color={specification.color}
        type={specification.displayName}
        onDelete={() => graphActions.removeNode(id)}
        onViewDocumentation={() => {
          window.open(specification.documentationUrl, '_href');
        }}
        onNameChange={(name) => {
          graphActions.updateNode(id, (draft) => {
            draft.name = name;
            return draft;
          });
        }}
        onDuplicate={() => {
          graphActions.duplicateNode(id);
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
