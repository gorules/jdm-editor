import { BranchesOutlined, FunctionOutlined, LoginOutlined, LogoutOutlined, TableOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'antd';
import React from 'react';

import { AutosizeTextArea } from '../autosize-text-area';
import { DecisionNode } from './decision-node';

const meta: Meta<typeof DecisionNode> = {
  title: 'DecisionNode',
  component: DecisionNode,
  argTypes: {},
  render: (args) => (
    <div style={{ background: '#f5f5f5', padding: 24, maxWidth: 300 }}>
      <DecisionNode {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof DecisionNode>;

export const decisionTableNode: Story = {
  args: {
    icon: <TableOutlined />,
    name: 'myTable1',
    type: 'Decision Table',
    actions: [
      <Button key='edit-table' type='link' size='middle'>
        Edit Table
      </Button>,
    ],
  },
};

export const functionNode: Story = {
  args: {
    icon: <FunctionOutlined />,
    name: 'myFunction1',
    type: 'Function',
    actions: [
      <Button key='edit-function' type='link' size='middle'>
        Edit Function
      </Button>,
    ],
  },
};

export const inputNode: Story = {
  args: {
    icon: <LoginOutlined />,
    name: 'mainInput',
    type: 'Input',
  },
};

export const outputNode: Story = {
  args: {
    icon: <LogoutOutlined />,
    name: 'output1',
    type: 'Output',
  },
};

export const switchNode: Story = {
  args: {
    icon: <BranchesOutlined />,
    name: 'mySwitch1',
    type: 'Switch',
    children: (
      <div className='switchNode__statement'>
        <div className='switchNode__statement__inputArea'>
          <AutosizeTextArea
            style={{
              fontSize: 12,
              lineHeight: '20px',
            }}
            maxRows={4}
          />
        </div>
        <div className='switchNode__statement__inputArea'>
          <AutosizeTextArea
            style={{
              fontSize: 12,
              lineHeight: '20px',
            }}
            maxRows={4}
          />
        </div>
        <div className='switchNode__statement__inputArea'>
          <AutosizeTextArea
            style={{
              fontSize: 12,
              lineHeight: '20px',
            }}
            maxRows={4}
          />
        </div>
        <div className='switchNode__statement__inputArea'>
          <AutosizeTextArea
            style={{
              fontSize: 12,
              lineHeight: '20px',
            }}
            maxRows={4}
          />
        </div>
      </div>
    ),
  },
};
