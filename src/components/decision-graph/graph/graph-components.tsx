import { Divider, Typography } from 'antd';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import type { XYPosition } from 'reactflow';
import { match } from 'ts-pattern';

import { useDecisionGraphState } from '../context/dg-store.context';
import { DecisionNode } from '../nodes/decision-node';
import { NodeKind } from '../nodes/specification-types';
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
    <div className={'wrapper'}>
      <div className={'wrapper__list-wrapper'}>
        <div className={'wrapper__list'}>
          {Object.keys(nodeSpecification).map((kind: NodeKind) => (
            <React.Fragment key={kind}>
              <DragDecisionNode
                disabled={match(kind)
                  .with(NodeKind.Input, () => disabled || inputDisabled)
                  .otherwise(() => disabled)}
                kind={kind}
                onDragStart={(event) => onDragStart(event, kind)}
              />
              {kind === NodeKind.Output && <Divider style={{ margin: '4px 0' }} />}
            </React.Fragment>
          ))}

          {customComponents?.length > 0 && <Divider style={{ margin: '4px 0' }} />}
          {customComponents.map((component) => (
            <div key={component.type} className={'component'}>
              <div
                className={clsx(['icon', disabled && 'disabled'])}
                onDragStart={(event) => onDragStart(event, component.type)}
                draggable={!disabled}
              >
                {component?.renderIcon?.()}
              </div>
              <Typography.Text type={'secondary'}>{component.name}</Typography.Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const DragDecisionNode: React.FC<
  {
    kind: NodeKind;
    disabled?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ kind, disabled = false, ...props }) => {
  const specification = nodeSpecification[kind];

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
