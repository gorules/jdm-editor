export * from './dg';

export type {
  NodeSpecification,
  MinimalNodeSpecification,
  MinimalNodeProps,
} from './nodes/specifications/specification-types';
export type { CustomNodeSpecification } from './nodes/custom-node/index';
export { createJdmNode } from './nodes/custom-node';
export { GraphNode, type GraphNodeProps } from './nodes/graph-node';
export { GraphSimulator, type GraphSimulatorProps } from './simulator/dg-simulator';
export { SimulatorEditor } from './simulator/simulator-editor';
export {
  useDecisionGraphState,
  useDecisionGraphActions,
  useDecisionGraphReferences,
  useDecisionGraphListeners,
  useDecisionGraphRaw,
  useNodeDiff,
  useEdgeDiff,
  NodeTypeKind,
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
} from './simulator/simulation.types';

export {
  calculateDiffGraph,
  compareAndUnifyLists,
  processEdges,
  processNodes,
  addStrikethrough,
  buildDiffString,
  compareStringFields,
  type ProcessNodesOptions,
} from './dg-diff-util';

export {
  type DecisionEdge,
  type DecisionNode,
  type DecisionSettings,
  type DecisionGraphType,
  type DiffMetadata,
  type Diff,
  type Position,
  type DiffStatus,
} from './dg-types';
