import { VariableType } from '@gorules/zen-engine-wasm';
import equal from 'fast-deep-equal/es6/react';
import { produce } from 'immer';
import { useEffect } from 'react';
import type { Edge, Node } from 'reactflow';
import { getIncomers, getOutgoers } from 'reactflow';

import { isWasmAvailable } from '../../helpers/wasm';
import type { DecisionGraphStoreType, DecisionGraphType, DecisionNode } from './context/dg-store.context';
import { NodeTypeKind, useDecisionGraphRaw } from './context/dg-store.context';
import { mapToGraphEdges, mapToGraphNodes } from './dg-util';
import type { NodeKind } from './nodes/specifications/specification-types';
import { nodeSpecification } from './nodes/specifications/specifications';

export const DecisionGraphInferTypes = () => {
  const { stateStore } = useDecisionGraphRaw();

  // Infer input types for nodes
  useEffect(() => {
    if (!isWasmAvailable()) {
      return;
    }

    return stateStore.subscribe(({ decisionGraph, nodeTypes }, prevState) => {
      const currentDigest = inputStateDigest({ decisionGraph, nodeTypes });
      const previousDigest = inputStateDigest(prevState);
      if (equal(currentDigest, previousDigest)) {
        return;
      }

      const inferredInputs: Record<string, VariableType> = {};
      walkGraph(decisionGraph).forEach(({ node, incomers }) => {
        if (node.type === 'inputNode') {
          return;
        }

        const incomerTypes = incomers
          .map((inc) => {
            const type = nodeTypes[inc.id] ?? {};
            return type[NodeTypeKind.Output] ?? type[NodeTypeKind.InferredOutput];
          })
          .filter((t) => !!t)
          .map((t) => t.clone());

        inferredInputs[node.id] = VariableType.fromIncoming(incomerTypes);
      });

      const newNodeTypes = produce(nodeTypes, (draft) => {
        Object.entries(inferredInputs).forEach(([id, nodeType]) => {
          draft[id] ??= {};
          draft[id][NodeTypeKind.InferredInput] = nodeType;
        });
      });

      stateStore.setState({ nodeTypes: newNodeTypes });
    });
  }, []);

  // Infer output types
  useEffect(() => {
    if (!isWasmAvailable()) {
      return;
    }

    return stateStore.subscribe(({ decisionGraph, nodeTypes, customNodes }, prevState) => {
      const currentDigest = outputStateDigest({ decisionGraph, nodeTypes, customNodes });
      const previousDigest = outputStateDigest(prevState);
      if (equal(currentDigest, previousDigest)) {
        return;
      }

      const inferredOutputs: Record<string, VariableType> = {};
      walkGraph(decisionGraph).forEach(({ node }) => {
        if (!node.type) {
          return;
        }

        const inferTypes =
          nodeSpecification[node.type as NodeKind]?.inferTypes ??
          customNodes.find((n) => n.kind === node.type)?.inferTypes;
        if (!inferTypes) {
          return;
        }

        const input =
          nodeTypes?.[node.id]?.[NodeTypeKind.Input] ??
          nodeTypes?.[node.id]?.[NodeTypeKind.InferredInput] ??
          VariableType.fromJson('Any');

        const prevInput =
          prevState.nodeTypes?.[node.id]?.[NodeTypeKind.Input] ??
          prevState.nodeTypes?.[node.id]?.[NodeTypeKind.InferredInput] ??
          VariableType.fromJson('Any');

        const prevContent = prevState.decisionGraph.nodes.find((n) => n.id === node.id)?.content;

        const needsUpdate = inferTypes.needsUpdate(
          { input, content: node.content },
          { input: prevInput, content: prevContent },
        );
        if (!needsUpdate && nodeTypes?.[node.id]?.[NodeTypeKind.InferredOutput]) {
          return;
        }

        inferredOutputs[node.id] = inferTypes.determineOutputType({ input, content: node.content });
      });

      const newNodeTypes = produce(nodeTypes, (draft) => {
        Object.entries(inferredOutputs).forEach(([id, nodeType]) => {
          draft[id] ??= {};
          draft[id][NodeTypeKind.InferredOutput] = nodeType;
        });
      });

      stateStore.setState({ nodeTypes: newNodeTypes });
    });
  }, []);

  return null;
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

const inputStateDigest = ({
  decisionGraph,
  nodeTypes,
}: Pick<DecisionGraphStoreType['state'], 'decisionGraph' | 'nodeTypes'>) => {
  const edgesData = decisionGraph.edges;
  const nodesData = decisionGraph.nodes.map(({ id, type }) => ({ id, type }));

  const typesData = Object.entries(nodeTypes)
    .map(([id, value]) => ({
      id,
      output: value[NodeTypeKind.Output]?.hash(),
      inferredOutput: value[NodeTypeKind.InferredOutput]?.hash(),
    }))
    .filter((s) => !!s.output || !!s.inferredOutput);

  return { edgesData, nodesData, typesData };
};

const outputStateDigest = ({
  decisionGraph,
  nodeTypes,
  customNodes,
}: Pick<DecisionGraphStoreType['state'], 'decisionGraph' | 'nodeTypes' | 'customNodes'>) => {
  const contentData = decisionGraph.nodes.map((node) => node.content);
  const customNodesData = customNodes.map((cn) => cn.kind);

  const typesData = Object.entries(nodeTypes)
    .map(([id, value]) => ({
      id,
      input: value[NodeTypeKind.Input]?.hash(),
      inferredInput: value[NodeTypeKind.InferredInput]?.hash(),
    }))
    .filter((s) => !!s.input || !!s.inferredInput);

  return { contentData, customNodesData, typesData };
};
