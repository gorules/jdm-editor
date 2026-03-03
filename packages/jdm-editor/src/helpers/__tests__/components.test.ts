import { describe, expect, it } from 'vitest';

import { columnIdSelector, getPath, recursiveSelect, type SchemaSelectProps } from '../components';

const fields: SchemaSelectProps[] = [
  {
    field: 'header',
    items: [
      { field: 'invoice_number' },
      {
        field: 'vendor',
        items: [{ field: 'name' }],
      },
    ],
  },
  { field: 'amount_total' },
];

describe('components helpers', () => {
  it('recursiveSelect returns deeply nested field', () => {
    expect(recursiveSelect(['header', 'vendor', 'name'], fields)).toEqual({ field: 'name' });
  });

  it('recursiveSelect returns undefined when selector does not match', () => {
    expect(recursiveSelect(['header', 'missing'], fields)).toBeUndefined();
  });

  it('getPath returns full path for nested field', () => {
    expect(getPath('name', fields)).toEqual(['header', 'vendor', 'name']);
  });

  it('getPath returns undefined for missing field', () => {
    expect(getPath('missing', fields)).toBeUndefined();
  });

  it('columnIdSelector resolves both input and output columns and marks colType', () => {
    const state = {
      decisionTable: {
        inputs: [{ id: 'i-1', name: 'in' }],
        outputs: [{ id: 'o-1', name: 'out' }],
      },
    };

    expect(columnIdSelector('i-1')(state as never)).toMatchObject({ id: 'i-1', colType: 'input' });
    expect(columnIdSelector('o-1')(state as never)).toMatchObject({ id: 'o-1', colType: 'output' });
  });
});
