import type { DecisionTableStoreType } from '../components/decision-table/context/dt-store.context';

export type SchemaSelectProps = {
  field: string;
  name?: string;
  items?: SchemaSelectProps[];
};
export const recursiveSelect = (selector: string[], fields: SchemaSelectProps[]): SchemaSelectProps | undefined => {
  const key = selector?.[0];
  if (!key) return;
  const field = fields.find((field) => field.field === key);
  if (field?.items) {
    return recursiveSelect(selector.slice(1), field.items);
  }
  return field;
};

export const getPath = (key: string, items: SchemaSelectProps[]): string[] | undefined => {
  if (!key || !items) return;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.field === key) {
      return [item.field];
    }

    if (item.items) {
      const path = getPath(key, item.items);
      if (!path) continue;
      return [item.field, ...path];
    }
  }
};

export const columnIdSelector = (x: string) => (state: DecisionTableStoreType['state']) =>
  [
    ...state.decisionTable.inputs.map((i: any) => ({
      ...i,
      colType: 'input',
    })),
    ...state.decisionTable.outputs.map((i: any) => ({
      ...i,
      colType: 'output',
    })),
  ].find((c) => c.id === x);
