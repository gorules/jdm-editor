import { ApartmentOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import { v4 } from 'uuid';

import { DecisionGraph } from './dg';
import { defaultGraph } from './dg.stories-values';
import type { GraphRef } from './graph/graph';

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

const components = [
  {
    displayName: 'Decision',
    shortDescription: 'Execute decisions',
    icon: <ApartmentOutlined />,
    generateNode: () => ({
      name: 'asd',
      description: 'asd',
      type: 'asd',
      content: {},
    }),
    renderNode: () => () => <div>Hello</div>,
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
        <DecisionGraph
          {...args}
          ref={ref}
          value={value}
          onChange={(val) => setValue(val)}
          components={components}
          onTabChange={(e) => {
            console.log(e);
          }}
        />
      </div>
    );
  },
};
