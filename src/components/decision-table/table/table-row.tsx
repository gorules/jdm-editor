import type { Row } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Typography } from 'antd';
import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { shallow } from 'zustand/shallow';

import { useDecisionTableStore } from '../context/dt-store.context';

const InnerTableRow: React.FC<{
  index: number;
  row: Row<Record<string, string>>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
  disabled?: boolean;
}> = ({ index, row, reorderRow, disabled }) => {
  const setCursor = useDecisionTableStore((store) => store.setCursor);
  const cursor = useDecisionTableStore((store) => store.cursor, shallow);
  const activeRules = useDecisionTableStore((store) => store.activeRules, shallow);
  const trRef = useRef<HTMLTableRowElement>(null);
  const [{ isDropping, direction }, dropRef] = useDrop({
    accept: 'row',
    collect: (monitor) => ({
      isDropping: monitor.isOver({ shallow: true }),
      direction: (monitor.getDifferenceFromInitialOffset()?.y || 0) > 0 ? 'down' : 'up',
    }),
    drop: (draggedRow: Row<Record<string, string>>) => reorderRow(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });

  previewRef(dropRef(trRef));

  const isActive = useMemo(() => {
    return Array.isArray(activeRules) && activeRules.indexOf(row.id) > -1;
  }, [row.id, activeRules]);

  return (
    <tr
      ref={disabled ? undefined : trRef}
      className={clsx(
        'table-row',
        isDropping && direction === 'down' && 'dropping-down',
        isDropping && direction === 'up' && 'dropping-up',
        isActive && 'active',
        cursor?.y === index && 'selected',
      )}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <td
        className={clsx('sort-handler', !disabled && 'draggable')}
        ref={disabled ? undefined : dragRef}
        onContextMenuCapture={() => {
          setCursor({
            x: 'id',
            y: index,
          });
        }}
      >
        <div className={'text'}>
          <Typography>{index + 1}</Typography>
        </div>
      </td>
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className={clsx(cursor?.x === cell.column.id && cursor?.y === index && 'selected')}
          style={{ width: cell.column.getSize() }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

export const TableRow = React.memo(InnerTableRow);
