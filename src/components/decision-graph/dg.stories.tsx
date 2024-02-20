import { ApartmentOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from 'antd';
import React, { useRef, useState } from 'react';

import { DecisionGraph } from './dg';
import { defaultGraph } from './dg.stories-values';
import type { GraphRef } from './graph/graph';
import { GraphNode } from './nodes/graph-node';
import type { NodeSpecification } from './nodes/specification-types';

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

type Story = StoryObj<any>;

export const Controlled: Story = {
  render: (args: any) => {
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
          graphConfig={args?.enableConfig ? args?.graphConfig : undefined}
          onChange={(val) => {
            setValue?.(val);
          }}
        />
      </div>
    );
  },
  argTypes: {
    enableConfig: {
      type: 'boolean',
      defaultValue: true,
    },
  },
  args: {
    graphConfig: {
      '359173d8-0068-45f8-bb71-8240ad73201d': {
        configurable: true,
      },
    },
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
