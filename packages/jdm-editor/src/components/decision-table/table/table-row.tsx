import type { Row } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { VirtualItem } from '@tanstack/react-virtual';
import { Typography } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { DiffMetadata } from '../../decision-graph';
import { useDecisionTableActions, useDecisionTableState } from '../context/dt-store.context';

export const TableRow: React.FC<{
  row: Row<Record<string, string>>;
  disabled?: boolean;
  virtualItem: VirtualItem;
  onResize?: (node: HTMLElement) => void;
}> = ({ row, disabled, virtualItem, onResize }) => {
  const trRef = useRef<HTMLTableRowElement>(null);
  const tableActions = useDecisionTableActions();
  const { cursor, isActive } = useDecisionTableState(({ cursor, activeRules }) => ({
    cursor,
    isActive: Array.isArray(activeRules) && activeRules.includes(row.id),
  }));

  const [{ isDropping, direction }, dropRef] = useDrop({
    accept: 'row',
    collect: (monitor) => ({
      isDropping: monitor.isOver({ shallow: true }),
      direction: (monitor.getDifferenceFromInitialOffset()?.y || 0) > 0 ? 'down' : 'up',
    }),
    drop: (draggedRow: Row<Record<string, string>>) => tableActions.swapRows(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });

  previewRef(dropRef(trRef));

  useEffect(() => {
    if (!trRef.current) {
      return;
    }

    onResize?.(trRef.current);
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.target.hasAttribute('data-virtual-index')) {
          return;
        }

        onResize?.(entry.target as HTMLElement);
      });
    });

    resizeObserver.observe(trRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const { rowValue } = useDecisionTableState(({ decisionTable }) => ({
    rowValue: (decisionTable?.rules || [])?.find((rule) => rule._id === row?.original?._id),
  }));

  const diff = useMemo(() => {
    return rowValue?._diff as DiffMetadata;
  }, [rowValue]);
  const diffStatus = diff?.status;

  return (
    <tr
      ref={trRef}
      className={clsx(
        'table-row',
        isDropping && direction === 'down' && 'dropping-down',
        isDropping && direction === 'up' && 'dropping-up',
        !diffStatus && isActive && 'active',
        !diffStatus && disabled && 'disabled',
        !diffStatus && cursor?.y === virtualItem.index && !disabled && 'selected',
        diffStatus && `diff-${diffStatus}`,
      )}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      data-virtual-index={virtualItem.index}
    >
      <td
        className={clsx('sort-handler', !disabled && 'draggable', diffStatus && 'diff')}
        ref={disabled ? undefined : dragRef}
        onContextMenuCapture={() => tableActions.setCursor({ x: 'id', y: virtualItem.index })}
      >
        <div className={'text'}>
          <Typography>{virtualItem.index + 1}</Typography>
        </div>
      </td>
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className={clsx(
            !disabled && cursor?.x === cell.column.id && cursor?.y === virtualItem.index && 'selected',
            diff?.fields?.[cell?.column?.id]?.status && `diff-${diff?.fields?.[cell?.column?.id]?.status}`,
          )}
          style={{ width: cell.column.getSize() }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
