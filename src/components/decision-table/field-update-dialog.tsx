import { Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'

import { TableSchemaItem } from './dt.context'

export type FieldUpdateProps = {
  id?: string
  field?: TableSchemaItem
  onSuccess?: (column: TableSchemaItem) => void
  onDismiss?: () => void
  isOpen?: boolean
}

export const FieldUpdate: React.FC<
  React.PropsWithChildren<FieldUpdateProps>
> = (props) => {
  const { isOpen, onDismiss, onSuccess, field } = props
  const [form] = Form.useForm()

  useEffect(() => {
    if (isOpen) {
      form.resetFields()
      form.setFieldsValue({
        name: field?.name,
        field: field?.field,
      })
    }
  }, [isOpen, form, field])

  return (
    <Modal
      title='Update column'
      open={isOpen}
      onCancel={onDismiss}
      destroyOnClose
      okText='Update'
      okButtonProps={{
        form: 'field-update-dialog',
        htmlType: 'submit',
      }}
      width={360}
    >
      <Form
        id='field-update-dialog'
        form={form}
        layout='vertical'
        hideRequiredMark
        initialValues={{
          name: field?.name,
          field: field?.field,
        }}
        onFinish={(data) => {
          onSuccess?.({
            ...field,
            ...data,
          })
        }}
      >
        <Form.Item name='name' label='Label' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='field' label='Selector' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
