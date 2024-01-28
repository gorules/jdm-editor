import {
  BranchesOutlined,
  CloseOutlined,
  CodeOutlined,
  FunctionOutlined,
  LoginOutlined,
  LogoutOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { Button, Typography } from 'antd';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import type { XYPosition } from 'reactflow';

import { useDecisionGraphState } from '../context/dg-store.context';

export type GraphComponentsProps = {
  inputDisabled?: boolean;
  onPaste?: () => void;
  components?: React.ReactNode[];
  onClose?: () => void;
  disabled?: boolean;
};

export const GraphComponents: React.FC<GraphComponentsProps> = React.memo(
  ({ inputDisabled, onPaste, onClose, disabled }) => {
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
            <div className={'component'}>
              <div
                className={clsx(['icon', (inputDisabled || disabled) && 'disabled'])}
                onDragStart={(event) => onDragStart(event, 'inputNode')}
                draggable={!inputDisabled || disabled}
              >
                <LoginOutlined />
              </div>
              <Typography.Text type={'secondary'}>Request</Typography.Text>
            </div>
            <div className={'component'}>
              <div
                className={clsx(['icon', disabled && 'disabled'])}
                onDragStart={(event) => onDragStart(event, 'outputNode')}
                draggable={!disabled}
              >
                <LogoutOutlined />
              </div>
              <Typography.Text type={'secondary'}>Response</Typography.Text>
            </div>

            <div className={'divider'} />

            <div className={'component'}>
              <div
                className={clsx(['icon', disabled && 'disabled'])}
                onDragStart={(event) => onDragStart(event, 'decisionTableNode')}
                draggable={!disabled}
              >
                <TableOutlined />
              </div>
              <Typography.Text type={'secondary'}>Table</Typography.Text>
            </div>

            <div className={'component'}>
              <div
                className={clsx(['icon', disabled && 'disabled'])}
                onDragStart={(event) => onDragStart(event, 'functionNode')}
                draggable={!disabled}
              >
                <FunctionOutlined />
              </div>
              <Typography.Text type={'secondary'}>Function</Typography.Text>
            </div>

            <div className={'component'}>
              <div
                className={clsx(['icon', disabled && 'disabled'])}
                onDragStart={(event) => onDragStart(event, 'expressionNode')}
                draggable={!disabled}
              >
                <CodeOutlined />
              </div>
              <Typography.Text type={'secondary'}>Expression</Typography.Text>
            </div>

            <div className={'component'}>
              <div
                className={clsx(['icon', disabled && 'disabled'])}
                onDragStart={(event) => onDragStart(event, 'switchNode')}
                draggable={!disabled}
              >
                <BranchesOutlined />
              </div>
              <Typography.Text type={'secondary'}>Switch</Typography.Text>
            </div>

            {customComponents?.length > 0 && <div className={'divider'} />}
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
        <div className={'wrapper__actions'}>
          <Button onClick={onPaste} type='default' style={{ marginTop: 'auto', width: '100%' }}>
            Paste
          </Button>
        </div>
      </div>
    );
  },
);
