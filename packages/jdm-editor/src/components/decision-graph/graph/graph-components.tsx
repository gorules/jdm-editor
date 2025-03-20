import { Input } from 'antd';
import clsx from 'clsx';
import React, { useCallback, useMemo, useState } from 'react';
import type { XYPosition } from 'reactflow';
import { match } from 'ts-pattern';

import { useDecisionGraphState } from '../context/dg-store.context';
import { DecisionNode } from '../nodes/decision-node';
import { NodeKind, type NodeSpecification } from '../nodes/specifications/specification-types';
import { nodeSpecification } from '../nodes/specifications/specifications';

export type GraphComponentsProps = {
  inputDisabled?: boolean;
  components?: React.ReactNode[];
  disabled?: boolean;
};

export const GraphComponents: React.FC<GraphComponentsProps> = React.memo(({ inputDisabled, disabled }) => {
  const customComponents = useDecisionGraphState((store) => store.components || []);
  const customNodes = useDecisionGraphState((store) => store.customNodes || []);

  const [search, setSearch] = useState('');

  const onDragStart = useCallback((event: React.DragEvent, nodeType: string, component?: string) => {
    const target = event.target as HTMLDivElement;
    if (!target) {
      return;
    }

    const { offsetX, offsetY } = event.nativeEvent;
    const { height, width } = target.getBoundingClientRect();

    const positionData: XYPosition = {
      x: offsetX / width,
      y: offsetY / height,
    };

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('nodeType', nodeType);
    event.dataTransfer.setData('relativePosition', JSON.stringify(positionData));
    if (component) {
      event.dataTransfer.setData('customNodeComponent', component);
    }
  }, []);

  const innerGroups = useMemo<Record<string, NodeSpecification[]>>(() => {
    const initialGroups: Record<string, NodeSpecification[]> = {
      core: Object.values(nodeSpecification),
    };
    if (customComponents?.length > 0) {
      initialGroups.extended = customComponents;
    }

    (customNodes || []).forEach((node) => {
      const group = node.group?.trim?.() || '';
      if (group.length > 0) {
        if (initialGroups?.[group]) {
          initialGroups[group].push({ ...node, type: 'customNode' });
        } else {
          initialGroups[group] = [{ ...node, type: 'customNode' }];
        }
      }
    });

    (customNodes || []).forEach((node) => {
      if (!node?.group) {
        if (initialGroups?.['custom']) {
          initialGroups['custom'].push({ ...node, type: 'customNode' });
        } else {
          initialGroups['custom'] = [{ ...node, type: 'customNode' }];
        }
      }
    });

    return initialGroups;
  }, [customComponents, customNodes]);

  const groups = useMemo<Record<string, NodeSpecification[]>>(() => {
    return Object.keys(innerGroups).reduce((acc, key) => {
      return {
        ...acc,
        [key]: (innerGroups[key] || []).filter(
          (el) =>
            !(search?.trim?.().length > 0) ||
            (el.type || '').toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            ((el.displayName || '') as string).toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            (el.shortDescription || '').toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            (el.group || '').toLowerCase().indexOf(search.toLowerCase()) > -1,
        ),
      };
    }, {});
  }, [innerGroups, search]);

  const customCount = customComponents.length + customNodes.length;

  return (
    <div>
      {customCount > 5 && (
        <Input
          placeholder={'Search components...'}
          value={search}
          onChange={(e) => setSearch(e.target.value || '')}
          allowClear
          className={'grl-dg__aside__menu__components__search'}
        />
      )}
      <div className={'grl-dg__aside__menu__components'}>
        {Object.keys(groups).map((group) => {
          return match(group)
            .with(
              'core',
              () =>
                groups['core']?.length > 0 && (
                  <React.Fragment key={group}>
                    {(groups['core'] || []).map((node) => (
                      <React.Fragment key={'kind' in node ? (node.kind as string) : node.type}>
                        <DragDecisionNode
                          disabled={match(node.type)
                            .with(NodeKind.Input, () => disabled || inputDisabled)
                            .otherwise(() => disabled)}
                          specification={node}
                          onDragStart={(event) =>
                            nodeSpecification[node.type as NodeKind] !== undefined
                              ? onDragStart(event, node.type)
                              : onDragStart(event, 'customNode', 'kind' in node ? (node.kind as string) : '')
                          }
                        />
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ),
            )
            .otherwise(
              (group) =>
                groups[group]?.length > 0 && (
                  <React.Fragment key={group}>
                    {(groups?.[group] || []).map((customNode) => (
                      <DragDecisionNode
                        key={'kind' in customNode ? (customNode.kind as string) : customNode.type}
                        disabled={disabled}
                        specification={customNode}
                        onDragStart={(event) =>
                          group === 'extended'
                            ? onDragStart(event, customNode.type)
                            : onDragStart(event, 'customNode', 'kind' in customNode ? (customNode.kind as string) : '')
                        }
                      />
                    ))}
                  </React.Fragment>
                ),
            );
        })}
      </div>
    </div>
  );
});

const DragDecisionNode: React.FC<
  {
    specification: Pick<NodeSpecification, 'color' | 'icon' | 'displayName' | 'shortDescription'>;
    disabled?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ specification, disabled = false, ...props }) => {
  return (
    <div className={clsx('draggable-component')} draggable={!disabled} {...props}>
      <div style={{ pointerEvents: 'none' }}>
        <DecisionNode
          listMode
          compactMode
          color={specification.color}
          icon={specification.icon}
          name={specification.displayName as string}
          type={specification.shortDescription}
        />
      </div>
    </div>
  );
};
