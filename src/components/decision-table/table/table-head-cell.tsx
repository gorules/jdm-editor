import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Modal, Typography } from 'antd';
import React from 'react';

import { Stack } from '../../stack';
import { useDecisionTableDialog } from '../context/dt-dialog.context';
import { TableSchemaItem, useDecisionTableStore } from '../context/dt-store.context';

export type TableHeadCellProps = {
  configurable?: boolean;
  disabled?: boolean;
};

export type TableHeadCellFieldProps = {
  configurable?: boolean;
  disabled?: boolean;
  schema: TableSchemaItem;
};

export const TableHeadCellInput: React.FC<TableHeadCellProps> = ({ configurable, disabled }) => {
  const inputs = useDecisionTableStore((store: any) => store.decisionTable?.inputs);
  const { setDialog } = useDecisionTableDialog();

  return (
    <Stack horizontal horizontalAlign='space-between' verticalAlign='center'>
      <Stack gap={0} className={'text-wrapper'} verticalAlign={'center'}>
        <Typography.Text className={'span-overflow'}>Inputs</Typography.Text>
      </Stack>
      {configurable && (
        <div className={'cta-wrapper'}>
          {inputs?.length > 1 && (
            <Button
              size={'small'}
              type={'link'}
              disabled={disabled}
              onClick={() => {
                setDialog({
                  type: 'reorder',
                  columnType: 'inputs',
                  item: null,
                });
              }}
            >
              Reorder
            </Button>
          )}
          <Button
            size={'small'}
            type={'link'}
            disabled={disabled}
            onClick={() => {
              setDialog({
                type: 'add',
                columnType: 'inputs',
                item: null,
              });
            }}
          >
            Add
          </Button>
        </div>
      )}
    </Stack>
  );
};

export const TableHeadCellOutput: React.FC<TableHeadCellProps> = ({ configurable, disabled }) => {
  const outputs = useDecisionTableStore((store: any) => store.decisionTable?.outputs);
  const { setDialog } = useDecisionTableDialog();

  return (
    <Stack horizontal horizontalAlign={'space-between'} verticalAlign={'center'}>
      <Stack gap={0} className={'text-wrapper'} verticalAlign={'center'}>
        <Typography.Text className={'span-overflow'}>Outputs</Typography.Text>
      </Stack>
      {configurable && (
        <div className={'cta-wrapper'}>
          <Button
            size={'small'}
            type={'link'}
            disabled={disabled}
            onClick={() => {
              setDialog({
                type: 'add',
                columnType: 'outputs',
                item: null,
              });
            }}
          >
            Add
          </Button>
          {outputs?.length > 1 && (
            <Button
              size={'small'}
              type={'link'}
              disabled={disabled}
              onClick={() => {
                setDialog({
                  type: 'reorder',
                  columnType: 'outputs',
                  item: null,
                });
              }}
            >
              Reorder
            </Button>
          )}
        </div>
      )}
    </Stack>
  );
};

export const TableHeadCellInputField: React.FC<TableHeadCellFieldProps> = ({ configurable, disabled, schema }) => {
  const { setDialog, getContainer } = useDecisionTableDialog();

  const removeColumn = useDecisionTableStore((store: any) => store.removeColumn);

  return (
    <Stack horizontal horizontalAlign={'space-between'} verticalAlign={'center'}>
      <Stack gap={0} className={'text-wrapper'}>
        <Typography.Text className={'span-overflow'}>{schema.name}</Typography.Text>
        <Typography.Text className={'span-overflow'} type='secondary' style={{ fontSize: 12 }}>
          {schema.field}
        </Typography.Text>
      </Stack>
      {configurable && (
        <div>
          <Dropdown
            trigger={['click']}
            overlayStyle={{ minWidth: 140 }}
            disabled={disabled}
            menu={{
              items: [
                {
                  key: 'edit',
                  label: 'Edit column',
                  onClick: () => {
                    setDialog({
                      type: 'edit',
                      columnType: 'inputs',
                      item: schema,
                    });
                  },
                },
                {
                  key: 'remove',
                  label: 'Remove column',
                  onClick: () => {
                    Modal.confirm({
                      title: 'Remove column',
                      icon: false,
                      getContainer,
                      content: (
                        <Typography.Paragraph>
                          You are about to delete <strong>{schema.name}</strong> column.
                        </Typography.Paragraph>
                      ),
                      okText: 'Remove',
                      okButtonProps: { danger: true },
                      onOk: () => removeColumn('inputs', schema.id),
                    });
                  },
                },
              ],
            }}
          >
            <Button type='link' size={'small'} icon={<DownOutlined />} />
          </Dropdown>
        </div>
      )}
    </Stack>
  );
};

export const TableHeadCellOutputField: React.FC<TableHeadCellFieldProps> = ({ configurable, disabled, schema }) => {
  const { setDialog, getContainer } = useDecisionTableDialog();
  const removeColumn = useDecisionTableStore((store: any) => store.removeColumn);

  return (
    <Stack horizontal horizontalAlign='space-between' verticalAlign={'center'}>
      <Stack gap={0} className={'text-wrapper'} verticalAlign={'center'}>
        <Typography.Text className={'span-overflow'}>{schema.name}</Typography.Text>
        <Typography.Text className={'span-overflow'} type='secondary' style={{ fontSize: 12 }}>
          {schema.field}
        </Typography.Text>
      </Stack>
      {configurable && (
        <div>
          <Dropdown
            trigger={['click']}
            overlayStyle={{ minWidth: 140 }}
            disabled={disabled}
            menu={{
              items: [
                {
                  key: 'edit',
                  label: 'Edit column',
                  onClick: () => {
                    setDialog({
                      type: 'edit',
                      columnType: 'outputs',
                      item: schema,
                    });
                  },
                },
                {
                  key: 'remove',
                  label: 'Remove column',
                  onClick: () => {
                    Modal.confirm({
                      title: 'Remove column',
                      content: (
                        <Typography.Paragraph>
                          You are about to delete <strong>{schema.name}</strong> column.
                        </Typography.Paragraph>
                      ),
                      getContainer,
                      icon: false,
                      okText: 'Remove',
                      okButtonProps: {
                        danger: true,
                      },
                      onOk: () => {
                        removeColumn('outputs', schema.id);
                      },
                    });
                  },
                },
              ],
            }}
          >
            <Button type='link' size={'small'} icon={<DownOutlined />} />
          </Dropdown>
        </div>
      )}
    </Stack>
  );
};
