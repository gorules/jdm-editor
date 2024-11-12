import { Cascader, Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';

import type { SchemaSelectProps } from '../../../helpers/components';
import { recursiveSelect } from '../../../helpers/components';
import { AutosizeTextArea } from '../../autosize-text-area';
import { CodeEditor } from '../../code-editor';
import type { ColumnType, TableSchemaItem } from '../context/dt-store.context';
import { useDecisionTableState } from '../context/dt-store.context';

export type FieldAddProps = {
  id?: string;
  onSuccess?: (column: TableSchemaItem) => void;
  onDismiss?: () => void;
  isOpen?: boolean;
  schema?: SchemaSelectProps[];
  columnType?: ColumnType;
  getContainer?: () => HTMLElement;
};

export const FieldAdd: React.FC<FieldAddProps> = (props) => {
  const { isOpen, onDismiss, onSuccess, schema, getContainer } = props;
  const { inputVariableType } = useDecisionTableState(({ inputVariableType }) => ({ inputVariableType }));
  const [form] = Form.useForm<TableSchemaItem>();
  const type = Form.useWatch('type', form);

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
    }
  }, [isOpen, form]);

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
        onFinish={({ field, name, defaultValue }) => {
          onSuccess?.({
            id: crypto.randomUUID(),
            field: (field || '')?.trim?.()?.length > 0 ? field : undefined,
            name,
            defaultValue,
          });
        }}
      >
        {schema && (
          <Form.Item label={'Choose from list'}>
            <Cascader
              fieldNames={{ label: 'name', value: 'field', children: 'items' }}
              options={schema}
              onChange={(val) => {
                const field = recursiveSelect(val as string[], schema);
                if (field) {
                  form.setFieldsValue({
                    name: field?.name,
                    field: field?.field,
                  });
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
          rules={[{ required: props.columnType === 'outputs' }]}
        >
          {props.columnType === 'inputs' ? (
            <CodeEditor variableType={inputVariableType} />
          ) : (
            <AutosizeTextArea maxRows={3} />
          )}
        </Form.Item>
        <Form.Item name='defaultValue' label='Default Value'>
          <Input autoComplete='off' />
        </Form.Item>
      </Form>
    </Modal>
  );
};
