import { useRef } from 'react';
import type { DropTargetMonitor } from 'react-dnd';
import { useDrag, useDrop } from 'react-dnd';

import { useExpressionStore } from './context/expression-store.context';

type ExpressionDragObject = {
  path: string[];
};

type ExpressionDragCollect = {
  isDragging: boolean;
};

type ExpressionDropCollect = {
  dropDirection?: 'down' | 'up';
};

type ExpressionDndType = 'item' | 'group' | 'condition';

type ExpressionDndOptions = {
  type: ExpressionDndType;
  accept: ExpressionDndType[];
  path: string[];
  dropDirection?: ('up' | 'down')[];
};

const getDropDirection = (monitor: DropTargetMonitor): 'down' | 'up' => {
  const dropOffset = monitor.getDifferenceFromInitialOffset()?.y || 0;
  return dropOffset > 0 ? 'down' : 'up';
};

export const useExpressionDnd = ({ type, accept, path, dropDirection: allowedDropDirection }: ExpressionDndOptions) => {
  const _dropRef = useRef<HTMLDivElement>(null);
  const { disabled, configurable, swapRows } = useExpressionStore(({ disabled, configurable, swapRows }) => ({
    disabled,
    configurable,
    swapRows,
  }));

  const [{ dropDirection }, dropRef] = useDrop<ExpressionDragObject, unknown, ExpressionDropCollect>({
    accept,
    collect: (monitor) => {
      const isDropping = monitor.isOver({ shallow: true }) && monitor.canDrop();
      if (!isDropping) {
        return {};
      }

      return { dropDirection: getDropDirection(monitor) };
    },
    canDrop: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) {
        return false;
      }

      if (item.path.join('.') === path.join('.')) {
        return false;
      }

      if (allowedDropDirection) {
        return allowedDropDirection.includes(getDropDirection(monitor));
      }

      return true;
    },
    drop: (draggedRow, monitor) => {
      swapRows(draggedRow.path, path, getDropDirection(monitor));
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag<ExpressionDragObject, unknown, ExpressionDragCollect>({
    type,
    canDrag: configurable && !disabled,
    item: () => ({ path }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  previewRef(dropRef(_dropRef));

  return {
    dropRef: _dropRef,
    dragRef,
    isDragging,
    dropDirection,
  };
};
