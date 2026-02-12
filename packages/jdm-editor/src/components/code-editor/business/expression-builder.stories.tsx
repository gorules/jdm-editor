import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';

import type { DictionaryMap } from '../../../theme';
import { JdmConfigProvider } from '../../../theme';
import { ExpressionBuilder, type ExpressionBuilderProps } from './expression-builder';

type Story = StoryObj<ExpressionBuilderProps>;

const meta: Meta<ExpressionBuilderProps> = {
  title: 'ExpressionBuilder',
  component: ExpressionBuilder,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { type: 'string' },
    disabled: { type: 'boolean' },
    fieldType: { control: { type: 'object' } },
    onChange: { table: { disable: true } },
  },
  args: { disabled: false, onChange: fn() },
};

export default meta;

const Wrapper: React.FC<ExpressionBuilderProps & { children?: React.ReactNode }> = (props) => {
  const [value, setValue] = useState(props.value);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ExpressionBuilder {...props} value={value} onChange={setValue} />
      <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#666' }}>Expression: {value || '(empty)'}</div>
    </div>
  );
};

export const AutoType: Story = {
  render: (args) => <Wrapper {...args} value='' />,
};

export const StringType: Story = {
  args: { fieldType: { type: 'string' } },
  render: (args) => <Wrapper {...args} value='"hello"' />,
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
  render: (args) => <Wrapper {...args} value='d($).isAfter("2024-01-01")' />,
};

export const EnumType: Story = {
  args: {
    fieldType: {
      type: 'string',
      enum: {
        type: 'inline',
        values: [
          { label: 'Pending', value: 'pending' },
          { label: 'Processing', value: 'processing' },
          { label: 'Shipped', value: 'shipped' },
          { label: 'Delivered', value: 'delivered' },
          { label: 'Cancelled', value: 'cancelled' },
        ],
      },
    },
  },
  render: (args) => <Wrapper {...args} value='"pending"' />,
};

const DICTIONARIES: DictionaryMap = {
  orderStatus: [
    { label: 'Pending', value: 'pending' },
    { label: 'Processing', value: 'processing' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
  ],
  country: [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'Mexico', value: 'mx' },
  ],
};

const DictWrapper: React.FC<ExpressionBuilderProps> = (props) => {
  const [value, setValue] = useState(props.value);
  return (
    <JdmConfigProvider dictionaries={DICTIONARIES}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ExpressionBuilder {...props} value={value} onChange={setValue} />
        <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#666' }}>Expression: {value || '(empty)'}</div>
      </div>
    </JdmConfigProvider>
  );
};

export const DictionaryEnum: Story = {
  args: {
    fieldType: {
      type: 'string',
      enum: { type: 'ref', ref: 'orderStatus' },
    },
  },
  render: (args) => <DictWrapper {...args} value='"pending"' />,
};

export const DictionaryEnumLoose: Story = {
  args: {
    fieldType: {
      type: 'string',
      enum: { type: 'ref', ref: 'country', loose: true },
    },
  },
  render: (args) => <DictWrapper {...args} value='"us"' />,
};

export const InlineEnumLoose: Story = {
  args: {
    fieldType: {
      type: 'string',
      enum: {
        type: 'inline',
        loose: true,
        values: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
    },
  },
  render: (args) => <Wrapper {...args} value='"sm"' />,
};

export const DateWithGranularity: Story = {
  args: { fieldType: { type: 'date' } },
  render: (args) => <Wrapper {...args} value='d($).isSame("2024-06-15", "month")' />,
};

export const TimeComparison: Story = {
  args: { fieldType: { type: 'date' } },
  render: (args) => <Wrapper {...args} value='d($).hour() * 60 + d($).minute() > 9 * 60 + 0' />,
};

export const DayOfWeek: Story = {
  args: { fieldType: { type: 'date' } },
  render: (args) => <Wrapper {...args} value='d($).weekday() in [1, 2, 3, 4, 5]' />,
};

export const Quarter: Story = {
  args: { fieldType: { type: 'date' } },
  render: (args) => <Wrapper {...args} value='d($).quarter() in [1, 2]' />,
};

export const Interval: Story = {
  args: { fieldType: { type: 'number' } },
  render: (args) => <Wrapper {...args} value='[10..100]' />,
};

export const CustomExpression: Story = {
  render: (args) => <Wrapper {...args} value='$ > 10 and $ < 100' />,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Wrapper {...args} value='"hello"' />,
};
