import { Cascader, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

import type { SchemaSelectProps } from '../../../helpers/components';
import { getPath, recursiveSelect } from '../../../helpers/components';
import { AutosizeTextArea } from '../../autosize-text-area';
import { CodeEditor } from '../../code-editor';
import type { ColumnType, TableSchemaItem } from '../context/dt-store.context';
import { useDecisionTableState } from '../context/dt-store.context';

export type FieldUpdateProps = {
  id?: string;
  field?: TableSchemaItem;
  onSuccess?: (column: TableSchemaItem) => void;
  onDismiss?: () => void;
  isOpen?: boolean;
  schema?: SchemaSelectProps[];
  columnType?: ColumnType;
  getContainer?: () => HTMLElement;
};

export const FieldUpdate: React.FC<React.PropsWithChildren<FieldUpdateProps>> = (props) => {
  const { isOpen, onDismiss, onSuccess, field, schema, getContainer } = props;
  const { inputVariableType } = useDecisionTableState(({ inputVariableType }) => ({ inputVariableType }));
  const [form] = Form.useForm();

  const [selectorValue, setSelectorValue] = useState<string[]>();

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
      form.setFieldsValue({
        name: field?.name,
        field: field?.field,
        defaultValue: field?.defaultValue,
      });
      setSelectorValue(getPath(field?.field as string, schema as SchemaSelectProps[]));
    }
  }, [isOpen, form, field, schema]);

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
      getContainer={getContainer}
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
            field: data?.field?.trim?.()?.length > 0 ? data?.field : undefined,
          });
        }}
      >
        {schema && (
          <Form.Item label={'Choose from list'}>
            <Cascader
              fieldNames={{ label: 'name', value: 'field', children: 'items' }}
              options={schema}
              value={selectorValue}
              onChange={(val) => {
                setSelectorValue(val);
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
          <Input />
        </Form.Item>
        <Form.Item name='field' label='Selector' rules={[{ required: props.columnType === 'outputs' }]}>
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
