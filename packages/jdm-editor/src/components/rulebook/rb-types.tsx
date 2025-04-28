import type { z } from 'zod';

import type { blockSchema, rulebookSchema } from '../../helpers/schema';

export const privateSymbol = Symbol('private');

type BlockSchema = z.infer<typeof blockSchema>;

export type DiffStatus = 'added' | 'removed' | 'modified' | 'unchanged' | 'moved';

export type Diff<T = any> = {
  _diff?: DiffMetadata<T>;
};

export type DiffMetadata<T = any> = {
  status?: DiffStatus;
  previousValue?: T;
  previousIndex?: number;
  currentIndex?: number;
  fields?: Record<string, DiffMetadata>;
};

export type Block<T = any> = {
  id: string;
  name: string;
  description?: string;
  type: BlockSchema['type'] | string;
  content?: T;
  _diff?: {
    status: DiffStatus;
    fields?: Record<string, DiffMetadata>;
  };
};

export type RulebookType = z.infer<typeof rulebookSchema>;
