import { DownOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { match } from 'ts-pattern';

import type { DecisionNode } from '../../context/dg-store.context';
import { useDecisionGraphState } from '../../context/dg-store.context';
import { useDecisionGraphActions } from '../../context/dg-store.context';
import { GraphNode } from '../graph-node';
import type { MinimalNodeProps, MinimalNodeSpecification } from '../specifications/specification-types';
import './metadata';

export type CustomNodeSpecification<Data extends object, Component extends string> = {
  type: Component;
  color?: string;
  icon?: React.ReactNode;
  displayName: string;
  group?: string;
  documentationUrl?: string;
  shortDescription?: string;
  generateNode: () => Omit<DecisionNode<Data>, 'position' | 'id' | 'type' | 'content'> & { config?: Data };
  renderNode: React.FC<MinimalNodeProps & { specification: MinimalNodeSpecification }>;

  onNodeAdd?: (node: DecisionNode<{ type: Component; config: Data }>) => Promise<
    DecisionNode<{
      type: Component;
      config: Data;
    }>
  >;
};

export type InputType = {
  control: 'text' | 'checkbox';
  name: string;
  label?: string;
};

export type InputsType = InputType[];

export type BaseNode<Component extends string> = {
  type: Component;
  icon?: React.ReactNode;
  color?: string;
  displayName: string;
  shortDescription?: string;
  group?: string;
  handleLeft?: boolean;
  handleRight?: boolean;
  generateNode?: CustomNodeSpecification<any, Component>['generateNode'];
  inputs?: InputsType;
  renderNode?: CustomNodeSpecification<any, Component>['renderNode'];
};

export const createJdmNode = <Component extends string>(
  n: BaseNode<Component>,
): CustomNodeSpecification<any, Component> => {
  return {
    type: n.type,
    icon: n.icon,
    color: n.color,
    displayName: n.displayName,
    group: n.group,
    shortDescription: n.shortDescription,
    generateNode:
      n.generateNode ||
      (() => ({
        name: n.displayName || n.type,
      })),
    renderNode: n.renderNode
      ? n.renderNode
      : ({ id, specification, data, selected }) => {
          const [open, setOpen] = useState(false);
          const { updateNode } = useDecisionGraphActions();
          const node = useDecisionGraphState((state) => (state.decisionGraph?.nodes || []).find((n) => n.id === id));
          const nodeData = node?.content?.config;
          return (
            <GraphNode
              id={id}
              specification={specification}
              name={data.name}
              isSelected={selected}
              noBodyPadding
              handleLeft={n.handleLeft}
              handleRight={n.handleRight}
              actions={
                n?.inputs
                  ? [
                      <Button
                        key='edit-table'
                        type='link'
                        style={{ marginLeft: 'auto', transform: open ? 'rotate(180deg)' : undefined }}
                        onClick={() => setOpen((o) => !o)}
                      >
                        <DownOutlined />
                      </Button>,
                    ]
                  : undefined
              }
            >
              {open && n?.inputs && (
                <Form
                  size='middle'
                  layout='vertical'
                  initialValues={nodeData}
                  style={{
                    padding: '0.5rem',
                  }}
                  onValuesChange={(_, values) => {
                    updateNode(id, (draft) => {
                      draft.content.config = values;
                      return draft;
                    });
                  }}
                >
                  {(n?.inputs || []).map(({ name, control, label }) => {
                    const formItem = match({ control })
                      .with({ control: 'text' }, () => <Input.TextArea size='small' autoSize={{ maxRows: 3 }} />)
                      .with({ control: 'checkbox' }, () => <Checkbox>{label}</Checkbox>)
                      .exhaustive();

                    const outerLabel = match({ control })
                      .with({ control: 'checkbox' }, () => null)
                      .otherwise(() => <Typography.Text>{label}</Typography.Text>);

                    return (
                      <Form.Item
                        key={name}
                        name={name}
                        label={outerLabel}
                        style={{
                          marginBottom: 4,
                        }}
                      >
                        {formItem}
                      </Form.Item>
                    );
                  })}
                </Form>
              )}
            </GraphNode>
          );
        },
  };
};
