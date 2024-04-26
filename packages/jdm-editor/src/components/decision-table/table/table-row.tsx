import type { Row } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { VirtualItem } from '@tanstack/react-virtual';
import { Typography } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

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

  return (
    <tr
      ref={trRef}
      className={clsx(
        'table-row',
        isDropping && direction === 'down' && 'dropping-down',
        isDropping && direction === 'up' && 'dropping-up',
        isActive && 'active',
        disabled && 'disabled',
        cursor?.y === virtualItem.index && !disabled && 'selected',
      )}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      data-virtual-index={virtualItem.index}
    >
      <td
        className={clsx('sort-handler', !disabled && 'draggable')}
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
          className={clsx(!disabled && cursor?.x === cell.column.id && cursor?.y === virtualItem.index && 'selected')}
          style={{ width: cell.column.getSize() }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
