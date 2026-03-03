import { message } from 'antd';
import exceljs from 'exceljs';
import { describe, expect, it, vi } from 'vitest';

import { exportDecisionTable, readDecisionTableFile } from '../excel';

vi.mock('../../../helpers/file-helpers', () => ({
  saveFile: vi.fn(),
}));

import { saveFile } from '../../../helpers/file-helpers';

const saveFileMock = vi.mocked(saveFile);

describe('decision table excel io', () => {
  it('exports workbook blob with xlsx file name', async () => {
    await exportDecisionTable('my-table', [
      {
        id: 'dt-1',
        name: 'Validation',
        hitPolicy: 'first',
        inputField: undefined,
        outputPath: undefined,
        passThorough: false,
        executionMode: 'single',
        inputs: [{ id: 'in', name: 'Input', field: 'input', defaultValue: '' }],
        outputs: [{ id: 'out', name: 'Output', field: 'output', defaultValue: '' }],
        rules: [{ _id: 'r1', in: 'x', out: 'y', _description: 'rule' }],
      },
    ]);

    expect(saveFileMock).toHaveBeenCalledTimes(1);
    expect(saveFileMock.mock.calls[0]?.[0]).toBe('my-table.xlsx');
    expect(saveFileMock.mock.calls[0]?.[1]).toBeInstanceOf(Blob);
  });

  it('reads worksheet into decision table nodes', async () => {
    const workbook = new exceljs.Workbook();
    const ws = workbook.addWorksheet('Imported Table');

    ws.addRow(['dt-77']);
    ws.addRow(['Inputs', 'Outputs', '', '']);

    const header = ws.addRow(['Input', 'Output', 'DESCRIPTION', 'Rule ID']);
    header.getCell(1).note = JSON.stringify({ id: 'in', name: 'input', type: 'input' });
    header.getCell(2).note = JSON.stringify({ id: 'out', name: 'output', type: 'output' });

    ws.addRow(['a > 1', 'true', 'sample', 'rule-1']);

    const buffer = await workbook.xlsx.writeBuffer();
    const result = await readDecisionTableFile(buffer as ArrayBuffer);

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('dt-77');
    expect(result[0]?.name).toBe('Imported Table');
    expect(result[0]?.content.inputs[0]).toMatchObject({ id: 'in', name: 'Input', field: 'input' });
    expect(result[0]?.content.outputs[0]).toMatchObject({ id: 'out', name: 'Output', field: 'output' });
    expect(result[0]?.content.rules[0]).toMatchObject({ in: 'a > 1', out: 'true', _description: 'sample', _id: 'rule-1' });
  });

  it('reports malformed header metadata and still returns parsed structure', async () => {
    const errorSpy = vi.spyOn(message, 'error');

    const workbook = new exceljs.Workbook();
    const ws = workbook.addWorksheet('Bad Header');

    ws.addRow(['dt-bad']);
    ws.addRow(['Inputs', 'Outputs', '', '']);

    const header = ws.addRow(['Input', 'Output', 'DESCRIPTION', 'Rule ID']);
    header.getCell(1).note = '{bad-json';
    header.getCell(2).note = JSON.stringify({ id: 'out', name: 'output', type: 'output' });

    ws.addRow(['x', 'ok', '', 'rule-x']);

    const buffer = await workbook.xlsx.writeBuffer();
    const result = await readDecisionTableFile(buffer as ArrayBuffer);

    expect(errorSpy).toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('Bad Header');

    errorSpy.mockRestore();
  });
});
