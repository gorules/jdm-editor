import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CloseOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
} from '@ant-design/icons';
import { Button, Divider, Popconfirm, Select, Tooltip, message } from 'antd';
import React, { useRef } from 'react';

import { exportExcelFile, readFromExcel } from '../../helpers/excel-file-utils';
import type { DecisionNode } from '../decision-graph';
import { Stack } from '../stack';
import {
  type HitPolicy,
  type TableExportOptions,
  useDecisionTableActions,
  useDecisionTableRaw,
  useDecisionTableState,
} from './context/dt-store.context';

import { v4 as uuidv4 } from 'uuid';

export const DecisionTableCommandBar: React.FC = () => {
  const tableActions = useDecisionTableActions();
  const { disableHitPolicy, disabled, configurable, hitPolicy, cursor } = useDecisionTableState(
    ({ disableHitPolicy, disabled, configurable, decisionTable, cursor }) => ({
      disableHitPolicy,
      disabled,
      configurable,
      cursor,
      hitPolicy: decisionTable.hitPolicy,
    }),
  );

  const { listenerStore, stateStore } = useDecisionTableRaw();
  const fileInput = useRef<HTMLInputElement>(null);

  const exportExcel = async (options: TableExportOptions) => {
    const { name } = options;

    try {
      const decisionTable = stateStore.getState().decisionTable;
      await exportExcelFile(name, [{ ...decisionTable, name: 'decision table', id: uuidv4()
      }]);
      message.success('Excel file has been downloaded successfully!');
    } catch {
      message.error('Failed to download Excel file!');
    }
  };

  const importExcel = () => {
    fileInput?.current?.click?.();
  };

  const readExcelFile = async (event: any) => {
    const file = event?.target?.files[0];
    const reader = new FileReader();

    try {
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const buffer = reader.result as ArrayBuffer;

        if (!buffer) return;

        const nodes: DecisionNode[] = await readFromExcel(buffer);
        const newTable = nodes[0].content;

        tableActions.setDecisionTable(newTable);
        listenerStore.getState().onChange?.(newTable);
      };
      message.success('Excel file has been uploaded successfully!');
    } catch {
      message.error('Failed to upload Excel!');
    }
  };

  return (
    <>
      <Stack horizontal horizontalAlign={'space-between'} verticalAlign={'center'} className={'grl-dt__command-bar'}>
        <Stack gap={8} horizontal className='full-width'>
          <Button
            type='text'
            size={'small'}
            color='secondary'
            icon={<ExportOutlined />}
            onClick={() => exportExcel({ name: 'table' })}
          >
            Export Excel
          </Button>
          <Button
            type='text'
            size={'small'}
            color='secondary'
            disabled={disabled}
            icon={<ImportOutlined />}
            onClick={() => importExcel()}
          >
            Import Excel
          </Button>
          {cursor && !disabled && (
            <>
              <Divider
                type={'vertical'}
                style={{
                  height: 24,
                }}
              />
              <Tooltip title={'Add row below'}>
                <Button
                  type='text'
                  size={'small'}
                  color='secondary'
                  icon={<ArrowDownOutlined />}
                  onClick={() => tableActions.addRowBelow(cursor?.y)}
                />
              </Tooltip>
              <Tooltip title={'Add row above'}>
                <Button
                  type='text'
                  size={'small'}
                  color='secondary'
                  icon={<ArrowUpOutlined />}
                  onClick={() => tableActions.addRowAbove(cursor?.y)}
                />
              </Tooltip>
              <Tooltip>
                <Popconfirm title='Remove row?' okText='Remove' onConfirm={() => tableActions.removeRow(cursor?.y)}>
                  <Button type='text' size={'small'} icon={<DeleteOutlined />} />
                </Popconfirm>
              </Tooltip>
              <Button
                type='text'
                size={'small'}
                color='secondary'
                icon={<CloseOutlined />}
                onClick={() => tableActions.setCursor(null)}
              >
                Deselect
              </Button>
            </>
          )}
        </Stack>
        <Select
          style={{ width: 140 }}
          size={'small'}
          disabled={disabled || !configurable || disableHitPolicy}
          value={hitPolicy}
          onSelect={(data) => tableActions.updateHitPolicy(data as HitPolicy)}
          options={[
            {
              key: 'first',
              label: 'First',
              value: 'first',
            },
            {
              key: 'collect',
              label: 'Collect',
              value: 'collect',
            },
          ]}
        />
      </Stack>
      <input
        multiple
        hidden
        accept='.xlsx'
        type='file'
        ref={fileInput}
        onChange={readExcelFile}
        onClick={(event) => {
          (event.target as any).value = null;
        }}
      />
    </>
  );
};
