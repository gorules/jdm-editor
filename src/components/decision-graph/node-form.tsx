import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Typography } from 'antd'
import React, { FC, useEffect, useMemo } from 'react'
import { Node } from 'reactflow'

import { Stack } from '../stack'

export type NodeFormProps<T = any> = {
  node: Node
  onCopy?: (node: Node) => void
  onChange?: (data: T) => void
  onClose?: () => void
  removeNode?: (node: Node) => void
}

export const NodeForm: FC<NodeFormProps> = ({ node, onChange, removeNode, onClose, onCopy }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      name: node?.data?.name,
      description: node?.data?.description,
      content: node?.data?.content,
    })
  }, [node?.id])

  useEffect(() => {
    form.setFieldsValue({
      name: node?.data?.name,
      description: node?.data?.description,
      content: node?.data?.content,
    })
  }, [node?.data])

  const nodeType = useMemo(() => {
    switch (node.type) {
      case 'inputNode':
        return 'Input'
      case 'outputNode':
        return 'Output'
      case 'decisionTableNode':
        return 'Decision Table'
      case 'decisionNode':
        return 'Decision'
      case 'functionNode':
        return 'Function'
      case 'expressionNode':
        return 'Expression'
    }

    return 'Unknown'
  }, [node?.type])

  return (
    <div className={'node-form'}>
      <Form
        form={form}
        layout={'vertical'}
        className={'form'}
        initialValues={{
          name: node?.data?.name,
          description: node?.data?.description,
          content: node?.data?.content,
        }}
        onValuesChange={(_, data) => {
          onChange?.({
            id: node?.id,
            data,
          })
        }}
      >
        <Button className={'button'} type='text' onClick={onClose} icon={<CloseOutlined />} />
        <Form.Item noStyle>
          <Space direction={'vertical'}>
            <Typography.Text>Type</Typography.Text>
            <Typography.Text strong>{nodeType}</Typography.Text>
          </Space>
        </Form.Item>
        {node?.type === 'decisionNode' && (
          <>
            <Typography.Link
              onClick={() => {
                //TODO Invoke open document
              }}
            >
              Open in new tab
            </Typography.Link>
            <Form.Item name={['name']} label={'Name'}>
              <Input placeholder={'Name'} />
            </Form.Item>
            <Form.Item label={'Key'}>
              <Input.Group>
                <Form.Item noStyle style={{ width: 'calc(100% - 32px)' }} name={['content', 'key']}>
                  <Input style={{ width: 'calc(100% - 32px)' }} placeholder={'Key'} />
                </Form.Item>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    // TODO INVOKE ON EDIT
                  }}
                />
              </Input.Group>
            </Form.Item>
          </>
        )}
        {(node?.type === 'decisionTableNode' ||
          node?.type === 'functionNode' ||
          node?.type === 'expressionNode') && (
          <>
            <Form.Item name={['name']} label={'Name'}>
              <Input placeholder={'Name'} />
            </Form.Item>
            <Form.Item name={['description']} label={'Description'}>
              <Input.TextArea placeholder={'Description'} rows={3} style={{ resize: 'none' }} />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <Stack gap={8} horizontal>
            <Button onClick={() => onCopy?.(node)}>Copy</Button>
            <Button danger onClick={() => removeNode?.(node)}>
              Remove
            </Button>
          </Stack>
        </Form.Item>
      </Form>
    </div>
  )
}
