import { WarningFilled } from '@ant-design/icons';
import { Button, Form, Tooltip, Typography } from 'antd';
import _ from 'lodash';
import React from 'react';
import { P, match } from 'ts-pattern';

import { defaultFunctionValue } from '../../../function/helpers/libs';
import { DiffSwitch } from '../../../shared';
import { useDecisionGraphActions, useDecisionGraphState, useNodeDiff } from '../../context/dg-store.context';
import type { DiffMetadata } from '../../dg-types';
import { TabFunction } from '../../graph/tab-function';
import { GraphNode } from '../graph-node';
import { NodeColor } from './colors';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type NodeFunctionData =
  | string
  | {
      source: string;
      omitNodes?: boolean;
    };

export const functionSpecification: NodeSpecification<NodeFunctionData> = {
  type: NodeKind.Function,
  icon: <Typography.Text style={{ color: 'white', fontSize: 'inherit' }}>JS</Typography.Text>,
  displayName: 'Function',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/functions',
  shortDescription: 'Javascript lambda',
  color: NodeColor.Orange,
  renderTab: ({ id }) => <TabFunction id={id} />,
  renderSettings: ({ id }) => {
    const graphActions = useDecisionGraphActions();
    const { contentDiff } = useNodeDiff(id);
    const storeData = useDecisionGraphState(({ decisionGraph, disabled }) => {
      const content = (decisionGraph?.nodes ?? []).find((node) => node.id === id)?.content as NodeFunctionData;
      if (typeof content === 'string') {
        return { version: 'v1' as const };
      }

      return {
        version: 'v2' as const,
        disabled,
        fields: {
          omitNodes: content?.omitNodes || null,
        },
      };
    });

    if (storeData.version === 'v1') {
      return <div className={'settings-form'}>Settings not available for function v1.</div>;
    }

    const { disabled, fields } = storeData;
    const updateNode = (data: Partial<NodeFunctionData>) => {
      graphActions.updateNode(id, (draft) => {
        Object.assign(draft.content, data);
        return draft;
      });
    };

    return (
      <div className={'settings-form'}>
        <Form.Item label='Omit $nodes'>
          <DiffSwitch
            disabled={disabled}
            size={'small'}
            displayDiff={contentDiff?.fields?.omitNodes?.status === 'modified'}
            checked={!!fields?.omitNodes}
            previousChecked={contentDiff?.fields?.omitNodes?.previousValue}
            onChange={(e) => updateNode({ omitNodes: e })}
          />
        </Form.Item>
      </div>
    );
  },
  getDiffContent: (current, previous): any => {
    const fields: DiffMetadata['fields'] = {};
    const kind = match(current)
      .with(P.string, () => FunctionKind.Deprecated)
      .otherwise(() => FunctionKind.Stable);

    match([current, previous])
      .with([P.string, P.string], ([current, previous]) => {
        if (current !== previous) {
          _.set(fields, 'source', {
            previousValue: previous,
            status: 'modified',
          });
        }
      })
      .with([{ source: P.string }, { source: P.string }], ([current, previous]) => {
        if (current?.source !== previous?.source) {
          _.set(fields, 'source', {
            previousValue: previous.source,
            status: 'modified',
          });
        }

        if ((current?.omitNodes || false) !== (previous?.omitNodes || false)) {
          _.set(fields, 'omitNodes', {
            status: 'modified',
            previousValue: previous.omitNodes,
          });
        }
      })
      .otherwise(() => {
        // do nothing
      });

    const hasModifications = Object.keys(fields).length > 0;
    return {
      ...(kind === FunctionKind.Deprecated ? { source: current } : (current as { source: string })),
      ...(hasModifications && {
        _diff: {
          status: 'modified',
          fields,
        },
      }),
    };
  },
  generateNode: ({ index }) => ({
    name: `function${index}`,
    content: {
      source: defaultFunctionValue,
    },
  }),
  renderNode: ({ id, data, selected, specification }) => {
    const graphActions = useDecisionGraphActions();
    const kind = useFunctionKind(id);
    return (
      <GraphNode
        id={id}
        specification={{
          ...specification,
          displayName:
            kind === FunctionKind.Stable ? (
              'Function'
            ) : (
              <span>
                {'Function v1 '}
                <DeprecatedFunctionWarning />
              </span>
            ),
        }}
        name={data.name}
        isSelected={selected}
        helper={[kind === FunctionKind.Deprecated && <DeprecatedFunctionWarning size={16} />]}
        actions={[
          <Button key='edit-function' type='text' onClick={() => graphActions.openTab(id)}>
            Edit Function
          </Button>,
        ]}
      />
    );
  },
};

export enum FunctionKind {
  Deprecated,
  Stable,
}

export const useFunctionKind = (id: string) => {
  const { kind } = useDecisionGraphState((s) => ({
    kind: match(s.decisionGraph.nodes.find((n) => n.id === id)?.content)
      .with(P.string, () => FunctionKind.Deprecated)
      .otherwise(() => FunctionKind.Stable),
  }));

  return kind;
};

const DeprecatedFunctionWarning: React.FC<{ size?: number }> = ({ size }) => (
  <Tooltip
    placement='top'
    title='Function v1 will be deprecated in one of the upcoming releases. To use a new Function, drag and drop a new Function Node and copy your logic. For more information click "Documentation". '
  >
    <WarningFilled style={{ color: 'var(--grl-color-warning-text)', fontSize: size }} />
  </Tooltip>
);
