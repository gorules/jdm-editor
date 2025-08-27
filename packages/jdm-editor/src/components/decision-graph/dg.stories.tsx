import { ApartmentOutlined, ApiOutlined, LeftOutlined, PlayCircleOutlined, RightOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from 'antd';
import json5 from 'json5';
import React, { useMemo, useRef, useState } from 'react';
import { P, match } from 'ts-pattern';

import type { DecisionGraphRef } from './dg';
import { DecisionGraph } from './dg';
import type { DecisionGraphType } from './dg-types';
import {
  defaultGraph,
  defaultGraphCustomNode,
  defaultGraphInputsFormCustomNode,
  defaultGraphUnknownNode,
  diffGraph,
} from './dg.stories-values';
import { calculateDiffGraph } from './diff/utility';
import type { GraphRef } from './graph/graph';
import { createJdmNode } from './nodes/custom-node';
import { GraphNode } from './nodes/graph-node';
import type { NodeSpecification } from './nodes/specifications/specification-types';
import { GraphSimulator } from './simulator/dg-simulator';
import type { Simulation } from './simulator/simulation.types';

const meta: Meta<typeof DecisionGraph> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Decision Graph',
  component: DecisionGraph,
  argTypes: {},
  args: {
    //
  },
};

export default meta;

type Story = StoryObj<typeof DecisionGraph>;

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(defaultGraph);

    // TODO revert
    const diffGraph = useMemo(() => {
      const newValue = {
        nodes: [
          {
            id: 'ca98730e-a40f-4601-98cc-b5a57429596d',
            type: 'inputNode',
            position: { x: 70, y: 250 },
            name: 'Request',
          },
          {
            id: 'c5e747fe-b74b-4b74-9fd0-bfd7d67007c3',
            type: 'outputNode',
            position: { x: 670, y: 250 },
            name: 'Response',
          },
          {
            id: '359173d8-0068-45f8-bb71-8240ad73201d',
            type: 'decisionTableNode',
            position: { x: 370, y: 250 },
            name: 'decisionTableNode 1',
            content: {
              hitPolicy: 'first',
              inputs: [
                { id: 'HVo_JpALi8', field: 'cart.weight', name: 'Cart Weight (Kg)' },
                { id: 'HW6mSVfLbs', field: 'customer.country', name: 'Customer Country' },
              ],
              outputs: [{ field: 'shippingFee', id: '3EGDrV0ssV', name: 'Shipping Fee' }],
              rules: [
                {
                  '_id': 'qMpJEvcau6',
                  '_description': 'If weight is above 40kg and country is US, fee is 40',
                  'HVo_JpALi8': '> 40',
                  'HW6mSVfLbs': '"US"',
                  '3EGDrV0ssV': '40',
                },
                {
                  '_id': 'KC6KqcWiOX',
                  '_description': 'If weight is above 40kg and any other country, fee is 50',
                  'HVo_JpALi8': '> 40',
                  'HW6mSVfLbs': '',
                  '3EGDrV0ssV': '50',
                },
                {
                  '_id': 'k-zEFSTe7b',
                  '_description': 'if weight is between 20 and 40kg and country US, fee is 30',
                  'HVo_JpALi8': '[20..40]',
                  'HW6mSVfLbs': '"US"',
                  '3EGDrV0ssV': '30',
                },
                {
                  '_id': 'c_8VkmGZ_C',
                  '_description': 'if weight is between 20 and 40kg and any other country, fee is 32',
                  'HVo_JpALi8': '[20..40]',
                  'HW6mSVfLbs': '',
                  '3EGDrV0ssV': '32',
                },
                {
                  '_id': 'e_MyQeTS3V',
                  '_description': 'if weight is bellow 20kg and country US, fee is 25',
                  'HVo_JpALi8': '< 20',
                  'HW6mSVfLbs': '"US"',
                  '3EGDrV0ssV': '25',
                },
                {
                  '_id': '_iU8FNLxHb',
                  '_description': 'if weight is bellow 20kg, fee is 30',
                  'HVo_JpALi8': '< 20',
                  'HW6mSVfLbs': '',
                  '3EGDrV0ssV': '30',
                },
              ],
            },
          },
          {
            type: 'expressionNode',
            content: {
              expressions: [
                { id: '2e32e45f-e8a2-4f07-8bd8-ba3cdaf6010b', key: '10', value: 'false' },
                { id: '2e32e45f-e8a2-4f07-8bd8-ba3cdaf6010a', key: '1', value: 'true' },
                { id: 'a400f63d-5344-4c06-883f-9c6728afa207', key: '4', value: 'false' },
                { id: '8513b4f9-f821-40af-bf63-d4ff70b26499', key: '3', value: 'false' },
                { id: '27146595-f319-4474-95aa-914e7e434997', key: '3', value: 'true' },
                {
                  id: '3a302716-2d53-4399-b048-e6d9f92a1113',
                  rules: [
                    {
                      id: '8766679a-ffd2-40ba-a3c7-8c11ae3c705f',
                      if: '',
                      then: [
                        { id: '14fc606f-f2da-4c4f-8a6b-fc9b070f58e8', key: '12', value: '' },
                        {
                          id: '3a302716-2d53-4399-b048-e6d9f92a1113',
                          rules: [
                            {
                              id: '8766679a-ffd2-40ba-a3c7-8c11ae3c705f',
                              if: '',
                              then: [
                                { id: '14fc606f-f2da-4c4f-8a6b-fc9b070f5810', key: '3', value: 'true' },
                                { id: '14fc606f-f2da-4c4f-8a6b-fc9b070f5820', key: '1', value: 'false' },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: '3a302716-2d53-4399-b048-e6d9f92a1114',
                  rules: [
                    {
                      id: '8766679a-ffd2-40ba-a3c7-8c11ae3c7055',
                      if: '',
                      then: [
                        { id: '14fc606f-f2da-4c4f-8a6b-fc9b070f58e6', key: '', value: '' },
                        { id: '29fc606f-f2da-4c4f-8a6b-fc9b070f58e6', key: 'something', value: '1 + 1' },
                      ],
                    },
                  ],
                },
              ],
              passThrough: true,
              inputField: null,
              outputPath: null,
              executionMode: 'single',
            },
            id: 'a750cebf-ca75-4acd-a272-7040626abd73',
            name: 'expression1',
            position: { x: 370, y: 145 },
          },
        ],
        edges: [
          {
            id: '1d5f4787-4c86-4ed9-99dc-1a3159f65d89',
            sourceId: 'ca98730e-a40f-4601-98cc-b5a57429596d',
            type: 'edge',
            targetId: '359173d8-0068-45f8-bb71-8240ad73201d',
          },
          {
            id: 'c5d49d3a-fdfd-4f4b-8838-791cee4d4a55',
            sourceId: '359173d8-0068-45f8-bb71-8240ad73201d',
            type: 'edge',
            targetId: 'c5e747fe-b74b-4b74-9fd0-bfd7d67007c3',
          },
          {
            id: '9600509a-8f11-44eb-a835-5f0b5e6e91a5',
            sourceId: 'ca98730e-a40f-4601-98cc-b5a57429596d',
            type: 'edge',
            targetId: 'a750cebf-ca75-4acd-a272-7040626abd73',
          },
          {
            id: '6e763bcd-af53-41d3-8434-aded3f664384',
            sourceId: 'a750cebf-ca75-4acd-a272-7040626abd73',
            type: 'edge',
            targetId: 'c5e747fe-b74b-4b74-9fd0-bfd7d67007c3',
          },
        ],
      };

      const diffGraph = calculateDiffGraph(newValue, defaultGraph);
      return diffGraph;
    }, []);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          {...args}
          value={diffGraph}
          onChange={(val) => {
            // console.log(JSON.stringify(val));
            // setValue?.(val);
          }}
        />
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: (args) => {
    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          {...args}
          defaultValue={defaultGraph}
          onChange={(val) => {
            args?.onChange?.(val);
          }}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(defaultGraph);
    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          {...args}
          value={value}
          onChange={(val) => {
            setValue?.(val);
          }}
          disabled
        />
      </div>
    );
  },
};

const components: NodeSpecification[] = [
  {
    type: 'decisionNode',
    displayName: 'Decision',
    shortDescription: 'Execute decisions',
    icon: <ApartmentOutlined />,
    generateNode: () => ({ name: 'myDecision' }),
    renderNode: ({ specification, id, selected, data }) => (
      <GraphNode id={id} specification={specification} name={data.name} isSelected={selected}>
        <Select placeholder='Select decision from list' />
      </GraphNode>
    ),
  },
];

export const Extended: Story = {
  render: (args) => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>();

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph {...args} ref={ref} value={value} onChange={(val) => setValue(val)} components={components} />
      </div>
    );
  },
};

const customNodes = [
  createJdmNode({
    kind: 'pingNode',
    displayName: 'Ping',
    group: 'ping',
    shortDescription: 'Used for ping',
  }),
  createJdmNode({
    kind: 'pongNode',
    displayName: 'Pong',
    group: 'ping',
    shortDescription: 'Used for pong',
  }),
  createJdmNode({
    kind: 'rightHandleNode',
    group: 'integrations',
    displayName: 'Right Handle',
    icon: <RightOutlined />,
    handleLeft: false,
  }),
  createJdmNode({
    kind: 'leftHandleNode',
    group: 'integrations',
    displayName: 'Left Handle',
    icon: <LeftOutlined />,
    handleRight: false,
  }),
  createJdmNode({
    kind: 'inputsNode',
    group: 'inputs',
    displayName: 'Inputs Form',
    shortDescription: 'With inputs map form',
    icon: <ApiOutlined />,
    inputs: [
      {
        control: 'text',
        name: 'hello.nested.something',
        label: 'First',
      },
      {
        control: 'text',
        name: 'second',
        label: 'Second',
      },
      {
        control: 'bool',
        name: 'checkbox',
        label: 'Checkbox',
      },
    ],
  }),
];

export const CustomNode: Story = {
  render: (args) => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphCustomNode);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          customNodes={customNodes}
          {...args}
          ref={ref}
          value={value}
          onChange={(val) => setValue(val)}
          components={components}
        />
      </div>
    );
  },
};

export const InputFormCustomNode: Story = {
  render: (args) => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphInputsFormCustomNode);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          customNodes={customNodes}
          {...args}
          ref={ref}
          value={value}
          onChange={(val) => setValue(val)}
          components={components}
        />
      </div>
    );
  },
};

const unknownCustomNodes = [
  createJdmNode({
    kind: 'pingNode',
    displayName: 'Ping',
    group: 'ping',
    shortDescription: 'Used for ping',
  }),
];

export const UnknownCustomNode: Story = {
  render: (args) => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>(defaultGraphUnknownNode);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          customNodes={unknownCustomNodes}
          {...args}
          ref={ref}
          value={value}
          onChange={(val) => setValue(val)}
          components={components}
        />
      </div>
    );
  },
};

export const Simulator: Story = {
  render: () => <DecisionGraphWithSimulator />,
};

export const Diff: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>(diffGraph);
    const ref = useRef<DecisionGraphRef>(null);

    const enableDiff = (args as any)?.enableDiff;

    const innerValue = useMemo(() => {
      if (enableDiff)
        return calculateDiffGraph(value, diffGraph, {
          customNodes,
          components,
        });
      return value;
    }, [value, enableDiff, customNodes, components]);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          ref={ref}
          value={innerValue}
          disabled={enableDiff}
          onChange={(val) => {
            if (!(args as any)?.enableDiff) {
              setValue(val);
            }
          }}
          customNodes={customNodes}
          components={components}
        />
      </div>
    );
  },
  argTypes: {
    enableDiff: {
      control: { type: 'boolean' },
    },
  } as any,
};

const safeParse = (val?: string) => {
  try {
    return JSON.parse(val ?? '');
  } catch {
    return val;
  }
};

const mapSimulateError = (graph: DecisionGraphType, error: unknown) =>
  match(error)
    .with(
      {
        data: {
          type: P.optional(P.string),
          source: P.optional(P.string),
          nodeId: P.optional(P.string),
          trace: P.optional(P._),
        },
      },
      ({ data }) => {
        const error = {
          title: data.type,
          message: safeParse(data.source),
          data: { nodeId: data.nodeId },
        };

        return {
          error,
          result: {
            trace: data.trace as any,
            result: { error },
            performance: '',
            snapshot: graph,
          },
        } satisfies Simulation;
      },
    )
    .otherwise(() => undefined);

const DecisionGraphWithSimulator: React.FC = () => {
  const [value, setValue] = useState<any>(defaultGraph);
  const [simulate, setSimulate] = useState<Simulation>();

  const panels = useMemo(
    () => [
      {
        id: 'simulator',
        title: 'Simulator',
        icon: <PlayCircleOutlined />,
        hideHeader: true,
        renderPanel: () => (
          <GraphSimulator
            defaultRequest={json5.stringify(
              {
                customer: { country: 'US' },
                cart: { weight: 50 },
              },
              null,
              2,
            )}
            onRun={async ({ graph, context }) => {
              try {
                const response = await fetch('http://localhost:3000/api/simulate', {
                  method: 'POST',
                  body: JSON.stringify({ content: graph, context }),
                  headers: { 'content-type': 'application/json' },
                });

                const responseJson = await response.json();
                setSimulate({ result: { ...responseJson, snapshot: graph } });
              } catch (err) {
                setSimulate(mapSimulateError(graph, err));
              }
            }}
            onClear={() => {}}
          />
        ),
      },
    ],
    [],
  );

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <DecisionGraph
        value={value}
        simulate={simulate}
        defaultActivePanel={'simulator'}
        panels={panels}
        onChange={(val) => {
          setValue?.(val);
        }}
      />
    </div>
  );
};

export const View: Story = {
  args: {
    viewConfig: {
      enabled: true,
      description: 'Configure business rules for your decision model',
      permissions: {
        '359173d8-0068-45f8-bb71-8240ad73201d': 'edit:values',
        'a750cebf-ca75-4acd-a272-7040626abd73': 'edit:values',
      },
    },
    viewConfigCta: 'Configure',
  },
  render: (args) => {
    const [value, setValue] = useState<any>(defaultGraph);

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph {...args} value={value} onChange={(val) => setValue?.(val)} />
      </div>
    );
  },
};
