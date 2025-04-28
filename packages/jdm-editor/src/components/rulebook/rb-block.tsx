import { DownOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons';
import type { Row } from '@tanstack/react-table';
import { Button, Dropdown, Tooltip } from 'antd';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { match } from 'ts-pattern';

import { ConfirmAction } from '../confirm-action';
import { NodeColor, nodeSpecification } from '../decision-graph';
import { TextEdit } from '../text-edit';
import { BlockExpression } from './components/block-expression';
import { BlockFunction } from './components/block-function';
import { BlockMarkdown } from './components/block-markdown';
import { BlockDecisionTable } from './components/block-table';
import { useRulebookActions, useRulebookState } from './context/rb-store.context';
import type { Block } from './rb-types';

// Generic Block Component that handles common behavior
export const BlockComponent: React.FC<{
  block: Block;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  index: number;
  onSelect: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onAddBlockAfter: (type: string) => void;
}> = ({ block, index, isSelected, isFirst, isLast, onSelect, onDelete, onMoveUp, onMoveDown, onAddBlockAfter }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const [collapsed, setCollapsed] = useState(false);

  const { disabled, configurable } = useRulebookState(({ rulebook, disabled, configurable }) => ({
    disabled,
    configurable,
  }));

  const { swapBlocks, updateBlock } = useRulebookActions();

  const blockSpecification = useMemo(() => {
    return match(block.type)
      .with('markdown', () => nodeSpecification.markdownNode)
      .with('decisionTable', () => nodeSpecification.decisionTableNode)
      .with('expression', () => nodeSpecification.expressionNode)
      .with('function', () => nodeSpecification.functionNode)
      .otherwise(() => undefined);
  }, [block]);

  const blockTypes = [
    {
      key: 'markdown',
      label: 'Markdown',
    },
    {
      key: 'decisionTable',
      label: 'Decision Table',
    },
    {
      key: 'expression',
      label: 'Expression',
    },
    {
      key: 'function',
      label: 'Function',
    },
  ];

  const nodeColor = match(blockSpecification?.color)
    .with('primary', () => NodeColor.Blue)
    .otherwise((c) => c);

  const [{ isDropping, direction }, dropRef] = useDrop({
    accept: 'row',
    collect: (monitor) => ({
      isDropping: monitor.isOver({ shallow: true }),
      direction: (monitor.getDifferenceFromInitialOffset()?.y || 0) > 0 ? 'down' : 'up',
    }),
    drop: (draggedRow: Row<Record<string, string>>) => {
      swapBlocks(draggedRow.index, index);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    canDrag: configurable && !disabled,
    item: () => ({ ...block, index }),
    type: 'row',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  previewRef(dropRef(blockRef));

  return (
    <div
      ref={blockRef}
      className={clsx([
        'grl-rb-block',
        `grl-rb-block--${block.type}`,
        isSelected && 'grl-rb-block--selected',
        isDropping && direction === 'down' && 'dropping-down',
        isDropping && direction === 'up' && 'dropping-up',
      ])}
      onClick={onSelect}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Block gutter (left side controls) */}
      <div className='grl-rb-block-gutter'>
        <ChevronDown
          size={16}
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        />
      </div>

      {block.type !== 'markdown' && (
        <div className={clsx(['grl-rb-block-header'])} ref={dragRef}>
          <div
            className={`grl-rb-block-header-icon grl-rb-block-header-icon--${block.type}`}
            style={{
              backgroundColor: nodeColor,
            }}
          >
            {blockSpecification?.icon}
          </div>
          <TextEdit
            onChange={(val) => {
              updateBlock(block.id, (draft) => {
                draft.name = val;
                return draft;
              });
            }}
            disabled={disabled}
            value={block.name}
          />
        </div>
      )}

      <div
        className={clsx([
          'grl-rb-block-content',
          `grl-rb-block-content--${block.type}`,
          collapsed && 'grl-rb-block-content--hide',
        ])}
      >
        {block.type === 'markdown' && <BlockMarkdown id={block.id} />}
        {block.type === 'decisionTable' && <BlockDecisionTable id={block.id} />}
        {block.type === 'function' && <BlockFunction id={block.id} />}
        {block.type === 'expression' && <BlockExpression id={block.id} />}
      </div>

      {/* Block actions (right side) - only show when selected and not disabled */}
      {isSelected && !disabled && (
        <div className='grl-rb-block-actions'>
          <Tooltip title='Move Up'>
            <Button type={'text'} icon={<UpOutlined />} onClick={onMoveUp} size={'small'} disabled={isFirst} />
          </Tooltip>
          <Tooltip title='Move Down'>
            <Button type={'text'} icon={<DownOutlined />} onClick={onMoveDown} size={'small'} disabled={isLast} />
          </Tooltip>
          <Tooltip title='Delete'>
            <ConfirmAction iconOnly onConfirm={onDelete} size={'small'} />
          </Tooltip>
        </div>
      )}

      {!disabled && !isDragging && (
        <div className='grl-rb-block-add'>
          <Dropdown
            menu={{
              items: blockTypes.map((type) => ({
                key: type.key,
                label: type.label,
                onClick: () => onAddBlockAfter(type.key),
              })),
            }}
            placement='bottomLeft'
            trigger={['click']}
          >
            <Tooltip title='Add block'>
              <button onClick={(e) => e.stopPropagation()}>
                <PlusOutlined />
              </button>
            </Tooltip>
          </Dropdown>
        </div>
      )}
    </div>
  );
};
