import { Card, Form, Modal, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDrag, useDrop } from 'react-dnd';

import { Stack } from '../../stack';
import type { TableSchemaItem } from '../context/dt-store.context';

export type FieldsReorderProps = {
  fields?: TableSchemaItem[];
  onSuccess?: (columns: TableSchemaItem[]) => void;
  onDismiss?: () => void;
  isOpen?: boolean;
  getContainer?: () => HTMLElement;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const FieldCard: React.FC<{
  col: TableSchemaItem;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}> = ({ col, index, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop<DragItem, void>({
    accept: 'col',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'col',
    item: () => {
      return { id: col.id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <Card ref={ref} style={{ opacity: isDragging ? 0 : 1 }} bodyStyle={{ padding: '0.5rem' }}>
      <div className='grl-dt__fields-reorder__item'>
        <Stack horizontal verticalAlign='center'>
          <div className='grl-dt__fields-reorder__handle'>=</div>
          <Stack grow gap={0}>
            <Typography.Text>{col.name}</Typography.Text>
            <Typography.Text type='secondary' style={{ fontSize: 12 }}>
              {col.field}
            </Typography.Text>
          </Stack>
        </Stack>
      </div>
    </Card>
  );
};

export const FieldsReorder: React.FC<FieldsReorderProps> = (props) => {
  const { isOpen, onDismiss, onSuccess, fields, getContainer } = props;

  const [columns, setColumns] = useState<TableSchemaItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setColumns([...(fields || [])]);
    }
  }, [isOpen, fields]);

  const moveCard = (from: number, to?: number) => {
    if (to === undefined) {
      return;
    }

    const tmpList = [...columns];
    const element = tmpList.splice(from, 1)[0];
    tmpList.splice(to, 0, element);
    setColumns(tmpList);
  };

  return (
    <Modal
      title='Reorder fields'
      open={isOpen}
      onCancel={onDismiss}
      width={360}
      destroyOnClose
      bodyStyle={{ paddingTop: 17 }}
      okText='Update'
      okButtonProps={{
        htmlType: 'submit',
        form: 'fields-reorder-dialog',
      }}
      getContainer={getContainer}
    >
      <Form id='fields-reorder-dialog' onFinish={() => onSuccess?.(columns)}>
        <Stack gap={8} horizontalAlign='stretch'>
          {columns.map((column, index) => (
            <FieldCard key={column.id} col={column} index={index} moveCard={moveCard} />
          ))}
        </Stack>
      </Form>
    </Modal>
  );
};
