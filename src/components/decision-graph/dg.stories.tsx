import { ApartmentOutlined, EditOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';

import { DecisionGraph } from './dg';
import { defaultGraph } from './dg.stories-values';

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
            console.log(val);
            setValue(val);
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
            console.log(val);
          }}
        />
      </div>
    );
  },
};

export const Extended: Story = {
  render: (args) => {
    const [value, setValue] = useState<any>();
    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <DecisionGraph
          {...args}
          value={value}
          onChange={(val) => setValue(val)}
          components={[
            {
              name: 'Decision',
              type: 'decisionNode',
              onOpen: async () => {
                console.log('here');
              },
              renderForm: () => (
                <Form.Item label={'Key'}>
                  <Input.Group>
                    <Form.Item noStyle style={{ width: 'calc(100% - 32px)' }} name={['content', 'key']}>
                      <Input style={{ width: 'calc(100% - 32px)' }} placeholder={'Key'} />
                    </Form.Item>
                    <Button
                      icon={<EditOutlined />}
                      style={{
                        borderRadius: '0 4px 4px 0',
                      }}
                      onClick={() => {
                        // TODO INVOKE ON EDIT
                      }}
                    />
                  </Input.Group>
                </Form.Item>
              ),
              renderIcon: () => <ApartmentOutlined />,
            },
          ]}
          onTabChange={(e) => {
            console.log(e);
          }}
          onAddNode={(e, position) => {
            console.log(position);
          }}
        />
      </div>
    );
  },
};
