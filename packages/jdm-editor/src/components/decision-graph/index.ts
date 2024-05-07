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
export {
  useDecisionGraphState,
  useDecisionGraphActions,
  useDecisionGraphReferences,
  useDecisionGraphListeners,
  useDecisionGraphRaw,
  type DecisionNode,
  type DecisionEdge,
  type DecisionGraphType,
} from './context/dg-store.context';

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
