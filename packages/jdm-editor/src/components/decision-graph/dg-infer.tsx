import { VariableType } from '@gorules/zen-engine-wasm';
import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import { useEffect } from 'react';
import type { Edge, Node } from 'reactflow';
import { getIncomers, getOutgoers } from 'reactflow';
import { P, match } from 'ts-pattern';

import { isWasmAvailable } from '../../helpers/wasm';
import type { DecisionGraphStoreType, DecisionGraphType, DecisionNode } from './context/dg-store.context';
import { NodeTypeKind, useDecisionGraphRaw } from './context/dg-store.context';
import { mapToGraphEdges, mapToGraphNodes } from './dg-util';
import type { NodeKind } from './nodes/specifications/specification-types';
import { nodeSpecification } from './nodes/specifications/specifications';

export const DecisionGraphInferTypes = () => {
  const { stateStore } = useDecisionGraphRaw();

  // Set variable types based on trace
  useEffect(() => {
    if (!isWasmAvailable()) {
      return;
    }

    return stateStore.subscribe(({ simulate, nodeTypes }, prevState) => {
      if (equal(simulate, prevState?.simulate)) {
        return;
      }

      const trace = match(simulate)
        .with({ result: P.nonNullable }, ({ result }) => result.trace)
        .otherwise(() => null);
      if (trace === null) {
        const newNodeTypes = produce(nodeTypes, (draft) => {
          Object.values(draft).forEach((nt) => {
            delete nt[NodeTypeKind.Input];
            delete nt[NodeTypeKind.Output];
          });
        });

        stateStore.setState({ nodeTypes: newNodeTypes });
        return;
      }

      const traceValues = Object.values(trace);
      if (traceValues.length === 0) {
        return;
      }

      const newNodeTypes = produce(nodeTypes, (draft) => {
        traceValues.forEach((t) => {
          draft[t.id] ??= {};

          draft[t.id][NodeTypeKind.Output] = new VariableType(t.output ?? {});
          draft[t.id][NodeTypeKind.Input] = new VariableType(t.input ?? {});
        });
      });

      stateStore.setState({ nodeTypes: newNodeTypes });
    });
  }, []);

  // Infer types for nodes
  useEffect(() => {
    if (!isWasmAvailable()) {
      return;
    }

    return stateStore.subscribe((state, prevState) => {
      const stateDigest = inferTypesStateDigest(state);
      const prevStateDigest = inferTypesStateDigest(prevState);
      const needUpdate = inferTypesNeedsUpdate(state, prevState);
      if (equal(stateDigest, prevStateDigest) && !needUpdate) {
        return;
      }

      const infer = inferNodeTypes(state, prevState);
      if (infer.isModified) {
        stateStore.setState({ nodeTypes: infer.nodeTypes });
      }
    });
  }, []);

  return null;
};

type NodeTypes = DecisionGraphStoreType['state']['nodeTypes'];

type InferNodeTypes = (
  state: DecisionGraphStoreType['state'],
  prevState: DecisionGraphStoreType['state'],
) => { nodeTypes: NodeTypes; isModified: boolean };

const inferNodeTypes: InferNodeTypes = ({ decisionGraph, nodeTypes, customNodes }, prevState) => {
  let isModified = false;
  const newNodeTypes = produce(nodeTypes, (draft) => {
    walkGraph(decisionGraph).forEach(({ node, incomers }) => {
      if (node.type === 'inputNode') {
        return;
      }

      const incomerTypes = incomers
        .map((inc) => {
          const type = draft[inc.id] ?? {};
          return type[NodeTypeKind.Output] ?? type[NodeTypeKind.InferredOutput];
        })
        .filter((t) => !!t)
        .map((t) => t.clone());
      const inferredInputType = match(incomerTypes.length)
        .with(1, () => incomerTypes[0])
        .otherwise(() => VariableType.fromIncoming(incomerTypes));

      const currentInputType = draft?.[node.id]?.[NodeTypeKind.InferredInput];
      // Mutation block
      if (!currentInputType?.equal(inferredInputType)) {
        isModified = true;
        draft[node.id] ??= {};
        draft[node.id][NodeTypeKind.InferredInput] = inferredInputType;
      }

      const inferTypes =
        nodeSpecification[node.type as NodeKind]?.inferTypes ??
        customNodes.find((n) => n.kind === node.type)?.inferTypes;
      if (!inferTypes) {
        return;
      }

      const input =
        draft?.[node.id]?.[NodeTypeKind.Input] ??
        draft?.[node.id]?.[NodeTypeKind.InferredInput] ??
        VariableType.fromJson('Any');

      const prevInput =
        prevState.nodeTypes?.[node.id]?.[NodeTypeKind.Input] ??
        prevState.nodeTypes?.[node.id]?.[NodeTypeKind.InferredInput] ??
        VariableType.fromJson('Any');

      const prevContent = prevState.decisionGraph.nodes.find((n) => n.id === node.id)?.content;
      const needsUpdate = inferTypes.needsUpdate(node.content, prevContent) || !input.equal(prevInput);
      if (!needsUpdate && draft?.[node.id]?.[NodeTypeKind.InferredOutput]) {
        return;
      }

      const inferredOutputType = inferTypes.determineOutputType({ input, content: node.content });
      const currentOutputType = draft?.[node.id]?.[NodeTypeKind.InferredOutput];
      // Mutation block
      if (!currentOutputType?.equal(inferredOutputType)) {
        isModified = true;
        draft[node.id] ??= {};
        draft[node.id][NodeTypeKind.InferredOutput] = inferredOutputType;
      }
    });
  });

  return {
    isModified,
    nodeTypes: newNodeTypes,
  };
};

type WalkGraphReturn = {
  node: DecisionNode;
  incomers: DecisionNode[];
};

function* walkGraph(decisionGraph: DecisionGraphType): Generator<WalkGraphReturn> {
  const nodes = mapToGraphNodes(decisionGraph.nodes);
  const edges = mapToGraphEdges(decisionGraph.edges);

  const begin = decisionGraph.nodes.find((n) => n.type === 'inputNode');
  const beginRf = nodes.find((n) => n.id === begin?.id);
  if (!begin || !beginRf) {
    return;
  }

  // TODO: Perf - Skip recalculating has cycle, or find a nicer way to check (as it's blocked on graph level)
  if (hasCycle(beginRf, nodes, edges)) {
    return;
  }

  yield { node: begin, incomers: [] };
  const visited = new Set<string>();

  visited.add(begin.id);

  const stack = getOutgoers(beginRf, nodes, edges);
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (visited.has(current.id)) {
      continue;
    }

    const incomers = getIncomers(current, nodes, edges);
    const unvisitedIncomers = incomers.filter((incomer) => !visited.has(incomer.id));

    if (unvisitedIncomers.length > 0) {
      stack.push(current, ...unvisitedIncomers);
      continue;
    }

    visited.add(current.id);
    const decisionNode = decisionGraph.nodes.find((n) => n.id === current.id);
    if (decisionNode) {
      const mappedIncomers = decisionGraph.nodes.filter((n) => incomers.some((inc) => inc.id === n.id));
      yield { node: decisionNode, incomers: mappedIncomers };
    }

    const outgoers = getOutgoers(current, nodes, edges);
    stack.push(...outgoers);
  }
}

const hasCycle = (begin: Node, nodes: Node[], edges: Edge[]): boolean => {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const dfs = (node: Node): boolean => {
    visited.add(node.id);
    recursionStack.add(node.id);

    const outgoers = getOutgoers(node, nodes, edges);
    for (const outgoer of outgoers) {
      if (!visited.has(outgoer.id)) {
        if (dfs(outgoer)) {
          return true;
        }
      } else if (recursionStack.has(outgoer.id)) {
        return true;
      }
    }

    recursionStack.delete(node.id);
    return false;
  };

  return dfs(begin);
};

const inferTypesStateDigest = ({ decisionGraph, nodeTypes, customNodes }: DecisionGraphStoreType['state']) => {
  const edgesData = decisionGraph.edges;
  const nodesData = decisionGraph.nodes.map(({ id, type }) => ({ id, type }));
  const customNodesData = customNodes.map((cn) => cn.kind);

  const typesData = Object.entries(nodeTypes).map(([id, value]) => ({
    id,
    input: variableTypeHash(value[NodeTypeKind.Input]),
    output: variableTypeHash(value[NodeTypeKind.Output]),
  }));

  const inputNodeId = decisionGraph.nodes.find((n) => n.type === 'inputNode')?.id;
  const inputNodeType = match(nodeTypes?.[inputNodeId ?? '']?.[NodeTypeKind.InferredOutput])
    .with(P.nonNullable, (type) => type.hash())
    .otherwise(() => null);

  return { edgesData, nodesData, typesData, customNodesData, inputNodeType };
};

const inferTypesNeedsUpdate = (
  { decisionGraph, customNodes }: DecisionGraphStoreType['state'],
  prevState: DecisionGraphStoreType['state'],
) => {
  const nodesNeedUpdate = decisionGraph.nodes.map((node) => {
    const inferTypes =
      nodeSpecification[node.type as NodeKind]?.inferTypes ?? customNodes.find((n) => n.kind === node.type)?.inferTypes;

    if (!inferTypes) {
      return false;
    }

    const prevNode = prevState.decisionGraph.nodes.find((n) => n.id === node.id);
    if (!prevNode) {
      return true;
    }

    return inferTypes.needsUpdate(node.content, prevNode.content);
  });

  return nodesNeedUpdate.some((up) => up);
};

declare module '@gorules/zen-engine-wasm' {
  interface VariableType {
    __hash: string;
  }
}

const variableTypeHash = (vt?: VariableType): string | undefined => {
  if (!vt) {
    return undefined;
  }

  if (vt.__hash) {
    return vt.__hash;
  }

  vt.__hash = vt.hash();
  return vt.__hash;
};
