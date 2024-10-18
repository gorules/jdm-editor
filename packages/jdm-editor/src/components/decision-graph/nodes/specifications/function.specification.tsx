import { WarningFilled, WarningOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography } from 'antd';
import React from 'react';
import { P, match } from 'ts-pattern';

import { defaultFunctionValue } from '../../../function/helpers/libs';
import { useDecisionGraphActions, useDecisionGraphState } from '../../context/dg-store.context';
import { GraphNode } from '../graph-node';
import { NodeColor } from './colors';
import type { NodeSpecification } from './specification-types';
import { NodeKind } from './specification-types';

export type NodeFunctionData =
  | string
  | {
      source: string;
    };

export const functionSpecification: NodeSpecification<NodeFunctionData> = {
  type: NodeKind.Function,
  icon: <Typography.Text style={{ color: 'white' }}>JS</Typography.Text>,
  displayName: 'Function',
  documentationUrl: 'https://gorules.io/docs/user-manual/decision-modeling/decisions/functions',
  shortDescription: 'Javascript lambda',
  color: NodeColor.Orange,
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
              'Function v2'
            ) : (
              <span>
                {'Function v1 '}
                <Tooltip
                  placement='top'
                  title={
                    <>
                      {
                        'Function v1 will be deprecated in one of the upcoming releases. To use a new Function v2, drag and drop a new Function Node and copy your logic. For more information click "Documentation". '
                      }
                    </>
                  }
                >
                  <WarningOutlined
                    style={{
                      color: 'var(--grl-color-warning-text)',
                    }}
                  />
                </Tooltip>
              </span>
            ),
        }}
        name={data.name}
        isSelected={selected}
        helper={
          kind === FunctionKind.Stable ? undefined : (
            <Tooltip
              placement='top'
              title={
                <>
                  {
                    'Function v1 will be deprecated in one of the upcoming releases. To use a new Function v2, drag and drop a new Function Node and copy your logic. For more information click "Documentation". '
                  }
                </>
              }
            >
              <WarningFilled
                style={{
                  fontSize: 16,
                  color: 'var(--grl-color-warning-text)',
                }}
              />
            </Tooltip>
          )
        }
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
