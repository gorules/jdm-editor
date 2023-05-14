import { DeploymentUnitOutlined } from '@ant-design/icons'
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  DroppableProvided,
} from '@hello-pangea/dnd'
import { Card, Form, Modal, Typography } from 'antd'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import { Stack } from '../stack'
import { StrictModeDroppable } from '../strict-mode-droppable'
import { TableSchemaItem } from './dt.context'

export type FieldsReorderProps = {
  fields?: TableSchemaItem[]
  onSuccess?: (columns: TableSchemaItem[]) => void
  onDismiss?: () => void
  isOpen?: boolean
}

export const FieldsReorder: React.VFC<FieldsReorderProps> = (props) => {
  const { isOpen, onDismiss, onSuccess, fields } = props

  const [columns, setColumns] = useState<TableSchemaItem[]>([])

  useEffect(() => {
    if (isOpen) {
      setColumns([...(fields || [])])
    }
  }, [isOpen, fields])

  return (
    <Modal
      title='Reorder fields'
      open={isOpen}
      onCancel={onDismiss}
      width={360}
      destroyOnClose
      bodyStyle={{
        paddingTop: 17,
      }}
      okText='Update'
      okButtonProps={{
        htmlType: 'submit',
        form: 'fields-reorder-dialog',
      }}
    >
      <Form
        id='fields-reorder-dialog'
        onFinish={() => {
          onSuccess?.(columns)
        }}
      >
        <DragDropContext
          onDragEnd={(result: DropResult) => {
            // dropped outside the list
            if (!result.destination) {
              return
            }
            const tmpList = [...columns]

            const element = tmpList.splice(result.source.index, 1)[0]
            tmpList.splice(result.destination.index, 0, element)
            setColumns(tmpList)
          }}
        >
          <StrictModeDroppable droppableId={`columns`}>
            {(provided: DroppableProvided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Stack gap={8} horizontalAlign='stretch'>
                  {columns.map((column, index) => (
                    <Draggable
                      key={column.id}
                      draggableId={column.id}
                      index={index}
                    >
                      {(
                        provided: DraggableProvided,
                        snapshot: DraggableStateSnapshot
                      ) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={provided.draggableProps.style}
                          bodyStyle={{ padding: '0.5rem' }}
                          className={clsx(
                            snapshot.isDragging &&
                              'grl-table__fields-reorder__card--dragging'
                          )}
                        >
                          <div className='grl-table__fields-reorder__item'>
                            <Stack horizontal verticalAlign='center'>
                              <div
                                className='grl-table__fields-reorder__handle'
                                {...provided.dragHandleProps}
                              >
                                <DeploymentUnitOutlined />
                              </div>
                              <Stack grow gap={0}>
                                <Typography.Text>
                                  {column?.name}
                                </Typography.Text>
                                <Typography.Text
                                  type='secondary'
                                  style={{ fontSize: 12 }}
                                >
                                  {column?.field}
                                </Typography.Text>
                              </Stack>
                            </Stack>
                          </div>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Stack>
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </Form>
    </Modal>
  )
}
