import { Cascader, Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'
import slugify from 'slugify'
import { v4 } from 'uuid'

import { SchemaSelectProps, recursiveSelect } from '../../../helpers/components'
import { ColumnType, TableSchemaItem } from '../context/dt.context'

export type FieldAddProps = {
  id?: string
  onSuccess?: (column: TableSchemaItem) => void
  onDismiss?: () => void
  isOpen?: boolean
  schema?: SchemaSelectProps[]
  columnType?: ColumnType
  getContainer?: () => HTMLElement
}

export const FieldAdd: React.FC<FieldAddProps> = (props) => {
  const { isOpen, onDismiss, onSuccess, schema, getContainer } = props
  const [form] = Form.useForm<TableSchemaItem>()
  const name = Form.useWatch('name', form)
  const type = Form.useWatch('type', form)

  useEffect(() => {
    if (isOpen) {
      form.resetFields()
    }
  }, [isOpen, form])

  useEffect(() => {
    if (!form.isFieldTouched('field') && name) {
      const parsed = slugify(name, {
        replacement: '.',
        remove: undefined,
        lower: true,
      })

      form.setFields([{ name: 'field', value: parsed, touched: false }])
    }
  }, [name, form])

  return (
    <Modal
      title='Add a column'
      open={isOpen}
      destroyOnClose
      onCancel={onDismiss}
      width={360}
      okText='Add'
      okButtonProps={{
        form: 'field-add-dialog',
        htmlType: 'submit',
      }}
      getContainer={getContainer}
    >
      <Form
        id='field-add-dialog'
        requiredMark={false}
        form={form}
        layout='vertical'
        initialValues={{ type: 'expression' }}
        onFinish={({ type, field, name, defaultValue }) => {
          onSuccess?.({
            id: v4(),
            type: type || 'expression',
            field,
            name,
            defaultValue,
          })
        }}
      >
        {schema && (
          <Form.Item label={'Choose from list'}>
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
          <Input autoComplete='off' />
        </Form.Item>
        <Form.Item
          name='field'
          label={type === 'expression' ? 'Selector' : 'Field'}
          rules={[{ required: true }]}
        >
          <Input autoComplete='off' />
        </Form.Item>
        <Form.Item name='defaultValue' label='Default Value'>
          <Input autoComplete='off' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
