import type { DecisionGraphType } from '../dg-types';

type Input = unknown;
type Output = unknown;

export type Simulation = { result?: SimulationOk } & { error?: SimulationError };

export type SimulationError = {
  title?: string;
  message?: string;
  data: {
    nodeId?: string;
  };
};

export type SimulationOk = {
  performance: string;
  result: Output;
  // Graph that was used
  snapshot: DecisionGraphType;

  /** List of traces by nodeId */
  trace: Record<string, SimulationTrace>;
};

type TraceDataVariants =
  | SimulationTraceDataTable
  | SimulationTraceDataFunction
  | SimulationTraceDataExpression
  | SimulationTraceDataSwitch
  | null;

export type SimulationTrace<Trace = TraceDataVariants> = {
  input: Input | null;
  output: Output | null;
  name: string;
  id: string;
  performance: string | null;
  traceData: Trace;
  order?: number;
};

export type SimulationTraceDataFunction = {
  log?: TraceFunctionLog[];
};

export type SimulationTraceDataExpression = Record<string, { result: string }>;

type SimulationTraceDataTableSingle = {
  index: number;
  reference_map: Record<string, unknown>;
  /** List of expressions */
  rule: Record<string, string>;
};

export type SimulationTraceDataTable = SimulationTraceDataTableSingle | SimulationTraceDataTableSingle[];

export type SimulationTraceDataSwitch = {
  statements: {
    id: string;
  }[];
};

type TraceFunctionLog = {
  lines: string[];
  msSinceRun: number;
};
