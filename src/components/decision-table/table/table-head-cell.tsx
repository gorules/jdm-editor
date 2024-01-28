import { MoreOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Dropdown, Modal, Tooltip, Typography } from 'antd';
import React from 'react';

import { Stack } from '../../stack';
import { useDecisionTableDialog } from '../context/dt-dialog.context';
import type { TableSchemaItem } from '../context/dt-store.context';
import { useDecisionTableStore } from '../context/dt-store.context';

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
        <Typography.Text className={'span-overflow grl-dt-text-primary'}>Inputs</Typography.Text>
      </Stack>
      {configurable && (
        <div className={'cta-wrapper'}>
          {inputs?.length > 1 && (
            <Tooltip title='Reorder fields'>
              <Button
                className='grl-dt-text-secondary'
                icon={<SwapOutlined />}
                size={'small'}
                type={'text'}
                disabled={disabled}
                onClick={() => {
                  setDialog({
                    type: 'reorder',
                    columnType: 'inputs',
                    item: null,
                  });
                }}
              />
            </Tooltip>
          )}
          <Tooltip title='Add input'>
            <Button
              className='grl-dt-text-secondary'
              size={'small'}
              type={'text'}
              icon={<PlusOutlined />}
              disabled={disabled}
              onClick={() => {
                setDialog({
                  type: 'add',
                  columnType: 'inputs',
                  item: null,
                });
              }}
            />
          </Tooltip>
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
        <Typography.Text className={'span-overflow grl-dt-text-primary'}>Outputs</Typography.Text>
      </Stack>
      {configurable && (
        <div className={'cta-wrapper'}>
          {outputs?.length > 1 && (
            <Tooltip title='Reorder fields'>
              <Button
                className='grl-dt-text-secondary'
                icon={<SwapOutlined />}
                size={'small'}
                type={'text'}
                disabled={disabled}
                onClick={() => {
                  setDialog({
                    type: 'reorder',
                    columnType: 'outputs',
                    item: null,
                  });
                }}
              />
            </Tooltip>
          )}
          <Tooltip title='Add output'>
            <Button
              className='grl-dt-text-secondary'
              size={'small'}
              type={'text'}
              icon={<PlusOutlined />}
              disabled={disabled}
              onClick={() => {
                setDialog({
                  type: 'add',
                  columnType: 'outputs',
                  item: null,
                });
              }}
            />
          </Tooltip>
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
        <Typography.Text className={'span-overflow grl-dt-text-primary'}>{schema.name}</Typography.Text>
        <Typography.Text className={'span-overflow grl-dt-text-secondary'} type='secondary' style={{ fontSize: 12 }}>
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
            <Tooltip title='Settings'>
              <Button className='grl-dt-text-secondary' type='text' size={'small'} icon={<MoreOutlined />} />
            </Tooltip>
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
        <Typography.Text className={'span-overflow grl-dt-text-primary'}>{schema.name}</Typography.Text>
        <Typography.Text className={'span-overflow grl-dt-text-secondary'} type='secondary' style={{ fontSize: 12 }}>
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
            <Tooltip title='Settings'>
              <Button className='grl-dt-text-secondary' type='text' size={'small'} icon={<MoreOutlined />} />
            </Tooltip>
          </Dropdown>
        </div>
      )}
    </Stack>
  );
};
