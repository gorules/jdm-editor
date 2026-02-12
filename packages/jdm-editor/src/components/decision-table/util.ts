import { P, match } from 'ts-pattern';

import type { TableSchemaItem } from './context/dt-store.context';

export const getOutputTypeDefault = (schemaItem: TableSchemaItem): string => {
  const ft = schemaItem.outputFieldType;
  if (!ft) return '';
  switch (ft.type) {
    case 'boolean':
      return 'true';
    case 'number':
      return '0';
    case 'string':
      return '""';
    case 'date':
      return `d('${new Date().toISOString().slice(0, 10)}')`;
    default:
      return '';
  }
};

export const getReferenceMap = (trace: unknown, index: number) => {
  return match(trace)
    .with({ traceData: { reference_map: P._ } }, (s) => s.traceData.reference_map as Record<string, unknown>)
    .with({ traceData: P.array() }, ({ traceData: arr }) => {
      return (arr[index] as any)?.reference_map as Record<string, unknown>;
    })
    .otherwise(() => undefined);
};
