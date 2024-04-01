import { Divider, Input, Typography } from 'antd';
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
    event.dataTransfer.setData('application/reactflow', nodeType);
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
          initialGroups[group].push(node);
        } else {
          initialGroups[group] = [node];
        }
      }
    });

    (customNodes || []).forEach((node) => {
      if (!node?.group) {
        if (initialGroups?.['custom']) {
          initialGroups['custom'].push(node);
        } else {
          initialGroups['custom'] = [node];
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
            (el.displayName || '').toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            (el.shortDescription || '').toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            (el.group || '').toLowerCase().indexOf(search.toLowerCase()) > -1,
        ),
      };
    }, {});
  }, [innerGroups, search]);

  return (
    <div>
      <Input
        placeholder={'Type to search'}
        value={search}
        onChange={(e) => setSearch(e.target.value || '')}
        allowClear
        className={'grl-dg__aside__menu__components__search'}
      />
      <div className={'grl-dg__aside__menu__components'}>
        {Object.keys(groups).map((group) => {
          return match(group)
            .with(
              'core',
              () =>
                groups['core']?.length > 0 && (
                  <React.Fragment key={group}>
                    <Divider orientationMargin={4} style={{ margin: '4px 0 -4px 0' }} orientation='left' plain>
                      <Typography.Text
                        type='secondary'
                        strong
                        style={{
                          fontSize: 12,
                          textTransform: 'uppercase',
                        }}
                      >
                        Core
                      </Typography.Text>
                    </Divider>
                    {(groups['core'] || []).map((node) => (
                      <React.Fragment key={node.type}>
                        <DragDecisionNode
                          disabled={match(node.type)
                            .with(NodeKind.Input, () => disabled || inputDisabled)
                            .otherwise(() => disabled)}
                          specification={node}
                          onDragStart={(event) =>
                            nodeSpecification[node.type as NodeKind] !== undefined
                              ? onDragStart(event, node.type)
                              : onDragStart(event, 'customNode', node.type)
                          }
                        />
                        {node.type === NodeKind.Output && (
                          <Divider style={{ margin: '4px 0' }} orientation='left' plain />
                        )}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ),
            )
            .otherwise(
              (group) =>
                groups[group]?.length > 0 && (
                  <React.Fragment key={group}>
                    <Divider orientationMargin={4} style={{ margin: '4px 0 -4px 0' }} orientation='left' plain>
                      <Typography.Text
                        type='secondary'
                        strong
                        style={{
                          fontSize: 12,
                          textTransform: 'uppercase',
                        }}
                      >
                        {group}
                      </Typography.Text>
                    </Divider>
                    {(groups?.[group] || []).map((customNode) => (
                      <DragDecisionNode
                        key={customNode.type}
                        disabled={disabled}
                        specification={customNode}
                        onDragStart={(event) =>
                          group === 'extended'
                            ? onDragStart(event, customNode.type)
                            : onDragStart(event, 'customNode', customNode.type)
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
          color={specification.color}
          icon={specification.icon}
          name={specification.displayName}
          type={specification.shortDescription}
        />
      </div>
    </div>
  );
};
