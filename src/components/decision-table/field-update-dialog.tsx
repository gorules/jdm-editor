import { Cascader, Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'

import { SchemaSelectProps, recursiveSelect } from '../../helpers/components'
import { TableSchemaItem } from './dt.context'

export type FieldUpdateProps = {
  id?: string
  field?: TableSchemaItem
  onSuccess?: (column: TableSchemaItem) => void
  onDismiss?: () => void
  isOpen?: boolean
  schema?: SchemaSelectProps[]
}

export const FieldUpdate: React.FC<
  React.PropsWithChildren<FieldUpdateProps>
> = (props) => {
  const { isOpen, onDismiss, onSuccess, field, schema } = props
  const [form] = Form.useForm()

  useEffect(() => {
    if (isOpen) {
      form.resetFields()
      form.setFieldsValue({
        name: field?.name,
        field: field?.field,
        defaultValue: field?.defaultValue,
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
        requiredMark={false}
        initialValues={{
          name: field?.name,
          field: field?.field,
          defaultValue: field?.defaultValue,
        }}
        onFinish={(data) => {
          onSuccess?.({
            ...field,
            ...data,
          })
        }}
      >
        {schema && (
          <Form.Item label={'Chose from list'}>
            <Cascader
              fieldNames={{ label: 'name', value: 'field', children: 'items' }}
              options={schema}
              onChange={(val) => {
                const field = recursiveSelect(val as string[], schema)
                if (field) {
                  form.setFieldsValue({
                    name: field?.name,
                    field: field?.field,
                  })
                }
              }}
            ></Cascader>
          </Form.Item>
        )}
        <Form.Item name='name' label='Label' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='field' label='Selector' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='defaultValue' label='Default Value'>
          <Input autoComplete='off' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
