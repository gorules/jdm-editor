import { message } from 'antd';
import exceljs from 'exceljs';
import { P, match } from 'ts-pattern';

import { saveFile } from '../../helpers/file-helpers';
import { NodeKind } from '../decision-graph/nodes/specifications/specification-types';
import type { DecisionGraphType, DecisionNode, DecisionTableType } from '../index';
import type { TableSchemaItem } from './context/dt-store.context';
import { parseDecisionTable } from './context/dt-store.context';

type DecisionTableNode = {
  id: string;
  name: string;
} & DecisionTableType;

export const exportDecisionTable = async (fileName: string, decisionTableNodes: DecisionTableNode[]) => {
  const { Workbook } = exceljs;
  const workbook = new Workbook();

  decisionTableNodes.forEach((decisionTableNode) => {
    let worksheetName: string = decisionTableNode.name;
    let worksheetNameIndex = 0;

    if (workbook.getWorksheet(worksheetName)) {
      do {
        worksheetNameIndex++;
        worksheetName = `${decisionTableNode.name} (${worksheetNameIndex})`;
      } while (workbook.getWorksheet(worksheetName));
    }

    const worksheet = workbook.addWorksheet(worksheetName);

    const schemaMeta = [
      ...decisionTableNode.inputs.map((input: any) => ({
        title: input.name,
        meta: { id: input.id, name: input.field, type: 'input' },
      })),
      ...decisionTableNode.outputs.map((output: any) => ({
        title: output.name,
        meta: { id: output.id, name: output.field, type: 'output' },
      })),
      { title: 'DESCRIPTION', meta: null },
      { title: 'Rule ID', meta: null },
    ];

    const schemaItems = [...decisionTableNode.inputs, ...decisionTableNode.outputs];
    const rules = decisionTableNode.rules.map((record: any) => {
      const newDataPoint: string[] = [];
      schemaItems.forEach((schemaItem) => {
        const val = record?.[schemaItem.id || ''];
        const formattedVal = typeof val === 'object' && val !== null ? JSON.stringify(val) : val;
        newDataPoint.push(formattedVal || '');
      });
      newDataPoint.push(record?.['_description'] || '');
      newDataPoint.push(record?.['_id'] || '');
      return newDataPoint;
    });

    const inputCellsLength = schemaMeta.filter((data) => data.meta?.type.toLowerCase() === 'input').length;
    const outputCellsLength = schemaMeta.filter((data) => data.meta?.type.toLowerCase() === 'output').length;

    // start row, start column, end row, end column
    worksheet.mergeCells(1, 1, 1, inputCellsLength + outputCellsLength + 2);

    const idCell = worksheet.getCell(1, 1);
    idCell.value = decisionTableNode.id;
    idCell.alignment = { horizontal: 'center', vertical: 'middle' };

    worksheet.mergeCells(2, 1, 2, inputCellsLength);
    const inputCell = worksheet.getCell(2, 1);
    inputCell.value = 'Inputs';
    inputCell.alignment = { horizontal: 'center', vertical: 'middle' };
    inputCell.font = { bold: true, color: { argb: 'FFFFFF' } };
    inputCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '5e6476' },
    };

    worksheet.mergeCells(2, inputCellsLength + 1, 2, inputCellsLength + outputCellsLength);
    const outputCell = worksheet.getCell(2, inputCellsLength + 1);
    outputCell.value = 'Outputs';
    outputCell.alignment = { horizontal: 'center', vertical: 'middle' };
    outputCell.font = { bold: true, color: { argb: 'FFFFFF' } };
    outputCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '63546c' },
    };

    const descriptionCell = worksheet.getCell(2, inputCellsLength + outputCellsLength + 1);
    descriptionCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '63546c' },
    };

    const ruleIdCell = worksheet.getCell(2, inputCellsLength + outputCellsLength + 2);
    ruleIdCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '63546c' },
    };

    const headerRow = worksheet.addRow(schemaMeta.map((data) => data.title));
    headerRow.eachCell((cell, colNumber) => {
      const meta = schemaMeta[colNumber - 1]?.meta;
      const cellColor = meta?.type.toLowerCase() === 'input' ? '5e6476' : '63546c';

      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: cellColor } };

      if (meta) {
        cell.note = {
          texts: [{ text: JSON.stringify(meta, undefined, 2) }],
        };
      }
    });

    rules?.forEach((rule: any) => {
      worksheet.addRow(Object.values(rule));
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

    worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 3 }];
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveFile(`${fileName}.xlsx`, blob);
};

const parseSpreadsheetData = (spreadSheetData: any, defaultTable?: DecisionTableType) => {
  const headers: any[] = spreadSheetData.splice(0, 3)[2];
  const columnHeaders = headers.map((header) => {
    if (header.value.toLowerCase() === 'description') {
      return {
        name: header.value,
        id: '_description',
      };
    }

    if (header.value.toLowerCase() === 'rule id') {
      return {
        name: header.value,
        id: '_id',
      };
    }

    let headerMeta = {
      name: '',
      type: '',
      id: '',
    };

    try {
      headerMeta = JSON.parse(header.note);
    } catch {
      message.error('Header note can not be parsed!');
    }

    return {
      name: header.value,
      field: headerMeta?.name,
      _type: headerMeta?.type,
      id: headerMeta?.id,
      defaultValue: '',
    };
  });

  const inputs = columnHeaders
    .filter((column) => column._type?.toLowerCase() === 'input')
    .map((column) => ({
      id: column.id,
      name: column?.name,
      field: column?.field,
      defaultValue: column?.defaultValue,
    })) as TableSchemaItem[];

  const outputs = columnHeaders
    .filter((column) => column._type?.toLowerCase() === 'output')
    .map((column) => ({
      id: column.id,
      name: column?.name,
      field: column?.field,
      defaultValue: column?.defaultValue,
    })) as TableSchemaItem[];

  const rules = spreadSheetData.map((data: any) => {
    const dataPoint: Record<string, string> = {
      _id: crypto.randomUUID(),
    };

    columnHeaders.forEach((col, index) => {
      dataPoint[col.id] = match(data?.[index]?.value)
        .with(P.string, (val) => val.trim())
        .with(P.nullish, () => '')
        .otherwise((val) => val.toString());
    });

    return dataPoint;
  });

  return parseDecisionTable({
    inputs,
    outputs,
    rules,
    hitPolicy: defaultTable?.hitPolicy || 'first',
    inputField: defaultTable?.inputField,
    outputPath: defaultTable?.outputPath,
    passThorough: defaultTable?.passThorough,
  });
};

export const readDecisionTableFile = async (
  buffer: ArrayBuffer,
  defaultValues?: DecisionTableType | DecisionGraphType,
) => {
  const { Workbook } = exceljs;
  const excelWorkbook = new Workbook();
  const workbook = await excelWorkbook.xlsx.load(buffer);
  const nodes: DecisionNode[] = [];

  workbook.eachSheet((sheet) => {
    const spreadsheetData: any[] = [];
    const spreadsheetName = sheet.name;

    sheet.eachRow((row) => {
      const rowData: any[] = [];

      for (let i = 1; i <= row.cellCount; i++) {
        const cell = row.getCell(i);

        const cellNote = cell.note
          ? typeof cell.note === 'object'
            ? cell.note.texts?.map((obj) => obj.text).join('')
            : cell.note
          : null;

        rowData.push({ value: cell.value, note: cellNote });
      }

      spreadsheetData.push(rowData);
    });
    const nodeId: string = spreadsheetData[0][0].value;

    let defaultTableValues;
    if (defaultValues && typeof defaultValues === 'object' && 'nodes' in defaultValues) {
      defaultTableValues = defaultValues.nodes?.find((node) => node.id === nodeId)?.content;
    } else if (defaultValues && typeof defaultValues === 'object') {
      defaultTableValues = defaultValues as DecisionTableType;
    }

    nodes.push({
      id: nodeId,
      name: spreadsheetName,
      type: NodeKind.DecisionTable,
      content: parseSpreadsheetData(spreadsheetData, defaultTableValues),
      position: { x: 0, y: 0 },
    });
  });

  return nodes;
};
