import { Divider, Typography } from 'antd';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import type { XYPosition } from 'reactflow';
import { match } from 'ts-pattern';

import { useDecisionGraphState } from '../context/dg-store.context';
import { DecisionNode } from '../nodes/decision-node';
import { NodeKind, type NodeSpecification } from '../nodes/specification-types';
import { nodeSpecification } from '../nodes/specifications';

export type GraphComponentsProps = {
  inputDisabled?: boolean;
  components?: React.ReactNode[];
  disabled?: boolean;
};

export const GraphComponents: React.FC<GraphComponentsProps> = React.memo(({ inputDisabled, disabled }) => {
  const customComponents = useDecisionGraphState((store) => store.components || []);

  const onDragStart = useCallback((event: React.DragEvent, nodeType: string) => {
    const target = event.target as HTMLDivElement;
    if (!target) {
      return;
    }

    const { offsetX, offsetY } = event.nativeEvent;
    const { height, width } = target.getBoundingClientRect();

    const positionData: XYPosition = {
      x: offsetX / width,
      y: offsetY / height,
    };

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('relativePosition', JSON.stringify(positionData));
  }, []);

  return (
    <>
      {Object.keys(nodeSpecification).map((kind: NodeKind) => (
        <React.Fragment key={kind}>
          <DragDecisionNode
            disabled={match(kind)
              .with(NodeKind.Input, () => disabled || inputDisabled)
              .otherwise(() => disabled)}
            specification={nodeSpecification[kind]}
            onDragStart={(event) => onDragStart(event, kind)}
          />
          {kind === NodeKind.Output && <Divider style={{ margin: '4px 0' }} />}
        </React.Fragment>
      ))}

      {customComponents?.length > 0 && <Divider style={{ margin: '4px 0' }} />}
      {customComponents.map((component) => (
        <DragDecisionNode
          key={component.displayName}
          disabled={disabled}
          specification={component}
          onDragStart={(event) => onDragStart(event, component.type)}
        />
      ))}
    </>
  );
});

const DragDecisionNode: React.FC<
  {
    specification: NodeSpecification;
    disabled?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ specification, disabled = false, ...props }) => {
  return (
    <div className={clsx('draggable-component')} draggable={!disabled} {...props}>
      <div style={{ pointerEvents: 'none' }}>
        <DecisionNode
          color={specification.color}
          icon={specification.icon}
          name={specification.displayName}
          type={specification.shortDescription}
        />
      </div>
    </div>
  );
};
