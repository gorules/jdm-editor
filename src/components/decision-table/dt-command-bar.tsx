import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
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

  const exportExcel = async (options: TableExportOptions) => {
    const ExcelJS = await import('exceljs');

    const { name } = options;
    const schemaMeta = [
      ...decisionTable.inputs.map((input: any) => ({
        title: input.name,
        meta: { id: input.id, name: input.field, type: 'input' },
      })),
      ...decisionTable.outputs.map((output: any) => ({
        title: output.name,
        meta: { id: output.id, name: output.field, type: 'output' },
      })),
      { title: 'DESCRIPTION', meta: null },
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

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('decision table');

    const inputCellsLength = schemaMeta.filter((data) => data.meta?.type.toLowerCase() === 'input').length;
    const outputCellsLength = schemaMeta.filter((data) => data.meta?.type.toLowerCase() === 'output').length;

    // start row, start column, end row, end column
    worksheet.mergeCells(1, 1, 1, inputCellsLength);
    const inputCell = worksheet.getCell(1, 1);
    inputCell.value = 'Inputs';
    inputCell.alignment = { horizontal: 'center', vertical: 'middle' };
    inputCell.font = { bold: true, color: { argb: 'FFFFFF' } };
    inputCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '5e6476' },
    };

    worksheet.mergeCells(1, inputCellsLength + 1, 1, inputCellsLength + outputCellsLength);
    const outputCell = worksheet.getCell(1, inputCellsLength + 1);
    outputCell.value = 'Outputs';
    outputCell.alignment = { horizontal: 'center', vertical: 'middle' };
    outputCell.font = { bold: true, color: { argb: 'FFFFFF' } };
    outputCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '63546c' },
    };

    const descriptionCell = worksheet.getCell(1, inputCellsLength + outputCellsLength + 1);
    descriptionCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '63546c' },
    };

    const headerRow = worksheet.addRow(schemaMeta.map((data) => data.title));
    headerRow.eachCell((cell) => {
      const note = schemaMeta.find((data) => data.title === cell.value)?.meta;
      const cellColor = note?.type.toLowerCase() === 'input' ? '5e6476' : '63546c';

      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: cellColor } };

      if (note) {
        cell.note = {
          texts: [{ text: JSON.stringify(note, undefined, 2) }],
        };
      }
    });

    formatted?.forEach((data) => {
      worksheet.addRow(Object.values(data));
    });

    worksheet.columns.forEach((_, index) => {
      let minLength = 15;
      const column = worksheet.getColumn(index + 1);
      column.eachCell({ includeEmpty: false }, (cell) => {
        const cellLength = cell.value ? cell.value.toString().length : 0;
        minLength = cellLength > minLength ? cellLength : minLength;

        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
      column.width = minLength;
    });

    worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 2 }];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveFile(`${name}.xlsx`, blob);
  };

  const importExcel = () => {
    fileInput?.current?.click?.();
  };

  const parseExcelSheetData = (spreadSheetData: any) => {
    const headers: any[] = spreadSheetData.splice(0, 2)[1];
    const columnHeaders = headers.map((header) => {
      if (header.value.toLowerCase() === 'description') {
        return {
          name: header.value,
          id: '_description',
        };
      }

      let headerMeta = {
        name: '',
        type: '',
        id: '',
      };

      try {
        headerMeta = JSON.parse(header.note);
      } catch (error) {
        console.log('Header note can not be parsed!');
      }

      return {
        name: header.value,
        field: headerMeta.name,
        _type: headerMeta.type,
        type: 'expression',
        id: headerMeta.id,
        defaultValue: '',
      };
    });

    const inputs = columnHeaders
      .filter((column) => column._type?.toLowerCase() === 'input')
      .map((column) => ({
        id: column.id,
        name: column?.name,
        field: column?.field,
        type: column?.type,
        defaultValue: column?.defaultValue,
      })) as TableSchemaItem[];

    const outputs = columnHeaders
      .filter((column) => column._type?.toLowerCase() === 'output')
      .map((column) => ({
        id: column.id,
        name: column?.name,
        field: column?.field,
        type: column?.type,
        defaultValue: column?.defaultValue,
      })) as TableSchemaItem[];

    const rules = spreadSheetData.map((data: any) => {
      const dataPoint: Record<string, string> = {
        _id: v4(),
      };

      columnHeaders.forEach((col, index) => {
        dataPoint[col.id] = data?.[index].value || '';
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

  const readExcelFile = async (event: any) => {
    const ExcelJS = await import('exceljs');

    const file = event?.target?.files[0];
    const reader = new FileReader();
    const excelWorkbook = new ExcelJS.Workbook();

    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const buffer = reader.result as ArrayBuffer;

      if (!buffer) return;

      const workbook = await excelWorkbook.xlsx.load(buffer);
      workbook.eachSheet((sheet) => {
        const spreadSheet: any[] = [];
        sheet.eachRow((row) => {
          const dataRow: any[] = [];
          row.eachCell((cell) => {
            const cellNote = cell.note
              ? typeof cell.note === 'object'
                ? cell.note.texts?.map((obj) => obj.text).join('')
                : cell.note
              : null;

            dataRow.push({ value: cell.value, note: cellNote });
          });
          spreadSheet.push(dataRow);
        });

        parseExcelSheetData(spreadSheet);
      });
    };
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
