import exceljs from 'exceljs';
import { z } from 'zod';

import type { HitPolicy, TableSchemaItem } from '../components/decision-table/context/dt-store.context';
import type { DecisionGraphType, DecisionTableType } from '../index';
import { NodeKind } from '../index';
import { saveFile } from './file-helpers';

type DecisionTableNode = {
  id: string;
  name: string;
} & DecisionTableType;

type SpreadsheetCell = {
  value?: string;
  note?: string | null;
};

type HeaderData = {
  name?: string;
  id: string;
  value?: string;
  _type?: string;
  defaultValue?: string;
  note?: string | null;
};

export type RuleData = {
  value?: string;
  headerId: string;
};

type ExistingTableData = {
  headers: (TableSchemaItem & { type: 'input' | 'output' })[];
  hitPolicy: HitPolicy | string;
  inputField?: string | null;
  outputPath?: string | null;
  passThrough?: boolean;
  executionMode?: 'single' | 'loop';
};

type ParsedSheetData = {
  headers: HeaderData[];
  rules: RuleData[][];
  existingTableData: ExistingTableData;
};

export type ParsedExcelData = ParsedSheetData & {
  id: string;
  name: string;
  type: NodeKind;
  position: { x: number; y: number };
};

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

    const columns = [
      ...decisionTableNode.inputs.map((input: any) => ({ title: input.name, type: 'input' })),
      ...decisionTableNode.outputs.map((output: any) => ({ title: output.name, type: 'output' })),
      { title: 'Description', type: 'description' },
    ];

    const schemaItems = [...decisionTableNode.inputs, ...decisionTableNode.outputs];
    const rules = decisionTableNode.rules.map((record: any) => {
      const row: string[] = [];
      schemaItems.forEach((schemaItem) => {
        const val = record?.[schemaItem.id || ''];
        const formattedVal = typeof val === 'object' && val !== null ? JSON.stringify(val) : val;
        row.push(formattedVal || '');
      });
      row.push(record?.['_description'] || '');
      return row;
    });

    const headerRow = worksheet.addRow(columns.map((col) => col.title));
    headerRow.eachCell((cell, colNumber) => {
      const col = columns[colNumber - 1];
      const cellColor = col?.type === 'input' ? '5e6476' : '63546c';

      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: cellColor } };
    });

    rules.forEach((rule) => {
      worksheet.addRow(rule);
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

    worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveFile(`${fileName}.xlsx`, blob);
};

const getDecisionTableData = (
  nodeId?: string,
  spreadSheetData: SpreadsheetCell[][] = [],
  defaultTable?: DecisionTableType,
): ParsedSheetData => {
  let headers: HeaderData[] = [];
  let rules: RuleData[][] = [];

  if (nodeId) {
    const columnHeaders: SpreadsheetCell[] = spreadSheetData.splice(0, 3)[2];

    headers = columnHeaders.map((columnHeader) => {
      if (columnHeader.value?.toLowerCase() === 'description') {
        return {
          name: columnHeader.value,
          id: '_description',
        };
      }

      if (columnHeader.value?.toLowerCase() === 'rule id') {
        return {
          name: columnHeader.value,
          id: '_id',
        };
      }

      let headerMeta = {
        name: '',
        type: '',
        id: '',
      };

      try {
        headerMeta = JSON.parse(columnHeader.note || '');
      } catch {
        return {
          name: columnHeader.value,
          id: crypto.randomUUID(),
        };
      }

      return {
        name: columnHeader.value,
        value: headerMeta?.name,
        _type: headerMeta?.type,
        id: headerMeta?.id,
        defaultValue: '',
      };
    });

    rules = spreadSheetData.map((data) => {
      return data.map((d, index) => ({ value: d.value, headerId: headers[index].id }));
    });
  } else {
    headers = spreadSheetData.splice(0, 1)[0].map((columnHeader) => {
      if (columnHeader.value?.toLowerCase() === 'description') {
        return {
          name: columnHeader.value,
          id: '_description',
        };
      }

      return {
        name: columnHeader.value,
        id: crypto.randomUUID(),
      };
    });

    rules = spreadSheetData.map((data) => {
      return data.map((d, index) => ({ value: d.value, headerId: headers[index].id }));
    });
  }

  return {
    headers: headers.filter((item) => item.id !== '_id'),
    rules,
    existingTableData: {
      headers: [
        ...(defaultTable?.inputs || []).map((item) => ({ ...item, type: 'input' as const })),
        ...(defaultTable?.outputs || []).map((item) => ({ ...item, type: 'output' as const })),
      ],
      hitPolicy: defaultTable?.hitPolicy || 'first',
      inputField: defaultTable?.inputField,
      outputPath: defaultTable?.outputPath,
      passThrough: defaultTable?.passThrough,
      executionMode: defaultTable?.executionMode || 'single',
    },
  };
};

export const getExcelData = async (buffer: ArrayBuffer, defaultValues?: DecisionTableType | DecisionGraphType) => {
  const { Workbook } = exceljs;
  const excelWorkbook = new Workbook();
  const workbook = await excelWorkbook.xlsx.load(buffer);

  const parsedSpreadsheetData: ParsedExcelData[] = [];

  workbook.eachSheet((sheet) => {
    const spreadsheetData: SpreadsheetCell[][] = [];
    const spreadsheetName = sheet.name;

    sheet.eachRow((row) => {
      const rowData: SpreadsheetCell[] = [];

      for (let i = 1; i <= row.cellCount; i++) {
        const cell = row.getCell(i);

        const cellNote = cell.note
          ? typeof cell.note === 'object'
            ? cell.note.texts?.map((obj) => obj.text).join('')
            : cell.note
          : null;

        rowData.push({ value: cell.value?.toString(), note: cellNote });
      }

      spreadsheetData.push(rowData);
    });

    const uuidSchema = z.string().uuid().optional();

    let nodeId: z.infer<typeof uuidSchema>;

    const nodeIdParse = uuidSchema.safeParse(spreadsheetData[0][0].value);

    if (nodeIdParse.success) {
      nodeId = nodeIdParse.data;
    }

    let defaultTableValues;
    if (defaultValues && typeof defaultValues === 'object' && 'nodes' in defaultValues) {
      defaultTableValues = defaultValues.nodes?.find((node) => node.id === nodeId)?.content;
    } else if (defaultValues && typeof defaultValues === 'object') {
      defaultTableValues = defaultValues as DecisionTableType;
    }

    parsedSpreadsheetData.push({
      ...getDecisionTableData(nodeId, spreadsheetData, defaultTableValues),
      id: nodeId || crypto.randomUUID(),
      name: spreadsheetName,
      type: NodeKind.DecisionTable,
      position: { x: 0, y: 0 },
    });
  });

  return parsedSpreadsheetData;
};
