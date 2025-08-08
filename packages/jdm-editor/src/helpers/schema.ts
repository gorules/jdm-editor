import { z } from 'zod';

export const DECISION_GRAPH_CONTENT_TYPE = 'application/vnd.gorules.decision';
const id = z.string().default(() => crypto.randomUUID());

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

const node = nodeCommon.extend;

export const inputNodeSchema = node({
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
});

export const outputNodeSchema = node({
  type: z.literal(NodeKind.Output),
  content: z
    .object({
      schema: z
        .string()
        .nullish()
        .transform((val) => val ?? ''),
    })
    .default({ schema: '' }),
});

export const decisionTableSchema = node({
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
      }),
    ),
    outputs: z.array(
      z.object({
        id,
        name: z.string(),
        field: z.string(),
        defaultValue: z.string().nullish(),
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
});

export const functionNodeSchema = node({
  type: z.literal(NodeKind.Function),
  content: z
    .string()
    .or(
      z.object({
        source: z.string().default(''),
      }),
    )
    .nullish(),
});

const expressionItemSchema = z.object({
  id,
  key: z.string().default(''),
  value: z.string().default(''),
});

const expressionGroupSchema = z.object({
  id,
  rules: z
    .object({
      id,
      if: z.string().trim().optional(),
      get then() {
        return expressionEntrySchema.array();
      },
    })
    .array(),
});

const expressionEntrySchema = z.union([expressionItemSchema, expressionGroupSchema]);

export const expressionNodeSchema = node({
  type: z.literal(NodeKind.Expression),
  content: z.object({
    expressions: expressionEntrySchema.array(),
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
});

export const decisionNodeSchema = node({
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
});

export const switchNodeSchema = node({
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
});

export const customNodeSchema = node({
  type: z.literal(CustomKind),
  content: z.object({
    kind: z.string(),
    config: z.any(),
  }),
});

export const anyNodeSchema = node({
  type: z.string().refine((val) => !(Object.values(NodeKind) as string[]).includes(val), {
    message: 'Invalid type',
  }),
  content: z.any().nullish(),
});

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
