import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import equal from 'fast-deep-equal/es6/react';
import type { FC } from 'react';
import React, { useEffect, useMemo } from 'react';
import type { Node } from 'reactflow';

import { Stack } from '../../stack';
import type { CustomNodeType } from '../context/dg-store.context';
import { useDecisionGraphStore } from '../context/dg-store.context';

export type NodeFormProps<T = any> = {
  node: Node;
  onCopy?: (node: Node) => void;
  onChange?: (data: T) => void;
  onClose?: () => void;
  removeNode?: (node: Node) => void;
};

export const NodeForm: FC<NodeFormProps> = ({ node, onChange, removeNode, onClose, onCopy }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: node?.data?.name,
      description: node?.data?.description,
      content: node?.data?.content,
    });
  }, [node?.id]);

  useEffect(() => {
    form.setFieldsValue({
      name: node?.data?.name,
      description: node?.data?.description,
      content: node?.data?.content,
    });
  }, [node?.data]);

  const customComponents: CustomNodeType[] = useDecisionGraphStore((store) => store.components || [], equal);

  const component = useMemo(() => {
    return customComponents.find((component) => component.type === node.type);
  }, [customComponents, node?.type]);

  const nodeType = useMemo(() => {
    switch (node.type) {
      case 'inputNode':
        return 'Input';
      case 'outputNode':
        return 'Output';
      case 'decisionTableNode':
        return 'Decision Table';
      case 'decisionNode':
        return 'Decision';
      case 'functionNode':
        return 'Function';
      case 'expressionNode':
        return 'Expression';
    }

    return 'Unknown';
  }, [node?.type]);

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
          });
        }}
      >
        <Button className={'button'} type='text' onClick={onClose} icon={<CloseOutlined />} />
        <Form.Item noStyle>
          <Space direction={'vertical'}>
            <Typography.Text>Type</Typography.Text>
            <Typography.Text strong>{component?.type || nodeType}</Typography.Text>
          </Space>
        </Form.Item>
        {node?.type !== 'inputNode' && node?.type !== 'outputNode' && (
          <>
            <Form.Item name={['name']} label={'Name'}>
              <Input placeholder={'Name'} />
            </Form.Item>
            <Form.Item name={['description']} label={'Description'}>
              <Input.TextArea placeholder={'Description'} rows={3} style={{ resize: 'none' }} />
            </Form.Item>
          </>
        )}
        {component && component?.renderForm && component?.renderForm?.()}
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
  );
};
