import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { useExpressionStore } from './context/expression-store.context';

type ExpressionDragObject = {
  path: string[];
};

type ExpressionDragCollect = {
  isDragging: boolean;
};

type ExpressionDropCollect = {
  isDropping: boolean;
  dropDirection: 'down' | 'up';
};

type ExpressionDndType = 'item' | 'group' | 'condition';

type ExpressionDndOptions = {
  type: ExpressionDndType;
  accept: ExpressionDndType[];
  path: string[];
};

export const useExpressionDnd = ({ type, accept, path }: ExpressionDndOptions) => {
  const _dropRef = useRef<HTMLDivElement>(null);
  const { disabled, configurable, swapRows } = useExpressionStore(({ disabled, configurable, swapRows }) => ({
    disabled,
    configurable,
    swapRows,
  }));

  const [{ isDropping, dropDirection }, dropRef] = useDrop<ExpressionDragObject, unknown, ExpressionDropCollect>({
    accept,
    collect: (monitor) => ({
      isDropping: monitor.isOver({ shallow: true }),
      dropDirection: (monitor.getDifferenceFromInitialOffset()?.y || 0) > 0 ? 'down' : 'up',
    }),
    drop: (draggedRow) => {
      swapRows(draggedRow.path, path);
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
    isDropping,
    dropDirection,
  };
};
