import _ from 'lodash';
import { P, match } from 'ts-pattern';

import type { DecisionEdge, DecisionGraphType, DecisionNode, DiffMetadata } from './dg-types';
import type { CustomNodeSpecification } from './nodes/custom-node';
import { decisionTableSpecification } from './nodes/specifications/decision-table.specification';
import { expressionSpecification } from './nodes/specifications/expression.specification';
import { functionSpecification } from './nodes/specifications/function.specification';
import { NodeKind, type NodeSpecification } from './nodes/specifications/specification-types';
import { switchSpecification } from './nodes/specifications/switch.specification';

export const compareStringFields = (field1?: string | null, field2?: string | null): boolean => {
  const value1 = (field1 || '').trim();
  const value2 = (field2 || '').trim();

  return value1 === value2;
};

export type ProcessNodesOptions = {
  components: NodeSpecification[];
  customNodes: CustomNodeSpecification<object, any>[];
};

export const calculateDiffGraph = (
  currentGraph: DecisionGraphType,
  previousGraph: DecisionGraphType,
  options?: ProcessNodesOptions,
): DecisionGraphType => {
  const nodes = processNodes(currentGraph?.nodes ?? [], previousGraph?.nodes ?? [], options);
  const edges = processEdges(currentGraph?.edges ?? [], previousGraph?.edges ?? []);
  return {
    nodes,
    edges,
    settings: currentGraph?.settings,
  };
};

export const processNodes = (
  currentNodes: DecisionNode<any>[],
  previousNodes: DecisionNode<any>[],
  options?: ProcessNodesOptions,
) => {
  const components = options?.components || [];
  const customNodes = options?.customNodes || [];

  // Start with all new version nodes
  const nodesMap = new Map();

  // Process new version nodes first
  (currentNodes || []).forEach((newNode) => {
    const oldNode = (previousNodes || []).find((n) => n.id === newNode.id);

    if (!oldNode) {
      // Added node
      nodesMap.set(newNode.id, {
        ...newNode,
        _diff: {
          status: 'added',
        },
      });
    } else {
      const fields: DiffMetadata['fields'] = {};

      if (oldNode.position.x !== newNode.position.x || oldNode.position.y !== newNode.position.y) {
        _.set(fields, 'position', {
          status: 'moved',
          previousValue: oldNode.position,
        });
      }

      if (oldNode.name !== newNode.name) {
        _.set(fields, 'name', {
          status: 'modified',
          previousValue: oldNode.name,
        });
      }

      const calculatedContent = match([newNode.type, oldNode.type])
        .with([NodeKind.Expression, NodeKind.Expression], () =>
          expressionSpecification?.getDiffContent?.(newNode?.content, oldNode?.content),
        )
        .with([NodeKind.DecisionTable, NodeKind.DecisionTable], () =>
          decisionTableSpecification?.getDiffContent?.(newNode?.content, oldNode?.content),
        )
        .with([NodeKind.Function, NodeKind.Function], () => {
          const content: any = functionSpecification?.getDiffContent?.(newNode?.content, oldNode?.content);
          return match(newNode?.content)
            .with(P.string, () => {
              if (content?._diff?.fields?.source?.status === 'modified') {
                _.set(fields, 'content', {
                  status: 'modified',
                  previousValue: content?._diff?.fields?.source?.previousValue,
                });
              }
              return content?.source;
            })
            .otherwise(() => content);
        })
        .with([NodeKind.Switch, NodeKind.Switch], () =>
          switchSpecification?.getDiffContent?.(newNode?.content, oldNode?.content),
        )
        .otherwise(() => {
          const component = components.find((cmp) => cmp.type === newNode.type);
          if (component) {
            return component?.getDiffContent?.(newNode?.content, oldNode?.content);
          }

          const customNode = customNodes.find(
            (node) => newNode?.type === 'customNode' && newNode?.content?.kind === node?.kind,
          );
          if (customNode) {
            return customNode?.calculateDiff?.(newNode?.content, oldNode?.content);
          }

          return null;
        });

      if (
        Object.keys(fields || {}).filter((key) => key !== 'position').length > 0 ||
        calculatedContent?._diff?.status === 'modified'
      ) {
        nodesMap.set(newNode.id, {
          ...newNode,
          content: calculatedContent ?? newNode.content,
          _diff: {
            status: 'modified',
            fields,
          },
        });
      } else if (Object.keys(fields || {}).length === 1 && fields?.position?.status === 'moved') {
        nodesMap.set(newNode.id, {
          ...newNode,
          content: calculatedContent ?? newNode.content,
          _diff: {
            status: 'moved',
            fields,
          },
        });
      } else {
        nodesMap.set(newNode.id, {
          ...newNode,
          _diff: {
            status: 'unchanged',
          },
        });
      }
    }
  });

  // Add deleted nodes from old version
  (previousNodes || []).forEach((oldNode) => {
    if (!nodesMap.has(oldNode.id)) {
      nodesMap.set(oldNode.id, {
        ...oldNode,
        _diff: {
          status: 'removed',
        },
      });
    }
  });

  return Array.from(nodesMap.values());
};

export const processEdges = (currentEdges: DecisionEdge[], previousEdges: DecisionEdge[]) => {
  const edgesMap = new Map();

  // Process new version edges
  (currentEdges || []).forEach((newEdge) => {
    const oldEdge = (previousEdges || []).find((e) => e.id === newEdge.id);

    if (!oldEdge) {
      edgesMap.set(newEdge.id, {
        ...newEdge,
        _diff: {
          status: 'added',
        },
      });
    } else {
      edgesMap.set(newEdge.id, {
        ...newEdge,
        _diff: {
          status: 'unchanged',
        },
      });
    }
  });

  // Add deleted edges from old version
  (previousEdges || []).forEach((oldEdge) => {
    if (!edgesMap.has(oldEdge.id)) {
      edgesMap.set(oldEdge.id, {
        ...oldEdge,
        _diff: {
          status: 'removed',
        },
      });
    }
  });

  return Array.from(edgesMap.values());
};

// Array comparison
interface BaseItem {
  id?: string;
  _id?: string;
  [key: string]: any;
}

interface DiffOptions<T extends BaseItem> {
  idField?: 'id' | '_id';
  compareFields?: (
    current: T,
    previous: T,
  ) => {
    hasChanges: boolean;
    fields?: Record<string, DiffMetadata>;
  };
}

type UnifiedItem<T> = T & {
  originalIndex: number;
  isRemoved?: boolean;
};

export const compareAndUnifyLists = <T extends BaseItem>(
  newList: T[],
  oldList: T[],
  options: DiffOptions<T> = {},
): T[] => {
  const { idField = 'id', compareFields } = options;

  const getId = (item: T) => item[idField] || item['_id'];

  const oldMap = new Map(oldList.map((item, index) => [getId(item), { ...item, index }]));
  const newMap = new Map(newList.map((item, index) => [getId(item), { ...item, index }]));

  const unifiedList: UnifiedItem<T>[] = [];

  const insertions = new Set<number>();
  const removals = new Set<number>();

  newList.forEach((item, index) => {
    if (!oldMap.has(getId(item))) {
      insertions.add(index);
    }
  });

  oldList.forEach((item, index) => {
    if (!newMap.has(getId(item))) {
      removals.add(index);
    }
  });

  const isRealPositionChange = (oldIndex: number, newIndex: number): boolean => {
    const insertionsBefore = Array.from(insertions).filter((i) => i < newIndex).length;
    const removalsBefore = Array.from(removals).filter((i) => i < oldIndex).length;

    const adjustedNewIndex = newIndex - insertionsBefore;
    const adjustedOldIndex = oldIndex - removalsBefore;

    return adjustedOldIndex !== adjustedNewIndex;
  };

  newList.forEach((item, newIndex) => {
    const oldItem = oldMap.get(getId(item));

    if (!oldItem) {
      unifiedList.push({
        ...item,
        originalIndex: newIndex,
        _diff: {
          status: 'added',
          newIndex,
        },
      });
    } else {
      const isPositionChanged = isRealPositionChange(oldItem.index, newIndex);
      const changes = compareFields ? compareFields(item, oldItem) : { hasChanges: false };

      if (changes.hasChanges || isPositionChanged) {
        unifiedList.push({
          ...item,
          originalIndex: newIndex,
          _diff: {
            status: 'modified',
            positionChanged: isPositionChanged,
            previousIndex: oldItem.index,
            newIndex,
            ...(changes.fields ? { fields: changes.fields } : {}),
          },
        });
      } else {
        unifiedList.push({
          ...item,
          originalIndex: newIndex,
          _diff: {
            status: 'unchanged',
          },
        });
      }
    }
  });

  oldList.forEach((item, oldIndex) => {
    if (!newMap.has(getId(item))) {
      let insertIndex = oldIndex;
      // @ts-expect-error error should not happen here
      while (insertIndex < unifiedList.length && oldMap.get(getId(unifiedList[insertIndex]))?.index < oldIndex) {
        insertIndex++;
      }

      unifiedList.splice(insertIndex, 0, {
        ...item,
        originalIndex: oldIndex,
        isRemoved: true,
        _diff: {
          status: 'removed',
          previousIndex: oldIndex,
        },
      });
    }
  });

  // Clean up utility properties before returning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return unifiedList.map(({ originalIndex, isRemoved, ...item }) => item as unknown as T);
};

export const addStrikethrough = (text?: string): string => {
  if (!text) return '';
  const strikethroughChar = '\u0336';
  return Array.from(text)
    .map((char) => char + strikethroughChar)
    .join('');
};

export const buildDiffString = (currentValue: string, previousValue: string): string => {
  return [addStrikethrough(previousValue), '->', currentValue].join(' ');
};
