import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';

import { StandardExpressionBuilder, type StandardExpressionBuilderProps } from './standard-expression-builder';

type Story = StoryObj<StandardExpressionBuilderProps>;

const meta: Meta<StandardExpressionBuilderProps> = {
  title: 'StandardExpressionBuilder',
  component: StandardExpressionBuilder,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { type: 'string' },
    disabled: { type: 'boolean' },
    onChange: { table: { disable: true } },
  },
  args: { disabled: false, onChange: fn() },
};

export default meta;

const Wrapper: React.FC<StandardExpressionBuilderProps> = (props) => {
  const [value, setValue] = useState(props.value);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 300, border: '1px solid #e5e7eb', borderRadius: 4, padding: 8 }}>
        <StandardExpressionBuilder {...props} value={value} onChange={setValue} />
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#666' }}>Value: {value || '(empty)'}</div>
    </div>
  );
};

export const Auto: Story = {
  args: { fieldType: { type: 'auto' } },
  render: (args) => <Wrapper {...args} value='customer.discount * 0.1' />,
};

export const StringType: Story = {
  args: { fieldType: { type: 'string' } },
  render: (args) => <Wrapper {...args} value='"Hello World"' />,
};

export const StringEnum: Story = {
  args: {
    fieldType: {
      type: 'string',
      enum: {
        type: 'inline',
        values: [
          { label: 'United States', value: 'us' },
          { label: 'Canada', value: 'ca' },
          { label: 'Mexico', value: 'mx' },
        ],
      },
    },
  },
  render: (args) => <Wrapper {...args} value='"us"' />,
};

export const StringArrayType: Story = {
  args: { fieldType: { type: 'string-array' } },
  render: (args) => <Wrapper {...args} value='["tag1", "tag2"]' />,
};

export const StringArrayEnum: Story = {
  args: {
    fieldType: {
      type: 'string-array',
      enum: {
        type: 'inline',
        values: [
          { label: 'Red', value: 'red' },
          { label: 'Green', value: 'green' },
          { label: 'Blue', value: 'blue' },
        ],
      },
    },
  },
  render: (args) => <Wrapper {...args} value='["red", "blue"]' />,
};

export const NumberType: Story = {
  args: { fieldType: { type: 'number' } },
  render: (args) => <Wrapper {...args} value='42' />,
};

export const BooleanType: Story = {
  args: { fieldType: { type: 'boolean' } },
  render: (args) => <Wrapper {...args} value='true' />,
};

export const DateType: Story = {
  args: { fieldType: { type: 'date' } },
  render: (args) => <Wrapper {...args} value="d('2024-06-15')" />,
};

export const ExpressionMode: Story = {
  args: { fieldType: { type: 'number' } },
  render: (args) => <Wrapper {...args} value='price * quantity' />,
};

export const Disabled: Story = {
  args: { disabled: true, fieldType: { type: 'string' } },
  render: (args) => <Wrapper {...args} value='"Disabled"' />,
};
