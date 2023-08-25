import { Button, Typography } from 'antd';
import clsx from 'clsx';
import equal from 'fast-deep-equal/es6/react';
import React, { useCallback } from 'react';
import { XYPosition } from 'reactflow';

import { CustomNodeType, useDecisionGraphStore } from '../context/dg-store.context';

export type GraphComponentsProps = {
  inputDisabled?: boolean;
  outputDisabled?: boolean;
  onPaste?: () => void;
  components?: React.ReactNode[];
};

export const GraphComponents: React.FC<GraphComponentsProps> = ({ inputDisabled, outputDisabled, onPaste }) => {
  const customComponents: CustomNodeType[] = useDecisionGraphStore((store) => store.components || [], equal);

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
      <Typography.Text style={{ marginBottom: '1rem' }}>Drag and Drop components</Typography.Text>
      <div className={'list'}>
        <div
          className={clsx(['component', inputDisabled && 'disabled'])}
          onDragStart={(event) => onDragStart(event, 'inputNode')}
          draggable={!inputDisabled}
        >
          <Typography.Text strong type={inputDisabled ? 'secondary' : undefined}>
            Input
          </Typography.Text>
        </div>
        <div
          className={clsx(['component', outputDisabled && 'disabled'])}
          onDragStart={(event) => onDragStart(event, 'outputNode')}
          draggable={!outputDisabled}
        >
          <Typography.Text strong type={outputDisabled ? 'secondary' : undefined}>
            Output
          </Typography.Text>
        </div>
        <div className={clsx(['component'])} onDragStart={(event) => onDragStart(event, 'decisionTableNode')} draggable>
          <Typography.Text strong>Decision Table</Typography.Text>
        </div>
        <div className={clsx(['component'])} onDragStart={(event) => onDragStart(event, 'functionNode')} draggable>
          <Typography.Text strong>Function</Typography.Text>
        </div>
        <div className={clsx(['component'])} onDragStart={(event) => onDragStart(event, 'expressionNode')} draggable>
          <Typography.Text strong>Expression</Typography.Text>
        </div>
        {customComponents.map((component) => (
          <div
            key={component.type}
            className={clsx(['component'])}
            onDragStart={(event) => onDragStart(event, component.type)}
            draggable
          >
            <Typography.Text strong>{component.name}</Typography.Text>
          </div>
        ))}
      </div>
      <Button onClick={onPaste} type='default' style={{ marginTop: 'auto' }}>
        Paste from clipboard
      </Button>
    </div>
  );
};
