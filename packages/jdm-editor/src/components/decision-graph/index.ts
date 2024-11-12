export * from './dg';

export type {
  NodeSpecification,
  MinimalNodeSpecification,
  MinimalNodeProps,
} from './nodes/specifications/specification-types';
export type { CustomNodeSpecification } from './nodes/custom-node/index';
export { createJdmNode } from './nodes/custom-node';
export { GraphNode, type GraphNodeProps } from './nodes/graph-node';
export { GraphSimulator } from './dg-simulator';
export * from './dg-diff-util';
export {
  useDecisionGraphState,
  useDecisionGraphActions,
  useDecisionGraphReferences,
  useDecisionGraphListeners,
  useDecisionGraphRaw,
  useNodeDiff,
  useEdgeDiff,
  NodeTypeKind,
  type DecisionNode,
  type DecisionEdge,
  type DecisionGraphType,
} from './context/dg-store.context';
export { NodeColor } from './nodes/specifications/colors';

export type {
  Simulation,
  SimulationTrace,
  SimulationTraceDataTable,
  SimulationTraceDataFunction,
  SimulationTraceDataExpression,
  SimulationError,
  SimulationOk,
  SimulationTraceDataSwitch,
} from './types/simulation.types';

export * from './dg-diff-util';
