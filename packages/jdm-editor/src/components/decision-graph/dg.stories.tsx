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
                const response = await fetch('https://editor.gorules.io/api/simulate', {
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
