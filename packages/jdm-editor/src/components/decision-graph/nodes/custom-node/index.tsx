import { DownOutlined } from '@ant-design/icons';
import { type VariableType } from '@gorules/zen-engine-wasm';
import { Button, Checkbox, Form, Typography, theme } from 'antd';
import type { DragDropManager } from 'dnd-core';
import React, { useState } from 'react';
import type { XYPosition } from 'reactflow';
import { match } from 'ts-pattern';

import { CodeEditor } from '../../../code-editor';
import { useDecisionGraphActions, useDecisionGraphState } from '../../context/dg-store.context';
import { type DecisionNode } from '../../dg-types';
import { GraphNode } from '../graph-node';
import type { InferTypeData, MinimalNodeProps, MinimalNodeSpecification } from '../specifications/specification-types';

type CustomDecisionNode<T> = {
  id: string;
  name: string;
  description?: string;
  type?: string;
  content?: T;
  position: XYPosition;
};

type GenerateNodeParams = {
  index: number;
};

export type CustomNodeSpecification<Data extends object, Component extends string> = {
  kind: Component;
  color?: string;
  icon?: React.ReactNode;
  displayName: string;
  group?: string;
  documentationUrl?: string;
  shortDescription?: string;
  renderTab?: (props: { id: string; manager?: DragDropManager }) => React.ReactNode;
  calculateDiff?: (current: any, previous: any) => [any, any];
  generateNode: (params: GenerateNodeParams) => Omit<DecisionNode, 'position' | 'id' | 'type' | 'content'> & {
    config?: Data;
  };
  renderNode: React.FC<MinimalNodeProps & { specification: MinimalNodeSpecification }>;

  inferTypes?: {
    needsUpdate: (state: InferTypeData<Data>, prevState: InferTypeData<Data>) => boolean;
    determineOutputType: (state: InferTypeData<Data>) => VariableType;
  };

  onNodeAdd?: (node: CustomDecisionNode<{ kind: Component; config: Data }>) => Promise<
    CustomDecisionNode<{
      kind: Component;
      config: Data;
    }>
  >;
};

type BoolInput = {
  control: 'bool';
  label?: string;
};

type TextInput = {
  control: 'text';
  label?: string;
};

type InputTypeMap = {
  bool: boolean;
  text: string;
};

type InputSchema<Name extends string> = {
  name: Name;
} & (BoolInput | TextInput);

type ControlToType<T> = T extends keyof InputTypeMap ? InputTypeMap[T] : never;

type SplitPath<Path extends string, Obj> = Path extends `${infer Prefix}.${infer Rest}`
  ? { [K in Prefix]: SplitPath<Rest, Obj> }
  : { [K in Path]: Obj };

type CreateDynamicType<T extends ReadonlyArray<unknown>, Result = {}> = T extends readonly [infer First, ...infer Rest]
  ? First extends { control: infer Control extends string; name: infer Name extends string }
    ? CreateDynamicType<Rest, Result & SplitPath<Name, ControlToType<Control>>>
    : Result
  : Result;

export type BaseNode<
  Component extends string,
  InputName extends string,
  Inputs extends InputSchema<InputName>[],
  NodeData extends object = CreateDynamicType<Inputs>,
> = {
  kind: Component;
  icon?: React.ReactNode;
  color?: string;
  displayName: string;
  shortDescription?: string;
  group?: string;
  handleLeft?: boolean;
  handleRight?: boolean;
  inputs?: [...Inputs];
  generateNode?: CustomNodeSpecification<NodeData, Component>['generateNode'];
  renderNode?: CustomNodeSpecification<NodeData, Component>['renderNode'];
  onNodeAdd?: CustomNodeSpecification<NodeData, Component>['onNodeAdd'];
};

export const createJdmNode = <
  Component extends string,
  InputName extends string,
  Inputs extends InputSchema<InputName>[],
>(
  n: BaseNode<Component, InputName, Inputs>,
): CustomNodeSpecification<any, Component> => {
  return {
    kind: n.kind,
    icon: n.icon,
    color: n.color,
    displayName: n.displayName,
    group: n.group,
    shortDescription: n.shortDescription,
    generateNode:
      n.generateNode ||
      (({ index }) => ({
        name: `${n.kind || n.displayName}${index}`,
      })),
    onNodeAdd: n.onNodeAdd,
    renderNode: n.renderNode
      ? n.renderNode
      : ({ id, specification, data, selected }) => {
          const [open, setOpen] = useState(false);
          const { token } = theme.useToken();
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
                        type='text'
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
                  className='grl-dn__cn__form'
                  layout='vertical'
                  initialValues={nodeData}
                  onValuesChange={(_, values) => {
                    updateNode(id, (draft) => {
                      draft.content.config = values;
                      return draft;
                    });
                  }}
                >
                  {(n?.inputs || []).map(({ name, control, label }) => {
                    const formItem = match({ control })
                      .with({ control: 'text' }, () => <CodeEditor type='template' />)
                      .with({ control: 'bool' }, () => (
                        <Checkbox>
                          <Typography.Text style={{ fontSize: token.fontSizeSM }}>{label}</Typography.Text>
                        </Checkbox>
                      ))
                      .exhaustive();

                    const outerLabel = match({ control })
                      .with({ control: 'bool' }, () => null)
                      .otherwise(() => (
                        <Typography.Text style={{ fontSize: token.fontSizeSM }}>{label}</Typography.Text>
                      ));

                    const valuePropName = match({ control })
                      .with({ control: 'bool' }, () => 'checked')
                      .otherwise(() => undefined);

                    return (
                      <Form.Item
                        key={name}
                        name={name as string}
                        label={outerLabel}
                        valuePropName={valuePropName}
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
