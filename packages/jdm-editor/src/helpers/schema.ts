import { z } from 'zod';

export const DECISION_GRAPH_CONTENT_TYPE = 'application/vnd.gorules.decision';
const id = z.string().default(() => crypto.randomUUID());

const enumValueSchema = z.object({ label: z.string(), value: z.string() });

export const columnEnumSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('inline'), values: z.array(enumValueSchema), loose: z.boolean().optional() }),
  z.object({ type: z.literal('ref'), ref: z.string(), loose: z.boolean().optional() }),
]);
export type ColumnEnum = z.infer<typeof columnEnumSchema>;

export const columnFieldTypeSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('any') }),
  z.object({ type: z.literal('string'), enum: columnEnumSchema.optional() }),
  z.object({ type: z.literal('number') }),
  z.object({ type: z.literal('boolean') }),
  z.object({ type: z.literal('date') }),
]);
export type ColumnFieldType = z.infer<typeof columnFieldTypeSchema>;

export const COLUMN_FIELD_TYPE_OPTIONS: { value: ColumnFieldType['type']; label: string }[] = [
  { value: 'any', label: 'Any' },
  { value: 'string', label: 'String' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'date', label: 'Date' },
];

export const outputFieldTypeSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('auto') }),
  z.object({ type: z.literal('string'), enum: columnEnumSchema.optional() }),
  z.object({ type: z.literal('string-array'), enum: columnEnumSchema.optional() }),
  z.object({ type: z.literal('number') }),
  z.object({ type: z.literal('boolean') }),
  z.object({ type: z.literal('date') }),
]);
export type OutputFieldType = z.infer<typeof outputFieldTypeSchema>;

export const OUTPUT_FIELD_TYPE_OPTIONS: { value: OutputFieldType['type']; label: string }[] = [
  { value: 'auto', label: 'Auto' },
  { value: 'string', label: 'Text' },
  { value: 'string-array', label: 'Text[]' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'date', label: 'Date' },
];

export enum NodeKind {
  Input = 'inputNode',
  Output = 'outputNode',
  DecisionTable = 'decisionTableNode',
  Function = 'functionNode',
  Expression = 'expressionNode',
  Switch = 'switchNode',
  Decision = 'decisionNode',
}

export const CustomKind = 'customNode';

const nodeCommon = z.object({
  id,
  name: z.string(),
  position: z.object({ x: z.number(), y: z.number() }).default({ x: 0, y: 0 }),
});

export const inputNodeSchema = z
  .object({
    type: z.literal(NodeKind.Input),
    content: z
      .object({
        schema: z
          .string()
          .nullish()
          .transform((val) => val ?? ''),
      })
      .default({
        schema: '',
      }),
  })
  .merge(nodeCommon);

export const outputNodeSchema = z
  .object({
    type: z.literal(NodeKind.Output),
    content: z
      .object({
        schema: z
          .string()
          .nullish()
          .transform((val) => val ?? ''),
      })
      .default({
        schema: '',
      }),
  })
  .merge(nodeCommon);

export const decisionTableSchema = z
  .object({
    type: z.literal(NodeKind.DecisionTable),
    content: z.object({
      hitPolicy: z
        .enum(['first', 'collect'])
        .nullish()
        .transform((val) => val ?? 'first'),
      rules: z
        .array(
          z.record(
            z.string(),
            z
              .string()
              .nullish()
              .transform((val) => val ?? ''),
          ),
        )
        .default([]),
      inputs: z.array(
        z.object({
          id,
          name: z.string().nullish(),
          field: z.string().nullish(),
          defaultValue: z.string().nullish(),
          fieldType: columnFieldTypeSchema.nullish(),
        }),
      ),
      outputs: z.array(
        z.object({
          id,
          name: z.string(),
          field: z.string(),
          defaultValue: z.string().nullish(),
          outputFieldType: outputFieldTypeSchema.nullish(),
        }),
      ),
      passThrough: z
        .boolean()
        .nullish()
        .transform((val) => val ?? false),
      inputField: z
        .string()
        .nullish()
        .default(null)
        .transform((val) => (val && val.trim().length > 0 ? val : null)),
      outputPath: z
        .string()
        .nullish()
        .default(null)
        .transform((val) => (val && val.trim().length > 0 ? val : null)),
      executionMode: z
        .enum(['single', 'loop'])
        .nullish()
        .transform((val) => val ?? 'single'),
    }),
  })
  .merge(nodeCommon);

export const functionNodeSchema = z
  .object({
    type: z.literal(NodeKind.Function),
    content: z
      .string()
      .or(
        z.object({
          source: z.string().default(''),
        }),
      )
      .nullish(),
  })
  .merge(nodeCommon);

export const expressionNodeSchema = z
  .object({
    type: z.literal(NodeKind.Expression),
    content: z.object({
      expressions: z.array(
        z.object({
          id,
          key: z.string().default(''),
          value: z.string().default(''),
        }),
      ),
      passThrough: z
        .boolean()
        .nullish()
        .transform((val) => val ?? false),
      inputField: z
        .string()
        .nullish()
        .default(null)
        .transform((val) => (val && val.trim().length > 0 ? val : null)),
      outputPath: z
        .string()
        .nullish()
        .default(null)
        .transform((val) => (val && val.trim().length > 0 ? val : null)),
      executionMode: z
        .enum(['single', 'loop'])
        .nullish()
        .transform((val) => val ?? 'single'),
    }),
  })
  .merge(nodeCommon);

export const decisionNodeSchema = z
  .object({
    type: z.literal(NodeKind.Decision),
    content: z.object({
      key: z.string(),
      passThrough: z
        .boolean()
        .nullish()
        .transform((val) => val ?? false),
      inputField: z
        .string()
        .nullish()
        .default(null)
        .transform((val) => (val && val.trim().length > 0 ? val : null)),
      outputPath: z
        .string()
        .nullish()
        .default(null)
        .transform((val) => (val && val.trim().length > 0 ? val : null)),
      executionMode: z
        .enum(['single', 'loop'])
        .nullish()
        .transform((val) => val ?? 'single'),
    }),
  })
  .merge(nodeCommon);

export const switchNodeSchema = z
  .object({
    type: z.literal(NodeKind.Switch),
    content: z.object({
      hitPolicy: z
        .enum(['first', 'collect'])
        .nullish()
        .transform((val) => val ?? 'first'),
      statements: z.array(
        z.object({
          id,
          condition: z
            .string()
            .nullish()
            .transform((val) => val ?? ''),
          isDefault: z
            .boolean()
            .nullish()
            .transform((val) => val ?? false),
        }),
      ),
    }),
  })
  .merge(nodeCommon);

export const customNodeSchema = z
  .object({
    type: z.literal(CustomKind),
    content: z.object({
      kind: z.string(),
      config: z.any(),
    }),
  })
  .merge(nodeCommon);

export const anyNodeSchema = z
  .object({
    type: z.string().refine((val) => !(Object.values(NodeKind) as string[]).includes(val), {
      message: 'Invalid type',
    }),
    content: z.any().nullish(),
  })
  .merge(nodeCommon);

export const nodeSchema = z
  .discriminatedUnion('type', [
    decisionNodeSchema,
    expressionNodeSchema,
    functionNodeSchema,
    decisionTableSchema,
    switchNodeSchema,
    customNodeSchema,
    inputNodeSchema,
    outputNodeSchema,
  ])
  .or(anyNodeSchema);

export const edgeSchema = z.object({
  id: z.string(),
  sourceId: z.string(),
  targetId: z.string(),
  sourceHandle: z.string().nullish(),
  type: z.enum(['edge']),
});

export const validationSchema = z.object({
  inputSchema: z.any().nullish().default(null),
  outputSchema: z.any().nullish().default(null),
});

export const decisionModelSchema = z.object({
  nodes: z.array(nodeSchema).default([]),
  edges: z.array(edgeSchema).default([]),
});
