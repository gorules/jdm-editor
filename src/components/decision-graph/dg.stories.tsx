import { ApartmentOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from 'antd';
import React, { useMemo, useRef, useState } from 'react';

import { DecisionGraph } from './dg';
import { defaultGraph } from './dg.stories-values';
import type { GraphRef } from './graph/graph';
import { createJdmNode } from './nodes/custom-node';
import { GraphNode } from './nodes/graph-node';
import type { NodeSpecification } from './nodes/specifications/specification-types';

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
        <DecisionGraph
          {...args}
          value={value}
          onChange={(val) => {
            setValue?.(val);
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

export const CustomNode: Story = {
  render: (args) => {
    const ref = useRef<GraphRef>(null);
    const [value, setValue] = useState<any>();

    const customNodes = useMemo(() => {
      return [
        createJdmNode({
          type: 'pingNode',
          displayName: 'Ping',
          group: 'ping',
          shortDescription: 'Used for ping',
        }),
        createJdmNode({
          type: 'pongNode',
          displayName: 'Pong',
          group: 'ping',
          shortDescription: 'Used for pong',
        }),
        createJdmNode({
          type: 'rightHandleNode',
          group: 'integrations',
          displayName: 'Right Handle',
          handleLeft: false,
        }),
        createJdmNode({
          type: 'leftHandleNode',
          group: 'integrations',
          displayName: 'Left Handle',
          handleRight: false,
        }),
        createJdmNode({
          type: 'inputsNode',
          group: 'inputs',
          displayName: 'Inputs Form',
          shortDescription: 'With inputs map form',
          inputs: [
            {
              control: 'text',
              name: 'first',
              label: 'First',
            },
            {
              control: 'text',
              name: 'second',
              label: 'Second',
            },
          ],
        }),
      ];
    }, []);

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
