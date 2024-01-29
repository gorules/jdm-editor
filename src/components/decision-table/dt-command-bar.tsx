import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import Papa from 'papaparse';
import React, { useRef } from 'react';
import { v4 } from 'uuid';

import { saveFile } from '../../helpers/file-helpers';
import { Stack } from '../stack';
import {
  type TableExportOptions,
  type TableSchemaItem,
  parseDecisionTable,
  useDecisionTableActions,
  useDecisionTableRaw,
  useDecisionTableState,
} from './context/dt-store.context';

const parserOptions = {
  delimiter: ';',
};

const parserPipe = '|';

export const DecisionTableCommandBar: React.FC = () => {
  const tableActions = useDecisionTableActions();
  const { disableHitPolicy, disabled, configurable, decisionTable } = useDecisionTableState(
    ({ disableHitPolicy, disabled, configurable, decisionTable }) => ({
      disableHitPolicy,
      disabled,
      configurable,
      decisionTable,
    }),
  );

  const { listenerStore } = useDecisionTableRaw();
  const fileInput = useRef<HTMLInputElement>(null);

  const exportCsv = async (options: TableExportOptions) => {
    const { name } = options;
    const schemaMeta = [
      ...decisionTable.inputs.map((input: any) =>
        [input.name, input.field, 'INPUT', input.id, input.defaultValue].join(` ${parserPipe} `),
      ),
      ...decisionTable.outputs.map((output: any) =>
        [output.name, output.field, 'OUTPUT', output.id, output.defaultValue].join(` ${parserPipe} `),
      ),
      'DESCRIPTION',
    ];

    const schemaItems = [...decisionTable.inputs, ...decisionTable.outputs];
    const formatted = decisionTable?.rules.map((record: any) => {
      const newDataPoint: string[] = [];
      schemaItems.forEach((schemaItem) => {
        const val = record?.[schemaItem.id || ''];
        const formattedVal = typeof val === 'object' && val !== null ? JSON.stringify(val) : val;
        newDataPoint.push(formattedVal || '');
      });
      newDataPoint.push(record?.['_description'] || '');
      return newDataPoint;
    });

    const csv = Papa.unparse(
      {
        fields: schemaMeta,
        data: formatted,
      },
      {
        ...parserOptions,
        header: true,
      },
    );

    const blob = new Blob([csv], { type: 'text/csv' });
    saveFile(`${name}.csv`, blob);
  };

  const importCsv = () => {
    fileInput?.current?.click?.();
  };

  const handleCsv = async (content: string) => {
    const spreadsheetData = await new Promise<any[]>((resolve, reject) =>
      Papa.parse(content, {
        ...parserOptions,
        header: false,
        complete: (results: Papa.ParseResult<Record<string, string>>) => {
          if (results.errors.length) {
            return reject('failed to parse csv file');
          }

          resolve(results.data);
        },
      }),
    );

    const headers: any[] = spreadsheetData?.splice(0, 1)?.[0];
    const columns = headers.map((header: string) => {
      const [name, field, _type, id, defaultValue] = header.split(parserPipe).map((s) => (s || '').trim());
      if (name.toLowerCase() === 'description') {
        return {
          name,
          id: '_description',
        };
      }
      return {
        name,
        field,
        _type,
        type: 'expression',
        id,
        defaultValue,
      };
    });

    const inputs = columns
      .filter((column) => column._type === 'INPUT')
      .map((column) => ({
        id: column.id,
        name: column?.name,
        field: column?.field,
        type: column?.type,
        defaultValue: column?.defaultValue,
      })) as TableSchemaItem[];

    const outputs = columns
      .filter((column) => column._type === 'OUTPUT')
      .map((column) => ({
        id: column.id,
        name: column?.name,
        field: column?.field,
        type: column?.type,
        defaultValue: column?.defaultValue,
      })) as TableSchemaItem[];

    const rules = spreadsheetData.map((data) => {
      const dataPoint: Record<string, string> = {
        _id: v4(),
      };

      columns.forEach((col, index) => {
        dataPoint[col.id] = data?.[index] || '';
      });
      return dataPoint;
    });

    const newTable = parseDecisionTable({
      inputs,
      outputs,
      rules,
      hitPolicy: 'first',
    });

    tableActions.setDecisionTable(newTable);
    listenerStore.getState().onChange?.(newTable);
  };

  const handleUploadInput = async (event: any) => {
    const fileList = event?.target?.files as FileList;
    const reader = new FileReader();
    reader.onload = function (e) {
      handleCsv((e as any)?.target?.result);
    };

    reader.readAsText(Array.from(fileList)?.[0]);
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
            onClick={() => exportCsv({ name: 'table' })}
          >
            Export CSV
          </Button>
          <Button
            type='text'
            size={'small'}
            color='secondary'
            disabled={disabled}
            icon={<ImportOutlined />}
            onClick={() => importCsv()}
          >
            Import CSV
          </Button>
        </Stack>
        <Select
          style={{ width: 140 }}
          size={'small'}
          disabled={disabled || !configurable || disableHitPolicy}
          value={decisionTable.hitPolicy}
          onSelect={tableActions.updateHitPolicy}
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
        accept='.csv'
        type='file'
        ref={fileInput}
        onChange={handleUploadInput}
        onClick={(event) => {
          (event.target as any).value = null;
        }}
      />
    </>
  );
};
